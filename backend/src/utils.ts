
import { pbkdf2Sync, randomBytes } from 'crypto'
import { JwtPayload, verify } from 'jsonwebtoken';
import * as nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

const salt = String(process.env.SALT)
const jwtSecret = String(process.env.JWT_SECRET)

const transporter = nodemailer.createTransport({
  host: String(process.env.NODE_MAILER_HOST),
  port: Number(process.env.NODE_MAILER_PORT),
  auth: {
    user: String(process.env.NODE_MAILER_USER),
    pass: String(process.env.NODE_MAILER_PASS)
  }
});

export const hashPassword = (password: string): string => pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

export const getEmailFromAuthorizationToken = (authorization: string): string => {
  const token = authorization.split(' ')[1];
  const { email } = verify(token, jwtSecret) as JwtPayload;
  return email;
};

export const generateRandomPassword = (length = 12): string => {
  return randomBytes(length).toString('base64').slice(0, length).replace(/\+/g, 'A').replace(/\//g, 'B');
};

export const sendPasswordByEmail = async (email: string, password: string): Promise<void> => {
  const msg = {
    to: email,
    from: 'contato@supercursos.com',
    subject: 'Senha de acesso ao Super Cursos',
    text: `A sua senha para o Super Cursos é: ${password}`
  };
  await transporter.sendMail(msg);
};

// PRIVATE
