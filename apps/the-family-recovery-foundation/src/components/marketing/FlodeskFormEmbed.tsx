'use client';

import { useEffect } from 'react';

/** TFRF Flodesk inline form — used for newsletter signups and family programming registration. */
export const FLODESK_FORM_ID = '67d9b3df245fe56a166ad19c';

declare global {
  interface Window {
    fd?: (...args: unknown[]) => void;
  }
}

interface FlodeskFormEmbedProps {
  /** Unique container suffix when the same form appears on multiple routes. */
  instanceKey?: string;
  className?: string;
}

export default function FlodeskFormEmbed({
  instanceKey = 'default',
  className = 'w-full',
}: FlodeskFormEmbedProps) {
  const containerId =
    instanceKey === 'default'
      ? `fd-form-${FLODESK_FORM_ID}`
      : `fd-form-${FLODESK_FORM_ID}-${instanceKey}`;

  useEffect(() => {
    window.fd?.('form', {
      formId: FLODESK_FORM_ID,
      containerEl: `#${containerId}`,
    });
  }, [containerId]);

  return <div id={containerId} className={className} />;
}
