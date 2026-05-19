import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Northbound Treatment Services — Addiction Treatment Center in Orange County";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

const SUPABASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets";
const HERO_BG = `${SUPABASE}/images/nbt_gg_exterior01.jpg`;
const LOGO = `${SUPABASE}/logos/northbound-logo.png`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "1200px",
          height: "630px",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Real Garden Grove facility photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_BG}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Dark navy gradient overlay — heavier on the left */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(58,102,151,0.92) 0%, rgba(58,102,151,0.80) 45%, rgba(58,102,151,0.35) 100%)",
          }}
        />

        {/* Bottom vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(44,42,40,0.55) 0%, transparent 60%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 72px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Logo + name */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO}
              alt="Northbound logo"
              style={{ height: "72px", width: "auto" }}
            />
          </div>

          {/* Main text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "2px",
                  background: "#e97a52",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#e97a52",
                }}
              >
                Since 1988
              </span>
            </div>

            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                maxWidth: "680px",
              }}
            >
              Addiction Treatment Center in Orange County
            </div>

            {/* Trust strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
                marginTop: "8px",
              }}
            >
              {["38+ Years", "10,000+ Served", ">97% Outcomes", "DHCS #300661CP"].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.08em",
            }}
          >
            (866) 311-0003 · northboundtreatment.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
