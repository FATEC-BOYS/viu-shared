/**
 * Testes para utilitários de formatação
 */

import { describe, it, expect } from 'vitest'
import { 
  formatCurrency, 
  formatFileSize, 
  formatPhone,
  slugify,
  isValidCPF,
  isValidEmail 
} from '../src'

describe('Formatadores', () => {
  describe('formatCurrency', () => {
    it('deve formatar centavos para moeda brasileira', () => {
      expect(formatCurrency(123456)).toBe('R$ 1.234,56')
      expect(formatCurrency(0)).toBe('R$ 0,00')
      expect(formatCurrency(100)).toBe('R$ 1,00')
    })
  })

  describe('formatFileSize', () => {
    it('deve formatar bytes para formato legível', () => {
      expect(formatFileSize(0)).toBe('0 B')
      expect(formatFileSize(1024)).toBe('1.0 KB')
      expect(formatFileSize(1048576)).toBe('1.0 MB')
      expect(formatFileSize(1073741824)).toBe('1.0 GB')
    })
  })

  describe('formatPhone', () => {
    it('deve formatar telefone brasileiro', () => {
      expect(formatPhone('11987654321')).toBe('(11) 98765-4321')
      expect(formatPhone('1134567890')).toBe('(11) 3456-7890')
    })
  })

  describe('slugify', () => {
    it('deve criar slug a partir de texto', () => {
      expect(slugify('Meu Projeto Incrível')).toBe('meu-projeto-incrivel')
      expect(slugify('Título com Acentos')).toBe('titulo-com-acentos')
      expect(slugify('  Espaços   Extras  ')).toBe('espacos-extras')
    })
  })
})

describe('Validadores', () => {
  describe('isValidCPF', () => {
    it('deve validar CPF corretamente', () => {
      expect(isValidCPF('123.456.789-09')).toBe(false) // CPF inválido
      expect(isValidCPF('11111111111')).toBe(false) // Todos iguais
      expect(isValidCPF('123')).toBe(false) // Muito curto
    })
  })

  describe('isValidEmail', () => {
    it('deve validar email corretamente', () => {
      expect(isValidEmail('usuario@example.com')).toBe(true)
      expect(isValidEmail('email.invalido')).toBe(false)
      expect(isValidEmail('usuario@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
    })
  })
})

