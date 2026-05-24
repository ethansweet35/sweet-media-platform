"use client";

import { PageEditorContextProvider } from "../../contexts/PageEditorContext";
import PageEditorToolbar from "./PageEditorToolbar";
import PageEditorStyles from "./PageEditorStyles";

interface PageEditorProviderProps {
  children: React.ReactNode;
}

/**
 * Mount once in the root layout of a client app (inside <body>) to enable
 * the inline page editor on every route.
 *
 * - Anonymous visitors see no UI and zero edit affordances. Pages render
 *   their published or fallback values exactly as before.
 * - Authenticated admins see a floating "Edit page" pill in the bottom-
 *   right. Clicking it enters edit mode, exposing contenteditable text
 *   and hover overlays on images that were wrapped in <EditableText> /
 *   <EditableImage> server components.
 */
export default function PageEditorProvider({ children }: PageEditorProviderProps) {
  return (
    <PageEditorContextProvider>
      <PageEditorStyles />
      {children}
      <PageEditorToolbar />
    </PageEditorContextProvider>
  );
}
