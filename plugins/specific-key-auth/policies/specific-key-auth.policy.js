const jsonParser = require("express").json();
const urlEncodedParser = require("express").urlencoded({ extended: true });

module.exports = {
  name: "specific-key-auth",
  schema: {
    $id: "N/A",
    type: "object",
    properties: {},
  },
  policy: (actionParams) => {
    return async (req, res, next) => {
      jsonParser(req, res, (err) => {
        if (err) return next(err);
        urlEncodedParser(req, res, (err) => {
          if (err) return next(err);

          const headerKeyAuth = req.headers["api-gateway-key"];
          const specificKeyAuth = actionParams.apiKey;
          if (headerKeyAuth !== specificKeyAuth) {
            return res.status(401).send("Unauthorization");
          }
          next();
        });
      });
    };
  },
};
