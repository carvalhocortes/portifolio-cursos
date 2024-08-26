const errorMessages = {
  unauthorizedAccess:() => ({
    httpCode: 401,
    msg: 'É preciso fazer o login para acessar este recurso.'
  }),
  forbiddenAccess:() => ({
    httpCode: 403,
    msg: 'Você não tem permissão para acessar este recurso.'
  }),
  invalidPassword:() => ({
    httpCode: 401,
    msg: 'Usuário ou senha inválidos'
  }),
  invalidPayload:() => ({
    httpCode: 400,
    msg: 'Por favor envie todos os campos obrigatórios'
  }),
  alreadyExists: (field: string) => ({
    httpCode: 400,
    msg: `Este ${field} já está cadastrado`
  }),
  notRegistered: (subject: string) => ({
    httpCode: 400,
    msg: `O ${subject} não existe`
  })
}

export default errorMessages