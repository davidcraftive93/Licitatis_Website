"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  acceptAll as buildAcceptAll,
  rejectAll as buildRejectAll,
  readConsent,
  writeConsent,
  CONSENT_VERSION,
  type ConsentState,
} from "@/lib/consent";

interface ConsentContextValue {
  consent: ConsentState | null;
  ready: boolean;
  bannerOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (choice: { analytics: boolean; marketing: boolean }) => void;
  reopen: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setBannerOpen(!stored);
    setReady(true);
  }, []);

  const persist = useCallback((state: ConsentState) => {
    writeConsent(state);
    setConsent(state);
    setBannerOpen(false);
  }, []);

  const acceptAll = useCallback(() => persist(buildAcceptAll()), [persist]);
  const rejectAll = useCallback(() => persist(buildRejectAll()), [persist]);
  const save = useCallback(
    (choice: { analytics: boolean; marketing: boolean }) =>
      persist({
        version: CONSENT_VERSION,
        necessary: true,
        analytics: choice.analytics,
        marketing: choice.marketing,
        updatedAt: new Date().toISOString(),
      }),
    [persist],
  );
  const reopen = useCallback(() => setBannerOpen(true), []);

  const value = useMemo<ConsentContextValue>(
    () => ({ consent, ready, bannerOpen, acceptAll, rejectAll, save, reopen }),
    [consent, ready, bannerOpen, acceptAll, rejectAll, save, reopen],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent debe usarse dentro de <ConsentProvider>.");
  return ctx;
}
