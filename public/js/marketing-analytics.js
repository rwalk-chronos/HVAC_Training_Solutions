// Included only in a public-launch build. An exact host check also keeps
// workers.dev and pull-request previews out of the production GA4 stream.
(() => {
  const element = document.currentScript;
  const measurementId = element?.dataset.ga4Id;
  const host = element?.dataset.ga4Host;
  if (!measurementId || !host || window.location.hostname !== host) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(tag);

  if (window.location.pathname === "/try-boot-camp/") {
    // A visit to the sample page is not a confirmed video play.
    window.gtag("event", "teaching_sample_page_view");
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;

    if (link.dataset.analyticsEvent === "begin_checkout") {
      window.gtag("event", "begin_checkout", {
        currency: "USD",
        items: [{ item_id: "hvac_boot_camp", item_name: "HVAC Boot Camp", item_variant: link.dataset.paymentPlan || "unspecified", quantity: 1 }],
      });
      return;
    }

    if (link.href.startsWith("mailto:hvactrainingsolutions@gmail.com")) {
      window.gtag("event", "contact_intent", { contact_method: "email" });
    } else if (new URL(link.href).hostname === "calendly.com") {
      window.gtag("event", "contact_intent", { contact_method: "scheduler" });
    } else if (link.href.includes("youtube.com/watch?v=27uCRQ3B8r4")) {
      window.gtag("event", "teaching_sample_video_open");
    }
  });
})();
