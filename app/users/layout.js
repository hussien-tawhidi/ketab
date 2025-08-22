import Header from "@/components/header/Header";
export default function RootLayout({ children }) {
 
  return (
    <div>
      <Header />
      <div className=''>{children}</div>
    </div>
  );
}
