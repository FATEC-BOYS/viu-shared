/**
 * Utilitários de validação para a plataforma VIU
 */

// ============================================
// VALIDAÇÃO DE DOCUMENTOS BRASILEIROS
// ============================================

/**
 * Valida CPF brasileiro
 */
export const isValidCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '')
  
  // Verifica se tem 11 dígitos
  if (cleaned.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleaned)) return false
  
  // Calcula primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.charAt(9))) return false
  
  // Calcula segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.charAt(10))) return false
  
  return true
}

/**
 * Valida CNPJ brasileiro
 */
export const isValidCNPJ = (cnpj: string): boolean => {
  const cleaned = cnpj.replace(/\D/g, '')
  
  // Verifica se tem 14 dígitos
  if (cleaned.length !== 14) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleaned)) return false
  
  // Calcula primeiro dígito verificador
  let sum = 0
  let weight = 2
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleaned.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  let remainder = sum % 11
  const digit1 = remainder < 2 ? 0 : 11 - remainder
  if (digit1 !== parseInt(cleaned.charAt(12))) return false
  
  // Calcula segundo dígito verificador
  sum = 0
  weight = 2
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleaned.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  remainder = sum % 11
  const digit2 = remainder < 2 ? 0 : 11 - remainder
  if (digit2 !== parseInt(cleaned.charAt(13))) return false
  
  return true
}

/**
 * Valida CEP brasileiro
 */
export const isValidCEP = (cep: string): boolean => {
  const cleaned = cep.replace(/\D/g, '')
  return /^\d{8}$/.test(cleaned)
}

// ============================================
// VALIDAÇÃO DE CONTATO
// ============================================

/**
 * Valida email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida telefone brasileiro
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  
  // Telefone fixo (10 dígitos) ou celular (11 dígitos)
  if (cleaned.length === 10 || cleaned.length === 11) return true
  
  // Com código do país +55
  if (cleaned.length === 13 && cleaned.startsWith('55')) return true
  
  return false
}

/**
 * Valida URL
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// ============================================
// VALIDAÇÃO DE SENHA
// ============================================

/**
 * Verifica força da senha
 */
export const getPasswordStrength = (password: string): {
  score: number // 0-4
  feedback: string[]
  isValid: boolean
} => {
  const feedback: string[] = []
  let score = 0
  
  // Comprimento mínimo
  if (password.length < 8) {
    feedback.push('Senha deve ter pelo menos 8 caracteres')
  } else {
    score++
  }
  
  // Letra minúscula
  if (!/[a-z]/.test(password)) {
    feedback.push('Adicione pelo menos uma letra minúscula')
  } else {
    score++
  }
  
  // Letra maiúscula
  if (!/[A-Z]/.test(password)) {
    feedback.push('Adicione pelo menos uma letra maiúscula')
  } else {
    score++
  }
  
  // Número
  if (!/\d/.test(password)) {
    feedback.push('Adicione pelo menos um número')
  } else {
    score++
  }
  
  // Caractere especial
  if (!/[@$!%*?&]/.test(password)) {
    feedback.push('Adicione pelo menos um caractere especial (@$!%*?&)')
  } else {
    score++
  }
  
  // Verifica padrões comuns
  const commonPatterns = [
    /123456/,
    /password/i,
    /qwerty/i,
    /abc123/i,
    /admin/i,
  ]
  
  if (commonPatterns.some(pattern => pattern.test(password))) {
    feedback.push('Evite padrões comuns como "123456" ou "password"')
    score = Math.max(0, score - 1)
  }
  
  return {
    score,
    feedback,
    isValid: score >= 4,
  }
}

// ============================================
// VALIDAÇÃO DE ARQUIVO
// ============================================

/**
 * Valida tipo de arquivo
 */
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type)
}

/**
 * Valida tamanho do arquivo
 */
export const isValidFileSize = (file: File, maxSizeBytes: number): boolean => {
  return file.size <= maxSizeBytes
}

/**
 * Valida extensão do arquivo
 */
export const isValidFileExtension = (filename: string, allowedExtensions: string[]): boolean => {
  const extension = filename.toLowerCase().split('.').pop()
  return extension ? allowedExtensions.includes(`.${extension}`) : false
}

/**
 * Valida se é uma imagem
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/')
}

/**
 * Valida se é um vídeo
 */
export const isVideoFile = (file: File): boolean => {
  return file.type.startsWith('video/')
}

/**
 * Valida se é um áudio
 */
export const isAudioFile = (file: File): boolean => {
  return file.type.startsWith('audio/')
}

// ============================================
// VALIDAÇÃO DE DADOS
// ============================================

/**
 * Verifica se é um UUID válido
 */
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

/**
 * Verifica se é uma data válida
 */
export const isValidDate = (date: string | Date): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d instanceof Date && !isNaN(d.getTime())
}

/**
 * Verifica se é um número válido
 */
export const isValidNumber = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

/**
 * Verifica se é um inteiro positivo
 */
export const isPositiveInteger = (value: any): boolean => {
  return isValidNumber(value) && Number.isInteger(value) && value > 0
}

/**
 * Verifica se está dentro de um range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return isValidNumber(value) && value >= min && value <= max
}

// ============================================
// VALIDAÇÃO DE TEXTO
// ============================================

/**
 * Verifica se contém apenas letras
 */
export const isAlphabetic = (text: string): boolean => {
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(text)
}

/**
 * Verifica se contém apenas números
 */
export const isNumeric = (text: string): boolean => {
  return /^\d+$/.test(text)
}

/**
 * Verifica se contém apenas letras e números
 */
export const isAlphanumeric = (text: string): boolean => {
  return /^[a-zA-Z0-9À-ÿ\s]+$/.test(text)
}

/**
 * Verifica se é um slug válido
 */
export const isValidSlug = (slug: string): boolean => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

/**
 * Verifica se contém palavras proibidas
 */
export const containsProfanity = (text: string): boolean => {
  const profanityWords = [
    // Lista básica de palavras proibidas
    'spam', 'scam', 'fake', 'fraud',
    // Adicione mais conforme necessário
  ]
  
  const lowerText = text.toLowerCase()
  return profanityWords.some(word => lowerText.includes(word))
}

// ============================================
// VALIDAÇÃO DE NEGÓCIO
// ============================================

/**
 * Valida se o prazo é futuro
 */
export const isValidDeadline = (deadline: Date | string): boolean => {
  const date = typeof deadline === 'string' ? new Date(deadline) : deadline
  return isValidDate(date) && date > new Date()
}

/**
 * Valida se o orçamento é válido
 */
export const isValidBudget = (budget: number): boolean => {
  return isValidNumber(budget) && budget > 0 && budget <= 999999999 // 999 milhões
}

/**
 * Valida se a tag é válida
 */
export const isValidTag = (tag: string): boolean => {
  return tag.length >= 1 && 
         tag.length <= 50 && 
         /^[a-zA-Z0-9\-_]+$/.test(tag) &&
         !containsProfanity(tag)
}

/**
 * Valida se o array de tags é válido
 */
export const isValidTagArray = (tags: string[]): boolean => {
  return tags.length <= 20 && 
         tags.every(tag => isValidTag(tag)) &&
         new Set(tags).size === tags.length // Sem duplicatas
}

/**
 * Valida coordenadas para feedback posicional
 */
export const isValidCoordinate = (x: number, y: number): boolean => {
  return isValidNumber(x) && 
         isValidNumber(y) && 
         x >= 0 && x <= 10000 && 
         y >= 0 && y <= 10000
}

// ============================================
// VALIDAÇÃO DE PERMISSÕES
// ============================================

/**
 * Verifica se o usuário pode acessar o projeto
 */
export const canAccessProject = (
  userId: string, 
  project: { designerId: string; clienteId: string }
): boolean => {
  return project.designerId === userId || project.clienteId === userId
}

/**
 * Verifica se o usuário pode editar a arte
 */
export const canEditArt = (
  userId: string, 
  art: { designerId: string }
): boolean => {
  return art.designerId === userId
}

/**
 * Verifica se o usuário pode aprovar a arte
 */
export const canApproveArt = (
  userId: string, 
  project: { clienteId: string }
): boolean => {
  return project.clienteId === userId
}

// ============================================
// SANITIZAÇÃO
// ============================================

/**
 * Remove caracteres perigosos de HTML
 */
export const sanitizeHtml = (html: string): string => {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
}

/**
 * Remove caracteres especiais para SQL
 */
export const sanitizeForDatabase = (input: string): string => {
  return input.replace(/['";\\]/g, '')
}

/**
 * Limpa entrada de texto
 */
export const sanitizeText = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ') // Múltiplos espaços para um
    .replace(/[^\w\s\-_.@]/g, '') // Remove caracteres especiais
}

// ============================================
// VALIDAÇÃO DE RATE LIMITING
// ============================================

/**
 * Verifica se excedeu limite de tentativas
 */
export const isRateLimited = (
  attempts: number, 
  maxAttempts: number, 
  windowMs: number, 
  lastAttempt: Date
): boolean => {
  const now = new Date()
  const timeDiff = now.getTime() - lastAttempt.getTime()
  
  // Se passou da janela de tempo, reseta
  if (timeDiff > windowMs) return false
  
  // Verifica se excedeu tentativas
  return attempts >= maxAttempts
}

