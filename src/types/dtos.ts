/**
 * Data Transfer Objects (DTOs) para APIs da plataforma VIU
 * Interfaces para requests, responses e operações específicas
 */

import type {
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
} from './enums'

// ============================================
// TIPOS BASE PARA DTOs
// ============================================

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginationResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
  timestamp: string
}

export interface ApiError {
  code: string
  message: string
  field?: string
  details?: Record<string, unknown>
}

// ============================================
// AUTENTICAÇÃO
// ============================================

export interface LoginRequest {
  email: string
  senha: string
  lembrarMe?: boolean
}

export interface LoginResponse {
  usuario: UsuarioResponse
  tokens: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}

export interface RegisterRequest {
  nome: string
  email: string
  senha: string
  tipo: TipoUsuario
  telefone?: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  novaSenha: string
}

export interface ChangePasswordRequest {
  senhaAtual: string
  novaSenha: string
}

// ============================================
// USUÁRIO DTOs
// ============================================

export interface UsuarioResponse {
  id: string
  nome: string
  email: string
  avatar?: string
  telefone?: string
  tipo: TipoUsuario
  plano: PlanoAssinatura
  preferenciaComunicacao: PreferenciaComunicacao
  ativo: boolean
  emailVerificado: boolean
  telefoneVerificado: boolean
  ultimoLogin?: string
  dataCriacao: string
  dataAtualizacao: string
}

export interface CreateUsuarioRequest {
  nome: string
  email: string
  senha: string
  tipo: TipoUsuario
  telefone?: string
  plano?: PlanoAssinatura
  preferenciaComunicacao?: PreferenciaComunicacao
}

export interface UpdateUsuarioRequest {
  nome?: string
  email?: string
  telefone?: string
  avatar?: string
  preferenciaComunicacao?: PreferenciaComunicacao
  configuracoes?: Record<string, unknown>
}

export interface UsuarioListResponse {
  id: string
  nome: string
  email: string
  avatar?: string
  tipo: TipoUsuario
  plano: PlanoAssinatura
  ativo: boolean
  ultimoLogin?: string
}

// ============================================
// PROJETO DTOs
// ============================================

export interface ProjetoResponse {
  id: string
  nome: string
  descricao?: string
  status: StatusProjeto
  prioridade: Prioridade
  prazoEntrega?: string
  orcamento?: number
  tags: string[]
  cor?: string
  designer: UsuarioListResponse
  cliente: UsuarioListResponse
  totalArtes: number
  artesAprovadas: number
  artesPendentes: number
  artesRejeitadas: number
  progresso: number
  dataCriacao: string
  dataAtualizacao: string
}

export interface CreateProjetoRequest {
  nome: string
  descricao?: string
  clienteId: string
  prioridade?: Prioridade
  prazoEntrega?: string
  orcamento?: number
  tags?: string[]
  cor?: string
}

export interface UpdateProjetoRequest {
  nome?: string
  descricao?: string
  status?: StatusProjeto
  prioridade?: Prioridade
  prazoEntrega?: string
  orcamento?: number
  tags?: string[]
  cor?: string
}

export interface ProjetoListResponse {
  id: string
  nome: string
  status: StatusProjeto
  prioridade: Prioridade
  prazoEntrega?: string
  cliente: {
    id: string
    nome: string
    avatar?: string
  }
  totalArtes: number
  progresso: number
  dataAtualizacao: string
}

export interface ProjetoStatsResponse {
  total: number
  emAndamento: number
  pausados: number
  concluidos: number
  cancelados: number
  atrasados: number
  proximosVencimento: number
}

// ============================================
// ARTE DTOs
// ============================================

export interface ArteResponse {
  id: string
  titulo: string
  descricao?: string
  arquivo: string
  thumbnail?: string
  tamanhoArquivo: number
  tipoArquivo: TipoArquivo
  mimeType: string
  dimensoes?: {
    largura: number
    altura: number
    resolucao?: number
  }
  versao: number
  status: StatusAprovacao
  tags: string[]
  projeto: {
    id: string
    nome: string
  }
  designer: UsuarioListResponse
  totalFeedbacks: number
  totalAprovacoes: number
  ultimaVisualizacao?: string
  dataCriacao: string
  dataAtualizacao: string
}

export interface CreateArteRequest {
  titulo: string
  descricao?: string
  projetoId: string
  tags?: string[]
}

export interface UpdateArteRequest {
  titulo?: string
  descricao?: string
  tags?: string[]
}

export interface ArteListResponse {
  id: string
  titulo: string
  arquivo: string
  thumbnail?: string
  tipoArquivo: TipoArquivo
  versao: number
  status: StatusAprovacao
  projeto: {
    id: string
    nome: string
  }
  totalFeedbacks: number
  dataAtualizacao: string
}

export interface ArteUploadRequest {
  arquivo: File | string // File no frontend, string no backend
  titulo: string
  descricao?: string
  projetoId: string
  tags?: string[]
}

export interface ArteUploadResponse {
  id: string
  url: string
  thumbnail?: string
  tamanhoArquivo: number
  dimensoes?: {
    largura: number
    altura: number
  }
}

// ============================================
// FEEDBACK DTOs
// ============================================

export interface FeedbackResponse {
  id: string
  conteudo: string
  tipo: TipoFeedback
  audioUrl?: string
  transcricao?: string
  posicaoX?: number
  posicaoY?: number
  resolvido: boolean
  autor: UsuarioListResponse
  duracaoAudio?: number
  dataCriacao: string
  dataAtualizacao: string
}

export interface CreateFeedbackRequest {
  arteId: string
  conteudo: string
  tipo: TipoFeedback
  posicaoX?: number
  posicaoY?: number
}

export interface CreateAudioFeedbackRequest {
  arteId: string
  audio: File | string
  posicaoX?: number
  posicaoY?: number
}

export interface UpdateFeedbackRequest {
  conteudo?: string
  resolvido?: boolean
}

// ============================================
// APROVAÇÃO DTOs
// ============================================

export interface AprovacaoResponse {
  id: string
  tipo: TipoAprovacao
  comentario?: string
  condicoes?: string[]
  dataAprovacao: string
  aprovador: UsuarioListResponse
  assinaturaDigital?: string
  dataCriacao: string
}

export interface CreateAprovacaoRequest {
  arteId: string
  tipo: TipoAprovacao
  comentario?: string
  condicoes?: string[]
}

// ============================================
// TAREFA DTOs
// ============================================

export interface TarefaResponse {
  id: string
  titulo: string
  descricao?: string
  status: StatusTarefa
  prioridade: Prioridade
  prazo?: string
  estimativaHoras?: number
  horasGastas?: number
  tags: string[]
  projeto: {
    id: string
    nome: string
  }
  responsavel: UsuarioListResponse
  progresso: number
  bloqueada: boolean
  motivoBloqueio?: string
  dataCriacao: string
  dataAtualizacao: string
}

export interface CreateTarefaRequest {
  titulo: string
  descricao?: string
  projetoId: string
  responsavelId: string
  prioridade?: Prioridade
  prazo?: string
  estimativaHoras?: number
  tags?: string[]
}

export interface UpdateTarefaRequest {
  titulo?: string
  descricao?: string
  status?: StatusTarefa
  prioridade?: Prioridade
  prazo?: string
  estimativaHoras?: number
  horasGastas?: number
  tags?: string[]
  progresso?: number
  bloqueada?: boolean
  motivoBloqueio?: string
}

// ============================================
// NOTIFICAÇÃO DTOs
// ============================================

export interface NotificacaoResponse {
  id: string
  titulo: string
  mensagem: string
  tipo: TipoNotificacao
  lida: boolean
  dataLeitura?: string
  url?: string
  projeto?: {
    id: string
    nome: string
  }
  arte?: {
    id: string
    titulo: string
    thumbnail?: string
  }
  dataCriacao: string
}

export interface MarkNotificacaoLidaRequest {
  ids: string[]
}

export interface NotificacaoStatsResponse {
  total: number
  naoLidas: number
  feedback: number
  aprovacao: number
  prazo: number
  sistema: number
}

// ============================================
// DASHBOARD DTOs
// ============================================

export interface DashboardStatsResponse {
  projetos: ProjetoStatsResponse
  artes: {
    total: number
    pendentes: number
    aprovadas: number
    rejeitadas: number
    uploadHoje: number
  }
  feedbacks: {
    total: number
    naoResolvidos: number
    recebidosHoje: number
  }
  tarefas: {
    total: number
    pendentes: number
    emAndamento: number
    concluidas: number
    atrasadas: number
  }
}

export interface DashboardRecentActivityResponse {
  tipo: 'projeto' | 'arte' | 'feedback' | 'aprovacao' | 'tarefa'
  titulo: string
  descricao: string
  url?: string
  usuario?: UsuarioListResponse
  dataCriacao: string
}

// ============================================
// BUSCA E FILTROS
// ============================================

export interface SearchRequest {
  query: string
  filtros?: {
    tipo?: ('projeto' | 'arte' | 'usuario' | 'tarefa')[]
    status?: string[]
    tags?: string[]
    dataInicio?: string
    dataFim?: string
  }
  pagination?: PaginationParams
}

export interface SearchResponse {
  projetos: ProjetoListResponse[]
  artes: ArteListResponse[]
  usuarios: UsuarioListResponse[]
  tarefas: TarefaResponse[]
  total: number
}

// ============================================
// RELATÓRIOS DTOs
// ============================================

export interface CreateRelatorioRequest {
  nome: string
  tipo: string
  periodo: {
    dataInicio: string
    dataFim: string
  }
  filtros?: Record<string, unknown>
}

export interface RelatorioResponse {
  id: string
  nome: string
  tipo: string
  periodo: {
    dataInicio: string
    dataFim: string
  }
  arquivo?: string
  dados: Record<string, unknown>
  dataCriacao: string
}

