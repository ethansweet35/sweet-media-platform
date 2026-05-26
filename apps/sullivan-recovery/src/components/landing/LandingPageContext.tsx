"use client";

import { createContext, useContext } from "react";

const LandingPageContext = createContext(false);

export function LandingPageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LandingPageContext.Provider value={true}>{children}</LandingPageContext.Provider>
  );
}

export function useLandingPage(): boolean {
  return useContext(LandingPageContext);
}
