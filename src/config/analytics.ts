// GA4 is NOT installed yet. This is just the wiring so turning it on later
// is a two-line change instead of a retrofit.
//
// To enable Google Analytics 4 later:
//   1. Set `enabled` to true below.
//   2. Set `ga4MeasurementId` to your GA4 measurement ID (looks like "G-XXXXXXXXXX").
//   3. Add the GA4 script tag/loader wherever you'd like it (e.g. BaseLayout.astro <head>),
//      gated behind `analytics.enabled` so it only loads when turned on.
//   4. Update the cookie notice text in CookieNotice.astro if needed.
export const analytics = {
  enabled: false,
  ga4MeasurementId: "",
};
