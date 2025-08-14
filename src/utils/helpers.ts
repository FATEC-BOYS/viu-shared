/**
 * Utilitários auxiliares gerais para a plataforma VIU
 */

// ============================================
// UTILITÁRIOS DE ARRAY
// ============================================

/**
 * Remove duplicatas de um array
 */
export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)]
}

/**
 * Remove duplicatas por propriedade específica
 */
export const uniqueBy = <T, K extends keyof T>(array: T[], key: K): T[] => {
  const seen = new Set()
  return array.filter(item => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

/**
 * Agrupa array por propriedade
 */
export const groupBy = <T, K extends keyof T>(
  array: T[], 
  key: K
): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * Ordena array por propriedade
 */
export const sortBy = <T, K extends keyof T>(
  array: T[], 
  key: K, 
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Divide array em chunks
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

/**
 * Embaralha array
 */
export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Pega elementos aleatórios do array
 */
export const sample = <T>(array: T[], count: number): T[] => {
  const shuffled = shuffle(array)
  return shuffled.slice(0, Math.min(count, array.length))
}

// ============================================
// UTILITÁRIOS DE OBJETO
// ============================================

/**
 * Pega propriedades específicas de um objeto
 */
export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * Remove propriedades específicas de um objeto
 */
export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

/**
 * Verifica se objeto está vazio
 */
export const isEmpty = (obj: any): boolean => {
  if (obj == null) return true
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
  if (obj instanceof Map || obj instanceof Set) return obj.size === 0
  return Object.keys(obj).length === 0
}

/**
 * Deep clone de objeto
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    const cloned = {} as T
    Object.keys(obj).forEach(key => {
      ;(cloned as any)[key] = deepClone((obj as any)[key])
    })
    return cloned
  }
  return obj
}

/**
 * Merge profundo de objetos
 */
export const deepMerge = <T>(target: T, ...sources: Partial<T>[]): T => {
  if (!sources.length) return target
  const source = sources.shift()
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  
  return deepMerge(target, ...sources)
}

/**
 * Verifica se é um objeto
 */
const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item)
}

// ============================================
// UTILITÁRIOS DE STRING
// ============================================

/**
 * Gera string aleatória
 */
export const randomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Gera ID único simples
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Converte camelCase para snake_case
 */
export const camelToSnake = (str: string): string => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

/**
 * Converte snake_case para camelCase
 */
export const snakeToCamel = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * Converte objeto de camelCase para snake_case
 */
export const objectToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(objectToSnakeCase)
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const snakeKey = camelToSnake(key)
      result[snakeKey] = objectToSnakeCase(obj[key])
      return result
    }, {} as any)
  }
  return obj
}

/**
 * Converte objeto de snake_case para camelCase
 */
export const objectToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(objectToCamelCase)
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = snakeToCamel(key)
      result[camelKey] = objectToCamelCase(obj[key])
      return result
    }, {} as any)
  }
  return obj
}

// ============================================
// UTILITÁRIOS DE NÚMERO
// ============================================

/**
 * Gera número aleatório entre min e max
 */
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Arredonda para número específico de casas decimais
 */
export const roundTo = (num: number, decimals: number): number => {
  return Number(Math.round(Number(num + 'e' + decimals)) + 'e-' + decimals)
}

/**
 * Clamp número entre min e max
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max)
}

/**
 * Converte graus para radianos
 */
export const degToRad = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

/**
 * Converte radianos para graus
 */
export const radToDeg = (radians: number): number => {
  return radians * (180 / Math.PI)
}

// ============================================
// UTILITÁRIOS DE PROMISE
// ============================================

/**
 * Sleep/delay assíncrono
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Timeout para promises
 */
export const withTimeout = <T>(
  promise: Promise<T>, 
  timeoutMs: number
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    ),
  ])
}

/**
 * Retry com backoff exponencial
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxAttempts) {
        throw lastError
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1)
      await sleep(delay)
    }
  }
  
  throw lastError!
}

/**
 * Debounce para funções
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  waitMs: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), waitMs)
  }
}

/**
 * Throttle para funções
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limitMs: number
): (...args: Parameters<T>) => void => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limitMs)
    }
  }
}

// ============================================
// UTILITÁRIOS DE DATA
// ============================================

/**
 * Adiciona dias a uma data
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Adiciona horas a uma data
 */
export const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)
  return result
}

/**
 * Verifica se data está entre duas outras
 */
export const isBetween = (date: Date, start: Date, end: Date): boolean => {
  return date >= start && date <= end
}

/**
 * Início do dia
 */
export const startOfDay = (date: Date): Date => {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

/**
 * Fim do dia
 */
export const endOfDay = (date: Date): Date => {
  const result = new Date(date)
  result.setHours(23, 59, 59, 999)
  return result
}

// ============================================
// UTILITÁRIOS DE ERRO
// ============================================

/**
 * Cria erro customizado
 */
export const createError = (
  message: string, 
  code?: string, 
  statusCode?: number
): Error & { code?: string; statusCode?: number } => {
  const error = new Error(message) as Error & { code?: string; statusCode?: number }
  if (code) error.code = code
  if (statusCode) error.statusCode = statusCode
  return error
}

/**
 * Verifica se é erro de rede
 */
export const isNetworkError = (error: any): boolean => {
  return error?.code === 'NETWORK_ERROR' || 
         error?.message?.includes('fetch') ||
         error?.message?.includes('network')
}

/**
 * Extrai mensagem de erro
 */
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.error) return error.error
  return 'Erro desconhecido'
}

// ============================================
// UTILITÁRIOS DE PERFORMANCE
// ============================================

/**
 * Mede tempo de execução
 */
export const measureTime = async <T>(
  fn: () => Promise<T>
): Promise<{ result: T; timeMs: number }> => {
  const start = performance.now()
  const result = await fn()
  const timeMs = performance.now() - start
  return { result, timeMs }
}

/**
 * Memoização simples
 */
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map()
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

