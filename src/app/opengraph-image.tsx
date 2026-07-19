import { ImageResponse } from "next/og";

// Genera la imagen OG como archivo estático en el build (output: "export").
export const dynamic = "force-static";

export const alt = "LICITATIS — Prepara licitaciones públicas con IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen Open Graph generada dinámicamente (sin recursos externos). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#090817",
          backgroundImage:
            "radial-gradient(circle at 82% 6%, rgba(106,37,245,0.42), transparent 45%), radial-gradient(circle at 8% 96%, rgba(241,44,120,0.20), transparent 45%)",
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
              backgroundColor: "#6A25F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "38px",
              fontWeight: 700,
            }}
          >
            L
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            LICITATIS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              fontSize: "62px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              maxWidth: "1000px",
            }}
          >
            <div style={{ display: "flex" }}>Prepara licitaciones públicas</div>
            <div style={{ display: "flex" }}>
              con <span style={{ color: "#C4B5FD", marginLeft: "16px" }}>IA</span>
            </div>
          </div>
          <div style={{ fontSize: "27px", color: "#B9C5D9", maxWidth: "920px" }}>
            Elegibilidad, documentación, memoria técnica, riesgos e informe para dirección.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#9CA3C0", fontSize: "22px" }}>
          <div style={{ width: "40px", height: "4px", borderRadius: "2px", backgroundColor: "#6A25F5" }} />
          El Pasaporte del Licitador · Beta gratuita
        </div>
      </div>
    ),
    { ...size },
  );
}
