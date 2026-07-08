const hero = require("./routes/hero");
const download = require("./routes/download");
// const projects = require("./routes/projects");

exports.handler = async (event) => {
  const path = (event.rawPath || "").replace(/^\/prod/, "");

  if (path.startsWith("/download")) {
    return download.handler(event);
  }

  if (path.startsWith("/hero")) {
    return hero.handler(event);
  }

  // if (path.startsWith("/projects")) {
  //   return projects.handler(event);
  // }

  return {
    statusCode: 404,
    body: "Not found",
  };
};