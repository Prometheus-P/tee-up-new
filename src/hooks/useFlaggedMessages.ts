import { useState, useEffect, useCallback } from 'react'
import {
  getFlaggedMessages as fetchFlaggedMessages,
  dismissFlaggedMessage,
  deleteFlaggedMessage,
  type FlaggedMessage as APIFlaggedMessage,
} from '@/lib/api/chat'

export interface FlaggedMessage {
  id: string
  chatRoomId: string
  sender: string
  content: string
  flagReason: string
  flaggedAt: string
  status: 'pending' | 'reviewed'
}

interface UseFlaggedMessagesReturn {
  flaggedMessages: FlaggedMessage[]
  processingId: string | null
  isLoading: boolean
  error: string | null
  handleAction: (id: string) => Promise<void>
  handleDismiss: (id: string) => Promise<void>
  refetch: () => Promise<void>
}

function mapAPIToFlaggedMessage(apiMsg: APIFlaggedMessage): FlaggedMessage {
  return {
    id: apiMsg.id,
    chatRoomId: apiMsg.room_id,
    sender: apiMsg.sender?.full_name || 'Unknown User',
    content: apiMsg.content,
    flagReason: apiMsg.flag_reason || 'No reason provided',
    flaggedAt: new Date(apiMsg.created_at).toLocaleString('ko-KR'),
    status: apiMsg.is_flagged ? 'pending' : 'reviewed',
  }
}

export function useFlaggedMessages(): UseFlaggedMessagesReturn {
  const [flaggedMessages, setFlaggedMessages] = useState<FlaggedMessage[]>([])
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchFlaggedMessages()
      setFlaggedMessages(data.map(mapAPIToFlaggedMessage))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch flagged messages'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleAction = async (id: string): Promise<void> => {
    setProcessingId(id)
    setError(null)

    try {
      // Delete the flagged message
      await deleteFlaggedMessage(id)

      // Remove from local state
      setFlaggedMessages((prev) => prev.filter((msg) => msg.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to take action'
      setError(errorMessage)
    } finally {
      setProcessingId(null)
    }
  }

  const handleDismiss = async (id: string): Promise<void> => {
    setProcessingId(id)
    setError(null)

    try {
      // Dismiss the flag (unflag the message)
      await dismissFlaggedMessage(id)

      // Remove from local state
      setFlaggedMessages((prev) => prev.filter((msg) => msg.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to dismiss'
      setError(errorMessage)
    } finally {
      setProcessingId(null)
    }
  }

  return {
    flaggedMessages,
    processingId,
    isLoading,
    error,
    handleAction,
    handleDismiss,
    refetch: fetchData,
  }
}
