import "@/app/globals.css";
import Footer from "@/app/Footer";
import Header from "@/app/Header";
import Wrapper from "@/app/Wrapper";
import { Nunito } from "next/font/google";

export const metadata = {
  openGraph: {
    title: "Guacarina",
    url: "https://guacarina.com",
    images: [
      {
        url: "https://guacarina.com/landscape.png",
        width: 1024,
        height: 787,
      },
      {
        url: "https://nextjs.org/landscape-wide.png",
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
    <html lang="en">
      <body data-theme="garden bg-base-100" className={font.className}>
        <Header />
        <Wrapper>{children}</Wrapper>
        <Footer />
      </body>
    </html>
  );
}
