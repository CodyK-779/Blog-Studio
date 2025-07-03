"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Overlay from "@/components/Overlay";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function RootLayout({ children }: React.PropsWithChildren) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div suppressHydrationWarning>
      <Navbar setOpenMenu={setOpenMenu} />
      {openMenu && <Overlay setOpenMenu={setOpenMenu} />}
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <main className="overflow-hidden min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
