import { z } from 'zod'

export const registerValidator = z
  .object({
    fullName: z.string().min(1, 'Seu nome completo é obrigatório'),
    email: z.string().email('Formato de e-mail inválido').min(1, 'E-mail é obrigatório'),
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        'A senha deve conter pelo menos um caractere especial, um numérico e um alfabético'
      ),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  })

export type RegisterFormData = z.infer<typeof registerValidator>
