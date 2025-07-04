export const runtime = "nodejs";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
