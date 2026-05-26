"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { pathToLandingAnchor } from "@/lib/generalDetoxLanding";
import { useLandingPage } from "@/components/landing/LandingPageContext";

type LandingOptionalLinkProps = ComponentProps<typeof Link> & {
  href: string;
};

/**
 * On /general-detox/, internal links become same-page anchors; unknown paths render as static blocks.
 */
export default function LandingOptionalLink({
  href,
  children,
  className,
  ...rest
}: LandingOptionalLinkProps) {
  const landing = useLandingPage();

  if (!landing) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const anchor = pathToLandingAnchor(href);
  if (anchor) {
    return (
      <a href={anchor} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return <div className={className}>{children}</div>;
}
