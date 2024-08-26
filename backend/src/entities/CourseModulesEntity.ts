import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import CoursesEntity from './CoursesEntity'
import UserEntity from './UsersEntity'

@Entity('courses_modules')
export default class CourseModulesEntity {
  @PrimaryGeneratedColumn()
  id!: number
  @ManyToOne(() => CoursesEntity, course => course.courseModules)
  @JoinColumn({ name: 'course_id' })
  course: CoursesEntity
  @Column({ length: 255 })
  name: string
  @ManyToOne(() => UserEntity, user => user.usersCourses)
  @JoinColumn({ name: 'created_by' })
  user: UserEntity
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date

  constructor(name: string, course: CoursesEntity, user: UserEntity) {
    this.name = name
    this.course = course
    this.user = user
  }
}
