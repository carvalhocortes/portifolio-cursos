import * as Yup from 'yup';

export default Yup.object({
  params: Yup.object({
    id: Yup.string().required(),
  }).required(),
  body: Yup.object({
    name: Yup.string().optional(),
    email: Yup.string().email().optional(),
    password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional(),
  }).required()
    .test('at-least-one-field', 'Pelo menos um campo (name, email ou password) deve ser preenchido', (value) => {
    return !!(value?.name || value?.email || value?.password);
  }),
});
