import Header from "@/components/header/Header";
import Footer from "@/components/home/Footer";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      <div className=''>{children}</div>
      <Footer />
    </div>
  );
}
