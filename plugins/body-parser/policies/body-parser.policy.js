const { PassThrough } = require("stream");
const jsonParser = require("express").json();
const urlEncodedParser = require("express").urlencoded({ extended: true });

module.exports = {
  name: "body-parser",
  schema: {
    $id: "N/A",
    type: "object",
    properties: {},
  },
  policy: () => {
    return async (req, res, next) => {
      jsonParser(req, res, (err) => {
        if (err) return next(err);
        if (req.body !== {}) contentType = "application/json";
        urlEncodedParser(req, res, (err) => {
          if (req.body === {}) contentType = "application/json";
          if (err) return next(err);

          const bodyData = JSON.stringify(req.body);
          req.headers["content-length"] = Buffer.byteLength(bodyData);
          req.headers["content-type"] = contentType;

          req.egContext.requestStream = new PassThrough();
          req.egContext.requestStream.write(bodyData);

          next();
        });
      });
    };
  },
};
