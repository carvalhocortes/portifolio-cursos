import express from "express";
import UsersController from "../controllers/UsersController";
import UsersRepository from "../repositories/UsersRepository";
import AppDataSource from "../config/dataSource";
import EnumProfiles from "../enums/EnumProfiles";
import { authorize } from "../middlewares/authorize";

const router = express.Router();
const usersRepository = new UsersRepository(
  AppDataSource.getRepository("UserEntity"),
  AppDataSource.getRepository("ProfilesUsersEntity"),
  AppDataSource.getRepository("CoursesEntity"),
  AppDataSource.getRepository("UsersCoursesEntity")
);
const usersController = new UsersController(usersRepository);

router.get("/", authorize(EnumProfiles.admin), (req, res) => usersController.listAllUsers(req, res));
router.post("/", authorize(EnumProfiles.admin), (req, res) => usersController.newUser(req, res));

export default router;
