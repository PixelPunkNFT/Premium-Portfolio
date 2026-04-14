# Premium Linktree - Luxury Digital Showcase

Una landing page premium in stile Linktree con dashboard admin completa, realizzata con Next.js, TypeScript, MongoDB e Cloudinary.

## 🌟 Caratteristiche

### Landing Page Pubblica
- **Design Premium Black Luxury**: Sfondo nero, accenti oro, animazioni eleganti
- **Responsive**: Ottimizzato per mobile e desktop
- **Hero Section**: Logo/immagine profilo, nome brand, bio introduttiva
- **Categorie Organizzate**: Prodotti divisi per nicchia con titoli e descrizioni
- **Product Cards**: Card cliccabili con immagine, titolo, descrizione e link esterno
- **Animazioni Fluide**: Micro-animazioni hover e transizioni eleganti

### Dashboard Admin
- **Autenticazione Google OAuth**: Solo admin autorizzato
- **Gestione Categorie**: CRUD completo con drag & drop per riordinamento
- **Gestione Prodotti**: CRUD completo con upload immagini Cloudinary
- **Settings**: Personalizzazione logo, brand name, titoli e descrizioni
- **Drag & Drop Intuitivo**: Riordina categorie e prodotti facilmente
- **UI Moderna**: Sidebar elegante, modali curate, notifiche toast

## 🚀 Tecnologie

- **Frontend**: Next.js 14 (App Router), TypeScript, React 18
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB con Mongoose
- **Autenticazione**: NextAuth.js (Google OAuth)
- **Upload Immagini**: Cloudinary
- **Drag & Drop**: @hello-pangea/dnd
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisiti

- Node.js 18+ 
- Account MongoDB (Atlas o locale)
- Account Cloudinary
- Google Cloud Console (per OAuth)

## ⚙️ Setup

### 1. Clona e Installa

```bash
cd "app lending page"
npm install
```

### 2. Configura Variabili d'Ambiente

Crea un file `.env` nella root del progetto:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/premium-linktree?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_con_openssl_rand_base64_32

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Admin Email (solo questa email può accedere)
ADMIN_EMAIL=tua_email@gmail.com

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Configurazione MongoDB

1. Crea un account su [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuovo cluster
3. Ottieni la connection string
4. Sostituisci username, password e database name nella variabile `MONGODB_URI`

### 4. Configurazione Cloudinary

1. Registrati su [Cloudinary](https://cloudinary.com/)
2. Dalla dashboard, copia:
   - Cloud Name
   - API Key
   - API Secret
3. Inseriscili nel file `.env`

### 5. Configurazione Google OAuth

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto o selezionane uno esistente
3. Abilita "Google+ API"
4. Vai su "Credentials" > "Create Credentials" > "OAuth Client ID"
5. Tipo applicazione: Web application
6. Authorized JavaScript origins: `http://localhost:3000`
7. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
8. Copia Client ID e Client Secret nel file `.env`
9. **Importante**: Inserisci la tua email Google in `ADMIN_EMAIL`

### 6. Genera NextAuth Secret

```bash
openssl rand -base64 32
```

Copia il risultato in `NEXTAUTH_SECRET`

## 🎯 Avvio del Progetto

### Development

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

### Production

```bash
npm run build
npm start
```

## 📱 Utilizzo

### Prima Configurazione

1. **Accedi come Admin**
   - Vai su `/admin/login`
   - Clicca "Continue with Google"
   - Usa l'email configurata in `ADMIN_EMAIL`

2. **Configura Settings**
   - Vai su `/admin/settings`
   - Carica la tua immagine profilo
   - Imposta brand name, titolo e descrizione

3. **Crea Categorie**
   - Vai su `/admin/categories`
   - Clicca "Add Category"
   - Inserisci titolo e descrizione
   - Riordina con drag & drop

4. **Aggiungi Prodotti**
   - Vai su `/admin/products`
   - Clicca "Add Product"
   - Seleziona categoria
   - Carica immagine
   - Inserisci titolo, descrizione e URL
   - Riordina con drag & drop

5. **Visualizza Landing Page**
   - Visita `/` per vedere la pagina pubblica
   - Tutti i cambiamenti sono immediatamente visibili

## 🎨 Struttura del Progetto

```
app lending page/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/              # NextAuth
│   │   ├── categories/        # CRUD categorie
│   │   ├── products/          # CRUD prodotti
│   │   ├── settings/          # Impostazioni landing
│   │   └── upload/            # Upload Cloudinary
│   ├── admin/                 # Dashboard Admin
│   │   ├── dashboard/
│   │   ├── categories/
│   │   ├── products/
│   │   ├── settings/
│   │   └── login/
│   ├── page.tsx               # Landing Page Pubblica
│   ├── layout.tsx
│   └── globals.css
├── components/                # Componenti Riutilizzabili
│   ├── Hero.tsx
│   ├── CategorySection.tsx
│   ├── ProductCard.tsx
│   ├── AdminSidebar.tsx
│   └── Modal.tsx
├── lib/                       # Utilities
│   ├── mongodb.ts
│   └── cloudinary.ts
├── models/                    # Mongoose Models
│   ├── User.ts
│   ├── Category.ts
│   ├── Product.ts
│   └── LandingSettings.ts
├── types/                     # TypeScript Types
│   └── next-auth.d.ts
└── middleware.ts              # Auth Middleware
```

## 🔐 Sicurezza

- Solo l'email configurata in `ADMIN_EMAIL` può accedere all'admin
- Tutte le API admin sono protette con NextAuth
- Middleware protegge le route `/admin/*`
- Validazione lato server per tutti i dati

## 🚢 Deploy

### Netlify (Raccomandato) ⚡

Questa app è **completamente compatibile** con Netlify! 

**Setup veloce**:
1. Push su GitHub
2. Importa il progetto su Netlify
3. Configura le variabili d'ambiente
4. Deploy automatico!

**Guida completa**: Leggi `DEPLOY_NETLIFY.md` per istruzioni dettagliate.

**Importante**: 
- Aggiorna `NEXTAUTH_URL` con il dominio Netlify
- Aggiungi il dominio negli authorized URIs di Google OAuth
- Configura MongoDB Atlas per permettere connessioni da `0.0.0.0/0`

### Vercel

1. Push su GitHub
2. Importa su Vercel
3. Configura le variabili d'ambiente
4. Deploy automatico!

### Altre Piattaforme

Il progetto è compatibile con qualsiasi piattaforma che supporti Next.js:
- AWS Amplify
- Railway
- Render
- Digital Ocean App Platform

## 🎯 Features Avanzate

### Prossimi Sviluppi

- Analytics click sui prodotti
- Multi-admin support
- Temi personalizzabili
- Export/Import configurazione
- API pubblica
- Statistiche avanzate

## 🐛 Troubleshooting

### Errore: "Invalid connection string"
- Verifica la `MONGODB_URI` nel file `.env`
- Controlla username, password e nome database

### Errore: "Access denied" al login
- Verifica che l'email usata corrisponda a `ADMIN_EMAIL`
- Controlla le credenziali Google OAuth

### Immagini non caricate
- Verifica le credenziali Cloudinary
- Controlla la console per errori di upload

### Drag & Drop non funziona
- Controlla che le dipendenze siano installate correttamente
- Prova `npm install @hello-pangea/dnd`

## 📄 Licenza

Progetto privato - Tutti i diritti riservati

## 👨‍💻 Supporto

Per assistenza o domande, apri una issue su GitHub o contatta il team di sviluppo.

---

**Creato con ❤️ usando Next.js, TypeScript e Tailwind CSS**
