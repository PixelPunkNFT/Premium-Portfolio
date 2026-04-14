# 🚀 Deploy su Netlify - Guida Completa

## ✅ Compatibilità

Questa app Next.js è **completamente compatibile** con Netlify! Tutte le funzionalità funzionano correttamente:

- ✅ API Routes serverless
- ✅ NextAuth (Google OAuth)
- ✅ MongoDB connection
- ✅ Cloudinary upload
- ✅ Middleware per protezione route admin
- ✅ SSR e SSG
- ✅ Immagini ottimizzate

## 📋 Prerequisiti

Prima di deployare, assicurati di avere:

1. Account GitHub (per connettere il repo)
2. Account Netlify (gratuito)
3. MongoDB Atlas configurato (connection string production)
4. Cloudinary configurato
5. Google OAuth configurato con domini production

## 🔧 Preparazione

### 1. Configura Google OAuth per Production

1. Vai su https://console.cloud.google.com/
2. Seleziona il tuo progetto OAuth
3. Vai su "Credentials" > modifica il tuo OAuth Client
4. Aggiungi agli **Authorized JavaScript origins**:
   ```
   https://tuo-sito.netlify.app
   ```
5. Aggiungi agli **Authorized redirect URIs**:
   ```
   https://tuo-sito.netlify.app/api/auth/callback/google
   ```

### 2. Prepara MongoDB Atlas

1. Vai su https://cloud.mongodb.com/
2. Nel tuo cluster, vai su "Network Access"
3. Aggiungi IP Address: `0.0.0.0/0` (per permettere connessioni da Netlify)
4. Copia la connection string del cluster

### 3. Push su GitHub

```bash
# Inizializza git (se non fatto)
git init

# Aggiungi tutti i file
git add .

# Commit
git commit -m "Initial commit - Premium Linktree"

# Crea un repo su GitHub e poi:
git remote add origin https://github.com/tuo-username/tuo-repo.git
git branch -M main
git push -u origin main
```

## 🌐 Deploy su Netlify

### Metodo 1: Deploy tramite Dashboard (Raccomandato)

1. **Vai su Netlify**
   - Accedi a https://app.netlify.com/

2. **Importa il progetto**
   - Clicca "Add new site" > "Import an existing project"
   - Scegli "Deploy with GitHub"
   - Autorizza Netlify ad accedere a GitHub
   - Seleziona il tuo repository

3. **Configura Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Netlify rileverà automaticamente che è Next.js

4. **Aggiungi Variabili d'Ambiente**
   - Vai su "Site settings" > "Environment variables"
   - Aggiungi TUTTE le variabili del file `.env`:

   ```
   MONGODB_URI=mongodb+srv://...
   NEXTAUTH_URL=https://tuo-sito.netlify.app
   NEXTAUTH_SECRET=your_secret_here
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ADMIN_EMAIL=tua_email@gmail.com
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```

   **IMPORTANTE**: 
   - `NEXTAUTH_URL` deve essere il tuo dominio Netlify finale
   - Puoi trovarlo in "Site settings" > "General"

5. **Deploy!**
   - Clicca "Deploy site"
   - Attendi il completamento del build (2-5 minuti)
   - Il tuo sito sarà live!

### Metodo 2: Deploy tramite CLI

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inizializza il sito
netlify init

# Segui le istruzioni e configura le variabili d'ambiente

# Deploy
netlify deploy --prod
```

## 🔐 Configurazione Post-Deploy

### 1. Aggiorna NEXTAUTH_URL

Dopo il primo deploy, se Netlify ha assegnato un URL diverso:

1. Copia l'URL del sito (es. `https://tuo-sito.netlify.app`)
2. Vai su "Site settings" > "Environment variables"
3. Aggiorna `NEXTAUTH_URL` con il nuovo URL
4. Fai un re-deploy (vai su "Deploys" > "Trigger deploy")

### 2. Configura Custom Domain (Opzionale)

1. Vai su "Domain settings"
2. Clicca "Add custom domain"
3. Segui le istruzioni per configurare il tuo dominio
4. **IMPORTANTE**: Dopo aver aggiunto il dominio custom:
   - Aggiorna `NEXTAUTH_URL` con il nuovo dominio
   - Aggiorna Google OAuth con il nuovo dominio
   - Re-deploya il sito

### 3. Testa il Login Admin

1. Vai su `https://tuo-sito.netlify.app/admin/login`
2. Clicca "Continue with Google"
3. Accedi con l'email configurata in `ADMIN_EMAIL`
4. Dovresti essere reindirizzato alla dashboard!

## ⚡ Deploy Automatici

Netlify configurerà automaticamente i deploy continui:

- ✅ Ogni push su `main` → Deploy automatico in production
- ✅ Ogni push su altri branch → Deploy preview
- ✅ Ogni Pull Request → Deploy preview con URL unico

## 🔧 Troubleshooting

### Errore: "Build failed"
**Soluzione**:
- Controlla i log del build su Netlify
- Verifica che tutte le dipendenze siano in `package.json`
- Controlla che il comando build sia `npm run build`

### Errore: "MongoDB connection failed"
**Soluzione**:
- Verifica la `MONGODB_URI` nelle env variables
- Assicurati che MongoDB Atlas permetta connessioni da `0.0.0.0/0`
- Controlla username e password nella connection string

### Errore: "OAuth redirect mismatch"
**Soluzione**:
- Verifica che il redirect URI in Google Cloud Console sia corretto
- Deve essere esattamente: `https://tuo-sito.netlify.app/api/auth/callback/google`
- Riavvia il sito dopo aver modificato (Trigger deploy)

### Errore: "Access Denied" al login
**Soluzione**:
- Verifica che `ADMIN_EMAIL` sia configurato correttamente
- Usa la stessa email con cui fai login su Google
- Controlla che sia nelle env variables di Netlify

### Upload immagini non funziona
**Soluzione**:
- Verifica le credenziali Cloudinary nelle env variables
- Controlla che `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` abbia il prefisso `NEXT_PUBLIC_`
- Le variabili public devono essere ribuildate per essere aggiornate

## 📊 Monitoraggio

### Analytics
Netlify offre analytics integrati:
- Vai su "Analytics" nel menu del sito
- Puoi vedere visite, performance, ecc.

### Logs
Per vedere i logs delle funzioni serverless:
- Vai su "Functions" nel menu del sito
- Seleziona una funzione per vedere i logs

### Performance
- Netlify ottimizza automaticamente le immagini
- CDN globale per performance eccellenti
- HTTPS automatico

## 🎯 Comandi Utili

```bash
# Re-deploy manuale
netlify deploy --prod

# Vedere i logs
netlify logs

# Aprire il sito
netlify open:site

# Aprire admin panel Netlify
netlify open:admin

# Vedere le env variables
netlify env:list
```

## ⚠️ Note Importanti

1. **Primo Deploy**: Il primo deploy può richiedere più tempo (3-5 minuti)
2. **Cold Start**: Le funzioni serverless possono avere cold start (1-2 secondi la prima volta)
3. **Limiti Free Tier**: 
   - 100GB bandwidth/mese
   - 300 minuti build/mese
   - Funzioni serverless illimitate

4. **Variabili d'Ambiente**: Modifiche alle env variables richiedono un re-deploy

## 🚀 Ottimizzazioni

### Cache
Netlify cachea automaticamente:
- Asset statici
- Immagini ottimizzate
- Build artifacts

### Edge Functions
Per performance ancora migliori, considera di usare Netlify Edge Functions per alcune API routes.

## 📱 Test su Mobile

Dopo il deploy:
1. Apri il sito da mobile
2. Testa la responsiveness
3. Testa il login admin
4. Verifica che il drag & drop funzioni su touch

## ✅ Checklist Pre-Deploy

- [ ] Repository pushato su GitHub
- [ ] MongoDB Atlas configurato con IP 0.0.0.0/0
- [ ] Google OAuth configurato con domini production
- [ ] Cloudinary configurato
- [ ] File `.env` copiato (valori da inserire su Netlify)
- [ ] `netlify.toml` presente nel progetto
- [ ] README aggiornato con URL production

## 🎉 Deploy Completato!

Una volta deployato:
1. ✅ La tua landing page è live e pubblica
2. ✅ Puoi loggare come admin
3. ✅ Puoi gestire categorie e prodotti
4. ✅ Ogni modifica si riflette immediatamente
5. ✅ Deploy automatici ad ogni push

---

**Il tuo Premium Linktree è ora live su Netlify! 🚀**
