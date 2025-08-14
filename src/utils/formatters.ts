/**
 * Utilitários de formatação para a plataforma VIU
 */

// ============================================
// FORMATAÇÃO DE DATA E HORA
// ============================================

/**
 * Formata uma data para o padrão brasileiro (DD/MM/AAAA)
 */
export const formatDate = (date: Date | string, format: string = 'DD/MM/YYYY'): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(d.getTime())) {
    return 'Data inválida'
  }
  
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear().toString()
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const seconds = d.getSeconds().toString().padStart(2, '0')
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * Formata uma data para exibição relativa (há 2 horas, ontem, etc.)
 */
export const formatRelativeDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  
  if (diffSec < 60) return 'agora mesmo'
  if (diffMin < 60) return `há ${diffMin} minuto${diffMin > 1 ? 's' : ''}`
  if (diffHour < 24) return `há ${diffHour} hora${diffHour > 1 ? 's' : ''}`
  if (diffDay === 1) return 'ontem'
  if (diffDay < 7) return `há ${diffDay} dias`
  if (diffDay < 30) return `há ${Math.floor(diffDay / 7)} semana${Math.floor(diffDay / 7) > 1 ? 's' : ''}`
  if (diffDay < 365) return `há ${Math.floor(diffDay / 30)} mês${Math.floor(diffDay / 30) > 1 ? 'es' : ''}`
  
  return `há ${Math.floor(diffDay / 365)} ano${Math.floor(diffDay / 365) > 1 ? 's' : ''}`
}

/**
 * Formata duração em segundos para formato legível (2h 30m 15s)
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`
  
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  
  const parts: string[] = []
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  if (remainingSeconds > 0) parts.push(`${remainingSeconds}s`)
  
  return parts.join(' ')
}

// ============================================
// FORMATAÇÃO DE MOEDA
// ============================================

/**
 * Formata valor em centavos para moeda brasileira (R$ 1.234,56)
 */
export const formatCurrency = (centavos: number): string => {
  const reais = centavos / 100
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(reais)
}

/**
 * Formata valor numérico para moeda brasileira
 */
export const formatCurrencyFromNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Converte string de moeda para centavos
 */
export const parseCurrencyToCentavos = (currency: string): number => {
  const cleaned = currency.replace(/[^\d,]/g, '').replace(',', '.')
  const value = parseFloat(cleaned) || 0
  return Math.round(value * 100)
}

// ============================================
// FORMATAÇÃO DE NÚMEROS
// ============================================

/**
 * Formata número com separadores de milhares
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('pt-BR').format(num)
}

/**
 * Formata porcentagem
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100)
}

/**
 * Formata tamanho de arquivo em bytes para formato legível
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

// ============================================
// FORMATAÇÃO DE TELEFONE
// ============================================

/**
 * Formata telefone brasileiro
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    // Telefone fixo: (11) 1234-5678
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  } else if (cleaned.length === 11) {
    // Celular: (11) 91234-5678
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (cleaned.length === 13 && cleaned.startsWith('55')) {
    // Com código do país: +55 (11) 91234-5678
    return cleaned.replace(/55(\d{2})(\d{5})(\d{4})/, '+55 ($1) $2-$3')
  }
  
  return phone // Retorna original se não conseguir formatar
}

/**
 * Remove formatação do telefone
 */
export const unformatPhone = (phone: string): string => {
  return phone.replace(/\D/g, '')
}

// ============================================
// FORMATAÇÃO DE TEXTO
// ============================================

/**
 * Capitaliza primeira letra de cada palavra
 */
export const capitalizeWords = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Capitaliza apenas a primeira letra
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Trunca texto com reticências
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Remove acentos e caracteres especiais
 */
export const removeAccents = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Cria slug a partir de texto
 */
export const slugify = (text: string): string => {
  return removeAccents(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/[\s_-]+/g, '-') // Substitui espaços e underscores por hífens
    .replace(/^-+|-+$/g, '') // Remove hífens do início e fim
}

/**
 * Extrai iniciais do nome
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2) // Máximo 2 iniciais
    .join('')
}

/**
 * Mascara email para exibição (ex: j***@example.com)
 */
export const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@')
  if (username.length <= 2) return email
  
  const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
  return `${maskedUsername}@${domain}`
}

/**
 * Mascara telefone para exibição (ex: (11) 9****-5678)
 */
export const maskPhone = (phone: string): string => {
  const formatted = formatPhone(phone)
  
  if (formatted.includes(')')) {
    // (11) 91234-5678 -> (11) 9****-5678
    return formatted.replace(/(\d{1})\d{4}(-\d{4})/, '$1****$2')
  }
  
  return phone
}

// ============================================
// FORMATAÇÃO DE CORES
// ============================================

/**
 * Converte cor hex para RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null
}

/**
 * Converte RGB para hex
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * Determina se uma cor é clara ou escura
 */
export const isLightColor = (hex: string): boolean => {
  const rgb = hexToRgb(hex)
  if (!rgb) return true
  
  // Fórmula de luminância
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return luminance > 0.5
}

// ============================================
// FORMATAÇÃO DE URLs
// ============================================

/**
 * Adiciona protocolo à URL se não tiver
 */
export const ensureProtocol = (url: string): string => {
  if (!url) return url
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`
  }
  return url
}

/**
 * Extrai domínio da URL
 */
export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(ensureProtocol(url))
    return urlObj.hostname
  } catch {
    return url
  }
}

