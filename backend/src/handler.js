const hero = require("./routes/hero");
const download = require("./routes/download");
const projects = require("./routes/projects");
const expertise = require("./routes/expertise");
const achievements = require("./routes/achievements")

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
  //EXPERTISE LIST 
  if (path === "/expertise") {
    return expertise.handler(event);
  }
  //ACHIEVEMENT LIST
  if (path === "/achievements") {
    return achievements.handler(event);
  }
  return {
    statusCode: 404,
    body: "Not found",
  };
};