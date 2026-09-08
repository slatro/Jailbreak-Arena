import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jailbreak Arena — Autonomous Agent Red-Team Arena",
  description: "Break autonomous AI agents, prove the breach to GenLayer's decentralized AI jury, and claim onchain bounties.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Audiowide&family=Orbitron:wght@700;800;900&family=Chakra+Petch:wght@700;800&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var handler = function(e) {
                  var msg = (e && e.message) || '';
                  var filename = (e && e.filename) || '';
                  var stack = (e && e.error && e.error.stack) || '';
                  if (
                    msg.indexOf('ethereum') !== -1 ||
                    msg.indexOf('Cannot redefine property') !== -1 ||
                    filename.indexOf('chrome-extension') !== -1 ||
                    stack.indexOf('chrome-extension') !== -1
                  ) {
                    if (e.preventDefault) e.preventDefault();
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                    return true;
                  }
                };
                window.addEventListener('error', handler, true);
                window.addEventListener('unhandledrejection', function(e) {
                  var reason = (e && e.reason) || {};
                  var msg = reason.message || '';
                  var stack = reason.stack || '';
                  if (
                    msg.indexOf('ethereum') !== -1 ||
                    msg.indexOf('Cannot redefine property') !== -1 ||
                    stack.indexOf('chrome-extension') !== -1
                  ) {
                    if (e.preventDefault) e.preventDefault();
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                    return true;
                  }
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
