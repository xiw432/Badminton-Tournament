# SMAASH Badminton Tournament 2026

A modern, responsive web application for badminton tournament registration with multi-category eligibility, real-time fee calculation, and integrated payment processing.

## 🏸 Tournament Details

- **Event**: SMAASH Badminton Tournament
- **Dates**: April 24-26, 2026
- **Location**: Gopi Nath Laxman Das Rastogi Inter College, Aishbagh, Lucknow
- **Categories**: U-9, U-11, U-13, U-15

## ✨ Features

### Multi-Category Registration
- Players can register for events in their base age category AND all higher categories
- Automatic eligibility calculation based on date of birth
- Dynamic event selection with real-time fee updates

### Event Types
- Boys Singles & Girls Singles (All categories)
- Boys Doubles & Girls Doubles (All categories)
- Mixed Doubles (U-13 & U-15 only)

### User Experience
- Clean, modern UI with tournament branding (Navy & Yellow theme)
- Mobile-responsive design
- Real-time form validation
- QR code generation for payment
- Downloadable tournament poster
- WhatsApp sharing integration

### Technical Features
- React 18 with Vite
- Client-side routing
- State persistence across pages
- Comprehensive test coverage
- Supabase integration ready
- Accessibility compliant (WCAG 2.1 Level AA)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Smash
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your Supabase credentials
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## 📁 Project Structure

```
Smash/
├── public/              # Static assets
│   ├── poster.svg      # Tournament poster (display)
│   └── poster.pdf      # Tournament poster (download)
├── src/
│   ├── components/     # Reusable components
│   │   ├── EventSelector.jsx
│   │   ├── FormFields.jsx
│   │   ├── Navbar.jsx
│   │   ├── PosterSection.jsx
│   │   └── QRDisplay.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Register.jsx
│   │   ├── Payment.jsx
│   │   ├── Confirm.jsx
│   │   └── Rules.jsx
│   ├── utils/          # Utility functions
│   │   ├── category.js
│   │   ├── events.js
│   │   ├── fee.js
│   │   └── qr.js
│   ├── examples/       # Supabase examples
│   ├── styles/         # Global styles
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── supabase/           # Supabase configuration
│   └── migrations/     # Database migrations
└── .kiro/              # Kiro specs and configuration
```

## 🧪 Testing

Run tests:
```bash
npm test
```

Run specific test suites:
```bash
# Component tests
npm test EventSelector.test.jsx

# E2E tests
npm test App.e2e
```

## 💾 Supabase Integration

This project includes Supabase integration for backend functionality:

1. **Setup Supabase** (optional):
   - Follow instructions in `SUPABASE_SETUP.md`
   - Run migrations: `supabase db push`

2. **Features Available**:
   - Store tournament registrations
   - Real-time updates
   - User authentication (ready to implement)

## 📋 Registration Flow

1. **Home Page**: View tournament details, schedule, and prizes
2. **Rules Page**: Review age eligibility and tournament rules
3. **Register Page**: 
   - Enter player details (name, DOB, gender)
   - Select events from eligible categories
   - View real-time fee calculation
4. **Payment Page**: 
   - Review registration details
   - Scan QR code for payment
   - Enter transaction ID
5. **Confirmation Page**: 
   - Receive player ID
   - Download/share registration details

## 🎨 Design System

- **Primary Colors**: Navy (#0B1D3A) and Yellow (#F5B800)
- **Typography**: Bebas Neue (display), Outfit (body)
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG 2.1 Level AA compliant

## 📱 Contact

For tournament inquiries:
- 📞 7052416803
- 📞 9839174810
- 📞 97953100021

## 📄 License

This project is created for the SMAASH Badminton Tournament 2026.

## 🙏 Acknowledgments

- Built with React and Vite
- Powered by Supabase
- Developed with Kiro AI
