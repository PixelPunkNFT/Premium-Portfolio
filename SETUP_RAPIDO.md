# 🚀 Setup Rapido - Premium Linktree

## Step 1: Installa le dipendenze
```bash
npm install
```

## Step 2: Configura il file .env

Apri il file `.env` e sostituisci i valori placeholder:

### MongoDB
Scegli una delle opzioni:

**Opzione A - MongoDB Atlas (Cloud - Raccomandato)**
1. Vai su https://www.mongodb.com/cloud/atlas
2. Crea un account gratuito
3. Crea un nuovo cluster (M0 Free)
4. Clicca "Connect" > "Connect your application"
5. Copia la connection string
6. Sostituisci in `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/premium-linktree?retryWrites=true&w=majority
```

**Opzione B - MongoDB Locale**
```env
MONGODB_URI=mongodb://localhost:27017/premium-linktree
```

### NextAuth Secret
Genera un secret sicuro:
```bash
openssl rand -base64 32
```
Oppure usa: https://generate-secret.vercel.app/32

Sostituisci in `.env`:
```env
NEXTAUTH_SECRET=il_tuo_secret_generato
```

### Google OAuth
1. Vai su https://console.cloud.google.com/
2. Crea un nuovo progetto
3. Abilita "Google+ API"
4. Credentials > Create Credentials > OAuth Client ID
5. Application type: Web application
6. Authorized JavaScript origins: `http://localhost:3000`
7. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
8. Copia Client ID e Secret in `.env`:
```env
GOOGLE_CLIENT_ID=123456789.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456
```

### Admin Email
Inserisci la TUA email Google (quella che userai per fare login):
```env
ADMIN_EMAIL=tua_email@gmail.com
```

### Cloudinary
1. Vai su https://cloudinary.com/
2. Registrati (è gratuito)
3. Dalla dashboard copia:
   - Cloud Name
   - API Key
   - API Secret
4. Sostituisci in `.env`:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxyz123
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
```

## Step 3: Avvia il progetto

```bash
npm run dev
```

## Step 4: Accedi e configura

1. Apri http://localhost:3000
2. Vai su http://localhost:3000/admin/login
3. Clicca "Continue with Google"
4. Accedi con l'email configurata in `ADMIN_EMAIL`
5. Vai su `/admin/settings` e configura:
   - Immagine profilo
   - Nome brand
   - Titolo
   - Descrizione
6. Vai su `/admin/categories` e crea le tue categorie
7. Vai su `/admin/products` e aggiungi i tuoi prodotti
8. Visita http://localhost:3000 per vedere la landing page!

## 🎯 URL Importanti

- **Landing Page Pubblica**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Dashboard Admin**: http://localhost:3000/admin/dashboard
- **Gestione Categorie**: http://localhost:3000/admin/categories
- **Gestione Prodotti**: http://localhost:3000/admin/products
- **Impostazioni**: http://localhost:3000/admin/settings

## ⚠️ Risoluzione Problemi

### Errore "Invalid connection string"
- Controlla che MongoDB sia avviato (se locale)
- Verifica username e password in MONGODB_URI

### Errore "Access denied" al login
- Verifica che l'email usata sia uguale a ADMIN_EMAIL
- Controlla le credenziali Google OAuth

### Errore upload immagini
- Verifica le credenziali Cloudinary
- Controlla che NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME sia corretto

## 📝 Note

- Solo l'email in `ADMIN_EMAIL` può accedere all'admin
- Le immagini vengono caricate su Cloudinary
- Il drag & drop funziona con mouse e touch
- Il design è responsive e ottimizzato per mobile

## 🎨 Personalizzazione

### Cambiare i colori oro
Modifica `tailwind.config.ts`:
```typescript
colors: {
  'gold': '#TUO_COLORE',
  'gold-light': '#TUO_COLORE_CHIARO',
}
```

### Cambiare font
Modifica `app/layout.tsx` importando un altro font da Google Fonts

---

**Buon lavoro! 🚀**
