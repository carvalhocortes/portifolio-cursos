import { LocaleObject } from 'yup'

const translation: LocaleObject = {
  mixed: {
    default: 'O campo ${path} é inválido',
    required: 'O campo ${path} é um campo obrigatório',
    oneOf: 'O campo ${path} deve ser um dos seguintes valores: ${values}',
    notOneOf: 'O campo ${path} não pode ser um dos seguintes valores: ${values}',
    notType: 'O campo ${path} precisa ser do tipo: ${type}',
    defined: 'O campo ${path} precisa ser definido',
  },
  string: {
    length: 'O campo ${path} deve ter exatamente ${length} caracteres',
    min: 'O campo ${path} deve ter pelo menos ${min} caracteres',
    max: 'O campo ${path} deve ter no máximo ${max} caracteres',
    matches: 'O campo ${path} deve combinar com a seguinte regex: "${regex}"',
    email: 'O campo ${path} tem o formato de e-mail inválido',
    url: 'O campo ${path} deve ter um formato de URL válida',
    uuid: 'O campo ${path} deve ser um UUID válido',
    trim: 'O campo ${path} não deve conter espaços no início ou no fim.',
    lowercase: 'O campo ${path} deve estar em maiúsculo',
    uppercase: 'O campo ${path} deve estar em minúsculo',
  },
  number: {
    min: 'O campo ${path} deve ser no mínimo ${min}',
    max: 'O campo ${path} deve ser no máximo ${max}',
    lessThan: 'O campo ${path} deve ser menor que ${less}',
    moreThan: 'O campo ${path} deve ser maior que ${more}',
    positive: 'O campo ${path} deve ser um número positivo',
    negative: 'O campo ${path} deve ser um número negativo',
    integer: 'O campo ${path} deve ser um número inteiro',
  },
  date: {
    min: 'O campo ${path} deve ser maior que a data ${min}',
    max: 'O campo ${path} deve ser menor que a data ${max}',
  },
  boolean: {
    isValue: 'O campo ${path} precisa ser ${value}',
  },
  object: {
    noUnknown: 'O campo ${path} possui atributos não especificados: ${unknown}',
  },
  array: {
    length: 'O campo ${path} deve conter ${length} items',
    min: 'O campo ${path} deve ter no mínimo ${min} itens',
    max: 'O campo ${path} deve ter no máximo ${max} itens',
  },
}

export default translation
