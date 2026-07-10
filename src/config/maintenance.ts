// Site-wide "Under Construction" gate. When enabled, every page is covered
// by a full-screen lock screen until the password is entered. This is a
// client-side-only gate (no backend) — good for keeping casual visitors off
// the site while you upload photos/edit content, NOT a real security
// mechanism. The password is visible to anyone who views the page source.
//
// To turn it on: set `enabled` to true. To turn it back off when you're
// done editing: set it back to false. No other files need to change.
export const maintenance = {
  enabled: false,
  password: "poop",
  heading: "Under Construction",
  message: "We're updating the menu and site right now. Check back soon!",
};
