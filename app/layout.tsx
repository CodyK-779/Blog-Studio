import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Blog Studio",
  description: "Blog website powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${poppins.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <main>
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </main>
          </div>
        </ThemeProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
