#!/usr/bin/env node
/**
 * Strip inline page editor components from marketing TSX files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(full, out);
    } else if (name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

function extractBalanced(source, startIdx, openChar, closeChar) {
  let depth = 0;
  for (let i = startIdx; i < source.length; i++) {
    if (source[i] === openChar) depth++;
    else if (source[i] === closeChar) {
      depth--;
      if (depth === 0) return source.slice(startIdx, i + 1);
    }
  }
  return null;
}

function parseJsxProps(propsStr) {
  const props = {};
  let i = 0;
  while (i < propsStr.length) {
    while (i < propsStr.length && /\s/.test(propsStr[i])) i++;
    if (i >= propsStr.length) break;
    const nameMatch = propsStr.slice(i).match(/^([A-Za-z_]\w*)\s*=\s*/);
    if (!nameMatch) break;
    const name = nameMatch[1];
    i += nameMatch[0].length;
    if (propsStr[i] === '"') {
      const end = propsStr.indexOf('"', i + 1);
      props[name] = { kind: "string", value: propsStr.slice(i + 1, end) };
      i = end + 1;
      continue;
    }
    if (propsStr[i] === "'") {
      const end = propsStr.indexOf("'", i + 1);
      props[name] = { kind: "string", value: propsStr.slice(i + 1, end) };
      i = end + 1;
      continue;
    }
    if (propsStr[i] === "{") {
      const expr = extractBalanced(propsStr, i, "{", "}");
      props[name] = { kind: "expr", value: expr.slice(1, -1).trim() };
      i += expr.length;
      continue;
    }
    break;
  }
  return props;
}

function jsxAttr(name, prop) {
  if (!prop) return null;
  if (prop.kind === "expr") return `${name}={${prop.value}}`;
  return `${name}="${prop.value}"`;
}

function exprValue(prop) {
  if (!prop) return '""';
  if (prop.kind === "expr") return prop.value;
  return JSON.stringify(prop.value);
}

function stripEditableText(source) {
  let result = source;
  const tag = "EditableText";
  let idx = 0;
  while ((idx = result.indexOf(`<${tag}`, idx)) !== -1) {
    const propsStart = idx + tag.length + 1;
    const closeTag = `</${tag}>`;
    const closeIdx = result.indexOf(closeTag, propsStart);
    const selfCloseIdx = result.indexOf("/>", propsStart);

    const isSelfClosing =
      selfCloseIdx !== -1 && (closeIdx === -1 || selfCloseIdx < closeIdx);

    let propsStr;
    let content = "";
    let endIdx;

    if (isSelfClosing) {
      propsStr = result.slice(propsStart, selfCloseIdx).trimEnd();
      if (propsStr.endsWith("/")) propsStr = propsStr.slice(0, -1).trimEnd();
      endIdx = selfCloseIdx + 2;
    } else {
      if (closeIdx === -1) break;
      const gtIdx = result.indexOf(">", propsStart);
      if (gtIdx === -1 || gtIdx > closeIdx) break;
      propsStr = result.slice(propsStart, gtIdx);
      content = result.slice(gtIdx + 1, closeIdx).trim();
      endIdx = closeIdx + closeTag.length;
    }

    const props = parseJsxProps(propsStr);
    const as = props.as?.value ?? "span";
    const attrs = [jsxAttr("className", props.className), jsxAttr("style", props.style)].filter(Boolean);
    let inner = content;
    if (!inner) {
      if (props.defaultValue?.kind === "expr") inner = `{${props.defaultValue.value}}`;
      else if (props.defaultValue?.kind === "string") inner = props.defaultValue.value;
      else inner = "";
    }
    const replacement = `<${as}${attrs.length ? ` ${attrs.join(" ")}` : ""}>${inner}</${as}>`;
    result = result.slice(0, idx) + replacement + result.slice(endIdx);
    idx += replacement.length;
  }
  return result;
}

function stripEditableIcon(source) {
  let result = source;
  const tag = "EditableIcon";
  let idx = 0;
  while ((idx = result.indexOf(`<${tag}`, idx)) !== -1) {
    const propsStart = idx + tag.length + 1;
    const propsEnd = result.indexOf("/>", propsStart);
    if (propsEnd === -1) break;
    const props = parseJsxProps(result.slice(propsStart, propsEnd));
    const iconExpr = exprValue(props.defaultIconClass);
    const iconClass = props.iconClassName;
    let classNameExpr;
    if (iconClass?.kind === "string") {
      classNameExpr = `[${iconExpr}, ${JSON.stringify(iconClass.value)}].filter(Boolean).join(" ")`;
    } else if (iconClass?.kind === "expr") {
      classNameExpr = `[${iconExpr}, ${iconClass.value}].filter(Boolean).join(" ")`;
    } else {
      classNameExpr = iconExpr;
    }
    const replacement = `<i className={${classNameExpr}} aria-hidden />`;
    result = result.slice(0, idx) + replacement + result.slice(propsEnd + 2);
    idx += replacement.length;
  }
  return result;
}

function stripEditableImage(source) {
  let result = source;
  const tag = "EditableImage";
  let idx = 0;
  while ((idx = result.indexOf(`<${tag}`, idx)) !== -1) {
    const propsStart = idx + tag.length + 1;
    const propsEnd = result.indexOf("/>", propsStart);
    if (propsEnd === -1) break;
    const props = parseJsxProps(result.slice(propsStart, propsEnd));
    const skip = new Set(["fieldKey", "defaultSrc", "label", "routePath"]);
    const lines = [
      `src={${exprValue(props.defaultSrc)}}`,
      `alt={${exprValue(props.alt)}}`,
    ];
    for (const [key, val] of Object.entries(props)) {
      if (skip.has(key) || key === "alt" || key === "defaultSrc") continue;
      lines.push(jsxAttr(key, val));
    }
    const replacement = `<Image\n        ${lines.join("\n        ")}\n      />`;
    result = result.slice(0, idx) + replacement + result.slice(propsEnd + 2);
    idx += replacement.length;
  }
  return result;
}

function cleanImports(source) {
  let result = source;
  result = result.replace(/^import\s+\{[^}]*\}\s+from\s+["']@sweetmedia\/admin-core\/page-editor["'];\n/gm, "");
  if (/<Image[\s>]/.test(result) && !/from\s+["']next\/image["']/.test(result)) {
    const firstImport = result.match(/^import\s/m);
    if (firstImport) {
      result = result.replace(/^import\s/m, 'import Image from "next/image";\nimport ');
    } else {
      result = `import Image from "next/image";\n${result}`;
    }
  }
  result = result.replace(/\nexport default async function/g, "\nexport default function");
  return result;
}

function stripLayout(source) {
  let result = source;
  result = result.replace(
    /import\s+\{([^}]*)\}\s+from\s+["'](@sweetmedia\/admin-core(?:\/public-layout)?)["'];\n/g,
    (_, inner, from) => {
      const kept = inner
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s && s !== "DeferredPageEditorProvider");
      if (!kept.length) return "";
      return `import { ${kept.join(", ")} } from "${from}";\n`;
    },
  );
  result = result.replace(/<DeferredPageEditorProvider>\s*/g, "");
  result = result.replace(/\s*<\/DeferredPageEditorProvider>/g, "");
  return result;
}

const targets = walk(path.join(ROOT, "apps"));

for (const file of targets) {
  let src = fs.readFileSync(file, "utf8");
  const before = src;
  if (file.endsWith("layout.tsx") && src.includes("DeferredPageEditorProvider")) {
    src = stripLayout(src);
  }
  if (src.includes("EditableText") || src.includes("EditableImage") || src.includes("EditableIcon")) {
    src = stripEditableText(src);
    src = stripEditableIcon(src);
    src = stripEditableImage(src);
    src = cleanImports(src);
  }
  if (src !== before) {
    fs.writeFileSync(file, src);
    console.log("updated", path.relative(ROOT, file));
  }
}

for (const file of targets) {
  if (!file.endsWith("middleware.ts")) continue;
  const src = fs.readFileSync(file, "utf8");
  if (src.includes("withPageEditorPathname")) {
    fs.unlinkSync(file);
    console.log("deleted", path.relative(ROOT, file));
  }
}

console.log("done");
