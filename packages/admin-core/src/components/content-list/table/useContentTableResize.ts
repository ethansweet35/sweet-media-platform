"use client";

import { useCallback, useRef, useState } from "react";
import {
  DEFAULT_CONTENT_COL_WIDTHS,
  getContentTableColumns,
  type ContentTableColumn,
} from "../../../lib/adminContentTable";

export function useContentTableResize(includeImage: boolean) {
  const columnKeys = getContentTableColumns(includeImage);
  const [colWidths, setColWidths] = useState(() => {
    const initial: Record<string, number> = {};
    for (const key of columnKeys) {
      initial[key] = DEFAULT_CONTENT_COL_WIDTHS[key];
    }
    return initial as Record<ContentTableColumn, number>;
  });

  const resizeRef = useRef<{
    col: ContentTableColumn;
    startX: number;
    startW: number;
  } | null>(null);

  const startResize = useCallback(
    (col: ContentTableColumn, e: React.MouseEvent) => {
      e.preventDefault();
      resizeRef.current = { col, startX: e.clientX, startW: colWidths[col] };
      const onMove = (me: MouseEvent) => {
        if (!resizeRef.current) return;
        const w = Math.max(60, resizeRef.current.startW + (me.clientX - resizeRef.current.startX));
        setColWidths((p) => ({ ...p, [resizeRef.current!.col]: w }));
      };
      const onUp = () => {
        resizeRef.current = null;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [colWidths],
  );

  const tableWidth = columnKeys.reduce((sum, key) => sum + colWidths[key], 0);

  return { columnKeys, colWidths, startResize, tableWidth };
}
