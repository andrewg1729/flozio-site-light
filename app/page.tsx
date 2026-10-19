import { redirect } from "next/navigation";

/**
 * Fallback route only. The canonical homepage is /clickup-reference.html,
 * served at / by the beforeFiles rewrite in next.config.mjs. Keep homepage
 * content out of this route.
 */
export default function Home() {
  redirect("/clickup-reference.html");
}
