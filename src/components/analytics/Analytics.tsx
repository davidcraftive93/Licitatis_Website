"use client";

import Script from "next/script";
import { useConsent } from "@/components/analytics/ConsentContext";

/**
 * Carga condicional de herramientas de terceros SOLO tras el consentimiento.
 * - HubSpot Tracking: requiere consentimiento de "marketing" y un Portal ID.
 * - Google Analytics 4: requiere NEXT_PUBLIC_ENABLE_ANALYTICS=true, consentimiento
 *   de "analítica" y un ID de medición. Nada de esto se carga por defecto.
 */
const HUBSPOT_PORTAL = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";

export function Analytics() {
  const { consent } = useConsent();
  if (!consent) return null;

  return (
    <>
      {consent.marketing && HUBSPOT_PORTAL ? (
        <Script
          id="hubspot-tracking"
          strategy="afterInteractive"
          src={`https://js.hs-scripts.com/${HUBSPOT_PORTAL}.js`}
        />
      ) : null}

      {ANALYTICS_ENABLED && consent.analytics && GA_ID ? (
        <>
          <Script
            id="ga4-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
    </>
  );
}
