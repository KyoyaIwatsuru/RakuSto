import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Header from "@/components/Header";
import { ChakraProvider } from '@chakra-ui/react';
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rakuten_10",
  description: "Rakuten_10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ChakraProvider>
            <main>
              <Suspense>
                <Header />
                {children}
              </Suspense>
            </main>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}
