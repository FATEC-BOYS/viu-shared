/**
 * Exportações das constantes da aplicação VIU
 */

export * from './app'

// Importação para uso interno
import { LIMITS, SUPPORTED_FILE_TYPES } from './app'

// Constantes derivadas úteis
export const MAX_FILE_SIZE_MB = Math.round(LIMITS.ARTE_MAX_FILE_SIZE / (1024 * 1024))
export const MAX_AUDIO_SIZE_MB = Math.round(LIMITS.FEEDBACK_AUDIO_MAX_SIZE / (1024 * 1024))
export const MAX_AUDIO_DURATION_MIN = Math.round(LIMITS.FEEDBACK_AUDIO_MAX_DURATION / 60)

// Helpers para validação de arquivo
export const isImageFile = (mimeType: string): boolean => {
  return SUPPORTED_FILE_TYPES.IMAGES.includes(mimeType as any)
}

export const isVideoFile = (mimeType: string): boolean => {
  return SUPPORTED_FILE_TYPES.VIDEOS.includes(mimeType as any)
}

export const isDocumentFile = (mimeType: string): boolean => {
  return SUPPORTED_FILE_TYPES.DOCUMENTS.includes(mimeType as any)
}

export const isVectorFile = (mimeType: string): boolean => {
  return SUPPORTED_FILE_TYPES.VECTORS.includes(mimeType as any)
}

export const isAudioFile = (mimeType: string): boolean => {
  return SUPPORTED_FILE_TYPES.AUDIO.includes(mimeType as any)
}

export const isSupportedFile = (mimeType: string): boolean => {
  return ALL_SUPPORTED_FILE_TYPES.includes(mimeType as any)
}

// Helper para obter tipo de arquivo
export const getFileType = (mimeType: string): 'IMAGEM' | 'VIDEO' | 'DOCUMENTO' | 'VETOR' | 'AUDIO' | null => {
  if (isImageFile(mimeType)) return 'IMAGEM'
  if (isVideoFile(mimeType)) return 'VIDEO'
  if (isDocumentFile(mimeType)) return 'DOCUMENTO'
  if (isVectorFile(mimeType)) return 'VETOR'
  if (isAudioFile(mimeType)) return 'AUDIO'
  return null
}

// Helper para obter extensão por mime type
export const getFileExtension = (mimeType: string): string => {
  const mimeToExt: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'video/mp4': '.mp4',
    'video/mpeg': '.mpeg',
    'video/quicktime': '.mov',
    'video/x-msvideo': '.avi',
    'video/x-ms-wmv': '.wmv',
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/vnd.ms-powerpoint': '.ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
    'application/postscript': '.eps',
    'application/illustrator': '.ai',
    'audio/mpeg': '.mp3',
    'audio/wav': '.wav',
    'audio/ogg': '.ogg',
    'audio/mp4': '.m4a',
    'audio/webm': '.webm',
  }
  
  return mimeToExt[mimeType] || ''
}

// Constantes de ambiente
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
} as const

// Constantes de URL (serão sobrescritas por variáveis de ambiente)
export const URLS = {
  API_BASE: process.env.API_URL || 'http://localhost:3001',
  WEB_BASE: process.env.WEB_URL || 'http://localhost:3000',
  CDN_BASE: process.env.CDN_URL || 'http://localhost:9000',
} as const

