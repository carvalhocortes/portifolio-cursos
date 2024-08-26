import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import CourseModulesEntity from "./CourseModulesEntity";
import UserEntity from "./UsersEntity";

@Entity('modules_videos')
export default class CourseModuleVideosEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @ManyToOne(() => CourseModulesEntity)
  @JoinColumn({ name: "module_id" })
  module: CourseModulesEntity;
  @Column({ length: 255 })
  name: string;
  @Column({ length: 255 })
  url: string;
  @Column("int")
  duration: number;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "created_by" })
  user: UserEntity;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;
  constructor(
    videoName: string,
    videoDuration: number, 
    videoUrl: string,
    module: CourseModulesEntity, 
    user: UserEntity
  ) {
    this.name = videoName;
    this.duration = videoDuration;
    this.url = videoUrl;
    this.module = module;
    this.user = user;
  }


}
