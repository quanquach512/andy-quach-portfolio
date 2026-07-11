const hero = require("./routes/hero");
const download = require("./routes/download");
const projects = require("./routes/projects");

exports.handler = async (event) => {
  const path = (event.rawPath || "").replace(/^\/prod/, "");
  // DOWNLOAD
  if (path === "/download/resume") {
    return download.handler(event);
  }
  // HERO
  if (path === "/hero") {
    return hero.handler(event);
  }
  
  //PROJECTS LIST
  if (path === "/projects") {
    return projects.getProjects();
  }

  //PROJECT DETAIL 
  if (path.startsWith("/projects/")) {
    const id = path.split("/")[2];
    return projects.getProjectById(id);
  }

  return {
    statusCode: 404,
    body: "Not found",
  };
};