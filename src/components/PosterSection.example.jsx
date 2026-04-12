/**
 * Example usage of PosterSection component
 * This file demonstrates how to integrate the PosterSection into your application
 */

import PosterSection from './PosterSection';

// Example 1: Single Poster
export function SinglePosterExample() {
  const posters = [
    {
      image: '/assets/poster-placeholder.svg',
      pdf: '/assets/poster.pdf',
      alt: 'SMAASH Badminton Tournament 2026'
    }
  ];

  return (
    <div>
      <h1>Single Poster Example</h1>
      <PosterSection posters={posters} />
    </div>
  );
}

// Example 2: Multiple Posters with Carousel
export function MultiPosterExample() {
  const posters = [
    {
      image: '/assets/poster-placeholder.svg',
      pdf: '/assets/main-poster.pdf',
      alt: 'Main Tournament Poster'
    },
    {
      image: '/assets/poster-placeholder.svg',
      pdf: '/assets/schedule-poster.pdf',
      alt: 'Tournament Schedule'
    },
    {
      image: '/assets/poster-placeholder.svg',
      pdf: '/assets/rules-poster.pdf',
      alt: 'Rules and Regulations'
    }
  ];

  return (
    <div>
      <h1>Multiple Posters with Carousel</h1>
      <PosterSection posters={posters} />
    </div>
  );
}

// Example 3: Integration in Home Page
export function HomePageExample() {
  const tournamentPosters = [
    {
      image: '/assets/poster-placeholder.svg',
      pdf: '/assets/poster.pdf',
      alt: 'SMAASH Badminton Tournament'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h1>SMAASH Badminton Tournament 2026</h1>
        <p>Join us for an exciting tournament!</p>
      </section>

      {/* Poster Section */}
      <PosterSection posters={tournamentPosters} />

      {/* Other sections... */}
      <section style={{ padding: '60px 20px' }}>
        <h2>Tournament Details</h2>
        <p>More information here...</p>
      </section>
    </div>
  );
}

// Example 4: Empty State (No Posters)
export function EmptyStateExample() {
  return (
    <div>
      <h1>Empty State Example</h1>
      <PosterSection posters={[]} />
    </div>
  );
}

// Example 5: Posters without PDF (Download disabled)
export function NoPdfExample() {
  const posters = [
    {
      image: '/assets/poster-placeholder.svg',
      pdf: null, // No PDF available
      alt: 'Tournament Poster (Image Only)'
    }
  ];

  return (
    <div>
      <h1>Poster without PDF</h1>
      <p>Download button will be disabled</p>
      <PosterSection posters={posters} />
    </div>
  );
}

// Example 6: Dynamic Posters (from API or state)
export function DynamicPostersExample() {
  // In a real app, this might come from an API or state management
  const [posters, setPosters] = React.useState([
    {
      image: '/assets/poster-placeholder.svg',
      pdf: '/assets/poster.pdf',
      alt: 'Tournament Poster'
    }
  ]);

  const addPoster = () => {
    setPosters([
      ...posters,
      {
        image: '/assets/poster-placeholder.svg',
        pdf: '/assets/new-poster.pdf',
        alt: `Tournament Poster ${posters.length + 1}`
      }
    ]);
  };

  return (
    <div>
      <h1>Dynamic Posters Example</h1>
      <button onClick={addPoster}>Add Poster</button>
      <PosterSection posters={posters} />
    </div>
  );
}

// Example 7: Full Page Integration
export function FullPageExample() {
  const posters = [
    {
      image: '/assets/poster-placeholder.svg',
      pdf: '/assets/poster.pdf',
      alt: 'SMAASH Badminton Tournament'
    }
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{ 
        padding: '20px', 
        backgroundColor: '#0B1D3A', 
        color: '#F5B800' 
      }}>
        <h1>SMAASH Tournament</h1>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero */}
        <section style={{ 
          padding: '80px 20px', 
          textAlign: 'center',
          backgroundColor: '#0B1D3A',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
            SMAASH Badminton Tournament 2026
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#F5B800' }}>
            Lucknow's Premier Badminton Event
          </p>
        </section>

        {/* Poster Section */}
        <PosterSection posters={posters} />

        {/* Categories */}
        <section style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2>Age Categories</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            maxWidth: '1200px',
            margin: '40px auto'
          }}>
            <div style={{ padding: '20px', border: '2px solid #0B1D3A', borderRadius: '8px' }}>
              <h3>U-9</h3>
              <p>Born on or after Jan 1, 2018</p>
            </div>
            <div style={{ padding: '20px', border: '2px solid #0B1D3A', borderRadius: '8px' }}>
              <h3>U-11</h3>
              <p>Born on or after Jan 1, 2016</p>
            </div>
            <div style={{ padding: '20px', border: '2px solid #0B1D3A', borderRadius: '8px' }}>
              <h3>U-13</h3>
              <p>Born on or after Jan 1, 2014</p>
            </div>
            <div style={{ padding: '20px', border: '2px solid #0B1D3A', borderRadius: '8px' }}>
              <h3>U-15</h3>
              <p>Born on or after Jan 1, 2012</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ 
          padding: '60px 20px', 
          textAlign: 'center',
          backgroundColor: '#F5B800'
        }}>
          <h2 style={{ color: '#0B1D3A', marginBottom: '20px' }}>
            Ready to Register?
          </h2>
          <button style={{
            padding: '15px 40px',
            fontSize: '18px',
            backgroundColor: '#0B1D3A',
            color: '#F5B800',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Register Now
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ 
        padding: '40px 20px', 
        backgroundColor: '#0B1D3A', 
        color: 'white',
        textAlign: 'center'
      }}>
        <p>© 2026 SMAASH Badminton Tournament</p>
      </footer>
    </div>
  );
}

export default PosterSection;
