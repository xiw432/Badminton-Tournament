# Badminton Tournament Application - Source Structure

This directory contains the refactored modular React application for the SMAASH Badminton Tournament registration system.

## Directory Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx              # Fixed navigation bar with scroll effects
│   ├── PosterSection.jsx       # Poster carousel with download/share
│   ├── EventSelector.jsx       # Event selection with auto-assignment
│   ├── FormFields.jsx          # Reusable form input components
│   └── QRDisplay.jsx           # QR code display component
│
├── pages/              # Page-level components
│   ├── Home.jsx                # Landing page with tournament info
│   ├── Rules.jsx               # Rules and regulations page
│   ├── Register.jsx            # Registration form page
│   ├── Payment.jsx             # Payment processing page
│   └── Confirm.jsx             # Confirmation page with QR code
│
├── utils/              # Business logic modules (pure functions)
│   ├── category.js             # Age category determination
│   ├── events.js               # Event selection logic
│   ├── fee.js                  # Fee calculation
│   └── qr.js                   # QR code generation
│
├── styles/             # Global styles
│   └── global.css              # CSS variables and responsive styles
│
├── assets/             # Static assets
│   └── .gitkeep                # Placeholder (add poster.png and poster.pdf here)
│
└── App.jsx             # Main application component with routing
```

## Implementation Status

Task 1: ✅ Project structure and placeholder files created

## Next Steps

1. Implement utility modules (category, events, fee, qr)
2. Create shared components (FormFields, Navbar, PosterSection, etc.)
3. Build page components (Home, Rules, Register, Payment, Confirm)
4. Wire everything together in App.jsx
5. Add global styles and responsive design

## Notes

- All placeholder files contain TODO comments indicating what needs to be implemented
- Utility modules should be implemented first as they contain the business logic
- Components depend on utility modules for calculations and data processing
- The assets directory is ready for poster.png and poster.pdf when available
