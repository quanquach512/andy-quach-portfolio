import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({});
const BUCKET = process.env.BUCKET_NAME;

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (c) => chunks.push(c));
    stream.on("error", reject);
    stream.on("end", () =>
      resolve(Buffer.concat(chunks).toString("utf-8"))
    );
  });


//test commit
export const handler = async (event) => {
  console.log(JSON.stringify(event));

  const path = (event.rawPath || "").replace(/^\/prod/, "");

  const map = {
    "/hero": "hero.json",
    "/projects": "projects.json",
    "/expertise": "expertise.json",
    "/milestones": "milestones.json",
    "/certifications": "certifications.json",
  };

  const key = map[path];

  if (!key) {
    return {
      statusCode: 404,
      body: "Not found"
    };
  }

  const res = await s3.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );

  const body = await streamToString(res.Body);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body
  };
};