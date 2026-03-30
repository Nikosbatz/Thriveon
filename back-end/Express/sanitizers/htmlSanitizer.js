const sanitizeHtml = require("sanitize-html");

const htmlSanitizer = (req, res, next) => {
  const options = {
    allowedTags: [], // Strip all HTML tags entirely
    allowedAttributes: {}, // Strip all attributes
  };

  const sanitizeObject = (obj) => {
    if (obj && typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];

        if (typeof value === "string") {
          // Clean the string
          obj[key] = sanitizeHtml(value, options);
        } else if (typeof value === "object") {
          // Recurse into nested objects or arrays
          sanitizeObject(value);
        }
      });
    }
  };

  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);

  next();
};

module.exports = htmlSanitizer;
