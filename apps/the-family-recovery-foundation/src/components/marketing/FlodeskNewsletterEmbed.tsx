'use client';

import { useEffect } from 'react';

/** Inline newsletter form from TFRF's Flodesk account (Squarespace embed). */
export const FLODESK_NEWSLETTER_FORM_ID = '67d9b3df245fe56a166ad19c';

declare global {
  interface Window {
    fd?: (...args: unknown[]) => void;
  }
}

interface FlodeskNewsletterEmbedProps {
  /** Distinguishes container IDs when the same form appears on multiple routes. */
  instanceKey?: string;
  className?: string;
}

export default function FlodeskNewsletterEmbed({
  instanceKey = 'default',
  className = 'w-full max-w-xl mx-auto',
}: FlodeskNewsletterEmbedProps) {
  const containerId =
    instanceKey === 'default'
      ? `fd-form-${FLODESK_NEWSLETTER_FORM_ID}`
      : `fd-form-${FLODESK_NEWSLETTER_FORM_ID}-${instanceKey}`;
  useEffect(() => {
    window.fd?.('form', {
      formId: FLODESK_NEWSLETTER_FORM_ID,
      containerEl: `#${containerId}`,
    });
  }, [containerId]);

  return <div id={containerId} className={className} />;
}
