import { ChatLauncher } from "@/components/layout/ChatLauncher";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MOBILE_STICKY_BAR_PADDING, MobileStickyBar } from "@/components/layout/MobileStickyBar";

// Shared shell for all public pages. "(site)" is a route group:
// it groups files without adding "/site" to the URL.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className={`flex flex-1 flex-col ${MOBILE_STICKY_BAR_PADDING}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileStickyBar />
      <ChatLauncher />
    </div>
  );
}
