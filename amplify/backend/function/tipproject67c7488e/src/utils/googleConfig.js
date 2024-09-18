const { google } = require("googleapis");

const GOOGLE_CLIENT_ID =
  "298361459600-adoccuoah873sb6piqn4h1fr0o4oic69.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

exports.outh2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'postmessage'
);


