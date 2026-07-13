const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3, BUCKET, streamToString } = require("../services/s3Service");

exports.handler = async (event) => {
  const res = await s3.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: "certifications.json",
    })
  );

  const body = await streamToString(res.Body);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body,
  };
};