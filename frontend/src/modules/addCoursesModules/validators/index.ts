import { z } from 'zod'

const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/;

export const moduleSchema = z.object({
  name: z.string().min(1, 'O nome do módulo é obrigatório'),
  videoName: z.string().min(1, 'O nome do vídeo é obrigatório'),
  videoDuration: z.string().regex(/^\d+$/, 'A duração do vídeo deve ser um número'),
  videoUrl: z.string().regex(urlPattern, 'URL do vídeo inválida')
})

export type ModuleFormData = z.infer<typeof moduleSchema>
