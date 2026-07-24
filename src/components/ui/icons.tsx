import type { SVGProps } from "react";

/**
 * Set de iconos de línea propio de LICITATIS.
 * Estilo unificado: 24x24, trazo currentColor de 1.5, extremos y uniones redondeados.
 * Se declaran como paths sobre un <svg> común para garantizar coherencia visual.
 */

export type IconName =
  | "dashboard"
  | "document-search"
  | "checklist"
  | "tasks"
  | "calendar"
  | "clock"
  | "bell"
  | "folder"
  | "layers"
  | "activity"
  | "shield"
  | "lock"
  | "chart"
  | "sparkles"
  | "history"
  | "route"
  | "scale"
  | "users"
  | "check"
  | "arrow-right"
  | "arrow-up-right"
  | "menu"
  | "close"
  | "chevron-down"
  | "external-link"
  | "building"
  | "briefcase"
  | "alert-triangle"
  | "eye"
  | "mail"
  | "phone"
  | "key"
  | "backup"
  | "target"
  | "inbox"
  | "zap"
  | "star"
  | "quote"
  | "message"
  | "trending-up"
  | "handshake"
  | "book"
  | "gauge"
  | "euro"
  | "radar"
  | "id-card"
  | "sun"
  | "moon"
  | "monitor";

type PathContent = React.ReactNode;

const PATHS: Record<IconName, PathContent> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  "document-search": (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <circle cx="16.5" cy="15.5" r="3" />
      <path d="m21 20-2.1-2.1" />
    </>
  ),
  checklist: (
    <>
      <path d="M9 5h9" />
      <path d="M9 12h9" />
      <path d="M9 19h9" />
      <path d="m3 5 1.2 1.2L6.5 4" />
      <path d="m3 12 1.2 1.2L6.5 11" />
      <path d="m3 19 1.2 1.2L6.5 18" />
    </>
  ),
  tasks: (
    <>
      <rect x="3" y="4" width="7" height="16" rx="1.5" />
      <rect x="14" y="4" width="7" height="9" rx="1.5" />
      <path d="M6.5 8v4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 3v3M16 3v3" />
      <path d="M7.5 13.5h3v3h-3z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 1 0-12 0c0 6-2.5 7-2.5 7h17S18 14 18 8" />
      <path d="M10.5 20a2 2 0 0 0 3 0" />
    </>
  ),
  folder: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  activity: (
    <>
      <path d="M3 12h4l2.5-7 5 14L17 12h4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 8.4 7 9.5 4-1.1 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
      <path d="M12 15v2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z" />
      <path d="M18.5 15.5 19 17l1.5.5L19 18l-.5 1.5L18 18l-1.5-.5L18 17z" />
    </>
  ),
  history: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
      <path d="M5 3.5V8h4.5" />
      <path d="M12 8v4.2l3 1.8" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H14a3.5 3.5 0 0 0 0-7H10a3.5 3.5 0 0 1 0-7h5.5" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16" />
      <path d="M7 20h10" />
      <path d="m5 8 14-2" />
      <path d="M5 8 3 13a2.5 2.5 0 0 0 4 0z" />
      <path d="m19 6-2 5a2.5 2.5 0 0 0 4 0z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6" />
      <path d="M17.5 14.3A5.5 5.5 0 0 1 20.5 19" />
    </>
  ),
  check: (
    <>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12M18 6 6 18" />
    </>
  ),
  "chevron-down": (
    <>
      <path d="m6 9 6 6 6-6" />
    </>
  ),
  "external-link": (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M10 21v-3h4v3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
    </>
  ),
  "alert-triangle": (
    <>
      <path d="M12 4 2.5 20h19L12 4Z" />
      <path d="M12 10v4M12 17.5h.01" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <>
      <path d="M5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5V17a2 2 0 0 1-2.2 2A15 15 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="m11 11 8 8" />
      <path d="m16 16 2-2M18.5 18.5 20 17" />
    </>
  ),
  backup: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3" />
      <path d="m17 16 2.5 2.5L22 16" />
      <path d="M19.5 18.5V15" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  inbox: (
    <>
      <path d="M3 13.5 6 5h12l3 8.5" />
      <path d="M3 13.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.5" />
      <path d="M3 13.5h5l1.5 2.5h5l1.5-2.5h5" />
    </>
  ),
  zap: (
    <>
      <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />
    </>
  ),
  star: (
    <>
      <path d="m12 3 2.6 5.3 5.8.85-4.2 4.1 1 5.75L12 21.6l-5.2 2.4 1-5.75-4.2-4.1 5.8-.85L12 3Z" />
    </>
  ),
  quote: (
    <>
      <path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2" />
      <path d="M19 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2" />
    </>
  ),
  message: (
    <>
      <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      <path d="M8 10h8M8 13h5" />
    </>
  ),
  "trending-up": (
    <>
      <path d="M3 17 10 10l4 4 7-7" />
      <path d="M15 7h6v6" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.6-3.6a1 1 0 0 0 0-1.4L14 10" />
      <path d="m5 8 3.5-3.5a1 1 0 0 1 1.4 0L13 8" />
      <path d="M3.5 13.5 2 12l4-4 2.5 2.5a2 2 0 0 0 2.8 0L14 8l6 6-2 2" />
      <path d="m8 13 2 2M11 16l1.5 1.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
      <path d="M8 7h8M8 10.5h6" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15 15 9.5" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  euro: (
    <>
      <path d="M18.5 6.5A7 7 0 1 0 18.5 17.5" />
      <path d="M4 10.5h8M4 13.5h7" />
    </>
  ),
  radar: (
    <>
      <path d="M20 12a8 8 0 1 1-4-6.9" />
      <path d="M12 12 18 6" />
      <path d="M12 12a4 4 0 1 0 3.5 2" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  "id-card": (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M5 16.2a3.5 3.5 0 0 1 7 0" />
      <path d="M14 9.5h4M14 12.5h4M14 15.5h2.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.6 6.6 0 0 0 9.4 9.4Z" />,
  monitor: (
    <>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M9 20.5h6M12 16.5v4" />
    </>
  ),
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  /** Tamaño en px (ancho y alto). Por defecto 24. */
  size?: number;
}

export function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
