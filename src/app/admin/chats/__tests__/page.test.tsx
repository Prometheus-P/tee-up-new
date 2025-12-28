/**
 * @jest-environment jsdom
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminChatsPage from '../page'

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
  MockLink.displayName = 'MockLink'
  return MockLink
})

// Mock data
const mockFlaggedMessages = [
  {
    id: 'msg-1',
    room_id: 'room-1',
    sender_id: 'user-1',
    content: '다른 플랫폼에서 연락주세요. 카톡 ID: abc123',
    is_flagged: true,
    flag_reason: 'Off-platform contact attempt',
    created_at: '2025-11-24T12:20:00Z',
    sender: { full_name: 'Unknown User' },
  },
  {
    id: 'msg-2',
    room_id: 'room-2',
    sender_id: 'user-2',
    content: '돈 먼저 입금하시면 스케줄 잡아드릴게요.',
    is_flagged: true,
    flag_reason: 'Potential scam - upfront payment request',
    created_at: '2025-11-23T16:45:00Z',
    sender: { full_name: 'Pro Lee' },
  },
]

const mockChatRooms = [
  {
    id: 'room-1',
    pro_id: 'pro-101',
    golfer_id: 'golfer-1',
    status: 'active' as const,
    created_at: '2025-11-23T10:15:00Z',
    updated_at: '2025-11-24T14:32:00Z',
    pro_profile: {
      full_name: 'Hannah Park',
      avatar_url: null,
      phone: '010-1111-1111',
    },
    golfer_profile: {
      full_name: 'Park Ji-sung',
      avatar_url: null,
      phone: '010-9876-5432',
    },
    last_message: {
      content: '다음 주 화요일 오후 2시 가능할까요?',
      created_at: '2025-11-24T14:32:00Z',
    },
    unread_count: 2,
  },
  {
    id: 'room-2',
    pro_id: 'pro-102',
    golfer_id: 'golfer-2',
    status: 'matched' as const,
    created_at: '2025-11-22T15:30:00Z',
    updated_at: '2025-11-24T13:15:00Z',
    pro_profile: {
      full_name: 'James Kim',
      avatar_url: null,
      phone: '010-2222-2222',
    },
    golfer_profile: {
      full_name: 'Kim Min-jae',
      avatar_url: null,
      phone: '010-8765-4321',
    },
    last_message: {
      content: '감사합니다. 확인했습니다.',
      created_at: '2025-11-24T13:15:00Z',
    },
    unread_count: 0,
  },
]

const mockChatStats = {
  total_rooms: 156,
  active_rooms: 23,
  matched_rooms: 89,
  flagged_messages: 3,
}

// Mock functions
const mockGetFlaggedMessages = jest.fn();
const mockDismissFlaggedMessage = jest.fn();
const mockDeleteFlaggedMessage = jest.fn();
const mockGetAllChatRooms = jest.fn();
const mockGetChatStats = jest.fn();
const mockUpdateChatRoomStatus = jest.fn();

jest.mock('@/lib/api/chat', () => ({
  __esModule: true,
  getFlaggedMessages: () => mockGetFlaggedMessages(),
  dismissFlaggedMessage: (id: string) => mockDismissFlaggedMessage(id),
  deleteFlaggedMessage: (id: string) => mockDeleteFlaggedMessage(id),
  getAllChatRooms: () => mockGetAllChatRooms(),
  getChatStats: () => mockGetChatStats(),
  updateChatRoomStatus: (roomId: string, status: string) =>
    mockUpdateChatRoomStatus(roomId, status),
}))

describe('Admin Chats Management Page', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockGetFlaggedMessages.mockResolvedValue([...mockFlaggedMessages])
    mockGetAllChatRooms.mockResolvedValue([...mockChatRooms])
    mockGetChatStats.mockResolvedValue({ ...mockChatStats })
    mockDismissFlaggedMessage.mockResolvedValue(undefined)
    mockDeleteFlaggedMessage.mockResolvedValue(undefined)
    mockUpdateChatRoomStatus.mockResolvedValue({})
  })

  describe('Loading State', () => {
    it('should show loading indicator initially', () => {
      render(<AdminChatsPage />)
      expect(screen.getByText(/데이터를 불러오는 중/i)).toBeInTheDocument()
    })
  })

  describe('Stats Overview', () => {
    it('should render chat statistics', async () => {
      render(<AdminChatsPage />)

      await waitFor(
        () => {
          expect(screen.getAllByText(/전체 채팅방/i).length).toBeGreaterThan(0)
        },
        { timeout: 3000 }
      )

      expect(screen.getAllByText('156').length).toBeGreaterThan(0)
      expect(screen.getByText(/활성 대화/i)).toBeInTheDocument()
      expect(screen.getAllByText('23').length).toBeGreaterThan(0)
      expect(screen.getAllByText(/매칭 완료/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText('89').length).toBeGreaterThan(0)
    })
  })

  describe('Flagged Messages', () => {
    it('should render flagged messages list', async () => {
      render(<AdminChatsPage />)

      await waitFor(
        () => {
          expect(screen.getByText(/신고된 메시지 \(\d+\)/i)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      expect(screen.getByText(/Unknown User/i)).toBeInTheDocument()
      expect(screen.getByText(/Pro Lee/i)).toBeInTheDocument()
    })

    it('should show flagged message content and reason', async () => {
      render(<AdminChatsPage />)

      await waitFor(
        () => {
          expect(screen.getByText(/다른 플랫폼에서 연락주세요/i)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      expect(screen.getByText(/Off-platform contact attempt/i)).toBeInTheDocument()
      expect(screen.getByText(/Potential scam - upfront payment request/i)).toBeInTheDocument()
    })

    it('should have action buttons for each flagged message', async () => {
      render(<AdminChatsPage />)

      await waitFor(
        () => {
          const actionButtons = screen.getAllByRole('button', { name: /조치/i })
          expect(actionButtons).toHaveLength(2)
        },
        { timeout: 3000 }
      )

      const dismissButtons = screen.getAllByRole('button', { name: /무시/i })
      expect(dismissButtons).toHaveLength(2)
    })

    it('should take action on flagged message when action button clicked', async () => {
      const user = userEvent.setup()

      // Setup mock to return updated data after action
      mockGetFlaggedMessages
        .mockResolvedValueOnce([...mockFlaggedMessages])
        .mockResolvedValueOnce([mockFlaggedMessages[1]])

      render(<AdminChatsPage />)

      await waitFor(
        () => {
          expect(screen.getByText(/Unknown User/i)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const actionButtons = screen.getAllByRole('button', { name: /조치/i })
      await user.click(actionButtons[0])

      await waitFor(() => {
        expect(mockDeleteFlaggedMessage).toHaveBeenCalledWith('msg-1')
      })
    })

    it('should dismiss flagged message when dismiss button clicked', async () => {
      const user = userEvent.setup()
      render(<AdminChatsPage />)

      await waitFor(
        () => {
          expect(screen.getAllByText(/Unknown User/i).length).toBeGreaterThan(0)
        },
        { timeout: 5000 }
      )

      const dismissButtons = screen.getAllByRole('button', { name: /무시/i })
      await user.click(dismissButtons[0])

      await waitFor(() => {
        expect(mockDismissFlaggedMessage).toHaveBeenCalledWith('msg-1')
      })
    })

    it('should disable buttons while processing', async () => {
      const user = userEvent.setup()

      // Make delete take longer so we can check disabled state
      let resolveDelete: (value?: unknown) => void = () => {}
      mockDeleteFlaggedMessage.mockImplementation(
        () => new Promise((resolve) => { resolveDelete = resolve })
      )

      render(<AdminChatsPage />)

      await waitFor(
        () => {
          expect(screen.getByText(/Unknown User/i)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      const actionButtons = screen.getAllByRole('button', { name: /조치/i })

      // Click action button
      await user.click(actionButtons[0])

      // Button should be disabled while processing
      await waitFor(() => {
        expect(actionButtons[0]).toBeDisabled()
      })

      // Resolve the promise to clean up
      resolveDelete()
    })

    it('should show empty state when no flagged messages', async () => {
      mockGetFlaggedMessages.mockResolvedValue([])

      render(<AdminChatsPage />)

      await waitFor(
        () => {
          expect(screen.getAllByText(/전체 채팅방/i).length).toBeGreaterThan(0)
        },
        { timeout: 5000 }
      )

      // Flagged messages section header with count should not be rendered (h2 with count)
      expect(screen.queryByText(/신고된 메시지 \(\d+\)/i)).not.toBeInTheDocument()
    })
  })

  describe('Chat Rooms List', () => {
    it('should render active chat rooms', async () => {
      render(<AdminChatsPage />)

      await waitFor(
        () => {
          expect(screen.getByText(/Park Ji-sung/i)).toBeInTheDocument()
        },
        { timeout: 3000 }
      )

      expect(screen.getByText(/Kim Min-jae/i)).toBeInTheDocument()
    })

    it('should show chat room details', async () => {
      render(<AdminChatsPage />)

      await waitFor(
        () => {
          expect(screen.getByText(/Hannah Park/i)).toBeInTheDocument()
        },
        