/**
 * Static build-time checkout destinations for the existing Moodle Boot Camp.
 *
 * Development previews use the current WordPress checkout pages. Before the
 * marketing domain moves to Cloudflare, set both BOOT_CAMP_*_CHECKOUT_URL
 * variables and build with MARKETING_PUBLIC_LAUNCH=1. The public build refuses
 * any destination on the marketing hostname, where WordPress no longer serves
 * these paths.
 *
 * A PayPal hosted-button URL is a possible independent destination, but the
 * payment-to-Moodle enrollment handoff and approved purchase terms must be
 * tested before using it for the public launch.
 */
const legacyCheckout = {
  full: "https://www.hvactrainingsolutions.net/hvac-boot-camp/pay-in-full/",
  monthly: "https://www.hvactrainingsolutions.net/hvac-boot-camp/monthly-plan/",
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

  const full = validateCheckoutUrl(fullOverride || legacyCheckout.full, "Pay-in-full");
  const monthly = validateCheckoutUrl(monthlyOverride || legacyCheckout.monthly, "Monthly");

  if (publicLaunch) {
    for (const [plan, href] of Object.entries({ full, monthly })) {
      if (marketingHostnames.has(new URL(href).hostname)) {
        throw new Error(`${plan} checkout loops to the marketing domain after public cutover`);
      }
    }
  }

  return { full, monthly };
}
