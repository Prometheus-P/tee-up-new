import { useState, useEffect, useCallback } from 'react'
import {
  getAllChatRooms,
  getChatStats,
  updateChatRoomStatus,
  type ChatRoomWithDetails,
  type ChatStats,
} from '@/lib/api/chat'

export interface ChatRoom {
  id: string
  golferName: string
  golferPhone: string | null
  proName: string
  proId: string
  lastMessage: string | null
  lastMessageTime: string | null
  unreadCount: number
  status: 'active' | 'matched' | 'closed'
  createdAt: string
  matchedAt?: string
  closedAt?: string
}

export interface ChatStatistics {
  totalRooms: number
  activeRooms: number
  matchedRooms: number
  flaggedMessages: number
}

interface UseChatManagementReturn {
  chatRooms: ChatRoom[]
  stats: ChatStatistics
  isLoading: boolean
  error: string | null
  updateStatus: (roomId: string, status: 'active' | 'matched' | 'closed') => Promise<void>
  refetch: () => Promise<void>
}

function mapAPIToChatRoom(apiRoom: ChatRoomWithDetails): ChatRoom {
  return {
    id: apiRoom.id,
    golferName: apiRoom.golfer_profile?.full_name || 'Unknown Golfer',
    golferPhone: apiRoom.golfer_profile?.phone || null,
    proName: apiRoom.pro_profile?.full_name || 'Unknown Pro',
    proId: apiRoom.pro_id,
    lastMessage: apiRoom.last_message?.content || null,
    lastMessageTime: apiRoom.last_message?.created_at
      ? new Date(apiRoom.last_message.created_at).toLocaleString('ko-KR')
      : null,
    unreadCount: apiRoom.unread_count || 0,
    status: apiRoom.status,
    createdAt: new Date(apiRoom.created_at).toLocaleString('ko-KR'),
  }
}

function mapAPIToStats(apiStats: ChatStats): ChatStatistics {
  return {
    totalRooms: apiStats.total_rooms,
    activeRooms: apiStats.active_rooms,
    matchedRooms: apiStats.matched_rooms,
    flaggedMessages: apiStats.flagged_messages,
  }
}

export function useChatManagement(): UseChatManagementReturn {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [stats, setStats] = useState<ChatStatistics>({
    totalRooms: 0,
    activeRooms: 0,
    matchedRooms: 0,
    flaggedMessages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [roomsData, statsData] = await Promise.all([getAllChatRooms(), getChatStats()])

      setChatRooms(roomsData.map(mapAPIToChatRoom))
      setStats(mapAPIToStats(statsData))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch chat data'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const updateStatus = async (
    roomId: string,
    status: 'active' | 'matched' | 'closed'
  ): Promise<void> => {
    setError(null)

    try {
      await updateChatRoomStatus(roomId, status)

      // Update local state
      setChatRooms((prev) =>
        prev.map((room) => (room.id === roomId ? { ...room, status } : room))
      )

      // Refetch stats to update counts
      const statsData = await getChatStats()
      setStats(mapAPIToStats(statsData))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update status'
      setError(errorMessage)
      throw err
    }
  }

  return {
    chatRooms,
    stats,
    isLoading,
    error,
    updateStatus,
    refetch: fetchData,
  }
}
