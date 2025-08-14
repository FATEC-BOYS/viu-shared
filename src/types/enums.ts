/**
 * Enums e tipos literais para a plataforma VIU
 * Baseados no modelo de dados PostgreSQL
 */

// ============================================
// ENUMS DE USUÁRIO
// ============================================

export enum TipoUsuario {
  DESIGNER = 'DESIGNER',
  CLIENTE = 'CLIENTE',
  ADMIN = 'ADMIN',
}

export enum PlanoAssinatura {
  GRATUITO = 'GRATUITO',
  PROFISSIONAL = 'PROFISSIONAL',
  PREMIUM = 'PREMIUM',
}

export enum PreferenciaComunicacao {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
}

// ============================================
// ENUMS DE PROJETO
// ============================================

export enum StatusProjeto {
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  PAUSADO = 'PAUSADO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export enum Prioridade {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE',
}

// ============================================
// ENUMS DE ARTE
// ============================================

export enum TipoArquivo {
  IMAGEM = 'IMAGEM',
  VIDEO = 'VIDEO',
  DOCUMENTO = 'DOCUMENTO',
  VETOR = 'VETOR',
}

export enum StatusAprovacao {
  PENDENTE = 'PENDENTE',
  APROVADA = 'APROVADA',
  REJEITADA = 'REJEITADA',
}

// ============================================
// ENUMS DE FEEDBACK
// ============================================

export enum TipoFeedback {
  TEXTO = 'TEXTO',
  AUDIO = 'AUDIO',
}

// ============================================
// ENUMS DE APROVAÇÃO
// ============================================

export enum TipoAprovacao {
  APROVACAO_TOTAL = 'APROVACAO_TOTAL',
  APROVACAO_CONDICIONAL = 'APROVACAO_CONDICIONAL',
}

// ============================================
// ENUMS DE TAREFA
// ============================================

export enum StatusTarefa {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA',
}

// ============================================
// ENUMS DE NOTIFICAÇÃO
// ============================================

export enum TipoNotificacao {
  FEEDBACK = 'FEEDBACK',
  APROVACAO = 'APROVACAO',
  PRAZO = 'PRAZO',
  SISTEMA = 'SISTEMA',
}

export enum CanalNotificacao {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  SISTEMA = 'SISTEMA',
}

// ============================================
// ENUMS DE RELATÓRIO
// ============================================

export enum TipoRelatorio {
  PRODUTIVIDADE = 'PRODUTIVIDADE',
  CLIENTE = 'CLIENTE',
  FINANCEIRO = 'FINANCEIRO',
  TEMPO = 'TEMPO',
}

// ============================================
// TIPOS LITERAIS PARA MELHOR TYPE SAFETY
// ============================================

export type TipoUsuarioLiteral = keyof typeof TipoUsuario
export type PlanoAssinaturaLiteral = keyof typeof PlanoAssinatura
export type StatusProjetoLiteral = keyof typeof StatusProjeto
export type PrioridadeLiteral = keyof typeof Prioridade
export type TipoArquivoLiteral = keyof typeof TipoArquivo
export type StatusAprovacaoLiteral = keyof typeof StatusAprovacao
export type TipoFeedbackLiteral = keyof typeof TipoFeedback
export type TipoAprovacaoLiteral = keyof typeof TipoAprovacao
export type StatusTarefaLiteral = keyof typeof StatusTarefa
export type TipoNotificacaoLiteral = keyof typeof TipoNotificacao
export type CanalNotificacaoLiteral = keyof typeof CanalNotificacao
export type TipoRelatorioLiteral = keyof typeof TipoRelatorio

// ============================================
// ARRAYS PARA ITERAÇÃO E VALIDAÇÃO
// ============================================

export const TIPOS_USUARIO = Object.values(TipoUsuario)
export const PLANOS_ASSINATURA = Object.values(PlanoAssinatura)
export const STATUS_PROJETO = Object.values(StatusProjeto)
export const PRIORIDADES = Object.values(Prioridade)
export const TIPOS_ARQUIVO = Object.values(TipoArquivo)
export const STATUS_APROVACAO = Object.values(StatusAprovacao)
export const TIPOS_FEEDBACK = Object.values(TipoFeedback)
export const TIPOS_APROVACAO = Object.values(TipoAprovacao)
export const STATUS_TAREFA = Object.values(StatusTarefa)
export const TIPOS_NOTIFICACAO = Object.values(TipoNotificacao)
export const CANAIS_NOTIFICACAO = Object.values(CanalNotificacao)
export const TIPOS_RELATORIO = Object.values(TipoRelatorio)

// ============================================
// MAPEAMENTOS PARA UI
// ============================================

export const LABELS_TIPO_USUARIO: Record<TipoUsuario, string> = {
  [TipoUsuario.DESIGNER]: 'Designer',
  [TipoUsuario.CLIENTE]: 'Cliente',
  [TipoUsuario.ADMIN]: 'Administrador',
}

export const LABELS_PLANO_ASSINATURA: Record<PlanoAssinatura, string> = {
  [PlanoAssinatura.GRATUITO]: 'Gratuito',
  [PlanoAssinatura.PROFISSIONAL]: 'Profissional',
  [PlanoAssinatura.PREMIUM]: 'Premium',
}

export const LABELS_STATUS_PROJETO: Record<StatusProjeto, string> = {
  [StatusProjeto.EM_ANDAMENTO]: 'Em Andamento',
  [StatusProjeto.PAUSADO]: 'Pausado',
  [StatusProjeto.CONCLUIDO]: 'Concluído',
  [StatusProjeto.CANCELADO]: 'Cancelado',
}

export const LABELS_PRIORIDADE: Record<Prioridade, string> = {
  [Prioridade.BAIXA]: 'Baixa',
  [Prioridade.MEDIA]: 'Média',
  [Prioridade.ALTA]: 'Alta',
  [Prioridade.URGENTE]: 'Urgente',
}

export const LABELS_STATUS_APROVACAO: Record<StatusAprovacao, string> = {
  [StatusAprovacao.PENDENTE]: 'Pendente',
  [StatusAprovacao.APROVADA]: 'Aprovada',
  [StatusAprovacao.REJEITADA]: 'Rejeitada',
}

export const LABELS_TIPO_ARQUIVO: Record<TipoArquivo, string> = {
  [TipoArquivo.IMAGEM]: 'Imagem',
  [TipoArquivo.VIDEO]: 'Vídeo',
  [TipoArquivo.DOCUMENTO]: 'Documento',
  [TipoArquivo.VETOR]: 'Vetor',
}

// ============================================
// CORES PARA UI (TAILWIND CLASSES)
// ============================================

export const CORES_STATUS_PROJETO: Record<StatusProjeto, string> = {
  [StatusProjeto.EM_ANDAMENTO]: 'bg-blue-100 text-blue-800',
  [StatusProjeto.PAUSADO]: 'bg-yellow-100 text-yellow-800',
  [StatusProjeto.CONCLUIDO]: 'bg-green-100 text-green-800',
  [StatusProjeto.CANCELADO]: 'bg-red-100 text-red-800',
}

export const CORES_PRIORIDADE: Record<Prioridade, string> = {
  [Prioridade.BAIXA]: 'bg-gray-100 text-gray-800',
  [Prioridade.MEDIA]: 'bg-blue-100 text-blue-800',
  [Prioridade.ALTA]: 'bg-orange-100 text-orange-800',
  [Prioridade.URGENTE]: 'bg-red-100 text-red-800',
}

export const CORES_STATUS_APROVACAO: Record<StatusAprovacao, string> = {
  [StatusAprovacao.PENDENTE]: 'bg-yellow-100 text-yellow-800',
  [StatusAprovacao.APROVADA]: 'bg-green-100 text-green-800',
  [StatusAprovacao.REJEITADA]: 'bg-red-100 text-red-800',
}

