import "./globals.css";
import ClientToaster from "@/components/ClientToaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ClientToaster />
      </body>
    </html>
  );
}
