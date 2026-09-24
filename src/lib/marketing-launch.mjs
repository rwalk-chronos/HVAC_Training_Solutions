export function marketingLaunchConfig(env) {
  const launchSetting = env.MARKETING_PUBLIC_LAUNCH?.trim().toLowerCase() || "";
  if (launchSetting && !["1", "true", "0", "false"].includes(launchSetting)) {
    throw new Error("MARKETING_PUBLIC_LAUNCH must be 1/true or 0/false");
  }
  const isPublicLaunch = launchSetting === "1" || launchSetting === "true";
  const ga4MeasurementId = (env.PUBLIC_GA4_MEASUREMENT_ID || "").trim();

  if (isPublicLaunch && !/^G-[A-Z0-9]{6,}$/.test(ga4MeasurementId)) {
    throw new Error(
      "A public marketing build requires the verified PUBLIC_GA4_MEASUREMENT_ID (G-...).",
    );
  }

  return { isPublicLaunch, ga4MeasurementId };
}
