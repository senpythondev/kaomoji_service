import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — 顔文字・絵文字をワンクリックでコピー`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default share image (Open Graph + Twitter). Reuses the generated brand mark so
 * it always matches the favicon, with the Latin wordmark + domain (kept Latin so
 * satori needs no extra Japanese font during the build).
 */
export default function OgImage() {
  const iconData = readFileSync(join(process.cwd(), "public/icon-512.png"));
  const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          background: "linear-gradient(135deg, #eaf3fd 0%, #ffffff 55%, #fdeae3 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
          <img src={iconSrc} width={220} height={220} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 800, color: "#1f2933", letterSpacing: -2 }}>
              Kaomoji Palette
            </div>
            <div style={{ fontSize: 34, fontWeight: 600, color: "#3d8bf0", marginTop: 8 }}>
              kaomoji-palette.com
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 40, color: "#8b94a3" }}>
          <span>(^_^)</span>
          <span>\(^o^)/</span>
          <span>(&gt;_&lt;)</span>
          <span>(^o^)</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
