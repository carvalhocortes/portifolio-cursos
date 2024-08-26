import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import ProfilesUsersEntity from './ProfilesUsersEntity'
import UsersCoursesEntity from './UsersCoursesEntity'

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number
  @Column({ length: 255 })
  name: string
  @Column({ length: 255, unique: true })
  email: string
  @Column({ length: 255 })
  password: string
  @ManyToOne(() => ProfilesUsersEntity)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfilesUsersEntity
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date
  @OneToMany(() => UsersCoursesEntity, usersCourses => usersCourses.user)
  usersCourses!: UsersCoursesEntity[]
  // @OneToMany(() => CourseModulesEntity, (userCourseModules) => userCourseModules.user)
  // userCourseModules!: CourseModulesEntity[];

  constructor(name: string, email: string, password: string, profile: ProfilesUsersEntity) {
    this.name = name
    this.email = email
    this.password = password
    this.profile = profile
  }
}
