import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
