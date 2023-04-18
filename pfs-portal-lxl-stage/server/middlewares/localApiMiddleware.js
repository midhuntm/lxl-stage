const _ = require("lodash");
const axios = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const xmlToJson = require("xml-to-json-stream");
const parser = xmlToJson({ attributeMode: false });

let getPfsIntegrationLink = async (req, res, next) => {
  console.log(req.headers, ";;;;;;;;");
  let response = await axios({
    method: req.method,
    url: `https://api-dev.ken42.com:8243${req.originalUrl}`,
    headers: req.headers,
    data: req.body,
  });
  res.send(response.data);
};

let wso2Link = async (req, res) => {
  console.log(req.headers, "......");
  await axios({
    method: req.method,
    url: `https://api-dev.ken42.com:8243${req.originalUrl}`,
    headers: req.headers,
    data: req.body,
  })
    .then((result) => {
      console.log("=== : ", res.data);
      res.send(result.data);
    })
    .catch((error) => {
      console.log("error", error);
      res.status(401).send({ messsage: "someThing went wrong" });
    });
};

let tokenLink = async (req, res) => {
  await axios({
    method: req.method,
    url: `https://api-dev.ken42.com:8243${req.originalUrl}`,
    headers: req.headers,
  })
    .then((result) => {
      res.send(result.data);
    })
    .catch((error) => {
      console.log("error", error);
      res.status(401).send({ messsage: "someThing went wrong" });
    });
};
module.exports = {
  getPfsIntegrationLink,
  wso2Link,
  tokenLink,
};
