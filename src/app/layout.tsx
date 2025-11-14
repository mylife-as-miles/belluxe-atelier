import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import "@/lib/disable-metamask";

export const metadata: Metadata = {
  title: "CORDÉLIA - Fashion Bags",
  description: "Discover premium Fashion Bags at CORDÉLIA. Find the perfect bag for every occasion.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <TopBanner />
        <Providers>
          <TopNavbar />
          {children}
        </Providers>
        <Footer />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
!function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();
`,
          }}
        />
      </body>
    </html>
  );
}