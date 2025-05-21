// layout.tsx
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google"; // Import Hind_Siliguri
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Initialize Hind Siliguri font
const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"], // Include 'bengali' subset if you plan to use Bengali characters
  weight: ['300', '400', '500', '600', '700'], // Specify weights you want to use
  variable: "--font-hind-siliguri", // Define as a CSS variable
  display: 'swap', // Optimizes font loading
});

// Update Metadata for Abrar Shop
export const metadata: Metadata = {
  title: "Abrar Shop - Your One-Stop Online Store",
  description: "Discover quality products at Abrar Shop. Shop electronics, fashion, home goods, and more with great deals and fast delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Apply Hind Siliguri font variable to the body.
        // `font-sans` will make Hind Siliguri the default sans-serif font throughout your app.
        className={`${hindSiliguri.variable} font-sans antialiased flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900`}
      >
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
      </body>
    </html>
  );
}