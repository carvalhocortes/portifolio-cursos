import { Error } from '../types/commonTypes'

const errorMessages = {
  validationError: (errorsMessages: string[]): Error => ({
    httpCode: 400,
    msg: errorsMessages
  }),
  invalidPermission: (): Error => ({
    httpCode: 401,
    msg: 'Permissão inválida'
  }),
  unauthorizedAccess:(): Error => ({
    httpCode: 401,
    msg: 'É preciso fazer o login para acessar este recurso.'
  }),
  forbiddenAccess:(): Error => ({
    httpCode: 403,
    msg: 'Você não tem permissão para acessar este recurso.'
  }),
  invalidPassword:(): Error => ({
    httpCode: 401,
    msg: 'Usuário ou senha inválidos'
  }),
  invalidPayload:(): Error => ({
    httpCode: 400,
    msg: 'Por favor envie todos os campos obrigatórios'
  }),
  alreadyExists: (field: string): Error => ({
    httpCode: 400,
    msg: `Este ${field} já está cadastrado`
  }),
  notRegistered: (subject: string): Error => ({
    httpCode: 400,
    msg: `O ${subject} não existe`
  })
}

export default errorMessages
