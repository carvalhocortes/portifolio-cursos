import express from "express";
import AppDataSource from "../config/dataSource";
import EnumProfiles from "../enums/EnumProfiles";
import { authorize } from "../middlewares/authorize";
import CoursesController from "../controllers/CoursesController";
import CoursesRepository from "../repositories/CoursesRepository";

const router = express.Router();
const coursesRepository = new CoursesRepository(
  AppDataSource.getRepository("UserEntity"),
  AppDataSource.getRepository("CoursesEntity"),
  AppDataSource.getRepository("CourseModulesEntity"),
  AppDataSource.getRepository("CourseModuleVideosEntity"),
  AppDataSource.getRepository("UsersCoursesEntity")
);

const coursesController = new CoursesController(coursesRepository);

router.get("/", authorize(EnumProfiles.admin), (req, res) => coursesController.listAllCourses(req, res));
router.post("/", authorize(EnumProfiles.admin), (req, res) => coursesController.createNewCourse(req, res));
router.patch("/:course_id/status", authorize(EnumProfiles.admin), (req, res) => coursesController.updateCourseStatus(req, res));
router.get("/:user_id", authorize(EnumProfiles.writer), (req, res) => coursesController.listUserCourses(req, res));
router.post("/:course_id/modules", authorize(EnumProfiles.writer), (req, res) => coursesController.addCourseModule(req, res));
router.get("/:course_id/modules", authorize(EnumProfiles.writer), (req, res) => coursesController.listCourseModules(req, res));

export default router;
