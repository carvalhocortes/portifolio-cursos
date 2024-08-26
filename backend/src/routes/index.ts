import express from "express";
import coursesRouter from "../routes/coursesRouter";
import usersRouter from "../routes/usersRouter";
import sessionsRouter from "../routes/sessionsRouter";

const router = (app: express.Router) => {
  app.use("/courses", coursesRouter);
  app.use("/users", usersRouter);
  app.use("/sessions", sessionsRouter);
};

export default router;
