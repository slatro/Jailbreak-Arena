export function BrandLogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
      aria-label="Jailbreak Arena JA Logo"
    >
      {/* Outer Hex/Chamfer Container */}
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="4"
        fill="#022c22"
        stroke="#10b981"
        strokeWidth="1.5"
      />

      {/* Cyber Reticle Corner Accents */}
      <path
        d="M2 7V3C2 2.44772 2.44772 2 3 2H7"
        stroke="#34d399"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <circle cx="27" cy="5" r="1.5" fill="#f43f5e" />

      {/* Interlocking Monogram: Letter J (Emerald Accent) */}
      <path
        d="M7.5 10H14.5V19.5C14.5 22 12.5 24 10 24H8.5C7.3 24 6.5 23.2 6.5 22V21"
        stroke="#34d399"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Interlocking Monogram: Letter A (Crisp White Apex) */}
      <path
        d="M17.5 24L21.5 8.5L25.5 24"
        stroke="#ffffff"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.8 18.5H24.2"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Center Laser Bridge Node */}
      <circle cx="14.5" cy="14" r="1" fill="#10b981" />
    </svg>
  );
}

export function BrandWordmark({ height = 26 }: { height?: number }) {
  return (
    <svg
      viewBox="0 0 188.9 32"
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
      aria-label="JAILBREAK ARENA"
    >
      <title>JAILBREAK ARENA</title>
      {/* JAILBREAK - Deep Obsidian */}
      <g stroke="#0f172a" strokeWidth="2.85" strokeLinecap="round" strokeLinejoin="round">
        {/* J (Exact DNA from logo mark) */}
        <path d="M1.5 9.0H8.5V19.0C8.5 21.8 6.5 24.0 3.8 24.0H2.5C1.4 24.0 0.6 23.2 0.6 22.0V21.0" transform="translate(2.00, 0)" />
        {/* A (Exact DNA from logo mark) */}
        <path d="M1.5 24.0L5.5 9.0L9.5 24.0" transform="translate(14.70, 0)" />
        <path d="M2.8 18.5H8.2" transform="translate(14.70, 0)" />
        {/* I */}
        <path d="M1.5 9.0V24.0" transform="translate(28.90, 0)" />
        {/* L */}
        <path d="M1.5 9.0V21.0C1.5 22.8 2.6 24.0 4.2 24.0H8.5" transform="translate(35.10, 0)" />
        {/* B */}
        <path d="M1.5 9.0V24.0" transform="translate(47.30, 0)" />
        <path d="M1.5 9.0H5.5C7.5 9.0 8.8 10.2 8.8 12.2C8.8 14.2 7.5 15.5 5.5 15.5H1.5" transform="translate(47.30, 0)" />
        <path d="M1.5 15.5H6.0C8.2 15.5 9.5 17.0 9.5 19.8C9.5 22.2 8.2 24.0 6.0 24.0H1.5" transform="translate(47.30, 0)" />
        {/* R */}
        <path d="M1.5 9.0V24.0" transform="translate(61.00, 0)" />
        <path d="M1.5 9.0H5.8C8.0 9.0 9.2 10.4 9.2 12.6C9.2 14.8 8.0 16.2 5.8 16.2H1.5" transform="translate(61.00, 0)" />
        <path d="M5.5 16.2L9.2 24.0" transform="translate(61.00, 0)" />
        {/* E */}
        <path d="M1.5 9.0V24.0" transform="translate(74.70, 0)" />
        <path d="M1.5 9.0H8.5" transform="translate(74.70, 0)" />
        <path d="M1.5 16.5H7.0" transform="translate(74.70, 0)" />
        <path d="M1.5 24.0H8.5" transform="translate(74.70, 0)" />
        {/* A */}
        <path d="M1.5 24.0L5.5 9.0L9.5 24.0" transform="translate(87.40, 0)" />
        <path d="M2.8 18.5H8.2" transform="translate(87.40, 0)" />
        {/* K */}
        <path d="M1.5 9.0V24.0" transform="translate(101.60, 0)" />
        <path d="M8.8 9.0L1.5 17.5" transform="translate(101.60, 0)" />
        <path d="M4.2 14.8L8.8 24.0" transform="translate(101.60, 0)" />
      </g>
      {/* ARENA - Neon Emerald */}
      <g stroke="#10b981" strokeWidth="2.85" strokeLinecap="round" strokeLinejoin="round">
        {/* A (Exact DNA from logo mark) */}
        <path d="M1.5 24.0L5.5 9.0L9.5 24.0" transform="translate(121.60, 0)" />
        <path d="M2.8 18.5H8.2" transform="translate(121.60, 0)" />
        {/* R */}
        <path d="M1.5 9.0V24.0" transform="translate(135.80, 0)" />
        <path d="M1.5 9.0H5.8C8.0 9.0 9.2 10.4 9.2 12.6C9.2 14.8 8.0 16.2 5.8 16.2H1.5" transform="translate(135.80, 0)" />
        <path d="M5.5 16.2L9.2 24.0" transform="translate(135.80, 0)" />
        {/* E */}
        <path d="M1.5 9.0V24.0" transform="translate(149.50, 0)" />
        <path d="M1.5 9.0H8.5" transform="translate(149.50, 0)" />
        <path d="M1.5 16.5H7.0" transform="translate(149.50, 0)" />
        <path d="M1.5 24.0H8.5" transform="translate(149.50, 0)" />
        {/* N */}
        <path d="M1.5 24.0V9.0L9.0 24.0V9.0" transform="translate(162.20, 0)" />
        {/* A */}
        <path d="M1.5 24.0L5.5 9.0L9.5 24.0" transform="translate(175.90, 0)" />
        <path d="M2.8 18.5H8.2" transform="translate(175.90, 0)" />
      </g>
    </svg>
  );
}

export function BrandLogo({ showText = true, markSize = 48 }: { showText?: boolean; markSize?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
      <BrandLogoMark size={markSize} />
      {showText && (
        <span style={{ display: "inline-flex", alignItems: "center", lineHeight: 1 }}>
          <BrandWordmark height={Math.round(markSize * 0.54)} />
          <span className="sr-only">JAILBREAK ARENA</span>
        </span>
      )}
    </span>
  );
}

export function XLogoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export function XShareButton({
  agentName,
  bounty,
  txHash,
  label = "Share on 𝕏",
  className = "btn-pixel-black",
  style,
}: {
  agentName: string;
  bounty: number | string;
  txHash: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const bountyStr = typeof bounty === "string" ? bounty : `${bounty} $GEN`;
  const tweetText = `I just tested adversarial security on ${agentName} (${bountyStr} bounty pool) on @GenLayer! ⚡\n\nProof: https://jailbreak-arena.vercel.app/proof/${txHash}\n\n#GenLayer #TheTank #Jailbreak`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      title="Share proof of breach on X (Twitter)"
    >
      <XLogoIcon size={13} />
      <span>{label}</span>
    </a>
  );
}
