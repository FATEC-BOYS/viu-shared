/**
 * Schemas de validação para autenticação e autorização
 */

import { z } from 'zod'
import {
  EmailSchema,
  SenhaSchema,
  TelefoneSchema,
  TipoUsuarioSchema,
  UuidSchema,
} from './base'

// ============================================
// SCHEMAS DE LOGIN
// ============================================

export const LoginRequestSchema = z.object({
  email: EmailSchema,
  senha: z.string().min(1, 'Senha é obrigatória'),
  lembrarMe: z.boolean().default(false),
})

export const LoginResponseSchema = z.object({
  usuario: z.object({
    id: UuidSchema,
    nome: z.string(),
    email: z.string(),
    avatar: z.string().url().optional(),
    tipo: TipoUsuarioSchema,
    plano: z.string(),
    emailVerificado: z.boolean(),
  }),
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresIn: z.number(),
  }),
})

// ============================================
// SCHEMAS DE REGISTRO
// ============================================

export const RegisterRequestSchema = z.object({
  nome: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços')
    .trim(),
  email: EmailSchema,
  senha: SenhaSchema,
  tipo: TipoUsuarioSchema,
  telefone: TelefoneSchema,
  termos: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Você deve aceitar os termos de uso',
    }),
  politicaPrivacidade: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Você deve aceitar a política de privacidade',
    }),
  marketing: z.boolean().default(false),
})

export const RegisterResponseSchema = z.object({
  usuario: z.object({
    id: UuidSchema,
    nome: z.string(),
    email: z.string(),
    tipo: TipoUsuarioSchema,
  }),
  message: z.string(),
})

// ============================================
// SCHEMAS DE TOKEN
// ============================================

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token é obrigatório'),
})

export const RefreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
})

export const TokenPayloadSchema = z.object({
  sub: UuidSchema, // usuarioId
  email: EmailSchema,
  tipo: TipoUsuarioSchema,
  plano: z.string(),
  iat: z.number(),
  exp: z.number(),
  jti: UuidSchema, // sessionId
})

// ============================================
// SCHEMAS DE RECUPERAÇÃO DE SENHA
// ============================================

export const ForgotPasswordRequestSchema = z.object({
  email: EmailSchema,
})

export const ForgotPasswordResponseSchema = z.object({
  message: z.string(),
  email: z.string(), // Email mascarado para confirmação
})

export const ResetPasswordRequestSchema = z.object({
  token: z
    .string()
    .min(1, 'Token é obrigatório')
    .max(500, 'Token inválido'),
  novaSenha: SenhaSchema,
  confirmacaoSenha: z.string(),
}).refine(
  (data) => data.novaSenha === data.confirmacaoSenha,
  {
    message: 'Senhas não coincidem',
    path: ['confirmacaoSenha'],
  }
)

export const ResetPasswordResponseSchema = z.object({
  message: z.string(),
})

// ============================================
// SCHEMAS DE ALTERAÇÃO DE SENHA
// ============================================

export const ChangePasswordRequestSchema = z.object({
  senhaAtual: z.string().min(1, 'Senha atual é obrigatória'),
  novaSenha: SenhaSchema,
  confirmacaoSenha: z.string(),
}).refine(
  (data) => data.novaSenha === data.confirmacaoSenha,
  {
    message: 'Senhas não coincidem',
    path: ['confirmacaoSenha'],
  }
).refine(
  (data) => data.senhaAtual !== data.novaSenha,
  {
    message: 'Nova senha deve ser diferente da atual',
    path: ['novaSenha'],
  }
)

export const ChangePasswordResponseSchema = z.object({
  message: z.string(),
})

// ============================================
// SCHEMAS DE VERIFICAÇÃO DE EMAIL
// ============================================

export const VerifyEmailRequestSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
})

export const VerifyEmailResponseSchema = z.object({
  message: z.string(),
  emailVerificado: z.boolean(),
})

export const ResendVerificationRequestSchema = z.object({
  email: EmailSchema,
})

export const ResendVerificationResponseSchema = z.object({
  message: z.string(),
})

// ============================================
// SCHEMAS DE VERIFICAÇÃO DE TELEFONE
// ============================================

export const SendPhoneVerificationRequestSchema = z.object({
  telefone: TelefoneSchema.refine((val) => val !== undefined, {
    message: 'Telefone é obrigatório',
  }),
})

export const VerifyPhoneRequestSchema = z.object({
  telefone: TelefoneSchema.refine((val) => val !== undefined, {
    message: 'Telefone é obrigatório',
  }),
  codigo: z
    .string()
    .length(6, 'Código deve ter 6 dígitos')
    .regex(/^\d{6}$/, 'Código deve conter apenas números'),
})

export const VerifyPhoneResponseSchema = z.object({
  message: z.string(),
  telefoneVerificado: z.boolean(),
})

// ============================================
// SCHEMAS DE LOGOUT
// ============================================

export const LogoutRequestSchema = z.object({
  refreshToken: z.string().optional(),
  logoutTodosSessoes: z.boolean().default(false),
})

export const LogoutResponseSchema = z.object({
  message: z.string(),
})

// ============================================
// SCHEMAS DE SESSÃO
// ============================================

export const SessaoSchema = z.object({
  id: UuidSchema,
  usuarioId: UuidSchema,
  token: z.string(),
  refreshToken: z.string(),
  expiresAt: z.date(),
  ipAddress: z.string().ip(),
  userAgent: z.string(),
  ativo: z.boolean(),
  dataCriacao: z.date(),
  dataUltimoUso: z.date(),
})

export const ListSessoesResponseSchema = z.object({
  sessoes: z.array(
    z.object({
      id: UuidSchema,
      ipAddress: z.string(),
      userAgent: z.string(),
      ativo: z.boolean(),
      atual: z.boolean(),
      dataCriacao: z.string(),
      dataUltimoUso: z.string(),
      localizacao: z.string().optional(),
      dispositivo: z.string().optional(),
    })
  ),
})

export const RevokeSessaoRequestSchema = z.object({
  sessaoId: UuidSchema,
})

// ============================================
// SCHEMAS DE AUTENTICAÇÃO SOCIAL
// ============================================

export const GoogleAuthRequestSchema = z.object({
  idToken: z.string().min(1, 'ID Token do Google é obrigatório'),
  tipo: TipoUsuarioSchema.optional(),
})

export const GoogleAuthResponseSchema = z.object({
  usuario: z.object({
    id: UuidSchema,
    nome: z.string(),
    email: z.string(),
    avatar: z.string().optional(),
    tipo: TipoUsuarioSchema,
    novoUsuario: z.boolean(),
  }),
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    expiresIn: z.number(),
  }),
})

// ============================================
// SCHEMAS DE AUTENTICAÇÃO 2FA
// ============================================

export const Setup2FARequestSchema = z.object({
  senha: z.string().min(1, 'Senha é obrigatória'),
})

export const Setup2FAResponseSchema = z.object({
  qrCode: z.string(), // Base64 do QR Code
  secret: z.string(), // Secret para backup
  backupCodes: z.array(z.string()),
})

export const Verify2FARequestSchema = z.object({
  codigo: z
    .string()
    .length(6, 'Código deve ter 6 dígitos')
    .regex(/^\d{6}$/, 'Código deve conter apenas números'),
})

export const Disable2FARequestSchema = z.object({
  senha: z.string().min(1, 'Senha é obrigatória'),
  codigo: z
    .string()
    .length(6, 'Código deve ter 6 dígitos')
    .regex(/^\d{6}$/, 'Código deve conter apenas números'),
})

// ============================================
// SCHEMAS DE VALIDAÇÃO DE PERMISSÕES
// ============================================

export const PermissaoSchema = z.object({
  recurso: z.string(),
  acao: z.enum(['create', 'read', 'update', 'delete', 'manage']),
  condicoes: z.record(z.unknown()).optional(),
})

export const ValidatePermissionRequestSchema = z.object({
  recurso: z.string(),
  acao: z.string(),
  contexto: z.record(z.unknown()).optional(),
})

export const ValidatePermissionResponseSchema = z.object({
  permitido: z.boolean(),
  motivo: z.string().optional(),
})

// ============================================
// TIPOS INFERIDOS
// ============================================

export type LoginRequest = z.infer<typeof LoginRequestSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>
export type TokenPayload = z.infer<typeof TokenPayloadSchema>
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>
export type VerifyEmailRequest = z.infer<typeof VerifyEmailRequestSchema>
export type VerifyPhoneRequest = z.infer<typeof VerifyPhoneRequestSchema>
export type LogoutRequest = z.infer<typeof LogoutRequestSchema>
export type Sessao = z.infer<typeof SessaoSchema>
export type GoogleAuthRequest = z.infer<typeof GoogleAuthRequestSchema>
export type Setup2FARequest = z.infer<typeof Setup2FARequestSchema>
export type Verify2FARequest = z.infer<typeof Verify2FARequestSchema>
export type Permissao = z.infer<typeof PermissaoSchema>

