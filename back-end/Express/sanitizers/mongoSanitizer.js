const mongoSanitizer = (req, res, next) => {
  const sanitize = (obj) => {
    if (obj instanceof Object) {
      for (const key in obj) {
        // 1. Check if the key starts with $ (The MongoDB operator sign)
        if (key.startsWith("$")) {
          console.warn(`[Security] Stripped NoSQL operator: ${key}`);
          delete obj[key];
        } else {
          // 2. If it's a nested object or array, recurse into it
          sanitize(obj[key]);
        }
      }
    }
  };

  // Run the sanitizer on all input sources
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};

module.exports = mongoSanitizer;
