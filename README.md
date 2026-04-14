# SMAASH Badminton Tournament 2026

A full-stack tournament registration website built with **Vite + React** (frontend) and **Vercel API Routes + Supabase** (backend).

---

## Project Structure

```
smaash-badminton-tournament/
│
├── api/                          # Vercel Serverless API Routes (backend)
│   ├── register-player.js        # POST /api/register-player
│   └── get-admit-card.js         # GET|POST /api/get-admit-card
│
├── lib/                          # Shared backend utilities
│   ├── supabase.js               # Supabase admin client
│   ├── pdf.js                    # Admit card PDF generator (pdf-lib)
│   └── email.js                  # Email sender (Resend API)
│
├── src/                          # Frontend (Vite + React)
│   │
│   ├── pages/                    # Page components
│   │   ├── Home.jsx              # Landing page
│   │   ├── Register.jsx          # Registration form
│   │   ├── Confirm.jsx           # Post-registration confirmation
│   │   ├── AdmitCard.jsx         # Admit card viewer & downloader
│   │   ├── Rules.jsx             # Tournament rules
│   │   └── Payment.jsx           # (Legacy - cash only now)
│   │
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── FormFields.jsx        # Shared form input components
│   │   ├── EventSelector.jsx     # Event selection with category logic
│   │   ├── ImageUpload.jsx       # Photo upload with crop functionality
│   │   ├── PosterSection.jsx     # Tournament poster display
│   │   ├── WhatsAppButton.jsx    # Floating WhatsApp join button
│   │   ├── WhatsAppModal.jsx     # WhatsApp group modal
│   │   ├── WhatsAppSection.jsx   # WhatsApp section component
│   │   └── QRDisplay.jsx         # QR code display (legacy)
│   │
│   ├── utils/                    # Frontend utility functions
│   │   ├── category.js           # Age category calculation (U-9/11/13/15)
│   │   ├── events.js             # Event definitions and eligibility
│   │   ├── fee.js                # Registration fee calculation
│   │   ├── pdf.js                # Client-side PDF helpers
│   │   ├── qr.js                 # QR code generation
│   │   ├── email.js              # Client-side email utilities
│   │   └── cropImage.js          # Image crop helper (react-easy-crop)
│   │
│   ├── styles/
│   │   ├── global.css            # Global styles
│   │   └── print.css             # Print styles for admit card
│   │
│   ├── config/
│   │   └── email.js              # Email configuration
│   │
│   ├── assets/
│   │   └── poster-placeholder.svg
│   │
│   ├── App.jsx                   # Root component & client-side router
│   ├── main.jsx                  # React entry point
│   └── supabaseClient.js         # Supabase browser client
│
├── supabase/
│   └── migrations/               # SQL migration files
│       ├── 00001_create_items_table.sql
│       ├── 00002_create_registrations_table.sql
│       ├── 00003_add_photo_url_to_registrations.sql
│       ├── 00004_create_player_photos_bucket.sql
│       ├── 00005_add_missing_columns.sql
│       ├── 00007_insert_test_data.sql
│       └── 00008_create_players_table.sql
│
├── public/
│   ├── poster.pdf                # Tournament poster PDF
│   └── poster.svg                # Tournament poster SVG
│
├── index.html                    # Vite HTML entry point
├── vite.config.js                # Vite configuration
├── vercel.json                   # Vercel deployment config
├── package.json                  # Dependencies & scripts
└── .env.local                    # Local environment variables (git-ignored)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | Inline styles (design tokens) |
| Backend | Vercel Serverless Functions |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| PDF | pdf-lib |
| Email | Resend API |
| Photo Crop | react-easy-crop |
| Deployment | Vercel |

---

## Registration Flow

```
User fills form
      ↓
POST /api/register-player
      ↓
┌─────────────────────────────┐
│ 1. Validate inputs          │
│ 2. Check duplicate email    │
│ 3. Insert into players DB   │
│ 4. Generate PDF (pdf-lib)   │
│ 5. Upload PDF to Storage    │
│ 6. Save pdf_url in DB       │
│ 7. Send email (Resend)      │
└─────────────────────────────┘
      ↓
Confirm page → View Admit Card
```

---

## API Routes

### `POST /api/register-player`
Registers a new player.

**Request body:**
```json
{
  "name": "Player Name",
  "email": "player@email.com",
  "phone": "9876543210",
  "dob": "2015-06-15",
  "gender": "Male",
  "category": "U-11",
  "parentName": "Parent Name",
  "address": "Full address",
  "events": [{ "name": "U-11 Boys Singles", "fee": 600 }],
  "totalFee": 600,
  "photoUrl": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "playerId": "LKO2026-4821",
    "name": "Player Name",
    "email": "player@email.com",
    "category": "U-11",
    "pdfUrl": "https://..."
  }
}
```

---

### `GET /api/get-admit-card?playerId=LKO2026-XXXX`
### `POST /api/get-admit-card` with `{ email }` or `{ phone }`

Returns full player data and PDF URL.

---

## Environment Variables

Set these in **Vercel → Settings → Environment Variables**:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=re_your_key
FROM_EMAIL=SMAASH Tournament <onboarding@resend.dev>
WHATSAPP_GROUP_LINK=https://chat.whatsapp.com/LvJAdEzyiCS1KJFh5axE1P
SITE_URL=https://your-project.vercel.app
```

---

## Supabase Setup

### players table
```sql
create table players (
  id              uuid primary key default gen_random_uuid(),
  player_id       text unique not null,
  name            text not null,
  email           text unique not null,
  phone           text not null,
  dob             date,
  gender          text,
  category        text,
  parent_name     text,
  address         text,
  events          jsonb,
  total_fee       integer default 0,
  photo_url       text,
  pdf_url         text,
  payment_mode    text default 'cash',
  payment_status  text default 'pending',
  created_at      timestamptz default now()
);
```

### Storage bucket
- Name: `player-documents`
- Access: **Public**

---

## Local Development

```bash
# Install dependencies
npm install

# Start frontend dev server
npm run dev

# Run tests
npm test
```

> API routes require Vercel CLI for local testing:
> ```bash
> npm i -g vercel
> vercel dev
> ```

---

## Deployment

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Vite and the `/api` folder

---

## Tournament Details

- **Name:** SMAASH Badminton Tournament 2026
- **Dates:** April 24–26, 2026
- **Venue:** Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow
- **Categories:** U-9, U-11, U-13, U-15
- **Payment:** Cash only (paid to Coach)
- **Contact:** 7052416803 | 9839174810 | 97953100021
