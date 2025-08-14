# viu-shared • Biblioteca compartilhada do VIU

> A nossa “fábrica de tijolos” de código: um lugar único para **tipos**, **validações**, **utilitários** e **constantes** usados em **backend**, **frontend** e **mobile**.

## 🧠 Por que existe?

Imagine construir uma casa com amigos. Em vez de cada um fazer seus próprios tijolos, vocês usam a **mesma fábrica**.  
O **viu-shared** é isso: **uma fonte única de verdade** para evitar código duplicado e garantir padrão em toda a stack.

### Sem o viu-shared (problemático)
```
João (Backend):    "Vou criar minha própria função pra formatar dinheiro"
Maria (Frontend):  "Eu também"
Pedro (Mobile):    "Eu também"
```
**Resultado:** 3 implementações, 3 bugs diferentes. 😵

### Com o viu-shared (inteligente)
```
Equipe: "Criamos UMA função no viu-shared"
Todos:  "Só importar e usar"
```
**Resultado:** 1 código, 3 pessoas felizes. 🎉

---

## 📦 Estrutura do repositório

O **viu-shared** é usado como **pasta compartilhada** entre múltiplos projetos, no mesmo repositório:

```
projetos/
├── viu-shared/           ← Biblioteca central
│   ├── src/
│   ├── package.json
│   └── README.md
├── viu-backend/
│   ├── src/
│   └── package.json      ← Importa: '../viu-shared'
├── viu-frontend/
│   ├── src/
│   └── package.json      ← Importa: '../viu-shared'
└── viu-mobile/
    ├── src/
    └── package.json      ← Importa: '../viu-shared'
```

---

## ⚡ Como usar

### 1) Importando no código

```ts
// Exemplo no backend (viu-backend/src/index.ts)
import { formatCurrency } from '../viu-shared'

console.log(formatCurrency(15000)) // "R$ 150,00"
```

### 2) Ajuste no `tsconfig.json` (opcional, para facilitar import)

No `viu-backend/tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@viu/shared/*": ["../viu-shared/src/*"]
    }
  }
}
```

Agora você pode importar assim:
```ts
import { formatCurrency } from '@viu/shared/utils/currency'
```

---

## 📚 O que contém

- **types/** – *Moldes* de dados
- **schemas/** – *Validações* com Zod
- **utils/** – *Funções* reutilizáveis
- **constants/** – *Valores fixos* do sistema

Exemplo de utilitário:
```ts
import { formatPhone, isValidCPF } from '../viu-shared'

console.log(formatPhone('11987654321')) // (11) 98765-4321
console.log(isValidCPF('123.456.789-09')) // true ou false
```

---

## 🧭 Benefícios

- ⏰ **Economiza tempo:** implementa uma vez, usa em todos os apps.
- 🐛 **Menos bugs:** corrige num lugar só.
- 🤝 **Padrão de equipe:** todos usam a mesma “receita”.
- 📈 **Escalável:** fácil adicionar e versionar melhorias.

---

## 🤝 Contribuindo

1. Adicione ou altere **tipos** em `types/` e **validações** em `schemas/`.
2. Crie testes para novos **utils**.
3. Siga o padrão de **nomes claros** e **mensagens úteis**.
4. Commits no formato **Conventional Commits** (`feat:`, `fix:`, `docs:`…).

---

## 🔐 Licença

**Privado** – uso interno do projeto VIU.

---

## 🎯 Resumo final

O **viu-shared** é a **biblioteca municipal** do nosso código:
- 📚 Recursos compartilhados
- 🤝 Padrão para todos
- ⏰ Sem reinventar a roda
- 🚀 Desenvolvimento mais rápido

**Sua missão:** usar, contribuir e manter sempre limpo. 💪
