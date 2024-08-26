import { Repository } from 'typeorm'
import crypto, { pbkdf2Sync } from 'crypto'
import { sign } from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import UserEntity from '../entities/UsersEntity'
import errorMessages from '../common/errorMessages'
import EnumProfiles from '../enums/EnumProfiles'
import ProfilesUsersEntity from '../entities/ProfilesUsersEntity'
import UsersCoursesEntity from '../entities/UsersCoursesEntity'
import CoursesEntity from '../entities/CoursesEntity'
import { RequestNewUser } from '../types/userTypes'

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 587,
  auth: {
    user: 'dc1e7e6db983d9',
    pass: '210be8216a3757'
  }
})

export default class UserRepository {
  private salt = 'SJxV9oNKRtEks8un3W3jUZSkHwrxBOdZ'
  private jwtSecret =
    'UkBN0me9JRvODL8Olb9iszmWxuOYt74OJEeTfFtiajbTScOGL6iFcMjepagitemzj4DqbHtKV6JokQpdZg8u96EHRUklWoQV3HjSm2PlQdC8hekOlSUWZPTjcMn8DvHdFwkkG7FC63N9yRnHQwAPNuNXNWZfoXlZZNbwirr2t7LLUV5rw9uE8CBEghVQt1KWH9284t5RxmVBtDpSSOs3rITMj6Sh8L9m2tu0KwGszdH45Scl2rce4RIS9Qr8fYS3'

  constructor(
    private userEntity: Repository<UserEntity>,
    private profilesUsersEntity: Repository<ProfilesUsersEntity>,
    private coursesEntity: Repository<CoursesEntity>,
    private usersCoursesEntity: Repository<UsersCoursesEntity>
  ) {}

  async handleLogin(email: string, password: string): Promise<string> {
    if (!email || !password) throw errorMessages.invalidPayload()
    const hashedPassword = this.hashPassword(password)
    const user = await this.userEntity.findOne({
      where: { email, password: hashedPassword },
      relations: ['profile']
    })
    if (!user) {
      throw errorMessages.invalidPassword()
    }
    const token = sign({ email: user.email, userId: user.id }, this.jwtSecret, { expiresIn: '1h', audience: user.profile.name })
    return token
  }

  private hashPassword(password: string): string {
    return pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex')
  }

  async listAllUsers(): Promise<any[]> {
    const users = await this.userEntity.find()
    return this.assembleUsers(users)
  }

  private assembleUsers(users: UserEntity[]): any[] {
    return users.map(user => ({
      name: user.name,
      email: user.email
    }))
  }

  async newUser(request: RequestNewUser): Promise<UserEntity> {
    const { name, email, courses } = request
    if (!name || !email || !courses || !Array.isArray(courses) || !this.isValidEmail(email)) throw errorMessages.invalidPayload()
    await this.validateCourses(courses)
    const user = await this.userEntity.findOne({ where: { email } })
    if (user) throw errorMessages.alreadyExists('usuário')
    const password = this.generateRandomPassword()
    await this.sendPasswordByEmail(email, password)
    const profile = await this.profilesUsersEntity.findOne({ where: { name: EnumProfiles.writer } })
    const hashedPassword = this.hashPassword(password)
    const newUser = new UserEntity(name, email, hashedPassword, profile!)
    const savedNewUser = await this.userEntity.save(newUser)
    await this.addUserCourses(courses, savedNewUser)
    return savedNewUser
  }

  private async addUserCourses(courses: number[], user: UserEntity): Promise<void> {
    await Promise.all(
      courses.map(async courseId => {
        const course = await this.coursesEntity.findOne({ where: { id: courseId } })
        if (!course) throw errorMessages.notRegistered('curso')
        const newUserCourse = new UsersCoursesEntity(user, course)
        await this.usersCoursesEntity.save(newUserCourse)
      })
    )
  }

  private async validateCourses(courses: number[]): Promise<void> {
    await Promise.all(
      courses.map(async courseId => {
        const course = await this.coursesEntity.findOne({ where: { id: courseId } })
        if (!course) throw errorMessages.notRegistered('curso de id: ' + courseId)
      })
    )
  }

  private generateRandomPassword(length = 12): string {
    return crypto.randomBytes(length).toString('base64').slice(0, length).replace(/\+/g, 'A').replace(/\//g, 'B')
  }

  private async sendPasswordByEmail(email: string, password: string): Promise<void> {
    const msg = {
      to: email,
      from: 'contato@supercursos.com',
      subject: 'Senha de acesso ao Super Cursos',
      text: `A sua senha para o Super Cursos é: ${password}`
    }
    await transporter.sendMail(msg)
  }

  private isValidEmail(email: string) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(email)
  }
}
