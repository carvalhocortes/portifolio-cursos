import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import EnumProfiles from "../enums/EnumProfiles";

@Entity('profiles_users')
export default class ProfilesUsersEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ length: 255 })
  name!: EnumProfiles;
}
