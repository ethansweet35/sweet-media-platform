"use client";

import { PageEditorContextProvider } from "../../contexts/PageEditorContext";
import AdminSessionIndicator from "./AdminSessionIndicator";
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
 * - Authenticated admins see a top-right "Logged in" chip (all routes) and a
 *   floating "Edit page" pill on public routes (never under /admin/*).
 *   Clicking edit enters contenteditable text and image overlays on fields
 *   wrapped in <EditableText> / <EditableImage> server components.
 */
export default function PageEditorProvider({ children }: PageEditorProviderProps) {
  return (
    <PageEditorContextProvider>
      <PageEditorStyles />
      {children}
      <AdminSessionIndicator />
      <PageEditorToolbar />
    </PageEditorContextProvider>
  );
}
