import type { Metadata } from "next";
import { Spinnaker } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";

// Import Google Font
const spinnaker = Spinnaker({
  weight: "400", 
  subsets: ["latin"], 
  display:'swap'
});


export const metadata: Metadata = {
  title: "Swift Garden",
  description: "Buy Fresh and Organic Vegetables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden m-0 p-0">
    <body
      className={`${spinnaker.className} container bg-gray-100 overflow-x-hidden overflow-y-hidden mx-auto antialiased`}
    >
      {children}
    </body>
  </html>
  
  );
}
