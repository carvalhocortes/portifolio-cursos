import express from "express";
import UsersController from "../controllers/UsersController";
import UsersRepository from "../repositories/UsersRepository";
import AppDataSource from "../config/dataSource";

const router = express.Router();
const usersRepository = new UsersRepository(
  AppDataSource.getRepository("UserEntity"),
  AppDataSource.getRepository("ProfilesUsersEntity"),
  AppDataSource.getRepository("CourseEntity"),
  AppDataSource.getRepository("UsersCoursesEntity")
);
const usersController = new UsersController(usersRepository);

router.post("/", (req, res) => usersController.handleLogin(req, res));

export default router;
