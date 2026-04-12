import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PosterSection from './PosterSection.jsx';

describe('PosterSection Component', () => {
  const mockPosters = [
    {
      image: '/assets/poster1.png',
      pdf: '/assets/poster1.pdf',
      alt: 'Tournament Poster 1',
    },
    {
      image: '/assets/poster2.png',
      pdf: '/assets/poster2.pdf',
      alt: 'Tournament Poster 2',
    },
  ];

  beforeEach(() => {
    // Mock window.open for WhatsApp sharing
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render with posters', () => {
    render(<PosterSection posters={mockPosters} />);
    expect(screen.getByText('Tournament Posters')).toBeInTheDocument();
    expect(screen.getByAltText('Tournament Poster 1')).toBeInTheDocument();
  });

  it('should render placeholder when no posters provided', () => {
    render(<PosterSection posters={[]} />);
    expect(screen.getByText('No posters available')).toBeInTheDocument();
  });

  it('should navigate to next poster when next button clicked', () => {
    render(<PosterSection posters={mockPosters} />);
    
    const nextButton = screen.getByLabelText('Next poster');
    fireEvent.click(nextButton);
    
    expect(screen.getByAltText('Tournament Poster 2')).toBeInTheDocument();
  });

  it('should navigate to previous poster when prev button clicked', () => {
    render(<PosterSection posters={mockPosters} />);
    
    // Go to second poster first
    const nextButton = screen.getByLabelText('Next poster');
    fireEvent.click(nextButton);
    
    // Then go back
    const prevButton = screen.getByLabelText('Previous poster');
    fireEvent.click(prevButton);
    
    expect(screen.getByAltText('Tournament Poster 1')).toBeInTheDocument();
  });

  it('should navigate using dot indicators', () => {
    render(<PosterSection posters={mockPosters} />);
    
    const dots = screen.getAllByLabelText(/Go to poster/);
    fireEvent.click(dots[1]);
    
    expect(screen.getByAltText('Tournament Poster 2')).toBeInTheDocument();
  });

  it('should open modal when poster is clicked', () => {
    render(<PosterSection posters={mockPosters} />);
    
    const posterImage = screen.getByAltText('Tournament Poster 1');
    fireEvent.click(posterImage);
    
    expect(screen.getByAltText('Zoomed poster view')).toBeInTheDocument();
  });

  it('should close modal when close button clicked', () => {
    render(<PosterSection posters={mockPosters} />);
    
    // Open modal
    const posterImage = screen.getByAltText('Tournament Poster 1');
    fireEvent.click(posterImage);
    
    // Close modal
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    
    expect(screen.queryByAltText('Zoomed poster view')).not.toBeInTheDocument();
  });

  it('should close modal when Escape key pressed', () => {
    render(<PosterSection posters={mockPosters} />);
    
    // Open modal
    const posterImage = screen.getByAltText('Tournament Poster 1');
    fireEvent.click(posterImage);
    
    // Press Escape
    fireEvent.keyDown(window, { key: 'Escape' });
    
    expect(screen.queryByAltText('Zoomed poster view')).not.toBeInTheDocument();
  });

  it('should download poster when download button clicked', () => {
    // Mock document.createElement and appendChild
    const mockLink = {
      href: '',
      download: '',
      click: vi.fn(),
    };
    vi.spyOn(document, 'createElement').mockReturnValue(mockLink);
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});
    vi.spyOn(document.body, 'removeChild').mockImplementation(() => {});

    render(<PosterSection posters={mockPosters} />);
    
    const downloadButton = screen.getByText(/Download Poster/);
    fireEvent.click(downloadButton);
    
    expect(mockLink.href).toBe('/assets/poster1.pdf');
    expect(mockLink.download).toBe('tournament-poster.pdf');
    expect(mockLink.click).toHaveBeenCalled();
  });

  it('should open WhatsApp share when share button clicked', () => {
    render(<PosterSection posters={mockPosters} />);
    
    const shareButton = screen.getByText(/Share on WhatsApp/);
    fireEvent.click(shareButton);
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank'
    );
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('Join%20the%20SMAASH%20Badminton%20Tournament'),
      '_blank'
    );
  });

  it('should handle keyboard navigation with arrow keys', () => {
    render(<PosterSection posters={mockPosters} />);
    
    // Navigate right
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByAltText('Tournament Poster 2')).toBeInTheDocument();
    
    // Navigate left
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByAltText('Tournament Poster 1')).toBeInTheDocument();
  });

  it('should handle touch swipe gestures', () => {
    render(<PosterSection posters={mockPosters} />);
    
    const posterWrapper = screen.getByAltText('Tournament Poster 1').closest('div').parentElement;
    
    // Simulate left swipe (next)
    fireEvent.touchStart(posterWrapper, {
      targetTouches: [{ clientX: 200 }],
    });
    fireEvent.touchMove(posterWrapper, {
      targetTouches: [{ clientX: 100 }],
    });
    fireEvent.touchEnd(posterWrapper);
    
    expect(screen.getByAltText('Tournament Poster 2')).toBeInTheDocument();
  });

  it('should wrap around to first poster when navigating past last', () => {
    render(<PosterSection posters={mockPosters} />);
    
    const nextButton = screen.getByLabelText('Next poster');
    
    // Go to last poster
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Tournament Poster 2')).toBeInTheDocument();
    
    // Go past last poster, should wrap to first
    fireEvent.click(nextButton);
    expect(screen.getByAltText('Tournament Poster 1')).toBeInTheDocument();
  });

  it('should disable download button when no PDF available', () => {
    const postersNoPdf = [
      {
        image: '/assets/poster1.png',
        pdf: null,
        alt: 'Tournament Poster 1',
      },
    ];
    
    render(<PosterSection posters={postersNoPdf} />);
    
    const downloadButton = screen.getByText(/Download Poster/);
    expect(downloadButton).toBeDisabled();
  });

  it('should not show navigation buttons when only one poster', () => {
    const singlePoster = [mockPosters[0]];
    
    render(<PosterSection posters={singlePoster} />);
    
    expect(screen.queryByLabelText('Next poster')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Previous poster')).not.toBeInTheDocument();
  });

  it('should not show dot indicators when only one poster', () => {
    const singlePoster = [mockPosters[0]];
    
    render(<PosterSection posters={singlePoster} />);
    
    expect(screen.queryByLabelText(/Go to poster/)).not.toBeInTheDocument();
  });
});
