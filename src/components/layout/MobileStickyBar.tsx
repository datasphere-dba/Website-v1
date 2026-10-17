import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Height of the bar. The (site) layout pads <main> by the same amount on mobile
 *  so the bar never covers content. Keep the two in sync. */
export const MOBILE_STICKY_BAR_PADDING = "pb-14 md:pb-0";

// Placeholder: call + enquire actions, mobile only.
// TODO(chatbot): leave room for the chatbot bubble once the chatbot is decided.
export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 grid h-14 grid-cols-2 border-t-hairline border-ink/20 bg-paper text-sm font-medium md:hidden">
      <a href={siteConfig.phoneHref} className="flex items-center justify-center">
        Call us
      </a>
      <Link href="/contact" className="flex items-center justify-center bg-green text-paper">
        Enquire now
      </Link>
    </div>
  );
}
