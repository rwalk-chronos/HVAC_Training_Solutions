/**
 * Static build-time PayPal hosted checkout destinations for the existing
 * 27-module Moodle Boot Camp. Ron supplied these button IDs for the two plans.
 *
 * The links can be reviewed in development. Before a public-domain launch,
 * verify the button prices, recurring terms, and payment-to-Moodle enrollment
 * handoff end to end. The public build still requires both explicit checkout
 * URL settings; it does not infer launch approval from these defaults.
 */
const defaultCheckout = {
  full: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WAXSA22Y45YUU",
  monthly: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7CXTSXX9FSYGS",
} as const;

const marketingHostnames = new Set([
  "hvactrainingsolutions.net",
  "www.hvactrainingsolutions.net",
]);

function validateCheckoutUrl(value: string, plan: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid ${plan} checkout URL`);
  }

  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error(`${plan} checkout must use an HTTPS URL without embedded credentials`);
  }

  return url.toString();
}

export function getCheckoutLinks() {
  const fullOverride = process.env.BOOT_CAMP_FULL_CHECKOUT_URL?.trim();
  const monthlyOverride = process.env.BOOT_CAMP_MONTHLY_CHECKOUT_URL?.trim();
  const launchSetting = process.env.MARKETING_PUBLIC_LAUNCH?.trim().toLowerCase();
  if (launchSetting && !["1", "true", "0", "false"].includes(launchSetting)) {
    throw new Error("MARKETING_PUBLIC_LAUNCH must be 1/true or 0/false");
  }
  const publicLaunch = launchSetting === "1" || launchSetting === "true";

  if (Boolean(fullOverride) !== Boolean(monthlyOverride)) {
    throw new Error("Configure both Boot Camp checkout URLs together");
  }

  if (publicLaunch && (!fullOverride || !monthlyOverride)) {
    throw new Error("Public marketing launch requires both external Boot Camp checkout URLs");
  }

  const full = validateCheckoutUrl(fullOverride || defaultCheckout.full, "Pay-in-full");
  const monthly = validateCheckoutUrl(monthlyOverride || defaultCheckout.monthly, "Monthly");

  if (publicLaunch) {
    for (const [plan, href] of Object.entries({ full, monthly })) {
      if (marketingHostnames.has(new URL(href).hostname)) {
        throw new Error(`${plan} checkout loops to the marketing domain after public cutover`);
      }
    }
  }

  return { full, monthly };
}
