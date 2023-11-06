const UserRoute = require("./UserRoute");
const TeacherRoute = require("./TeacherRoute");
const AuthRoute = require("./AuthRoute");
const RootRoute = require("./RootRoute");
const CenterRoute = require("./CenterRoute");
const CourseRoute = require("./CourseRoute");

function routes(app) {
  app.use("/", RootRoute);
  app.use("/user", UserRoute);
  app.use("/teacher", TeacherRoute);
  app.use("/auth", AuthRoute);
  app.use("/center", CenterRoute);
  app.use("/course", CourseRoute);
}

module.exports = routes;
