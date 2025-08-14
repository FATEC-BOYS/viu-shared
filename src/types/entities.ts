/**
 * Interfaces das entidades principais da plataforma VIU
 * Baseadas no modelo de dados PostgreSQL com Prisma
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
  CanalNotificacao,
  TipoRelatorio,
} from './enums'

// ============================================
// TIPOS BASE
// ============================================

export interface BaseEntity {
  id: string
  dataCriacao: Date
  dataAtualizacao: Date
}

export interface TimestampedEntity {
  dataCriacao: Date
  dataAtualizacao: Date
}

// ============================================
// USUÁRIO
// ============================================

export interface Usuario extends BaseEntity {
  nome: string
  email: string
  senha?: string // Opcional para DTOs (nunca retornar senha)
  avatar?: string
  telefone?: string
  tipo: TipoUsuario
  plano: PlanoAssinatura
  preferenciaComunicacao: PreferenciaComunicacao
  ativo: boolean
  emailVerificado: boolean
  telefoneVerificado: boolean
  ultimoLogin?: Date
  configuracoes?: UsuarioConfiguracoes
  
  // Relacionamentos
  projetosComoDesigner?: Projeto[]
  projetosComoCliente?: Projeto[]
  artes?: Arte[]
  feedbacks?: Feedback[]
  aprovacoes?: Aprovacao[]
  notificacoes?: Notificacao[]
  relatorios?: Relatorio[]
}

export interface UsuarioConfiguracoes {
  tema: 'light' | 'dark' | 'auto'
  idioma: string
  timezone: string
  notificacoesPush: boolean
  notificacoesEmail: boolean
  notificacoesSms: boolean
  autoAprovacao: boolean
  formatoData: string
  formatoHora: string
}

// ============================================
// PROJETO
// ============================================

export interface Projeto extends BaseEntity {
  nome: string
  descricao?: string
  status: StatusProjeto
  prioridade: Prioridade
  prazoEntrega?: Date
  orcamento?: number
  tags: string[]
  cor?: string
  
  // Relacionamentos
  designerId: string
  designer?: Usuario
  clienteId: string
  cliente?: Usuario
  artes?: Arte[]
  tarefas?: Tarefa[]
  
  // Metadados
  totalArtes?: number
  artesAprovadas?: number
  artesPendentes?: number
  artesRejeitadas?: number
  progresso?: number // 0-100
}

// ============================================
// ARTE
// ============================================

export interface Arte extends BaseEntity {
  titulo: string
  descricao?: string
  arquivo: string // URL do arquivo
  thumbnail?: string // URL do thumbnail
  tamanhoArquivo: number // em bytes
  tipoArquivo: TipoArquivo
  mimeType: string
  dimensoes?: ArteDimensoes
  versao: number
  status: StatusAprovacao
  tags: string[]
  
  // Relacionamentos
  projetoId: string
  projeto?: Projeto
  designerId: string
  designer?: Usuario
  feedbacks?: Feedback[]
  aprovacoes?: Aprovacao[]
  
  // Metadados
  totalFeedbacks?: number
  totalAprovacoes?: number
  ultimaVisualizacao?: Date
}

export interface ArteDimensoes {
  largura: number
  altura: number
  resolucao?: number // DPI
}

// ============================================
// FEEDBACK
// ============================================

export interface Feedback extends BaseEntity {
  conteudo: string
  tipo: TipoFeedback
  audioUrl?: string // Para feedbacks de áudio
  transcricao?: string // Transcrição automática do áudio
  posicaoX?: number // Coordenada X para feedback posicional
  posicaoY?: number // Coordenada Y para feedback posicional
  resolvido: boolean
  
  // Relacionamentos
  arteId: string
  arte?: Arte
  autorId: string
  autor?: Usuario
  
  // Metadados
  duracaoAudio?: number // em segundos
  qualidadeTranscricao?: number // 0-1
}

// ============================================
// APROVAÇÃO
// ============================================

export interface Aprovacao extends BaseEntity {
  tipo: TipoAprovacao
  comentario?: string
  condicoes?: string[] // Para aprovação condicional
  dataAprovacao: Date
  
  // Relacionamentos
  arteId: string
  arte?: Arte
  aprovadorId: string
  aprovador?: Usuario
  
  // Metadados
  assinaturaDigital?: string
  ipAprovacao?: string
  userAgentAprovacao?: string
}

// ============================================
// TAREFA
// ============================================

export interface Tarefa extends BaseEntity {
  titulo: string
  descricao?: string
  status: StatusTarefa
  prioridade: Prioridade
  prazo?: Date
  estimativaHoras?: number
  horasGastas?: number
  tags: string[]
  
  // Relacionamentos
  projetoId: string
  projeto?: Projeto
  responsavelId: string
  responsavel?: Usuario
  
  // Metadados
  progresso?: number // 0-100
  bloqueada: boolean
  motivoBloqueio?: string
}

// ============================================
// NOTIFICAÇÃO
// ============================================

export interface Notificacao extends BaseEntity {
  titulo: string
  mensagem: string
  tipo: TipoNotificacao
  canal: CanalNotificacao
  lida: boolean
  dataLeitura?: Date
  url?: string // Link para ação relacionada
  metadados?: Record<string, unknown>
  
  // Relacionamentos
  usuarioId: string
  usuario?: Usuario
  
  // Relacionamentos opcionais
  projetoId?: string
  projeto?: Projeto
  arteId?: string
  arte?: Arte
}

// ============================================
// RELATÓRIO
// ============================================

export interface Relatorio extends BaseEntity {
  nome: string
  tipo: TipoRelatorio
  periodo: RelatorioPeriodo
  filtros: RelatorioFiltros
  dados: Record<string, unknown>
  arquivo?: string // URL do arquivo gerado
  
  // Relacionamentos
  autorId: string
  autor?: Usuario
}

export interface RelatorioPeriodo {
  dataInicio: Date
  dataFim: Date
}

export interface RelatorioFiltros {
  projetos?: string[]
  clientes?: string[]
  designers?: string[]
  status?: string[]
  tags?: string[]
}

// ============================================
// SESSÃO E AUTENTICAÇÃO
// ============================================

export interface Sessao {
  id: string
  usuarioId: string
  token: string
  refreshToken: string
  expiresAt: Date
  ipAddress: string
  userAgent: string
  ativo: boolean
  dataCriacao: Date
  dataUltimoUso: Date
}

export interface TokenPayload {
  sub: string // usuarioId
  email: string
  tipo: TipoUsuario
  plano: PlanoAssinatura
  iat: number
  exp: number
  jti: string // sessionId
}

// ============================================
// UPLOAD E ARQUIVOS
// ============================================

export interface Upload {
  id: string
  nomeOriginal: string
  nomeArquivo: string
  caminho: string
  url: string
  tamanho: number
  mimeType: string
  hash: string
  metadados?: UploadMetadados
  dataCriacao: Date
}

export interface UploadMetadados {
  largura?: number
  altura?: number
  duracao?: number // Para vídeos/áudios
  qualidade?: number
  formato?: string
  compressao?: string
}

// ============================================
// CONFIGURAÇÕES DO SISTEMA
// ============================================

export interface ConfiguracaoSistema {
  chave: string
  valor: string
  tipo: 'string' | 'number' | 'boolean' | 'json'
  descricao?: string
  categoria: string
  publico: boolean
  dataAtualizacao: Date
}

// ============================================
// AUDITORIA
// ============================================

export interface LogAuditoria {
  id: string
  acao: string
  entidade: string
  entidadeId: string
  dadosAnteriores?: Record<string, unknown>
  dadosNovos?: Record<string, unknown>
  usuarioId?: string
  ipAddress: string
  userAgent: string
  dataCriacao: Date
}

