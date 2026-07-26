'use client';

import Script from 'next/script';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

function hasValidGoogleAdsId(value: string | undefined): value is string {
  return Boolean(value && /^AW-\d+$/.test(value));
}

export default function GoogleAdsTag() {
  if (!hasValidGoogleAdsId(googleAdsId)) return null;

  return (
    <>
      <Script id="google-ads-library" src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`} strategy="afterInteractive" />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${googleAdsId}');`}
      </Script>
    </>
  );
}

export function trackContactFormConversion() {
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION_LABEL;
  if (!hasValidGoogleAdsId(googleAdsId) || !label || !window.gtag) return;
  window.gtag('event', 'conversion', { send_to: `${googleAdsId}/${label}` });
}
