/**
 * Schemas de validação para as entidades principais
 */

import { z } from 'zod'
import {
  UuidSchema,
  EmailSchema,
  NomeSchema,
  TelefoneSchema,
  UrlSchema,
  DataISOSchema,
  CorHexSchema,
  TagsSchema,
  DinheiroSchema,
  PorcentagemSchema,
  CoordenadaSchema,
  DimensoesSchema,
  UsuarioConfiguracoesSchema,
  TipoUsuarioSchema,
  PlanoAssinaturaSchema,
  PreferenciaComunicacaoSchema,
  StatusProjetoSchema,
  PrioridadeSchema,
  TipoArquivoSchema,
  StatusAprovacaoSchema,
  TipoFeedbackSchema,
  TipoAprovacaoSchema,
  StatusTarefaSchema,
  TipoNotificacaoSchema,
  CanalNotificacaoSchema,
} from './base'

// ============================================
// SCHEMAS DE USUÁRIO
// ============================================

export const CreateUsuarioRequestSchema = z.object({
  nome: NomeSchema,
  email: EmailSchema,
  senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  tipo: TipoUsuarioSchema,
  telefone: TelefoneSchema,
  plano: PlanoAssinaturaSchema.default('GRATUITO'),
  preferenciaComunicacao: PreferenciaComunicacaoSchema.default('EMAIL'),
})

export const UpdateUsuarioRequestSchema = z.object({
  nome: NomeSchema.optional(),
  email: EmailSchema.optional(),
  telefone: TelefoneSchema,
  avatar: UrlSchema.optional(),
  preferenciaComunicacao: PreferenciaComunicacaoSchema.optional(),
  configuracoes: UsuarioConfiguracoesSchema.optional(),
})

export const UsuarioResponseSchema = z.object({
  id: UuidSchema,
  nome: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  telefone: z.string().optional(),
  tipo: TipoUsuarioSchema,
  plano: PlanoAssinaturaSchema,
  preferenciaComunicacao: PreferenciaComunicacaoSchema,
  ativo: z.boolean(),
  emailVerificado: z.boolean(),
  telefoneVerificado: z.boolean(),
  ultimoLogin: z.string().optional(),
  dataCriacao: z.string(),
  dataAtualizacao: z.string(),
})

export const UsuarioListResponseSchema = z.object({
  id: UuidSchema,
  nome: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  tipo: TipoUsuarioSchema,
  plano: PlanoAssinaturaSchema,
  ativo: z.boolean(),
  ultimoLogin: z.string().optional(),
})

// ============================================
// SCHEMAS DE PROJETO
// ============================================

export const CreateProjetoRequestSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(255, 'Nome deve ter no máximo 255 caracteres')
    .trim(),
  descricao: z
    .string()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional(),
  clienteId: UuidSchema,
  prioridade: PrioridadeSchema.default('MEDIA'),
  prazoEntrega: DataISOSchema.optional(),
  orcamento: DinheiroSchema.optional(),
  tags: TagsSchema,
  cor: CorHexSchema,
})

export const UpdateProjetoRequestSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(255, 'Nome deve ter no máximo 255 caracteres')
    .trim()
    .optional(),
  descricao: z
    .string()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional(),
  status: StatusProjetoSchema.optional(),
  prioridade: PrioridadeSchema.optional(),
  prazoEntrega: DataISOSchema.optional(),
  orcamento: DinheiroSchema.optional(),
  tags: TagsSchema.optional(),
  cor: CorHexSchema,
})

export const ProjetoResponseSchema = z.object({
  id: UuidSchema,
  nome: z.string(),
  descricao: z.string().optional(),
  status: StatusProjetoSchema,
  prioridade: PrioridadeSchema,
  prazoEntrega: z.string().optional(),
  orcamento: z.number().optional(),
  tags: z.array(z.string()),
  cor: z.string().optional(),
  designer: UsuarioListResponseSchema,
  cliente: UsuarioListResponseSchema,
  totalArtes: z.number(),
  artesAprovadas: z.number(),
  artesPendentes: z.number(),
  artesRejeitadas: z.number(),
  progresso: PorcentagemSchema,
  dataCriacao: z.string(),
  dataAtualizacao: z.string(),
})

export const ProjetoListResponseSchema = z.object({
  id: UuidSchema,
  nome: z.string(),
  status: StatusProjetoSchema,
  prioridade: PrioridadeSchema,
  prazoEntrega: z.string().optional(),
  cliente: z.object({
    id: UuidSchema,
    nome: z.string(),
    avatar: z.string().optional(),
  }),
  totalArtes: z.number(),
  progresso: PorcentagemSchema,
  dataAtualizacao: z.string(),
})

export const ProjetoStatsResponseSchema = z.object({
  total: z.number(),
  emAndamento: z.number(),
  pausados: z.number(),
  concluidos: z.number(),
  cancelados: z.number(),
  atrasados: z.number(),
  proximosVencimento: z.number(),
})

// ============================================
// SCHEMAS DE ARTE
// ============================================

export const CreateArteRequestSchema = z.object({
  titulo: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(255, 'Título deve ter no máximo 255 caracteres')
    .trim(),
  descricao: z
    .string()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional(),
  projetoId: UuidSchema,
  tags: TagsSchema,
})

export const UpdateArteRequestSchema = z.object({
  titulo: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(255, 'Título deve ter no máximo 255 caracteres')
    .trim()
    .optional(),
  descricao: z
    .string()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional(),
  tags: TagsSchema.optional(),
})

export const ArteUploadRequestSchema = z.object({
  titulo: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(255, 'Título deve ter no máximo 255 caracteres')
    .trim(),
  descricao: z
    .string()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional(),
  projetoId: UuidSchema,
  tags: TagsSchema,
  // arquivo será validado no middleware de upload
})

export const ArteResponseSchema = z.object({
  id: UuidSchema,
  titulo: z.string(),
  descricao: z.string().optional(),
  arquivo: UrlSchema,
  thumbnail: UrlSchema.optional(),
  tamanhoArquivo: z.number(),
  tipoArquivo: TipoArquivoSchema,
  mimeType: z.string(),
  dimensoes: DimensoesSchema.optional(),
  versao: z.number(),
  status: StatusAprovacaoSchema,
  tags: z.array(z.string()),
  projeto: z.object({
    id: UuidSchema,
    nome: z.string(),
  }),
  designer: UsuarioListResponseSchema,
  totalFeedbacks: z.number(),
  totalAprovacoes: z.number(),
  ultimaVisualizacao: z.string().optional(),
  dataCriacao: z.string(),
  dataAtualizacao: z.string(),
})

export const ArteListResponseSchema = z.object({
  id: UuidSchema,
  titulo: z.string(),
  arquivo: UrlSchema,
  thumbnail: UrlSchema.optional(),
  tipoArquivo: TipoArquivoSchema,
  versao: z.number(),
  status: StatusAprovacaoSchema,
  projeto: z.object({
    id: UuidSchema,
    nome: z.string(),
  }),
  totalFeedbacks: z.number(),
  dataAtualizacao: z.string(),
})

export const ArteUploadResponseSchema = z.object({
  id: UuidSchema,
  url: UrlSchema,
  thumbnail: UrlSchema.optional(),
  tamanhoArquivo: z.number(),
  dimensoes: DimensoesSchema.optional(),
})

// ============================================
// SCHEMAS DE FEEDBACK
// ============================================

export const CreateFeedbackRequestSchema = z.object({
  arteId: UuidSchema,
  conteudo: z
    .string()
    .min(1, 'Conteúdo é obrigatório')
    .max(2000, 'Feedback deve ter no máximo 2000 caracteres')
    .trim(),
  tipo: TipoFeedbackSchema,
  posicaoX: CoordenadaSchema.optional(),
  posicaoY: CoordenadaSchema.optional(),
})

export const CreateAudioFeedbackRequestSchema = z.object({
  arteId: UuidSchema,
  posicaoX: CoordenadaSchema.optional(),
  posicaoY: CoordenadaSchema.optional(),
  // audio será validado no middleware de upload
})

export const UpdateFeedbackRequestSchema = z.object({
  conteudo: z
    .string()
    .min(1, 'Conteúdo é obrigatório')
    .max(2000, 'Feedback deve ter no máximo 2000 caracteres')
    .trim()
    .optional(),
  resolvido: z.boolean().optional(),
})

export const FeedbackResponseSchema = z.object({
  id: UuidSchema,
  conteudo: z.string(),
  tipo: TipoFeedbackSchema,
  audioUrl: UrlSchema.optional(),
  transcricao: z.string().optional(),
  posicaoX: z.number().optional(),
  posicaoY: z.number().optional(),
  resolvido: z.boolean(),
  autor: UsuarioListResponseSchema,
  duracaoAudio: z.number().optional(),
  dataCriacao: z.string(),
  dataAtualizacao: z.string(),
})

// ============================================
// SCHEMAS DE APROVAÇÃO
// ============================================

export const CreateAprovacaoRequestSchema = z.object({
  arteId: UuidSchema,
  tipo: TipoAprovacaoSchema,
  comentario: z
    .string()
    .max(1000, 'Comentário deve ter no máximo 1000 caracteres')
    .optional(),
  condicoes: z
    .array(
      z
        .string()
        .min(1, 'Condição não pode estar vazia')
        .max(255, 'Condição deve ter no máximo 255 caracteres')
    )
    .max(10, 'Máximo de 10 condições')
    .optional(),
})

export const AprovacaoResponseSchema = z.object({
  id: UuidSchema,
  tipo: TipoAprovacaoSchema,
  comentario: z.string().optional(),
  condicoes: z.array(z.string()).optional(),
  dataAprovacao: z.string(),
  aprovador: UsuarioListResponseSchema,
  assinaturaDigital: z.string().optional(),
  dataCriacao: z.string(),
})

// ============================================
// SCHEMAS DE TAREFA
// ============================================

export const CreateTarefaRequestSchema = z.object({
  titulo: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(255, 'Título deve ter no máximo 255 caracteres')
    .trim(),
  descricao: z
    .string()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional(),
  projetoId: UuidSchema,
  responsavelId: UuidSchema,
  prioridade: PrioridadeSchema.default('MEDIA'),
  prazo: DataISOSchema.optional(),
  estimativaHoras: z
    .number()
    .min(0.5, 'Estimativa deve ser pelo menos 0.5 horas')
    .max(1000, 'Estimativa muito alta')
    .optional(),
  tags: TagsSchema,
})

export const UpdateTarefaRequestSchema = z.object({
  titulo: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(255, 'Título deve ter no máximo 255 caracteres')
    .trim()
    .optional(),
  descricao: z
    .string()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional(),
  status: StatusTarefaSchema.optional(),
  prioridade: PrioridadeSchema.optional(),
  prazo: DataISOSchema.optional(),
  estimativaHoras: z
    .number()
    .min(0.5, 'Estimativa deve ser pelo menos 0.5 horas')
    .max(1000, 'Estimativa muito alta')
    .optional(),
  horasGastas: z
    .number()
    .min(0, 'Horas gastas deve ser positivo')
    .max(1000, 'Horas gastas muito alto')
    .optional(),
  tags: TagsSchema.optional(),
  progresso: PorcentagemSchema.optional(),
  bloqueada: z.boolean().optional(),
  motivoBloqueio: z
    .string()
    .max(500, 'Motivo deve ter no máximo 500 caracteres')
    .optional(),
})

export const TarefaResponseSchema = z.object({
  id: UuidSchema,
  titulo: z.string(),
  descricao: z.string().optional(),
  status: StatusTarefaSchema,
  prioridade: PrioridadeSchema,
  prazo: z.string().optional(),
  estimativaHoras: z.number().optional(),
  horasGastas: z.number().optional(),
  tags: z.array(z.string()),
  projeto: z.object({
    id: UuidSchema,
    nome: z.string(),
  }),
  responsavel: UsuarioListResponseSchema,
  progresso: PorcentagemSchema,
  bloqueada: z.boolean(),
  motivoBloqueio: z.string().optional(),
  dataCriacao: z.string(),
  dataAtualizacao: z.string(),
})

// ============================================
// SCHEMAS DE NOTIFICAÇÃO
// ============================================

export const NotificacaoResponseSchema = z.object({
  id: UuidSchema,
  titulo: z.string(),
  mensagem: z.string(),
  tipo: TipoNotificacaoSchema,
  lida: z.boolean(),
  dataLeitura: z.string().optional(),
  url: UrlSchema.optional(),
  projeto: z.object({
    id: UuidSchema,
    nome: z.string(),
  }).optional(),
  arte: z.object({
    id: UuidSchema,
    titulo: z.string(),
    thumbnail: UrlSchema.optional(),
  }).optional(),
  dataCriacao: z.string(),
})

export const MarkNotificacaoLidaRequestSchema = z.object({
  ids: z.array(UuidSchema).min(1, 'Pelo menos uma notificação deve ser selecionada'),
})

export const NotificacaoStatsResponseSchema = z.object({
  total: z.number(),
  naoLidas: z.number(),
  feedback: z.number(),
  aprovacao: z.number(),
  prazo: z.number(),
  sistema: z.number(),
})

// ============================================
// SCHEMAS DE DASHBOARD
// ============================================

export const DashboardStatsResponseSchema = z.object({
  projetos: ProjetoStatsResponseSchema,
  artes: z.object({
    total: z.number(),
    pendentes: z.number(),
    aprovadas: z.number(),
    rejeitadas: z.number(),
    uploadHoje: z.number(),
  }),
  feedbacks: z.object({
    total: z.number(),
    naoResolvidos: z.number(),
    recebidosHoje: z.number(),
  }),
  tarefas: z.object({
    total: z.number(),
    pendentes: z.number(),
    emAndamento: z.number(),
    concluidas: z.number(),
    atrasadas: z.number(),
  }),
})

export const DashboardRecentActivityResponseSchema = z.object({
  tipo: z.enum(['projeto', 'arte', 'feedback', 'aprovacao', 'tarefa']),
  titulo: z.string(),
  descricao: z.string(),
  url: UrlSchema.optional(),
  usuario: UsuarioListResponseSchema.optional(),
  dataCriacao: z.string(),
})

// ============================================
// TIPOS INFERIDOS
// ============================================

export type CreateUsuarioRequest = z.infer<typeof CreateUsuarioRequestSchema>
export type UpdateUsuarioRequest = z.infer<typeof UpdateUsuarioRequestSchema>
export type UsuarioResponse = z.infer<typeof UsuarioResponseSchema>
export type UsuarioListResponse = z.infer<typeof UsuarioListResponseSchema>

export type CreateProjetoRequest = z.infer<typeof CreateProjetoRequestSchema>
export type UpdateProjetoRequest = z.infer<typeof UpdateProjetoRequestSchema>
export type ProjetoResponse = z.infer<typeof ProjetoResponseSchema>
export type ProjetoListResponse = z.infer<typeof ProjetoListResponseSchema>
export type ProjetoStatsResponse = z.infer<typeof ProjetoStatsResponseSchema>

export type CreateArteRequest = z.infer<typeof CreateArteRequestSchema>
export type UpdateArteRequest = z.infer<typeof UpdateArteRequestSchema>
export type ArteUploadRequest = z.infer<typeof ArteUploadRequestSchema>
export type ArteResponse = z.infer<typeof ArteResponseSchema>
export type ArteListResponse = z.infer<typeof ArteListResponseSchema>
export type ArteUploadResponse = z.infer<typeof ArteUploadResponseSchema>

export type CreateFeedbackRequest = z.infer<typeof CreateFeedbackRequestSchema>
export type CreateAudioFeedbackRequest = z.infer<typeof CreateAudioFeedbackRequestSchema>
export type UpdateFeedbackRequest = z.infer<typeof UpdateFeedbackRequestSchema>
export type FeedbackResponse = z.infer<typeof FeedbackResponseSchema>

export type CreateAprovacaoRequest = z.infer<typeof CreateAprovacaoRequestSchema>
export type AprovacaoResponse = z.infer<typeof AprovacaoResponseSchema>

export type CreateTarefaRequest = z.infer<typeof CreateTarefaRequestSchema>
export type UpdateTarefaRequest = z.infer<typeof UpdateTarefaRequestSchema>
export type TarefaResponse = z.infer<typeof TarefaResponseSchema>

export type NotificacaoResponse = z.infer<typeof NotificacaoResponseSchema>
export type MarkNotificacaoLidaRequest = z.infer<typeof MarkNotificacaoLidaRequestSchema>
export type NotificacaoStatsResponse = z.infer<typeof NotificacaoStatsResponseSchema>

export type DashboardStatsResponse = z.infer<typeof DashboardStatsResponseSchema>
export type DashboardRecentActivityResponse = z.infer<typeof DashboardRecentActivityResponseSchema>

