import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import UserEntity from './UsersEntity'
import CoursesEntity from './CoursesEntity'

@Entity('users_courses')
export default class UsersCoursesEntity {
  @PrimaryGeneratedColumn()
  id!: number
  @ManyToOne(() => UserEntity, user => user.usersCourses)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
  @ManyToOne(() => CoursesEntity, course => course.usersCourses)
  @JoinColumn({ name: 'course_id' })
  course: CoursesEntity

  constructor(user: UserEntity, course: CoursesEntity) {
    this.user = user
    this.course = course
  }
}
