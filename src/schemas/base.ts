/**
 * Schemas base e utilitários para validação com Zod
 */

import { z } from 'zod'
import {
  TipoUsuario,
  PlanoAssinatura,
  PreferenciaComunicacao,
  StatusProjeto,
  Prioridade,
  TipoArquivo,
  StatusAprovacao,
  TipoFeedback,
  TipoAprovacao,
  StatusTarefa,
  TipoNotificacao,
  CanalNotificacao,
  TipoRelatorio,
  TIPOS_USUARIO,
  PLANOS_ASSINATURA,
  STATUS_PROJETO,
  PRIORIDADES,
  TIPOS_ARQUIVO,
  STATUS_APROVACAO,
  TIPOS_FEEDBACK,
  TIPOS_APROVACAO,
  STATUS_TAREFA,
  TIPOS_NOTIFICACAO,
  CANAIS_NOTIFICACAO,
  TIPOS_RELATORIO,
} from '../types/enums'

// ============================================
// SCHEMAS DE ENUMS
// ============================================

export const TipoUsuarioSchema = z.enum(TIPOS_USUARIO as [TipoUsuario, ...TipoUsuario[]])
export const PlanoAssinaturaSchema = z.enum(PLANOS_ASSINATURA as [PlanoAssinatura, ...PlanoAssinatura[]])
export const PreferenciaComunicacaoSchema = z.enum(['EMAIL', 'SMS', 'PUSH'])
export const StatusProjetoSchema = z.enum(STATUS_PROJETO as [StatusProjeto, ...StatusProjeto[]])
export const PrioridadeSchema = z.enum(PRIORIDADES as [Prioridade, ...Prioridade[]])
export const TipoArquivoSchema = z.enum(TIPOS_ARQUIVO as [TipoArquivo, ...TipoArquivo[]])
export const StatusAprovacaoSchema = z.enum(STATUS_APROVACAO as [StatusAprovacao, ...StatusAprovacao[]])
export const TipoFeedbackSchema = z.enum(TIPOS_FEEDBACK as [TipoFeedback, ...TipoFeedback[]])
export const TipoAprovacaoSchema = z.enum(TIPOS_APROVACAO as [TipoAprovacao, ...TipoAprovacao[]])
export const StatusTarefaSchema = z.enum(STATUS_TAREFA as [StatusTarefa, ...StatusTarefa[]])
export const TipoNotificacaoSchema = z.enum(TIPOS_NOTIFICACAO as [TipoNotificacao, ...TipoNotificacao[]])
export const CanalNotificacaoSchema = z.enum(CANAIS_NOTIFICACAO as [CanalNotificacao, ...CanalNotificacao[]])
export const TipoRelatorioSchema = z.enum(TIPOS_RELATORIO as [TipoRelatorio, ...TipoRelatorio[]])

// ============================================
// SCHEMAS PRIMITIVOS CUSTOMIZADOS
// ============================================

// UUID v4
export const UuidSchema = z.string().uuid('ID deve ser um UUID válido')

// Email
export const EmailSchema = z
  .string()
  .email('Email deve ter um formato válido')
  .min(5, 'Email deve ter pelo menos 5 caracteres')
  .max(255, 'Email deve ter no máximo 255 caracteres')
  .toLowerCase()
  .trim()

// Senha
export const SenhaSchema = z
  .string()
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .max(128, 'Senha deve ter no máximo 128 caracteres')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial'
  )

// Telefone brasileiro
export const TelefoneSchema = z
  .string()
  .regex(
    /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
    'Telefone deve estar no formato brasileiro válido'
  )
  .optional()

// Nome
export const NomeSchema = z
  .string()
  .min(2, 'Nome deve ter pelo menos 2 caracteres')
  .max(100, 'Nome deve ter no máximo 100 caracteres')
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços')
  .trim()

// URL
export const UrlSchema = z
  .string()
  .url('URL deve ter um formato válido')
  .max(2048, 'URL deve ter no máximo 2048 caracteres')

// Data ISO
export const DataISOSchema = z
  .string()
  .datetime('Data deve estar no formato ISO 8601')
  .or(z.date())
  .transform((val) => (typeof val === 'string' ? new Date(val) : val))

// Cor hexadecimal
export const CorHexSchema = z
  .string()
  .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Cor deve estar no formato hexadecimal (#RRGGBB ou #RGB)')
  .optional()

// Tags
export const TagsSchema = z
  .array(
    z
      .string()
      .min(1, 'Tag não pode estar vazia')
      .max(50, 'Tag deve ter no máximo 50 caracteres')
      .regex(/^[a-zA-Z0-9\-_]+$/, 'Tag deve conter apenas letras, números, hífens e underscores')
  )
  .max(20, 'Máximo de 20 tags permitidas')
  .default([])

// Dinheiro (em centavos)
export const DinheiroSchema = z
  .number()
  .int('Valor deve ser um número inteiro')
  .min(0, 'Valor deve ser positivo')
  .max(999999999, 'Valor muito alto')

// Porcentagem (0-100)
export const PorcentagemSchema = z
  .number()
  .min(0, 'Porcentagem deve ser entre 0 e 100')
  .max(100, 'Porcentagem deve ser entre 0 e 100')

// Coordenadas (para feedback posicional)
export const CoordenadaSchema = z
  .number()
  .min(0, 'Coordenada deve ser positiva')
  .max(10000, 'Coordenada muito alta')

// ============================================
// SCHEMAS DE PAGINAÇÃO
// ============================================

export const PaginationParamsSchema = z.object({
  page: z
    .number()
    .int('Página deve ser um número inteiro')
    .min(1, 'Página deve ser maior que 0')
    .default(1),
  limit: z
    .number()
    .int('Limite deve ser um número inteiro')
    .min(1, 'Limite deve ser maior que 0')
    .max(100, 'Limite deve ser no máximo 100')
    .default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const PaginationResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  })

// ============================================
// SCHEMAS DE RESPOSTA DA API
// ============================================

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    errors: z.array(z.string()).optional(),
    timestamp: z.string(),
  })

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  field: z.string().optional(),
  details: z.record(z.unknown()).optional(),
})

// ============================================
// SCHEMAS DE ARQUIVO
// ============================================

export const DimensoesSchema = z.object({
  largura: z.number().int().min(1, 'Largura deve ser maior que 0'),
  altura: z.number().int().min(1, 'Altura deve ser maior que 0'),
  resolucao: z.number().min(1, 'Resolução deve ser maior que 0').optional(),
})

export const UploadMetadadosSchema = z.object({
  largura: z.number().int().min(1).optional(),
  altura: z.number().int().min(1).optional(),
  duracao: z.number().min(0).optional(),
  qualidade: z.number().min(0).max(1).optional(),
  formato: z.string().optional(),
  compressao: z.string().optional(),
})

// ============================================
// SCHEMAS DE CONFIGURAÇÃO
// ============================================

export const UsuarioConfiguracoesSchema = z.object({
  tema: z.enum(['light', 'dark', 'auto']).default('light'),
  idioma: z.string().min(2).max(5).default('pt-BR'),
  timezone: z.string().default('America/Sao_Paulo'),
  notificacoesPush: z.boolean().default(true),
  notificacoesEmail: z.boolean().default(true),
  notificacoesSms: z.boolean().default(false),
  autoAprovacao: z.boolean().default(false),
  formatoData: z.string().default('DD/MM/YYYY'),
  formatoHora: z.string().default('HH:mm'),
})

// ============================================
// SCHEMAS DE PERÍODO
// ============================================

export const RelatorioPeriodoSchema = z.object({
  dataInicio: DataISOSchema,
  dataFim: DataISOSchema,
}).refine(
  (data) => data.dataInicio <= data.dataFim,
  {
    message: 'Data de início deve ser anterior à data de fim',
    path: ['dataInicio'],
  }
)

// ============================================
// SCHEMAS DE BUSCA
// ============================================

export const SearchRequestSchema = z.object({
  query: z
    .string()
    .min(1, 'Termo de busca não pode estar vazio')
    .max(255, 'Termo de busca muito longo')
    .trim(),
  filtros: z.object({
    tipo: z.array(z.enum(['projeto', 'arte', 'usuario', 'tarefa'])).optional(),
    status: z.array(z.string()).optional(),
    tags: TagsSchema.optional(),
    dataInicio: DataISOSchema.optional(),
    dataFim: DataISOSchema.optional(),
  }).optional(),
  pagination: PaginationParamsSchema.optional(),
})

// ============================================
// UTILITÁRIOS DE VALIDAÇÃO
// ============================================

/**
 * Cria um schema opcional que aceita null, undefined ou string vazia
 */
export const optionalString = (schema: z.ZodString) =>
  schema.optional().or(z.literal('').transform(() => undefined))

/**
 * Cria um schema de array que aceita string separada por vírgula
 */
export const arrayFromString = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z
    .string()
    .transform((str) => str.split(',').map((s) => s.trim()).filter(Boolean))
    .pipe(z.array(itemSchema))
    .or(z.array(itemSchema))

/**
 * Schema para validar se um valor existe no banco
 */
export const existsInDatabase = (entityName: string) =>
  UuidSchema.refine(
    async (id) => {
      // Esta validação será implementada no backend
      // Aqui apenas validamos o formato UUID
      return true
    },
    {
      message: `${entityName} não encontrado`,
    }
  )

/**
 * Schema para validar unicidade no banco
 */
export const uniqueInDatabase = (field: string, entityName: string) =>
  z.string().refine(
    async (value) => {
      // Esta validação será implementada no backend
      return true
    },
    {
      message: `${field} já está em uso`,
    }
  )

// ============================================
// TIPOS INFERIDOS DOS SCHEMAS
// ============================================

export type PaginationParams = z.infer<typeof PaginationParamsSchema>
export type PaginationResponse<T> = {
  data: T[]
  pagination: z.infer<typeof PaginationParamsSchema>['pagination']
}
export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
  timestamp: string
}
export type ApiError = z.infer<typeof ApiErrorSchema>
export type UsuarioConfiguracoes = z.infer<typeof UsuarioConfiguracoesSchema>
export type RelatorioPeriodo = z.infer<typeof RelatorioPeriodoSchema>
export type SearchRequest = z.infer<typeof SearchRequestSchema>

