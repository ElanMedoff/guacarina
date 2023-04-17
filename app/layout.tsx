import "@/app/globals.css";
import Footer from "@/app/Footer";
import Header from "@/app/Header";
import Wrapper from "@/app/Wrapper";
import { Nunito } from "next/font/google";

export const metadata = {
  title: "",
  description: "",
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
