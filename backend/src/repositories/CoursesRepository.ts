import { Repository } from "typeorm";
import { Request } from "express";
import CourseModulesEntity from "../entities/CourseModulesEntity";
import CourseModuleVideosEntity from "../entities/CourseModuleVideosEntity";
import UsersCoursesEntity from "../entities/UsersCoursesEntity";
import { RequestNewCourse, RequestNewCourseModule } from "../types/courseTypes";
import errorMessages from "../common/errorMessages";
import { getEmailFromAuthorizationToken } from "../middlewares/authorize";
import UserEntity from '../entities/UsersEntity';
import CoursesEntity from "../entities/CoursesEntity";
import EnumCourseStatus from "../enums/EnumCourseStatus";

export default class CoursesRepository{

  constructor(
    private userEntity: Repository<UserEntity>,
    private coursesEntity: Repository<CoursesEntity>,
    private coursesModulesEntity: Repository<CourseModulesEntity>,
    private modulesVideosEntity: Repository<CourseModuleVideosEntity>,
    private usersCoursesEntity: Repository<UsersCoursesEntity>
  ) {}

  async listAllCourses(): Promise<CoursesEntity[]> {
    return this.coursesEntity.find();
  }

  async createNewCourse(request: RequestNewCourse): Promise<CoursesEntity> {
    const { name, description, duration, coverUrl } = request;
    if (!name || !this.isValidUrl(coverUrl)) throw errorMessages.invalidPayload()
    const course = await this.coursesEntity.findOne({ where: { name } });
    if (course) throw errorMessages.alreadyExists('curso');
    const newCourse = new CoursesEntity(name, description, duration, coverUrl);
    return this.coursesEntity.save(newCourse);
  }
  async updateCourseStatus({ body, params }: Request): Promise<string> {
    const course_id = params.course_id;
    const { status } = body;
    if (!course_id || !status || !Object.values(EnumCourseStatus).includes(status)) throw errorMessages.invalidPayload();
    const course = await this.coursesEntity.findOne({ where: { id: Number(course_id) }});
    if (!course) throw errorMessages.notRegistered('curso');
    await this.coursesEntity.update({ id: Number(course_id) }, { status });
    return status;
  }
  async listUserCourses(user_id: string): Promise<CoursesEntity[]> {
    const usersCourses = await this.usersCoursesEntity.find({ where: { user: { id: Number(user_id) }}, relations: ['course', 'user'] });
    return usersCourses.map(({ course }) => course);
  }
  async addCourseModule({ body, headers, params }: Request): Promise<CourseModulesEntity> {
    const { name, videoName, videoDuration, videoUrl } = body as RequestNewCourseModule;
    if (!name || !this.isValidUrl(videoUrl)) throw errorMessages.invalidPayload()
    const course_id = params.course_id;
    if (!course_id) throw errorMessages.invalidPayload();
    const course = await this.coursesEntity.findOne({ where: { id: Number(course_id) } });
    if (!course) throw errorMessages.notRegistered('curso');
    const email = getEmailFromAuthorizationToken(headers.authorization!);
    const user = (await this.userEntity.findOne({ where: { email } }))!;
    const newCourseModule = new CourseModulesEntity(name, course, user);
    const savedCourseModule = await this.coursesModulesEntity.save(newCourseModule);
    const newModuleVideo = new CourseModuleVideosEntity(videoName, videoDuration, videoUrl, savedCourseModule, user);
    await this.modulesVideosEntity.save(newModuleVideo);
    return savedCourseModule

  }
  async listCourseModules(course_id: string): Promise<CourseModulesEntity[]> {
    if (!course_id) throw errorMessages.invalidPayload();
    const courseModules = await this.coursesModulesEntity.find({ where: { course: { id: Number(course_id) }}});
    return courseModules;
  }

  private isValidUrl(url?: string): boolean {
    if (!url) return true;
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/;
    return urlPattern.test(url);
  };
    
}
