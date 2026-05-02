/**
 * compositeImageText — unique per-post featured card generator
 * Each card is seeded from the post title so same-category posts
 * look visually distinct: different orb positions, hue shifts,
 * pattern rotations, graphic offsets, and decorative layers.
 */

type Topic = "seo" | "paid" | "social" | "web" | "ai" | "health" | "revenue" | "compliance" | "default";

// ─── Seed from title ─────────────────────────────────────────────────────────
function titleSeed(title: string): number {
  let h = 0;
  for (let i = 0; i < title.length; i++) {
    h = Math.imul(31, h) + title.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}

function seededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

// ─── Topic detection ─────────────────────────────────────────────────────────
function detectTopic(title: string, category?: string): Topic {
  const t = (title + " " + (category ?? "")).toLowerCase();
  if (t.includes("ai overview") || t.includes("chatgpt") || t.includes("ai search") || t.includes("generative ai") || t.includes("llm") || t.includes("artificial intelligence") || t.includes("machine learning")) return "ai";
  if (t.includes("seo") || t.includes("search engine") || t.includes("ranking") || t.includes("organic traffic") || t.includes("keyword") || t.includes("google") || t.includes("backlink") || t.includes("serp") || t.includes("cost per admission")) return "seo";
  if (t.includes("paid") || t.includes("ppc") || t.includes("ads") || t.includes("meta ads") || t.includes("google ads") || t.includes("ctv") || t.includes("television") || t.includes("programmatic") || t.includes("roas")) return "paid";
  if (t.includes("social media") || t.includes("instagram") || t.includes("facebook") || t.includes("tiktok") || t.includes("content marketing") || t.includes("brand awareness") || t.includes("influencer")) return "social";
  if (t.includes("web") || t.includes("website") || t.includes("landing page") || t.includes("conversion") || t.includes("cro") || t.includes("ux") || t.includes("design") || t.includes("development")) return "web";
  if (t.includes("patient") || t.includes("admissions") || t.includes("treatment center") || t.includes("recovery") || t.includes("behavioral health") || t.includes("rehab") || t.includes("census") || t.includes("detox")) return "health";
  if (t.includes("revenue") || t.includes("roi") || t.includes("profit") || t.includes("growth") || t.includes("financial") || t.includes("billing") || t.includes("denial") || t.includes("insurance") || t.includes("reimbursement")) return "revenue";
  if (t.includes("compliance") || t.includes("hipaa") || t.includes("legal") || t.includes("regulation") || t.includes("privacy") || t.includes("policy")) return "compliance";
  return "default";
}

// ─── Per-post variation config ────────────────────────────────────────────────
interface CardVariant {
  rng: () => number;
  // Background
  orbX1: number; orbY1: number; orbX2: number; orbY2: number;
  orbSize1: number; orbSize2: number;
  gridAngle: number; gridSize: number;
  bgShift: number;           // subtle hue rotation on base gradient (0–1)
  // Accent
  accentHueShift: number;    // degrees to rotate accent hue (-20 to +20)
  accentAlpha: number;       // 0.8–1.0 multiplier on accent opacity
  // Graphic
  graphicOffsetX: number;    // -0.04 to +0.04 of W
  graphicOffsetY: number;    // -0.04 to +0.04 of H
  graphicScale: number;      // 0.88–1.12
  // Extra decorative layer
  decorStyle: "dots" | "hexgrid" | "rings" | "lines" | "triangles";
  decorDensity: number;      // 0.5–1.5
  decorAlpha: number;        // 0.02–0.06
  // Orb third accent
  thirdOrbX: number; thirdOrbY: number;
}

function buildVariant(seed: number): CardVariant {
  const rng = seededRng(seed);
  const decorStyles: CardVariant["decorStyle"][] = ["dots", "hexgrid", "rings", "lines", "triangles"];
  return {
    rng,
    orbX1: 0.6 + rng() * 0.35,
    orbY1: rng() * 0.35,
    orbX2: rng() * 0.25,
    orbY2: 0.65 + rng() * 0.35,
    orbSize1: 0.35 + rng() * 0.2,
    orbSize2: 0.25 + rng() * 0.15,
    gridAngle: (rng() - 0.5) * 0.6,   // radians tilt
    gridSize: 36 + rng() * 28,
    bgShift: rng(),
    accentHueShift: (rng() - 0.5) * 40,
    accentAlpha: 0.82 + rng() * 0.18,
    graphicOffsetX: (rng() - 0.5) * 0.06,
    graphicOffsetY: (rng() - 0.5) * 0.06,
    graphicScale: 0.9 + rng() * 0.2,
    decorStyle: decorStyles[Math.floor(rng() * decorStyles.length)],
    decorDensity: 0.6 + rng() * 0.9,
    decorAlpha: 0.018 + rng() * 0.04,
    thirdOrbX: 0.3 + rng() * 0.5,
    thirdOrbY: 0.2 + rng() * 0.6,
  };
}

// ─── Hex color → hue-shifted hex ─────────────────────────────────────────────
function shiftHue(hex: string, degrees: number): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return hex;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0)
        : max === g ? (b - r) / d + 2
        : (r - g) / d + 4;
  h = ((h / 6) * 360 + degrees + 360) % 360;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p2 = 2 * l - q2;
  const hN = h / 360;
  const nr = Math.round(hue2rgb(p2, q2, hN + 1/3) * 255);
  const ng = Math.round(hue2rgb(p2, q2, hN) * 255);
  const nb = Math.round(hue2rgb(p2, q2, hN - 1/3) * 255);
  return `#${nr.toString(16).padStart(2,"0")}${ng.toString(16).padStart(2,"0")}${nb.toString(16).padStart(2,"0")}`;
}

// ─── Base accent colors ───────────────────────────────────────────────────────
function baseAccent(topic: Topic): string {
  const map: Record<Topic, string> = {
    seo: "#2DD4BF", paid: "#F59E0B", social: "#34D399",
    web: "#60A5FA", ai: "#C084FC", health: "#4ADE80",
    revenue: "#FBBF24", compliance: "#94A3B8", default: "#2DD4BF",
  };
  return map[topic];
}

function baseDimAccent(topic: Topic): string {
  const map: Record<Topic, string> = {
    seo: "#0D9488", paid: "#D97706", social: "#059669",
    web: "#2563EB", ai: "#7C3AED", health: "#16A34A",
    revenue: "#B45309", compliance: "#475569", default: "#0D9488",
  };
  return map[topic];
}

// ─── Background ───────────────────────────────────────────────────────────────
function drawBackground(ctx: CanvasRenderingContext2D, W: number, H: number, topic: Topic, accent: string, v: CardVariant) {
  // Base gradient — slightly varied per card
  const base = ctx.createLinearGradient(0, 0, W, H);
  const dark1 = v.bgShift > 0.5 ? "#050C1A" : "#060E1F";
  const dark2 = v.bgShift > 0.5 ? "#0B1C38" : "#0A1A35";
  base.addColorStop(0, dark1);
  base.addColorStop(0.5, dark2);
  base.addColorStop(1, "#04090F");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  // Primary orb — position varies per card
  const orb1 = ctx.createRadialGradient(W * v.orbX1, H * v.orbY1, 0, W * v.orbX1, H * v.orbY1, W * v.orbSize1);
  orb1.addColorStop(0, `${accent}2A`);
  orb1.addColorStop(0.45, `${accent}0E`);
  orb1.addColorStop(1, "transparent");
  ctx.fillStyle = orb1;
  ctx.fillRect(0, 0, W, H);

  // Secondary orb — bottom area, dim accent
  const dim = baseDimAccent(topic);
  const orb2 = ctx.createRadialGradient(W * v.orbX2, H * v.orbY2, 0, W * v.orbX2, H * v.orbY2, W * v.orbSize2);
  orb2.addColorStop(0, `${dim}22`);
  orb2.addColorStop(1, "transparent");
  ctx.fillStyle = orb2;
  ctx.fillRect(0, 0, W, H);

  // Third subtle orb — mid-card, unique position
  const orb3 = ctx.createRadialGradient(W * v.thirdOrbX, H * v.thirdOrbY, 0, W * v.thirdOrbX, H * v.thirdOrbY, W * 0.22);
  orb3.addColorStop(0, `${accent}10`);
  orb3.addColorStop(1, "transparent");
  ctx.fillStyle = orb3;
  ctx.fillRect(0, 0, W, H);

  // Rotated grid — angle varies per card
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(v.gridAngle);
  ctx.strokeStyle = "rgba(255,255,255,0.022)";
  ctx.lineWidth = 1;
  const gs = v.gridSize;
  for (let x = -W; x < W * 2; x += gs) {
    ctx.beginPath(); ctx.moveTo(x, -H); ctx.lineTo(x + H * Math.tan(0.5), H * 2); ctx.stroke();
  }
  ctx.restore();

  // Scan lines
  for (let y = 0; y < H; y += 4) {
    ctx.fillStyle = "rgba(0,0,0,0.055)";
    ctx.fillRect(0, y, W, 1);
  }

  // Film grain — seeded from title so unique per post
  const grainRng = seededRng(v.rng() * 0xffffffff | 0);
  for (let i = 0; i < 2000; i++) {
    ctx.fillStyle = `rgba(255,255,255,${grainRng() * 0.05})`;
    ctx.fillRect(grainRng() * W, grainRng() * H, 1, 1);
  }
}

// ─── Unique decorative layer ──────────────────────────────────────────────────
function drawDecorLayer(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string, v: CardVariant) {
  const rng = seededRng((v.rng() * 0xffffffff) | 0);
  const alpha = v.decorAlpha;
  const density = v.decorDensity;

  ctx.save();
  switch (v.decorStyle) {
    case "dots": {
      const count = Math.round(40 * density);
      for (let i = 0; i < count; i++) {
        const x = W * 0.5 + rng() * W * 0.5;
        const y = rng() * H;
        const r = 1.5 + rng() * 4;
        ctx.fillStyle = `${accent}${Math.round(alpha * 255).toString(16).padStart(2,"0")}`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    case "hexgrid": {
      const size = 28 + rng() * 20;
      const cols = Math.ceil(W * 0.5 / (size * 1.5)) + 2;
      const rows = Math.ceil(H / (size * Math.sqrt(3))) + 2;
      ctx.strokeStyle = `${accent}${Math.round(alpha * 255).toString(16).padStart(2,"0")}`;
      ctx.lineWidth = 1;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = W * 0.5 + col * size * 1.5;
          const cy = row * size * Math.sqrt(3) + (col % 2 === 0 ? 0 : size * Math.sqrt(3) / 2);
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (Math.PI / 3) * a;
            const px = cx + size * Math.cos(angle);
            const py = cy + size * Math.sin(angle);
            if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath(); ctx.stroke();
        }
      }
      break;
    }
    case "rings": {
      const count = Math.round(5 * density);
      for (let i = 0; i < count; i++) {
        const cx = W * 0.55 + rng() * W * 0.4;
        const cy = rng() * H;
        const r = 20 + rng() * 80;
        ctx.strokeStyle = `${accent}${Math.round(alpha * 255).toString(16).padStart(2,"0")}`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      }
      break;
    }
    case "lines": {
      const count = Math.round(12 * density);
      for (let i = 0; i < count; i++) {
        const x1 = W * 0.5 + rng() * W * 0.5;
        const y1 = rng() * H;
        const len = 40 + rng() * 120;
        const angle = rng() * Math.PI * 2;
        ctx.strokeStyle = `${accent}${Math.round(alpha * 255).toString(16).padStart(2,"0")}`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + Math.cos(angle) * len, y1 + Math.sin(angle) * len);
        ctx.stroke();
      }
      break;
    }
    case "triangles": {
      const count = Math.round(8 * density);
      for (let i = 0; i < count; i++) {
        const cx = W * 0.52 + rng() * W * 0.44;
        const cy = rng() * H;
        const size2 = 15 + rng() * 40;
        const angle = rng() * Math.PI * 2;
        ctx.strokeStyle = `${accent}${Math.round(alpha * 255).toString(16).padStart(2,"0")}`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let a = 0; a < 3; a++) {
          const pa = angle + (Math.PI * 2 / 3) * a;
          const px = cx + Math.cos(pa) * size2;
          const py = cy + Math.sin(pa) * size2;
          if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
      }
      break;
    }
  }
  ctx.restore();
}

// ─── Left panel vignette ──────────────────────────────────────────────────────
function drawLeftPanel(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const vignette = ctx.createLinearGradient(0, 0, W * 0.55, 0);
  vignette.addColorStop(0, "rgba(4,9,15,0.58)");
  vignette.addColorStop(0.7, "rgba(4,9,15,0.15)");
  vignette.addColorStop(1, "transparent");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  const bottom = ctx.createLinearGradient(0, H * 0.55, 0, H);
  bottom.addColorStop(0, "transparent");
  bottom.addColorStop(1, "rgba(4,9,15,0.72)");
  ctx.fillStyle = bottom;
  ctx.fillRect(0, 0, W, H);
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function drawDivider(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string) {
  const x = W * 0.5;
  const grad = ctx.createLinearGradient(x, H * 0.08, x, H * 0.92);
  grad.addColorStop(0, "transparent");
  grad.addColorStop(0.3, `${accent}44`);
  grad.addColorStop(0.7, `${accent}44`);
  grad.addColorStop(1, "transparent");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, H * 0.08);
  ctx.lineTo(x, H * 0.92);
  ctx.stroke();
}

// ─── Left accent bar ──────────────────────────────────────────────────────────
function drawAccentBar(ctx: CanvasRenderingContext2D, H: number, accent: string) {
  const grad = ctx.createLinearGradient(0, H * 0.2, 0, H * 0.8);
  grad.addColorStop(0, "transparent");
  grad.addColorStop(0.3, accent);
  grad.addColorStop(0.7, accent);
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 3, H);
}

// ─── Topic graphics (offset + scaled per variant) ────────────────────────────
function withGraphicTransform(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  v: CardVariant,
  draw: () => void
) {
  ctx.save();
  const cx = W * 0.72 + v.graphicOffsetX * W;
  const cy = H * 0.5 + v.graphicOffsetY * H;
  ctx.translate(cx, cy);
  ctx.scale(v.graphicScale, v.graphicScale);
  ctx.translate(-cx, -cy);
  draw();
  ctx.restore();
}

function drawSeoGraphic(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string, v: CardVariant) {
  const rng = seededRng(titleSeed(accent + "seo"));
  const ox = W * 0.52 + v.graphicOffsetX * W;
  const oy = v.graphicOffsetY * H;

  // Search bar
  const barY = H * 0.2 + oy;
  const barW = W * 0.42 * v.graphicScale;
  const barH = 36;
  ctx.fillStyle = "rgba(255,255,255,0.07)";
  ctx.strokeStyle = `${accent}55`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(ox, barY, barW, barH, 18);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = `${accent}99`;
  ctx.beginPath();
  ctx.arc(ox + 18, barY + barH / 2, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = `${accent}cc`;
  ctx.fillRect(ox + 32, barY + 10, 1.5, 16);

  // Ranking bars — heights vary per card
  const barHeights = [1.0, 0.72 + rng() * 0.12, 0.52 + rng() * 0.14, 0.36 + rng() * 0.14, 0.22 + rng() * 0.12];
  const bStartY = H * 0.36 + oy;
  const bH = H * 0.048 * v.graphicScale;
  const bGap = H * 0.022;
  const bMaxW = W * 0.38 * v.graphicScale;

  barHeights.forEach((ratio, i) => {
    const y = bStartY + i * (bH + bGap);
    const bw = bMaxW * ratio;
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.beginPath(); ctx.roundRect(ox, y, bMaxW, bH, 4); ctx.fill();
    const fg = ctx.createLinearGradient(ox, 0, ox + bw, 0);
    if (i === 0) { fg.addColorStop(0, accent); fg.addColorStop(1, `${accent}66`); }
    else { fg.addColorStop(0, "rgba(255,255,255,0.22)"); fg.addColorStop(1, "rgba(255,255,255,0.06)"); }
    ctx.fillStyle = fg;
    ctx.beginPath(); ctx.roundRect(ox, y, bw, bH, 4); ctx.fill();
    if (i === 0) {
      ctx.fillStyle = accent;
      ctx.beginPath(); ctx.roundRect(ox - 28, y + bH / 2 - 10, 22, 20, 4); ctx.fill();
      ctx.fillStyle = "#000"; ctx.font = `bold 10px Arial`; ctx.textBaseline = "middle"; ctx.textAlign = "center";
      ctx.fillText("#1", ox - 17, y + bH / 2); ctx.textAlign = "left";
    }
  });

  // Trend arrow — x position varies
  const arrowX = W * (0.84 + rng() * 0.08);
  const arrowY1 = H * 0.75; const arrowY2 = H * 0.28;
  const ag = ctx.createLinearGradient(0, arrowY1, 0, arrowY2);
  ag.addColorStop(0, "transparent"); ag.addColorStop(0.4, `${accent}66`); ag.addColorStop(1, accent);
  ctx.strokeStyle = ag; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
  ctx.beginPath(); ctx.moveTo(arrowX, arrowY1); ctx.lineTo(arrowX, arrowY2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.moveTo(arrowX, arrowY2 - 12); ctx.lineTo(arrowX - 7, arrowY2 + 4); ctx.lineTo(arrowX + 7, arrowY2 + 4); ctx.closePath(); ctx.fill();

  // Floating nodes — positions vary
  const nodeCount = 3 + Math.floor(rng() * 3);
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: W * (0.58 + rng() * 0.34), y: H * (0.7 + rng() * 0.2),
  }));
  for (let i = 0; i < nodes.length - 1; i++) {
    ctx.strokeStyle = "rgba(255,255,255,0.07)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[i+1].x, nodes[i+1].y); ctx.stroke();
  }
  nodes.forEach((n, i) => {
    const r = i === 0 ? 7 : 3 + rng() * 3;
    ctx.fillStyle = i === 0 ? `${accent}bb` : "rgba(255,255,255,0.18)";
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();
  });
}

function drawPaidGraphic(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string, v: CardVariant) {
  const rng = seededRng(titleSeed(accent + "paid"));
  const ox = W * (0.52 + v.graphicOffsetX);
  const chartBottom = H * (0.78 + v.graphicOffsetY * 0.5);
  const chartTop = H * (0.2 + v.graphicOffsetY * 0.5);
  const maxH = chartBottom - chartTop;

  // Bar heights vary per card
  const barCount = 6 + Math.floor(rng() * 3);
  const bars = Array.from({ length: barCount }, (_, i) => {
    const base = 0.25 + (i / (barCount - 1)) * 0.6;
    return base + (rng() - 0.5) * 0.12;
  });
  bars[bars.length - 1] = Math.max(bars[bars.length - 1], 0.82); // last bar always tallest

  const barW = (W * 0.38 * v.graphicScale) / barCount * 0.6;
  const barGap = (W * 0.38 * v.graphicScale) / barCount * 0.4;

  for (let i = 1; i <= 4; i++) {
    const y = chartBottom - (i / 4) * maxH;
    ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 1; ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.moveTo(ox - 10, y); ctx.lineTo(ox + barCount * (barW + barGap) + 10, y); ctx.stroke();
  }
  ctx.setLineDash([]);

  bars.forEach((h, i) => {
    const x = ox + i * (barW + barGap);
    const bh = maxH * h;
    const y = chartBottom - bh;
    const isLast = i === bars.length - 1;
    const grad = ctx.createLinearGradient(0, y, 0, chartBottom);
    if (isLast) { grad.addColorStop(0, accent); grad.addColorStop(1, `${accent}44`); }
    else { grad.addColorStop(0, "rgba(255,255,255,0.28)"); grad.addColorStop(1, "rgba(255,255,255,0.06)"); }
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.roundRect(x, y, barW, bh, [4, 4, 0, 0]); ctx.fill();
    if (isLast) {
      ctx.shadowColor = accent; ctx.shadowBlur = 14;
      ctx.fillStyle = `${accent}55`;
      ctx.beginPath(); ctx.roundRect(x, y, barW, bh, [4, 4, 0, 0]); ctx.fill();
      ctx.shadowBlur = 0; ctx.shadowColor = "transparent";
    }
  });

  ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox - 10, chartBottom); ctx.lineTo(ox + barCount * (barW + barGap) + 10, chartBottom); ctx.stroke();

  ctx.strokeStyle = `${accent}cc`; ctx.lineWidth = 2;
  ctx.beginPath();
  bars.forEach((h, i) => {
    const x = ox + i * (barW + barGap) + barW / 2;
    const y = chartBottom - maxH * h - 10;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Badge — position varies
  const bx = W * (0.8 + rng() * 0.08);
  const by = H * (0.14 + rng() * 0.08);
  const roasVal = (3.2 + rng() * 2.4).toFixed(1);
  ctx.fillStyle = `${accent}18`; ctx.strokeStyle = `${accent}55`; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(bx, by, 96, 34, 8); ctx.fill(); ctx.stroke();
  ctx.fillStyle = accent; ctx.font = `bold 12px "Inter", Arial, sans-serif`; ctx.textBaseline = "middle";
  ctx.fillText(`ROAS ↑ ${roasVal}x`, bx + 10, by + 17);
}

function drawSocialGraphic(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string, v: CardVariant) {
  const rng = seededRng(titleSeed(accent + "social"));
  const cx = W * (0.72 + v.graphicOffsetX);
  const cy = H * (0.5 + v.graphicOffsetY);
  const satCount = 6 + Math.floor(rng() * 4);
  const baseRadius = H * (0.18 + rng() * 0.08);

  const satellites = Array.from({ length: satCount }, (_, i) => {
    const angle = (i / satCount) * Math.PI * 2 - Math.PI / 2 + rng() * 0.3;
    const dist = baseRadius + rng() * H * 0.06;
    return { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist, r: 4 + rng() * 5 };
  });

  ctx.strokeStyle = `${accent}18`; ctx.lineWidth = 1; ctx.setLineDash([3, 6]);
  ctx.beginPath(); ctx.arc(cx, cy, baseRadius * 1.5, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);

  satellites.forEach((s) => {
    const lg = ctx.createLinearGradient(cx, cy, s.x, s.y);
    lg.addColorStop(0, `${accent}44`); lg.addColorStop(1, "rgba(255,255,255,0.05)");
    ctx.strokeStyle = lg; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(s.x, s.y); ctx.stroke();
  });

  for (let i = 0; i < satellites.length; i++) {
    const next = satellites[(i + Math.floor(satCount / 3)) % satellites.length];
    ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(satellites[i].x, satellites[i].y); ctx.lineTo(next.x, next.y); ctx.stroke();
  }

  satellites.forEach((s) => {
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  });

  ctx.shadowColor = accent; ctx.shadowBlur = 30;
  const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
  cg.addColorStop(0, accent); cg.addColorStop(0.6, `${accent}88`); cg.addColorStop(1, `${accent}22`);
  ctx.fillStyle = cg;
  ctx.beginPath(); ctx.arc(cx, cy, 26, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0; ctx.shadowColor = "transparent";

  const pulseRadii = [42, 60, 80].map(r => r * v.graphicScale);
  pulseRadii.forEach((r, i) => {
    ctx.strokeStyle = `${accent}${["44","28","14"][i]}`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  });

  // Engagement icons — positions vary
  const iconX = W * (0.86 + rng() * 0.06);
  const iconY = H * (0.22 + rng() * 0.1);
  ctx.fillStyle = "#F8717122"; ctx.strokeStyle = "#F8717155"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(iconX, iconY, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#F87171"; ctx.font = `bold 13px Arial`; ctx.textBaseline = "middle"; ctx.textAlign = "center";
  ctx.fillText("♥", iconX, iconY); ctx.textAlign = "left";
}

function drawWebGraphic(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string, v: CardVariant) {
  const rng = seededRng(titleSeed(accent + "web"));
  const wx = W * (0.52 + v.graphicOffsetX * 0.5);
  const wy = H * (0.08 + Math.abs(v.graphicOffsetY) * 0.5);
  const ww = W * 0.44 * v.graphicScale;
  const wh = H * 0.76 * v.graphicScale;

  ctx.shadowColor = `${accent}33`; ctx.shadowBlur = 30;
  ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(wx, wy, ww, wh, 12); ctx.fill(); ctx.stroke();
  ctx.shadowBlur = 0; ctx.shadowColor = "transparent";

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath(); ctx.roundRect(wx, wy, ww, 30, [12, 12, 0, 0]); ctx.fill();

  [["#FF5F57", wx + 14], ["#FEBC2E", wx + 30], ["#28C840", wx + 46]].forEach(([c, x]) => {
    ctx.fillStyle = c as string; ctx.beginPath(); ctx.arc(x as number, wy + 15, 5, 0, Math.PI * 2); ctx.fill();
  });

  ctx.fillStyle = "rgba(255,255,255,0.06)"; ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(wx + 65, wy + 7, ww - 85, 16, 4); ctx.fill(); ctx.stroke();

  const cx2 = wx + 14; const cy2 = wy + 46; const cw = ww - 28;

  // Hero block — color varies
  const heroGrad = ctx.createLinearGradient(cx2, cy2, cx2 + cw, cy2 + 65);
  heroGrad.addColorStop(0, `${accent}33`); heroGrad.addColorStop(1, `${accent}11`);
  ctx.fillStyle = heroGrad;
  ctx.beginPath(); ctx.roundRect(cx2, cy2, cw, 65, 6); ctx.fill();

  ctx.fillStyle = accent; ctx.shadowColor = accent; ctx.shadowBlur = 8;
  ctx.beginPath(); ctx.roundRect(cx2 + 12, cy2 + 38, 72, 16, 4); ctx.fill();
  ctx.shadowBlur = 0; ctx.shadowColor = "transparent";

  // Content rows — widths vary
  [0.85 + rng() * 0.15, 1.0, 0.65 + rng() * 0.2, 0.8 + rng() * 0.15, 0.5 + rng() * 0.2].forEach((w, i) => {
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath(); ctx.roundRect(cx2, cy2 + 82 + i * 22, cw * w, 9, 2); ctx.fill();
  });

  const cardY = cy2 + 200; const cardW = (cw - 10) / 2;
  [0, 1].forEach((col) => {
    ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(cx2 + col * (cardW + 10), cardY, cardW, 55, 5); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.beginPath(); ctx.roundRect(cx2 + col * (cardW + 10) + 6, cardY + 6, cardW - 12, 22, 3); ctx.fill();
  });
}

function drawAiGraphic(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string, v: CardVariant) {
  const rng = seededRng(titleSeed(accent + "ai"));
  const offsetX = v.graphicOffsetX * W;
  const offsetY = v.graphicOffsetY * H;

  // Layer sizes vary per card
  const layerCounts = [1, 2 + Math.floor(rng() * 2), 2 + Math.floor(rng() * 2), 1 + Math.floor(rng() * 2), 1];
  const layerX = [0.56, 0.65, 0.74, 0.83, 0.92].map(x => W * x + offsetX);

  const layers = layerCounts.map((count, li) => {
    const x = layerX[li];
    return Array.from({ length: count }, (_, ni) => ({
      x,
      y: H * (0.5 + offsetY) + (ni - (count - 1) / 2) * H * (0.18 + rng() * 0.06),
    }));
  });

  for (let l = 0; l < layers.length - 1; l++) {
    layers[l].forEach((from) => {
      layers[l + 1].forEach((to) => {
        const alpha = 0.06 + rng() * 0.14;
        const lg = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        lg.addColorStop(0, `${accent}${Math.round(alpha * 255).toString(16).padStart(2,"0")}`);
        lg.addColorStop(1, `rgba(255,255,255,${alpha * 0.5})`);
        ctx.strokeStyle = lg; ctx.lineWidth = 1 + rng() * 0.5;
        ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y); ctx.stroke();
      });
    });
  }

  layers.forEach((layer, li) => {
    layer.forEach((node) => {
      const isIO = li === 0 || li === layers.length - 1;
      const r = isIO ? 12 : 6 + rng() * 3;
      if (isIO) {
        ctx.shadowColor = accent; ctx.shadowBlur = 20;
        const ng = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r);
        ng.addColorStop(0, accent); ng.addColorStop(1, `${accent}44`);
        ctx.fillStyle = ng;
      } else {
        ctx.shadowBlur = 0; ctx.fillStyle = "rgba(255,255,255,0.22)";
      }
      ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, Math.PI * 2); ctx.fill();
    });
  });
  ctx.shadowBlur = 0; ctx.shadowColor = "transparent";

  for (let i = 0; i < 18; i++) {
    const px = W * 0.54 + rng() * W * 0.42;
    const py = H * 0.12 + rng() * H * 0.76;
    ctx.fillStyle = `${accent}${Math.floor(rng() * 35 + 8).toString(16).padStart(2,"0")}`;
    ctx.beginPath(); ctx.arc(px, py, 1 + rng() * 2, 0, Math.PI * 2); ctx.fill();
  }
}

function drawHealthGraphic(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string, v: CardVariant) {
  const rng = seededRng(titleSeed(accent + "health"));
  const ox = W * (0.52 + v.graphicOffsetX);
  const chartBottom = H * (0.76 + v.graphicOffsetY * 0.3);
  const chartTop = H * (0.2 + v.graphicOffsetY * 0.3);
  const chartRight = W * 0.94;

  for (let i = 1; i <= 4; i++) {
    const y = chartBottom - (i / 4) * (chartBottom - chartTop);
    ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 1; ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.moveTo(ox, y); ctx.lineTo(chartRight, y); ctx.stroke();
  }
  ctx.setLineDash([]);

  // Curve shape varies per card
  const ptCount = 5 + Math.floor(rng() * 3);
  const pts = Array.from({ length: ptCount }, (_, i) => {
    const t = i / (ptCount - 1);
    const baseY = 0.1 + t * 0.8;
    const jitter = (rng() - 0.5) * 0.06;
    return {
      x: ox + t * (chartRight - ox),
      y: chartBottom - (chartBottom - chartTop) * Math.min(0.95, baseY + jitter),
    };
  });

  const fillGrad = ctx.createLinearGradient(0, chartTop, 0, chartBottom);
  fillGrad.addColorStop(0, `${accent}44`); fillGrad.addColorStop(1, `${accent}06`);
  ctx.fillStyle = fillGrad;
  ctx.beginPath(); ctx.moveTo(pts[0].x, chartBottom);
  pts.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(chartRight, chartBottom); ctx.closePath(); ctx.fill();

  ctx.shadowColor = accent; ctx.shadowBlur = 10;
  ctx.strokeStyle = accent; ctx.lineWidth = 2.5;
  ctx.beginPath(); pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))); ctx.stroke();
  ctx.shadowBlur = 0; ctx.shadowColor = "transparent";

  const last = pts[pts.length - 1];
  ctx.shadowColor = accent; ctx.shadowBlur = 16;
  ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(last.x, last.y, 6, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0; ctx.shadowColor = "transparent";

  // Stat badge — value varies
  const pct = 30 + Math.floor(rng() * 40);
  const bx = W * (0.7 + rng() * 0.08);
  const by = H * (0.16 + rng() * 0.06);
  ctx.fillStyle = `${accent}18`; ctx.strokeStyle = `${accent}55`; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(bx, by, 110, 38, 8); ctx.fill(); ctx.stroke();
  ctx.fillStyle = accent; ctx.font = `bold 14px "Inter", Arial, sans-serif`; ctx.textBaseline = "middle";
  ctx.fillText(`+${pct}% Census`, bx + 10, by + 19);
}

function drawRevenueGraphic(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string, v: CardVariant) {
  const rng = seededRng(titleSeed(accent + "revenue"));
  const ox = W * (0.52 + v.graphicOffsetX);
  const chartBottom = H * (0.78 + v.graphicOffsetY * 0.3);
  const chartTop = H * (0.2 + v.graphicOffsetY * 0.3);
  const chartRight = W * 0.94;

  // Series shapes vary
  const ptCount = 6 + Math.floor(rng() * 3);
  const s1 = Array.from({ length: ptCount }, (_, i) => 0.15 + (i / (ptCount - 1)) * 0.68 + (rng() - 0.5) * 0.06);
  const s2 = s1.map(v2 => v2 * (0.45 + rng() * 0.2));

  const pts = (series: number[]) => series.map((val, i) => ({
    x: ox + (i / (series.length - 1)) * (chartRight - ox),
    y: chartBottom - val * (chartBottom - chartTop),
  }));
  const p1 = pts(s1); const p2 = pts(s2);

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.beginPath(); ctx.moveTo(p2[0].x, chartBottom);
  p2.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(p2[p2.length - 1].x, chartBottom); ctx.closePath(); ctx.fill();

  const g1 = ctx.createLinearGradient(0, chartTop, 0, chartBottom);
  g1.addColorStop(0, `${accent}55`); g1.addColorStop(1, `${accent}08`);
  ctx.fillStyle = g1;
  ctx.beginPath(); ctx.moveTo(p1[0].x, chartBottom);
  p1.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(p1[p1.length - 1].x, chartBottom); ctx.closePath(); ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); p2.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))); ctx.stroke();

  ctx.shadowColor = accent; ctx.shadowBlur = 10;
  ctx.strokeStyle = accent; ctx.lineWidth = 2.5;
  ctx.beginPath(); p1.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))); ctx.stroke();
  ctx.shadowBlur = 0; ctx.shadowColor = "transparent";

  // Dollar badge — position varies
  const bx = W * (0.55 + rng() * 0.1);
  const by = H * (0.16 + rng() * 0.08);
  ctx.shadowColor = `${accent}44`; ctx.shadowBlur = 20;
  ctx.fillStyle = `${accent}22`; ctx.strokeStyle = `${accent}66`; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(bx + 26, by + 26, 26, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.shadowBlur = 0; ctx.shadowColor = "transparent";
  ctx.fillStyle = accent; ctx.font = `bold 26px "Inter", Arial, sans-serif`;
  ctx.textBaseline = "middle"; ctx.textAlign = "center"; ctx.fillText("$", bx + 26, by + 26); ctx.textAlign = "left";
}

function drawComplianceGraphic(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string, v: CardVariant) {
  const rng = seededRng(titleSeed(accent + "compliance"));
  const scx = W * (0.7 + v.graphicOffsetX + rng() * 0.06);
  const scy = H * (0.42 + v.graphicOffsetY + rng() * 0.06);
  const sw = W * (0.13 + rng() * 0.04) * v.graphicScale;
  const sh = H * (0.32 + rng() * 0.04) * v.graphicScale;

  ctx.shadowColor = `${accent}55`; ctx.shadowBlur = 30;
  ctx.fillStyle = `${accent}18`; ctx.strokeStyle = `${accent}77`; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(scx, scy - sh / 2);
  ctx.lineTo(scx + sw / 2, scy - sh / 4);
  ctx.lineTo(scx + sw / 2, scy + sh / 6);
  ctx.quadraticCurveTo(scx + sw / 2, scy + sh / 2, scx, scy + sh / 2);
  ctx.quadraticCurveTo(scx - sw / 2, scy + sh / 2, scx - sw / 2, scy + sh / 6);
  ctx.lineTo(scx - sw / 2, scy - sh / 4);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.shadowBlur = 0; ctx.shadowColor = "transparent";

  ctx.strokeStyle = accent; ctx.lineWidth = 3.5; ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.beginPath(); ctx.moveTo(scx - 16, scy + 2); ctx.lineTo(scx - 4, scy + 16); ctx.lineTo(scx + 18, scy - 14); ctx.stroke();
  ctx.lineCap = "butt";

  const lx = W * (0.54 + rng() * 0.04);
  const ly = H * (0.68 + rng() * 0.04);
  ["HIPAA Compliant", "Verified", "Secure"].forEach((item, i) => {
    const y = ly + i * 28;
    ctx.fillStyle = `${accent}33`; ctx.strokeStyle = `${accent}66`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(lx + 9, y, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = accent; ctx.font = `bold 9px Arial`; ctx.textBaseline = "middle"; ctx.textAlign = "center";
    ctx.fillText("✓", lx + 9, y); ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = `12px "Inter", Arial, sans-serif`;
    ctx.fillText(item, lx + 24, y);
  });
}

function drawDefaultGraphic(ctx: CanvasRenderingContext2D, W: number, H: number, accent: string, v: CardVariant) {
  const rng = seededRng(titleSeed(accent + "default"));
  const cx = W * (0.71 + v.graphicOffsetX);
  const cy = H * (0.5 + v.graphicOffsetY);
  const maxR = 110 + rng() * 40;

  [maxR, maxR * 0.76, maxR * 0.54, maxR * 0.35, maxR * 0.2].forEach((r, i) => {
    ctx.strokeStyle = `rgba(255,255,255,${0.03 + i * 0.015})`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  });

  const spokeCount = 6 + Math.floor(rng() * 6);
  for (let a = 0; a < Math.PI * 2; a += Math.PI * 2 / spokeCount) {
    ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * maxR * 0.18, cy + Math.sin(a) * maxR * 0.18);
    ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
    ctx.stroke();
  }

  for (let i = 0; i < 12; i++) {
    const px = W * 0.54 + rng() * W * 0.4;
    const py = H * 0.15 + rng() * H * 0.7;
    ctx.fillStyle = `${accent}${Math.floor(rng() * 55 + 15).toString(16).padStart(2,"0")}`;
    ctx.beginPath(); ctx.arc(px, py, 2 + rng() * 5, 0, Math.PI * 2); ctx.fill();
  }

  ctx.shadowColor = accent; ctx.shadowBlur = 35;
  const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
  cg.addColorStop(0, accent); cg.addColorStop(1, `${accent}00`);
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0; ctx.shadowColor = "transparent";
}

// ─── Text ─────────────────────────────────────────────────────────────────────
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) { lines.push(current); current = word; }
    else current = test;
  }
  if (current) lines.push(current);
  return lines;
}

function drawText(ctx: CanvasRenderingContext2D, W: number, H: number, title: string, category: string | undefined, accent: string) {
  const pad = W * 0.055;
  const maxW = W * 0.42;

  ctx.font = `600 11px "Inter", "Helvetica Neue", Arial, sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.textBaseline = "top";
  ctx.fillText("SWEET MEDIA", pad, H * 0.072);

  if (category) {
    const cat = category.toUpperCase();
    ctx.font = `700 10px "Inter", "Helvetica Neue", Arial, sans-serif`;
    const catW = ctx.measureText(cat).width + 22;
    const catH = 22;
    const catX = pad; const catY = H * 0.14;
    ctx.fillStyle = `${accent}22`; ctx.strokeStyle = `${accent}77`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(catX, catY, catW, catH, 11); ctx.fill(); ctx.stroke();
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(catX + 9, catY + catH / 2, 3, 0, Math.PI * 2); ctx.fill();
    ctx.textBaseline = "middle"; ctx.fillText(cat, catX + 17, catY + catH / 2);
  }

  let fontSize = Math.round(H * 0.082);
  ctx.font = `700 ${fontSize}px "Inter", "Helvetica Neue", Arial, sans-serif`;
  let lines = wrapText(ctx, title, maxW);
  while (lines.length > 3 && fontSize > 26) {
    fontSize -= 3;
    ctx.font = `700 ${fontSize}px "Inter", "Helvetica Neue", Arial, sans-serif`;
    lines = wrapText(ctx, title, maxW);
  }

  const lh = fontSize * 1.22;
  const textTop = H * 0.86 - lines.length * lh;
  ctx.shadowColor = "rgba(0,0,0,0.7)"; ctx.shadowBlur = 20; ctx.shadowOffsetY = 3;
  ctx.fillStyle = "#ffffff"; ctx.textBaseline = "top";
  lines.forEach((line, i) => ctx.fillText(line, pad, textTop + i * lh));
  ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

  const stripY = H * 0.9;
  const sg = ctx.createLinearGradient(0, stripY, 0, H);
  sg.addColorStop(0, "rgba(0,0,0,0)"); sg.addColorStop(1, "rgba(0,0,0,0.4)");
  ctx.fillStyle = sg; ctx.fillRect(0, stripY, W, H - stripY);

  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = `500 ${Math.round(H * 0.022)}px "Inter", "Helvetica Neue", Arial, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.fillText("Read Article  →", pad, stripY + (H - stripY) / 2);
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.arc(pad - 10, stripY + (H - stripY) / 2, 3, 0, Math.PI * 2); ctx.fill();
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function generateFeaturedCard(title: string, category?: string): string {
  const W = 1200; const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");

  const topic = detectTopic(title, category);
  const seed = titleSeed(title);
  const v = buildVariant(seed);

  // Accent color — hue-shifted per card for uniqueness
  const accent = shiftHue(baseAccent(topic), v.accentHueShift);

  // 1. Background (orb positions, grid angle vary per card)
  drawBackground(ctx, W, H, topic, accent, v);

  // 2. Unique decorative layer (style varies per card)
  drawDecorLayer(ctx, W, H, accent, v);

  // 3. Left panel vignette
  drawLeftPanel(ctx, W, H);

  // 4. Topic graphic (offset + scale vary per card)
  withGraphicTransform(ctx, W, H, v, () => {
    switch (topic) {
      case "seo":        drawSeoGraphic(ctx, W, H, accent, v); break;
      case "paid":       drawPaidGraphic(ctx, W, H, accent, v); break;
      case "social":     drawSocialGraphic(ctx, W, H, accent, v); break;
      case "web":        drawWebGraphic(ctx, W, H, accent, v); break;
      case "ai":         drawAiGraphic(ctx, W, H, accent, v); break;
      case "health":     drawHealthGraphic(ctx, W, H, accent, v); break;
      case "revenue":    drawRevenueGraphic(ctx, W, H, accent, v); break;
      case "compliance": drawComplianceGraphic(ctx, W, H, accent, v); break;
      default:           drawDefaultGraphic(ctx, W, H, accent, v); break;
    }
  });

  // 5. Divider + accent bar
  drawDivider(ctx, W, H, accent);
  drawAccentBar(ctx, H, accent);

  // 6. Text
  drawText(ctx, W, H, title, category, accent);

  return canvas.toDataURL("image/jpeg", 0.95);
}

export async function compositeImageText(_imageUrl: string, title: string, category?: string): Promise<string> {
  return Promise.resolve(generateFeaturedCard(title, category));
}

export function generateBlogCard(title: string, category?: string): string {
  return generateFeaturedCard(title, category);
}
