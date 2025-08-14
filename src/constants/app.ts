/**
 * Constantes gerais da aplicação VIU
 */

// ============================================
// INFORMAÇÕES DA APLICAÇÃO
// ============================================

export const APP_INFO = {
  NAME: 'VIU Platform',
  DESCRIPTION: 'Plataforma SaaS para designers - Centralize aprovação de artes e feedback',
  VERSION: '1.0.0',
  AUTHOR: 'VIU Team',
  WEBSITE: 'https://viu.com',
  SUPPORT_EMAIL: 'suporte@viu.com',
  CONTACT_EMAIL: 'contato@viu.com',
} as const

// ============================================
// LIMITES E CONFIGURAÇÕES
// ============================================

export const LIMITS = {
  // Usuário
  NOME_MIN_LENGTH: 2,
  NOME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
  SENHA_MIN_LENGTH: 8,
  SENHA_MAX_LENGTH: 128,
  TELEFONE_MAX_LENGTH: 20,
  
  // Projeto
  PROJETO_NOME_MAX_LENGTH: 255,
  PROJETO_DESCRICAO_MAX_LENGTH: 1000,
  PROJETO_TAGS_MAX_COUNT: 20,
  PROJETO_TAG_MAX_LENGTH: 50,
  
  // Arte
  ARTE_TITULO_MAX_LENGTH: 255,
  ARTE_DESCRICAO_MAX_LENGTH: 1000,
  ARTE_TAGS_MAX_COUNT: 20,
  ARTE_TAG_MAX_LENGTH: 50,
  ARTE_MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ARTE_MAX_VERSIONS: 50,
  
  // Feedback
  FEEDBACK_CONTEUDO_MAX_LENGTH: 2000,
  FEEDBACK_AUDIO_MAX_DURATION: 300, // 5 minutos em segundos
  FEEDBACK_AUDIO_MAX_SIZE: 50 * 1024 * 1024, // 50MB
  
  // Tarefa
  TAREFA_TITULO_MAX_LENGTH: 255,
  TAREFA_DESCRICAO_MAX_LENGTH: 1000,
  TAREFA_TAGS_MAX_COUNT: 10,
  TAREFA_MAX_HORAS: 1000,
  
  // Notificação
  NOTIFICACAO_TITULO_MAX_LENGTH: 255,
  NOTIFICACAO_MENSAGEM_MAX_LENGTH: 1000,
  
  // Paginação
  PAGINATION_MIN_LIMIT: 1,
  PAGINATION_MAX_LIMIT: 100,
  PAGINATION_DEFAULT_LIMIT: 20,
  
  // Upload
  UPLOAD_MAX_FILES_PER_REQUEST: 10,
  UPLOAD_CHUNK_SIZE: 1024 * 1024, // 1MB
  
  // Cache
  CACHE_DEFAULT_TTL: 300, // 5 minutos
  CACHE_LONG_TTL: 3600, // 1 hora
  CACHE_SHORT_TTL: 60, // 1 minuto
} as const

// ============================================
// TIPOS DE ARQUIVO SUPORTADOS
// ============================================

export const SUPPORTED_FILE_TYPES = {
  IMAGES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ],
  VIDEOS: [
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/x-msvideo', // .avi
    'video/x-ms-wmv', // .wmv
  ],
  DOCUMENTS: [
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-powerpoint', // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  ],
  VECTORS: [
    'image/svg+xml',
    'application/postscript', // .ai, .eps
    'application/illustrator',
  ],
  AUDIO: [
    'audio/mpeg', // .mp3
    'audio/wav',
    'audio/ogg',
    'audio/mp4', // .m4a
    'audio/webm',
  ],
} as const

export const ALL_SUPPORTED_FILE_TYPES = [
  ...SUPPORTED_FILE_TYPES.IMAGES,
  ...SUPPORTED_FILE_TYPES.VIDEOS,
  ...SUPPORTED_FILE_TYPES.DOCUMENTS,
  ...SUPPORTED_FILE_TYPES.VECTORS,
  ...SUPPORTED_FILE_TYPES.AUDIO,
] as const

// ============================================
// EXTENSÕES DE ARQUIVO
// ============================================

export const FILE_EXTENSIONS = {
  IMAGES: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  VIDEOS: ['.mp4', '.mpeg', '.mov', '.avi', '.wmv'],
  DOCUMENTS: ['.pdf', '.doc', '.docx', '.ppt', '.pptx'],
  VECTORS: ['.svg', '.ai', '.eps'],
  AUDIO: ['.mp3', '.wav', '.ogg', '.m4a', '.webm'],
} as const

// ============================================
// CONFIGURAÇÕES DE QUALIDADE
// ============================================

export const QUALITY_SETTINGS = {
  THUMBNAIL: {
    WIDTH: 300,
    HEIGHT: 300,
    QUALITY: 80,
    FORMAT: 'webp',
  },
  PREVIEW: {
    WIDTH: 800,
    HEIGHT: 600,
    QUALITY: 85,
    FORMAT: 'webp',
  },
  ORIGINAL: {
    MAX_WIDTH: 4096,
    MAX_HEIGHT: 4096,
    QUALITY: 95,
  },
} as const

// ============================================
// CONFIGURAÇÕES DE TEMPO
// ============================================

export const TIME_SETTINGS = {
  // JWT
  JWT_ACCESS_TOKEN_EXPIRES_IN: '15m',
  JWT_REFRESH_TOKEN_EXPIRES_IN: '7d',
  JWT_RESET_PASSWORD_EXPIRES_IN: '1h',
  JWT_EMAIL_VERIFICATION_EXPIRES_IN: '24h',
  
  // Sessão
  SESSION_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 dias em ms
  SESSION_CLEANUP_INTERVAL: 60 * 60 * 1000, // 1 hora em ms
  
  // Rate Limiting
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutos em ms
  RATE_LIMIT_MAX_REQUESTS: 100,
  
  // Upload
  UPLOAD_TIMEOUT: 5 * 60 * 1000, // 5 minutos em ms
  
  // Notificação
  NOTIFICATION_BATCH_INTERVAL: 30 * 1000, // 30 segundos em ms
  NOTIFICATION_RETRY_DELAY: 60 * 1000, // 1 minuto em ms
  
  // Backup
  BACKUP_INTERVAL: 24 * 60 * 60 * 1000, // 24 horas em ms
} as const

// ============================================
// CONFIGURAÇÕES DE REDE
// ============================================

export const NETWORK_SETTINGS = {
  // Timeouts
  HTTP_TIMEOUT: 30000, // 30 segundos
  UPLOAD_TIMEOUT: 300000, // 5 minutos
  DOWNLOAD_TIMEOUT: 120000, // 2 minutos
  
  // Retry
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 segundo
  RETRY_BACKOFF_FACTOR: 2,
  
  // Chunk sizes
  UPLOAD_CHUNK_SIZE: 1024 * 1024, // 1MB
  DOWNLOAD_CHUNK_SIZE: 64 * 1024, // 64KB
} as const

// ============================================
// CONFIGURAÇÕES DE SEGURANÇA
// ============================================

export const SECURITY_SETTINGS = {
  // Senha
  PASSWORD_SALT_ROUNDS: 12,
  PASSWORD_MIN_SCORE: 3, // zxcvbn score
  
  // Rate Limiting
  LOGIN_MAX_ATTEMPTS: 5,
  LOGIN_LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos
  
  // CORS
  CORS_MAX_AGE: 86400, // 24 horas
  
  // Headers
  HELMET_CSP_DIRECTIVES: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", 'data:', 'https:'],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
  },
} as const

// ============================================
// CONFIGURAÇÕES DE EMAIL
// ============================================

export const EMAIL_SETTINGS = {
  // Templates
  TEMPLATES: {
    WELCOME: 'welcome',
    EMAIL_VERIFICATION: 'email-verification',
    PASSWORD_RESET: 'password-reset',
    FEEDBACK_RECEIVED: 'feedback-received',
    ARTE_APPROVED: 'arte-approved',
    ARTE_REJECTED: 'arte-rejected',
    PROJECT_DEADLINE: 'project-deadline',
  },
  
  // Configurações
  MAX_RECIPIENTS: 50,
  BATCH_SIZE: 10,
  RETRY_ATTEMPTS: 3,
  QUEUE_DELAY: 1000, // 1 segundo
} as const

// ============================================
// CONFIGURAÇÕES DE NOTIFICAÇÃO PUSH
// ============================================

export const PUSH_SETTINGS = {
  // Configurações
  MAX_PAYLOAD_SIZE: 4096, // 4KB
  TTL: 24 * 60 * 60, // 24 horas
  BATCH_SIZE: 100,
  
  // Tipos de ação
  ACTIONS: {
    VIEW_ARTE: 'view_arte',
    VIEW_PROJECT: 'view_project',
    VIEW_FEEDBACK: 'view_feedback',
    APPROVE_ARTE: 'approve_arte',
  },
} as const

// ============================================
// CONFIGURAÇÕES DE RELATÓRIO
// ============================================

export const REPORT_SETTINGS = {
  // Formatos suportados
  FORMATS: ['pdf', 'xlsx', 'csv'],
  
  // Limites
  MAX_RECORDS: 10000,
  MAX_DATE_RANGE_DAYS: 365,
  
  // Cache
  CACHE_TTL: 60 * 60, // 1 hora
  
  // Agendamento
  MAX_SCHEDULED_REPORTS: 10,
} as const

// ============================================
// CONFIGURAÇÕES DE BUSCA
// ============================================

export const SEARCH_SETTINGS = {
  // Limites
  MIN_QUERY_LENGTH: 1,
  MAX_QUERY_LENGTH: 255,
  MAX_RESULTS: 100,
  
  // Pesos para relevância
  WEIGHTS: {
    TITLE: 3,
    DESCRIPTION: 2,
    TAGS: 1,
    CONTENT: 1,
  },
  
  // Cache
  CACHE_TTL: 5 * 60, // 5 minutos
} as const

// ============================================
// CONFIGURAÇÕES DE MONITORAMENTO
// ============================================

export const MONITORING_SETTINGS = {
  // Métricas
  METRICS_INTERVAL: 60 * 1000, // 1 minuto
  HEALTH_CHECK_INTERVAL: 30 * 1000, // 30 segundos
  
  // Alertas
  ERROR_RATE_THRESHOLD: 0.05, // 5%
  RESPONSE_TIME_THRESHOLD: 2000, // 2 segundos
  MEMORY_USAGE_THRESHOLD: 0.8, // 80%
  CPU_USAGE_THRESHOLD: 0.8, // 80%
  
  // Logs
  LOG_RETENTION_DAYS: 30,
  LOG_MAX_SIZE: 100 * 1024 * 1024, // 100MB
} as const

// ============================================
// CONFIGURAÇÕES DE DESENVOLVIMENTO
// ============================================

export const DEV_SETTINGS = {
  // Dados de teste
  SEED_USERS_COUNT: 10,
  SEED_PROJECTS_COUNT: 20,
  SEED_ARTES_COUNT: 50,
  
  // Mock
  MOCK_DELAY: 500, // 500ms
  MOCK_ERROR_RATE: 0.1, // 10%
  
  // Debug
  DEBUG_SQL: false,
  DEBUG_CACHE: false,
  DEBUG_QUEUE: false,
} as const

