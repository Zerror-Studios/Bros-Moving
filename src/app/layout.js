import "../styles/globals.css";
import "../styles/fonts.css";
import "../styles/website.css";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import SiteShell from "@/components/common/SiteShell";
import { Const } from "@/components/utils/Constants";


export const experimental = {
  viewTransition: true,
};

export const metadata = {
  metadataBase: new URL(Const.ClientLink),

  title: {
    default: Const.Brand,
    template: `%s | ${Const.Brand}`,
  },

  description: Const.Desc,

  keywords: Const.keywords,

  authors: [{ name: Const.Brand }],
  publisher: Const.Brand,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  alternates: {
    canonical: Const.ClientLink,
  },

  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: Const.Brand,
    title: Const.Brand,
    description: Const.Desc,
    url: Const.ClientLink,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: Const.Brand,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: Const.Brand,
    description: Const.Desc,
    images: ["/og.png"],
  },

  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <OrganizationSchema />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
