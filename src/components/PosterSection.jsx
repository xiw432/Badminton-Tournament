import { useState, useEffect } from 'react';

/**
 * PosterSection component - Carousel for tournament posters with download and share
 * Features:
 * - Multiple poster carousel with next/prev navigation
 * - Dot indicators for position
 * - Hover effects with scale and glow
 * - Download poster PDF functionality
 * - WhatsApp sharing with pre-filled message
 * - Modal for zoomed poster view
 * - Touch gesture support for mobile swipe
 */
export default function PosterSection({ posters = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === 'Escape') closeModal();
        return;
      }
      if (e.key === 'ArrowLeft') prevPoster();
      if (e.key === 'ArrowRight') nextPoster();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentIndex, posters.length]);

  const nextPoster = () => {
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  const prevPoster = () => {
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const goToPoster = (index) => {
    setCurrentIndex(index);
  };

  const downloadPoster = () => {
    if (posters[currentIndex]?.pdf) {
      const link = document.createElement('a');
      link.href = posters[currentIndex].pdf;
      link.download = 'tournament-poster.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent('Join the SMAASH Badminton Tournament 🏸');
    const url = encodeURIComponent(window.location.href);
    const whatsappUrl = `https://wa.me/?text=${message}%20${url}`;
    window.open(whatsappUrl, '_blank');
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
    document.body.style.overflow = 'auto';
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextPoster();
    } else if (isRightSwipe) {
      prevPoster();
    }
  };

  // Handle empty posters array
  if (!posters || posters.length === 0) {
    return (
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.title}>Tournament Poster</h2>
          <div style={styles.placeholder}>
            <p style={styles.placeholderText}>No posters available</p>
          </div>
        </div>
      </section>
    );
  }

  const currentPoster = posters[currentIndex];

  return (
    <>
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.title}>Tournament Poster</h2>
          
          <div style={styles.carouselContainer}>
            {/* Navigation Buttons */}
            {posters.length > 1 && (
              <>
                <button
                  onClick={prevPoster}
                  style={styles.navButton}
                  className="poster-nav-btn prev"
                  aria-label="Previous poster"
                >
                  ‹
                </button>
                <button
                  onClick={nextPoster}
                  style={styles.navButton}
                  className="poster-nav-btn next"
                  aria-label="Next poster"
                >
                  ›
                </button>
              </>
            )}

            {/* Poster Display */}
            <div
              style={styles.posterWrapper}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                style={styles.posterImageContainer}
                className="poster-image-container"
                onClick={() => openModal(currentPoster.image)}
              >
                <img
                  src={currentPoster.image}
                  alt={currentPoster.alt || `Tournament Poster ${currentIndex + 1}`}
                  style={styles.posterImage}
                />
              </div>
            </div>

            {/* Dot Indicators */}
            {posters.length > 1 && (
              <div style={styles.dotsContainer}>
                {posters.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPoster(index)}
                    style={{
                      ...styles.dot,
                      ...(index === currentIndex ? styles.dotActive : {}),
                    }}
                    className="poster-dot"
                    aria-label={`Go to poster ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={styles.actionsContainer}>
            <button
              onClick={downloadPoster}
              style={styles.actionButton}
              className="poster-action-btn download"
              disabled={!currentPoster.pdf}
            >
              📥 Download Poster
            </button>
            <button
              onClick={shareOnWhatsApp}
              style={styles.actionButton}
              className="poster-action-btn share"
            >
              📱 Share on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Modal for Zoomed View */}
      {isModalOpen && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              style={styles.modalClose}
              className="modal-close"
              aria-label="Close modal"
            >
              ×
            </button>
            <img
              src={modalImage}
              alt="Zoomed poster view"
              style={styles.modalImage}
            />
          </div>
        </div>
      )}

      {/* Inline Styles for Hover Effects */}
      <style>{`
        .poster-image-container {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        
        .poster-image-container:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(245, 184, 0, 0.6);
        }

        .poster-nav-btn {
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .poster-nav-btn:hover {
          background-color: var(--yellow, #F5B800);
          color: var(--navy, #0B1D3A);
          transform: scale(1.1);
        }

        .poster-nav-btn:active {
          transform: scale(0.95);
        }

        .poster-dot {
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .poster-dot:hover {
          transform: scale(1.2);
        }

        .poster-action-btn {
          transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
        }

        .poster-action-btn:hover:not(:disabled) {
          background-color: var(--navy, #0B1D3A);
          color: var(--yellow, #F5B800);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(11, 29, 58, 0.3);
        }

        .poster-action-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .poster-action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .modal-close {
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .modal-close:hover {
          transform: rotate(90deg);
          color: var(--yellow, #F5B800);
        }

        @media (max-width: 768px) {
          .poster-nav-btn {
            width: 40px;
            height: 40px;
            font-size: 24px;
          }

          .poster-action-btn {
            font-size: 14px;
            padding: 10px 16px;
          }
        }
      `}</style>
    </>
  );
}

const styles = {
  section: {
    padding: '60px 20px',
    backgroundColor: '#f8f9fa',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '40px',
    color: 'var(--navy, #0B1D3A)',
    fontFamily: 'Bebas Neue, sans-serif',
  },
  carouselContainer: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '2px solid var(--yellow, #F5B800)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: 'var(--navy, #0B1D3A)',
    fontSize: '32px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1',
  },
  posterWrapper: {
    padding: '0 70px',
  },
  posterImageContainer: {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  posterImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '30px',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid var(--navy, #0B1D3A)',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
  },
  dotActive: {
    backgroundColor: 'var(--yellow, #F5B800)',
    borderColor: 'var(--yellow, #F5B800)',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '40px',
    flexWrap: 'wrap',
  },
  actionButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    border: '2px solid var(--navy, #0B1D3A)',
    borderRadius: '8px',
    backgroundColor: 'var(--yellow, #F5B800)',
    color: 'var(--navy, #0B1D3A)',
    cursor: 'pointer',
    fontFamily: 'Outfit, sans-serif',
  },
  placeholder: {
    padding: '60px 20px',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
    border: '2px dashed #ddd',
  },
  placeholderText: {
    fontSize: '18px',
    color: '#666',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
  modalClose: {
    position: 'absolute',
    top: '-40px',
    right: '0',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1',
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '90vh',
    borderRadius: '8px',
  },
};
