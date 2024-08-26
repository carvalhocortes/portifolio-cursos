import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn } from "typeorm";
import UsersCoursesEntity from "./UsersCoursesEntity";
import CourseModulesEntity from "./CourseModulesEntity";
import EnumCourseStatus from "../enums/EnumCourseStatus";

@Entity('courses')
export default class CoursesEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ length: 255 })
  name: string;
  @Column("text")
  cover_url?: string;
  @Column("text")
  description?: string;
  @Column("int")
  duration?: number;
  @Column("text")
  status: EnumCourseStatus;
  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;
  @OneToMany(() => UsersCoursesEntity, (usersCourses) => usersCourses.course)
  usersCourses!: UsersCoursesEntity[];
  @OneToMany(() => CourseModulesEntity, (courses) => courses.course)
  courseModules!: CourseModulesEntity[]

  constructor(
    name: string,
    description?: string,
    duration?: number,
    cover_url?: string,
    status: EnumCourseStatus = EnumCourseStatus.locked
  ) {
    this.name = name;
    this.cover_url = cover_url;
    this.description = description;
    this.duration = duration;
    this.status = status;
  }
}
