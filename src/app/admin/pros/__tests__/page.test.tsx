/**
 * @jest-environment jsdom
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminProsPage from '../page'

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
  MockLink.displayName = 'MockLink'
  return MockLink
})

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  }
  MockImage.displayName = 'MockImage'
  return MockImage
})

// Mock data
const mockPendingPros = [
  {
    id: 'uuid-1',
    user_id: 'user-1',
    slug: 'kim-soojin',
    title: 'KLPGA Professional',
    bio: 'Test bio',
    specialties: ['Putting', 'Short Game'],
    location: 'Seoul',
    tour_experience: 'KLPGA Tour 6 years',
    certifications: ['KLPGA Professional License'],
    hero_image_url: null,
    profile_image_url: 'https://example.com/image.jpg',
    gallery_images: [],
    video_url: null,
    instagram_username: null,
    youtube_channel_id: null,
    kakao_talk_id: null,
    profile_views: 0,
    monthly_chat_count: 0,
    total_leads: 0,
    matched_lessons: 0,
    rating: 0,
    subscription_tier: 'basic' as const,
    subscription_expires_at: null,
    is_approved: false,
    is_featured: false,
    created_at: '2025-11-23T14:30:00Z',
    updated_at: '2025-11-23T14:30:00Z',
    profiles: {
      full_name: 'Kim Soo-jin',
      avatar_url: null,
      phone: '010-1234-5678',
    },
  },
  {
    id: 'uuid-2',
    user_id: 'user-2',
    slug: 'lee-donghyun',
    title: 'PGA Master Professional',
    bio: 'Test bio 2',
    specialties: ['Driver Distance', 'TrackMan Analysis'],
    location: 'Busan',
    tour_experience: 'PGA Tour Coach 10+ years',
    certifications: ['PGA Master Professional Certificate'],
    hero_image_url: null,
    profile_image_url: 'https://example.com/image2.jpg',
    gallery_images: [],
    video_url: null,
    instagram_username: null,
    youtube_channel_id: null,
    kakao_talk_id: null,
    profile_views: 0,
    monthly_chat_count: 0,
    total_leads: 0,
    matched_lessons: 0,
    rating: 0,
    subscription_tier: 'basic' as const,
    subscription_expires_at: null,
    is_approved: false,
    is_featured: false,
    created_at: '2025-11-23T11:20:00Z',
    updated_at: '2025-11-23T11:20:00Z',
    profiles: {
      full_name: 'Lee Dong-hyun',
      avatar_url: null,
      phone: '010-2345-6789',
    },
  },
]

const mockApprovedPros = [
  {
    id: 'uuid-101',
    user_id: 'user-101',
    slug: 'hannah-park',
    title: 'LPGA Tour Professional',
    bio: 'Professional golfer',
    specialties: ['All Around'],
    location: 'Seoul',
    hero_image_url: null,
    profile_image_url: null,
    gallery_images: [],
    video_url: null,
    instagram_username: null,
    youtube_channel_id: null,
    kakao_talk_id: null,
    profile_views: 247,
    monthly_chat_count: 5,
    total_leads: 5,
    matched_lessons: 3,
    rating: 4.9,
    subscription_tier: 'basic' as const,
    subscription_expires_at: null,
    is_approved: true,
    is_featured: false,
    created_at: '2025-11-01T00:00:00Z',
    updated_at: '2025-11-01T00:00:00Z',
    profiles: {
      full_name: 'Hannah Park',
      avatar_url: null,
      phone: '010-1111-1111',
    },
  },
  {
    id: 'uuid-102',
    user_id: 'user-102',
    slug: 'james-kim',
    title: 'PGA Teaching Professional',
    bio: 'Teaching expert',
    specialties: ['Teaching'],
    location: 'Seoul',
    hero_image_url: null,
    profile_image_url: null,
    gallery_images: [],
    video_url: null,
    instagram_username: null,
    youtube_channel_id: null,
    kakao_talk_id: null,
    profile_views: 189,
    monthly_chat_count: 8,
    total_leads: 8,
    matched_lessons: 6,
    rating: 4.8,
    subscription_tier: 'pro' as const,
    subscription_expires_at: null,
    is_approved: true,
    is_featured: false,
    created_at: '2025-11-01T00:00:00Z',
    updated_at: '2025-11-01T00:00:00Z',
    profiles: {
      full_name: 'James Kim',
      avatar_url: null,
      phone: '010-2222-2222',
    },
  },
]

// Mock the API functions
const mockGetPending = jest.fn();
const mockGetApproved = jest.fn();
const mockApprove = jest.fn();
const mockReject = jest.fn();

jest.mock('@/lib/api/profiles', () => {
  return {
    __esModule: true,
    getPendingProProfiles: () => mockGetPending(),
    getApprovedProProfiles: () => mockGetApproved(),
    approveProProfile: (id: string) => mockApprove(id),
    rejectProProfile: (id: string) => mockReject(id),
  }
})

describe('Admin Pros Management Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetPending.mockReturnValue(Promise.resolve([...mockPendingPros]))
    mockGetApproved.mockReturnValue(Promise.resolve([...mockApprovedPros]))
    mockApprove.mockReturnValue(Promise.resolve({ ...mockPendingPros[0], is_approved: true }))
    mockReject.mockReturnValue(Promise.resolve(undefined))
  })

  describe('Loading State', () => {
    it('should show loading indicator initially', () => {
      render(<AdminProsPage />)
      expect(screen.getByText(/데이터를 불러오고 있어요/i)).toBeInTheDocument()
    })
  })

  describe('Pending Applications', () => {
    it('should render pending pro applications list', async () => {
      render(<AdminProsPage />)

      await waitFor(() => {
        expect(screen.getByText(/승인 대기 중/i)).toBeInTheDocument()
      })

      expect(screen.getByText(/Kim Soo-jin/i)).toBeInTheDocument()
      expect(screen.getByText(/Lee Dong-hyun/i)).toBeInTheDocument()
    })

    it('should show pro details including specialties', async () => {
      render(<AdminProsPage />)

      await waitFor(() => {
        expect(screen.getByText(/Putting/i)).toBeInTheDocument()
      })

      expect(screen.getByText(/TrackMan Analysis/i)).toBeInTheDocument()
    })

    it('should have approve and reject buttons for each pending pro', async () => {
      render(<AdminProsPage />)

      await waitFor(() => {
        const approveButtons = screen.getAllByRole('button', { name: /승인/i })
        expect(approveButtons).toHaveLength(2)
      })

      const rejectButtons = screen.getAllByRole('button', { name: /거부/i })
      expect(rejectButtons).toHaveLength(2)
    })

    it('should approve a pro when approve button is clicked', async () => {
      const user = userEvent.setup()

      // Setup mock to return updated data after approval
      mockGetPending
        .mockResolvedValueOnce([...mockPendingPros])
        .mockResolvedValueOnce([mockPendingPros[1]])
      mockGetApproved
        .mockResolvedValueOnce([...mockApprovedPros])
        .mockResolvedValueOnce([...mockApprovedPros, { ...mockPendingPros[0], is_approved: true }])

      render(<AdminProsPage />)

      await waitFor(() => {
        expect(screen.getByText(/Kim Soo-jin/i)).toBeInTheDocument()
      })

      const approveButtons = screen.getAllByRole('button', { name: /승인/i })
      await user.click(approveButtons[0])

      await waitFor(() => {
        expect(mockApprove).toHaveBeenCalledWith('uuid-1')
      })
    })

    it('should reject a pro when reject button is clicked', async () => {
      const user = userEvent.setup()
      render(<AdminProsPage />)

      await waitFor(() => {
        expect(screen.getByText(/Kim Soo-jin/i)).toBeInTheDocument()
      })

      const rejectButtons = screen.getAllByRole('button', { name: /거부/i })
      await user.click(rejectButtons[0])

      await waitFor(() => {
        expect(mockReject).toHaveBeenCalledWith('uuid-1')
      })
    })

    it('should show empty state when no pending applications', async () => {
      mockGetPending.mockResolvedValue([])
      render(<AdminProsPage />)

      await waitFor(() => {
        expect(screen.getByText(/대기 중인 신청이 없습니다/i)).toBeInTheDocument()
      })
    })
  })

  describe('Approved Pros', () => {
    it('should render approved pros list', async () => {
      render(<AdminProsPage />)

      await waitFor(() => {
        expect(screen.getByText(/Hannah Park/i)).toBeInTheDocument()
      }, { timeout: 3000 })

      expect(screen.getByText(/James Kim/i)).toBeInTheDocument()
    })

    it('should show pro statistics', async () => {
      render(<AdminProsPage />)

      await waitFor(() => {
        expect(screen.getByText('247')).toBeInTheDocument()
      })

      expect(screen.getByText('189')).toBeInTheDocument()
    })

    it('should show subscription tier badges', async () => {
      render(<AdminProsPage />)

      await waitFor(() => {
        const basicBadges = screen.getAllByText(/Basic/i)
        expect(basicBadges.length).toBeGreaterThan(0)
      })

      const proBadges = screen.getAllByText(/Pro/i)
      expect(proBadges.length).toBeGreaterThan(0)
    })

    it('should have manage button for each approved pro', async () => {
      render(<AdminProsPage />)

      await waitFor(() => {
        const allLinks = screen.getAllByRole('link')
        const manageButtons = allLinks.filter(link => link.textContent === '관리')
        expect(manageButtons).toHaveLength(2)
      })
    })
  })

  describe('Error Handling', () => {
    it('should show error message when API fails', async () => {
      mockGetPending.mockRejectedValue(new Error('API Error'))
      render(<AdminProsPage />)

      await waitFor(() => {
        expect(screen.getByText(/API Error/i)).toBeInTheDocument()
      })
    })
  })

  describe('Navigation', () => {
    it('should have navigation tabs', async () => {
      render(<AdminProsPage />)

      await waitFor(() => {
        expect(screen.getByText(/Kim Soo-jin/i)).toBeInTheDocument()
      })

      const navLinks = screen.getAllByRole('link')
      const navTexts = navLinks.map(link => link.textContent)

      expect(navTexts).toContain('대시보드')
      expect(navTexts).toContain('프로 관리')
      expect(navTexts).toContain('채팅 관리')
      expect(navTexts).toContain('사용자 관리')
      expect(navTexts).toContain('분석')
    })

    it('should have back to dashboard link', async () => {
      render(<AdminProsPage />)

      await waitFor(() => {
        expect(screen.getByText(/Kim Soo-jin/i)).toBeInTheDocument()
      })

      const backLink = screen.getByRole('link', { name: /← 대시보드/i })
      expect(backLink).toHaveAttribute('href', '/admin')
    })
  })
})