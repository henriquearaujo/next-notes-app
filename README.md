# 📝 Next Notes App

Aplicação **full stack** construída com **Next.js (App Router)** + **TypeScript**, integrada ao **MongoDB Atlas**.  
Permite **criar, listar, editar e apagar notas** com dados **persistentes na nuvem** e interface moderna.

---

## 🚀 Tecnologias utilizadas

- **Next.js 15+** — Framework React moderno (App Router + Server/Client Components)  
- **React + TypeScript** — Interface e tipagem estática  
- **TailwindCSS** — Estilização rápida e responsiva  
- **MongoDB Atlas** — Banco de dados em nuvem  
- **Mongoose** — ODM para modelar e conectar com o MongoDB  
- **React Query (TanStack)** — Cache e sincronização de dados entre API e UI  
- **Theme Provider** — Alternância entre tema **claro/escuro** com persistência local  
- **pnpm** — Gerenciador de pacotes leve e eficiente  
- **ESLint + Prettier** — Padrões de código e formatação  
- **dotenv (.env)** — Armazenamento seguro de credenciais  

---

## 🧩 Estrutura do projeto

```
src/
 ├─ app/
 │   ├─ layout.tsx             # Layout global (header, toggle de tema)
 │   ├─ page.tsx               # Página principal (UI + lógica)
 │   ├─ providers.tsx          # React Query + ThemeProvider
 │   ├─ theme-provider.tsx     # Alternância de tema claro/escuro
 │   ├─ api/
 │   │   └─ notes/
 │   │       ├─ route.ts       # API REST (GET, POST)
 │   │       └─ [id]/route.ts  # API REST (DELETE, PATCH)
 │   └─ globals.css            # Estilos globais (Tailwind + temas)
 ├─ components/
 │   ├─ NoteForm.tsx           # Formulário de criação
 │   ├─ NoteItem.tsx           # Item da lista (editar/apagar)
 │   └─ ThemeToggle.tsx        # Alternador de tema
 ├─ lib/
 │   ├─ db.ts                  # Conexão com o MongoDB
 │   └─ note.ts                # Modelo/schema Mongoose
 └─ types/                     # Tipagens globais (opcional)
```

---

## ⚙️ Como rodar localmente

### 1️⃣ Pré-requisitos
- **Node.js** (>= 18)
- **pnpm** (instalado globalmente)
- Conta no **MongoDB Atlas** (ou instância local)

### 2️⃣ Clonar e instalar dependências
```bash
git clone https://github.com/SEU_USUARIO/next-notes-app.git
cd next-notes-app
pnpm install
```

### 3️⃣ Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz com sua string de conexão:

```
MONGODB_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/?appName=Cluster
```

### 4️⃣ Rodar o servidor de desenvolvimento
```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## 🧠 Como funciona

| Camada | Arquivo | Descrição |
|--------|----------|-----------|
| **Interface (Front)** | `src/app/page.tsx` | Exibe as notas e envia ações via `fetch()` |
| **API (Back)** | `src/app/api/notes/route.ts` / `[id]/route.ts` | Recebe requisições REST (GET, POST, DELETE, PATCH) |
| **Banco de Dados** | `src/lib/db.ts` / `src/lib/note.ts` | Conexão e modelo Mongoose |
| **Tema (UI)** | `src/app/theme-provider.tsx` | Alterna claro/escuro e salva no localStorage |
| **Cache de Dados** | `src/app/providers.tsx` | React Query Provider para sincronização |
| **Ambiente** | `.env` | Guarda a string de conexão segura |

---

## 💾 Banco de dados

O projeto está conectado ao **MongoDB Atlas**, com uma coleção chamada **`notes`**.  
Cada documento tem o formato:

```json
{
  "_id": "67890abcdef",
  "title": "Minha primeira nota",
  "createdAt": "2025-11-12T00:00:00.000Z",
  "updatedAt": "2025-11-12T00:00:00.000Z"
}
```

---

## 📦 Scripts úteis

| Comando | Descrição |
|----------|------------|
| `pnpm dev` | Roda o servidor em modo desenvolvimento |
| `pnpm build` | Compila o projeto para produção |
| `pnpm start` | Inicia o servidor em modo produção |
| `pnpm lint` | Analisa o código com ESLint |

---

## 🎨 Interface e Tema

- O tema é controlado por um **ThemeProvider**, com suporte a modo **claro/escuro**.  
- A escolha é armazenada no **localStorage**, mantendo a preferência do usuário.  
- O layout e os componentes são estilizados com **Tailwind CSS**, aproveitando variáveis e cores de tema dinâmicas.  

---

## 👨‍💻 Autor

**Henrique Araújo**  
Front-End Developer · UI/UX Designer · Product Designer  
📍 Natal/RN — Brasil  
🔗 [linkedin.com/in/henriquearaujo](https://linkedin.com/in/henriquearaujo)

---

## 🧭 Futuras melhorias

- [ ] Melhorar design responsivo com Tailwind e animações  
- [ ] Implementar busca e filtros de notas  
- [ ] Adicionar autenticação com Auth.js  
- [ ] Criar testes automatizados (Vitest + RTL)  
- [ ] Deploy na **Vercel**  

---

> _Se um dia eu perder a memória e abrir este projeto:_  
> Ele roda com `pnpm dev`, conecta ao Mongo Atlas via `.env`,  
> e guarda notas reais com Next.js, Mongoose, React Query e Tailwind CSS.  
> Basta lembrar: **“Next Notes App — CRUD simples, moderno e bonito.”** 🚀
