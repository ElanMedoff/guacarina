import "@/app/globals.css";
import Footer from "@/app/Footer";
import Header from "@/app/Header";
import Wrapper from "@/app/Wrapper";
import { Nunito } from "next/font/google";
import Script from "next/script";

export const metadata = {
  title: "guacarina",
  description: "Practice your ocarina scales with a side of guac",
  openGraph: {
    title: "guacarina",
    url: "https://guacarina.com",
    description: "Practice your ocarina scales with a side of guac",
    images: [
      {
        url: "https://guacarina.com/landscape.png",
        width: 1024,
        height: 787,
      },
      {
        url: "https://guacarina.com/landscape-wide.png",
        width: 1024,
        height: 512,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

const font = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-y-scroll">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-69GTWHH8FQ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-69GTWHH8FQ');
        `}
      </Script>
      <body data-theme="garden bg-base-100" className={font.className}>
        <Header />
        <Wrapper>{children}</Wrapper>
        <Footer />
      </body>
    </html>
  );
}
