/**
 * Exportações principais dos schemas de validação Zod
 */

// Schemas base e utilitários
export * from './base'

// Schemas de autenticação
export * from './auth'

// Schemas das entidades
export * from './entities'

// Helpers para validação
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data)
}

export const validateSchemaAsync = async <T>(
  schema: z.ZodSchema<T>, 
  data: unknown
): Promise<T> => {
  return await schema.parseAsync(data)
}

export const safeValidateSchema = <T>(
  schema: z.ZodSchema<T>, 
  data: unknown
): z.SafeParseReturnType<unknown, T> => {
  return schema.safeParse(data)
}

export const safeValidateSchemaAsync = async <T>(
  schema: z.ZodSchema<T>, 
  data: unknown
): Promise<z.SafeParseReturnType<unknown, T>> => {
  return await schema.safeParseAsync(data)
}

// Helper para extrair erros de validação
export const getValidationErrors = (error: z.ZodError): Record<string, string[]> => {
  const errors: Record<string, string[]> = {}
  
  error.errors.forEach((err) => {
    const path = err.path.join('.')
    if (!errors[path]) {
      errors[path] = []
    }
    errors[path].push(err.message)
  })
  
  return errors
}

// Helper para formatar erros para API
export const formatValidationErrorsForApi = (error: z.ZodError): string[] => {
  return error.errors.map((err) => {
    const path = err.path.length > 0 ? `${err.path.join('.')}: ` : ''
    return `${path}${err.message}`
  })
}

// Re-export do Zod para conveniência
export { z } from 'zod'

