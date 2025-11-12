# 📝 Next Notes App

Aplicação **full stack** construída com **Next.js (App Router)** + **TypeScript**, integrada ao **MongoDB Atlas**.  
Permite criar, listar e apagar notas simples — com dados **persistentes na nuvem**.

---

## 🚀 Tecnologias utilizadas

- **Next.js 15+** — Framework React moderno (App Router + Server/Client Components)  
- **React + TypeScript** — Interface e tipagem estática  
- **TailwindCSS** — (a ser adicionado) estilização rápida e consistente  
- **MongoDB Atlas** — Banco de dados em nuvem  
- **Mongoose** — ODM para modelar e conectar com o MongoDB  
- **pnpm** — Gerenciador de pacotes leve e eficiente  
- **ESLint + Prettier** — Padrões de código e formatação  
- **dotenv (.env)** — Armazenamento seguro de credenciais  

---

## 🧩 Estrutura do projeto

```
src/
 ├─ app/
 │   ├─ page.tsx              # Página principal (UI)
 │   └─ api/
 │       └─ notes/
 │           └─ route.ts      # API REST (GET, POST, DELETE)
 ├─ lib/
 │   ├─ db.ts                 # Conexão com o MongoDB
 │   └─ note.ts               # Modelo/schema Mongoose
 ├─ styles/                   # (Tailwind em breve)
 └─ types/                    # Tipagens globais (opcional)
```

---

## ⚙️ Como rodar localmente

### 1️⃣ Pré-requisitos
- **Node.js** (>= 18)
- **pnpm** (instalado globalmente)
- Conta no **MongoDB Atlas** (ou Mongo local)

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
| **API (Back)** | `src/app/api/notes/route.ts` | Recebe requisições REST (GET/POST/DELETE) |
| **Banco de Dados** | `src/lib/db.ts` / `src/lib/note.ts` | Conexão e modelo Mongoose |
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

## 👨‍💻 Autor

**Henrique Araújo**  
Front-End Developer & UI/UX Designer  
🔗 [linkedin.com/in/henriquearaujo](https://linkedin.com/in/henriquearaujo)  

---

## 🧭 Futuras melhorias

- [ ] Adicionar Tailwind e design responsivo  
- [ ] Implementar edição de notas (PATCH)  
- [ ] Adicionar autenticação com Auth.js  
- [ ] Usar React Query (cache inteligente)  
- [ ] Criar testes automatizados (Vitest/RTL)  

---

> _Se um dia eu perder a memória e abrir este projeto:_  
> Ele roda com `pnpm dev`, conecta ao Mongo Atlas via `.env`, e guarda notas reais com Next.js + Mongoose.  
> Basta lembrar: **“Next Notes App — CRUD simples e moderno.”** 🚀
