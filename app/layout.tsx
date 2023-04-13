import "./globals.css";
import Footer from "./Footer";
import Header from "./Header";
import Wrapper from "./Wrapper";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body data-theme="garden bg-base-100">
        <Header />
        <Wrapper>{children}</Wrapper>
        <Footer />
      </body>
    </html>
  );
}
