"use client";

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
      <main className="max-w-7xl mx-auto overflow-hidden">{children}</main>
    </div>
  );
}
