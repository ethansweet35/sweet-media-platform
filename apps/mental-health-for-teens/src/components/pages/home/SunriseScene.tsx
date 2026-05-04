type SunriseSceneProps = {
  variant?: "dawn" | "dusk";
  className?: string;
};

export default function SunriseScene({ variant = "dawn", className }: SunriseSceneProps) {
  const id = `sunrise-${variant}`;
  const isDawn = variant === "dawn";

  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          {isDawn ? (
            <>
              <stop offset="0%" stopColor="#F8F5F0" />
              <stop offset="35%" stopColor="#F2E0D2" />
              <stop offset="65%" stopColor="#E8B89B" />
              <stop offset="100%" stopColor="#D98C72" stopOpacity="0.85" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#0F2C3B" />
              <stop offset="55%" stopColor="#173B4F" />
              <stop offset="85%" stopColor="#3D5C70" />
              <stop offset="100%" stopColor="#D98C72" stopOpacity="0.4" />
            </>
          )}
        </linearGradient>

        <radialGradient id={`${id}-sunglow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE9D6" stopOpacity={isDawn ? "0.9" : "0.5"} />
          <stop offset="40%" stopColor="#F4C9B5" stopOpacity={isDawn ? "0.55" : "0.3"} />
          <stop offset="100%" stopColor="#D98C72" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${id}-hill-far`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A6BCC8" stopOpacity={isDawn ? "0.6" : "0.4"} />
          <stop offset="100%" stopColor="#7E9AAD" stopOpacity={isDawn ? "0.7" : "0.5"} />
        </linearGradient>

        <linearGradient id={`${id}-hill-mid`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C7B8E" />
          <stop offset="100%" stopColor="#3F5A6C" />
        </linearGradient>

        <linearGradient id={`${id}-hill-near`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23445A" />
          <stop offset="100%" stopColor="#0F2C3B" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill={`url(#${id}-sky)`} />

      <ellipse cx="380" cy="240" rx="520" ry="50" fill="#FFFFFF" opacity={isDawn ? "0.28" : "0.06"} />
      <ellipse cx="1100" cy="200" rx="380" ry="36" fill="#FFFFFF" opacity={isDawn ? "0.22" : "0.05"} />
      <ellipse cx="900" cy="320" rx="280" ry="22" fill="#FFFFFF" opacity={isDawn ? "0.22" : "0.05"} />

      <circle cx="1080" cy="560" r="320" fill={`url(#${id}-sunglow)`} />
      <circle
        cx="1080"
        cy="560"
        r="86"
        fill={isDawn ? "#FFE9D6" : "#F4C9B5"}
        opacity={isDawn ? "1" : "0.85"}
      />

      <path
        d="M0 590 C 220 540, 380 570, 560 555 S 880 540, 1080 555 S 1380 580, 1600 555 L 1600 900 L 0 900 Z"
        fill={`url(#${id}-hill-far)`}
      />

      <path
        d="M0 690 C 260 620, 480 660, 720 640 S 1080 620, 1280 650 S 1480 680, 1600 660 L 1600 900 L 0 900 Z"
        fill={`url(#${id}-hill-mid)`}
        opacity="0.9"
      />

      <path
        d="M0 780 C 300 720, 540 760, 820 740 S 1180 720, 1400 750 S 1560 770, 1600 760 L 1600 900 L 0 900 Z"
        fill={`url(#${id}-hill-near)`}
      />

      <g opacity={isDawn ? "0.85" : "0.7"}>
        <path d="M180 760 L188 730 L196 760 Z" fill="#0F2C3B" />
        <path d="M210 765 L218 720 L226 765 Z" fill="#0F2C3B" />
        <path d="M260 768 L268 735 L276 768 Z" fill="#0F2C3B" />
        <path d="M1320 752 L1328 716 L1336 752 Z" fill="#0F2C3B" />
        <path d="M1360 758 L1368 728 L1376 758 Z" fill="#0F2C3B" />
        <path d="M1400 762 L1408 730 L1416 762 Z" fill="#0F2C3B" />
        <path d="M1432 754 L1440 720 L1448 754 Z" fill="#0F2C3B" />
      </g>

      <g opacity={isDawn ? "0.5" : "0.35"} fill="none" stroke="#FFE9D6" strokeWidth="1.4" strokeLinecap="round">
        <path d="M210 290 q 14 -8 28 0 q 14 8 28 0" />
        <path d="M860 220 q 12 -6 24 0 q 12 6 24 0" />
      </g>
    </svg>
  );
}
