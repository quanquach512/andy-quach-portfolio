const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3, BUCKET } = require("../services/s3Service");

exports.handler = async (event) => {
  const res = await s3.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: "files/Andy_Quach_Data_Engineer.pdf",
    })
  );

  const chunks = [];
  for await (const chunk of res.Body) {
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);

  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
      "Access-Control-Allow-Origin": "*",
    },
    body: buffer.toString("base64"),
  };
};