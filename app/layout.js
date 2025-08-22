import { iranYekan } from "@/lib/font";
import "./globals.css";
// app/layout.js

export const metadata = {
  title: "خرید و فروش کتاب | BookStore",
  description: "خرید و فروش آنلاین کتاب، رمان و کتاب صوتی با بهترین قیمت",
  keywords: ["کتاب", "خرید کتاب", "کتاب صوتی", "رمان", "فروش کتاب"],
  openGraph: {
    title: "خرید و فروش کتاب",
    description: "بزرگترین فروشگاه آنلاین کتاب و کتاب صوتی",
    url: "https://your-domain.com",
    siteName: "BookStore",
    images: [
      {
        url: "/og-image.jpg", // put an image in /public folder
        width: 1200,
        height: 630,
        alt: "خرید و فروش کتاب",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "خرید و فروش کتاب",
    description: "خرید آنلاین کتاب و کتاب صوتی",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' dir='rtl'>
      <body className={`${iranYekan.variable} antialiased`}>
        <div className='bg-ketab-bg'>
        
            <div className=''>{children}</div>
        
        </div>
      </body>
    </html>
  );
}
