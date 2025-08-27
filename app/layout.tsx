import "./globals.css";
import ClientToaster from "@/components/ClientToaster";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider defaultOpen>
          {children}
          <ClientToaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
