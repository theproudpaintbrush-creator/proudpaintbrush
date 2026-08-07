import type { Metadata } from "next";
import EstimateConfigurator from "./EstimateConfigurator";

// Private client presentation — must never surface in search results or link
// previews (no OpenGraph/Twitter cards either, so pasting the link elsewhere
// doesn't leak the client's name/address into a rich preview).
export const metadata: Metadata = {
  title: "Your Estimate | The Proud Paintbrush",
  robots: { index: false, follow: false },
};

export default function MichaelEstimatePage() {
  return <EstimateConfigurator />;
}
