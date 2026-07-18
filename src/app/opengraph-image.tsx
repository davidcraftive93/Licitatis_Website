import { ImageResponse } from "next/og";

export const alt = "LICITATIS — El copiloto para preparar y controlar licitaciones";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen Open Graph generada dinámicamente (sin recursos externos). */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        backgroundColor: "#0B1220",
        backgroundImage:
          "radial-gradient(circle at 78% 8%, rgba(16,185,129,0.28), transparent 45%), radial-gradient(circle at 12% 96%, rgba(251,191,36,0.12), transparent 45%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            backgroundColor: "#101A2E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#34D399",
            fontSize: "38px",
            fontWeight: 700,
          }}
        >
          L
        </div>
        <div style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.5px" }}>LICITATIS</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            fontSize: "68px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            maxWidth: "980px",
          }}
        >
          <div style={{ display: "flex" }}>El copiloto para preparar y controlar tus</div>
          <div style={{ display: "flex", color: "#34D399" }}>licitaciones</div>
        </div>
        <div style={{ fontSize: "28px", color: "#B9C5D9", maxWidth: "900px" }}>
          Pliegos, requisitos, documentos, tareas y plazos en un proceso claro y bajo control.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          color: "#8A9CBB",
          fontSize: "22px",
        }}
      >
        <div
          style={{ width: "40px", height: "4px", borderRadius: "2px", backgroundColor: "#10B981" }}
        />
        Preparación · Coordinación · Control
      </div>
    </div>,
    { ...size },
  );
}
