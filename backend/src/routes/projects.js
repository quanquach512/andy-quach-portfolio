const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3, BUCKET, streamToString } = require("../services/s3Service");

const getProjects = async () => {
    const res = await s3.send(
        new GetObjectCommand({
            Bucket: BUCKET,
            Key: "projects.json",
        })
    );
    const body = await streamToString(res.Body);
    const projects = JSON.parse(body).projects;

    const list = projects
        .map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            category: p.category,
            status: p.status,
            techStack: p.techStack,
            isPinned: p.isPinned,
            order: p.order,
            github: p.github,         
        }))
        .sort((a, b) => b.order - a.order);
    return {
        statusCode: 200,
        headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(list),
    };
}

const getProjectById = async (id) => {
  const res = await s3.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: "projects.json",
    })
  );

  const body = await streamToString(res.Body);
  const projects = JSON.parse(body).projects;

  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return {
      statusCode: 404,
      body: "Project not found",
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(project),
  };
};

module.exports = {
  getProjects,
  getProjectById,
};