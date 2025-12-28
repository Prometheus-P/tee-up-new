'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getPendingProProfiles,
  getApprovedProProfiles,
  approveProProfile,
  rejectProProfile,
  type PendingProProfile,
  type ApprovedProProfile,
} from '@/lib/api/profiles'

interface UseProManagementReturn {
  pendingPros: PendingProProfile[]
  approvedPros: ApprovedProProfile[]
  processingId: string | null
  isLoading: boolean
  error: string | null
  handleApprove: (id: string) => Promise<void>
  handleReject: (id: string) => Promise<void>
  refetch: () => Promise<void>
}

export function useProManagement(): UseProManagementReturn {
  const [pendingPros, setPendingPros] = useState<PendingProProfile[]>([])
  const [approvedPros, setApprovedPros] = useState<ApprovedProProfile[]>([])
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [pending, approved] = await Promise.all([
        getPendingProProfiles(),
        getApprovedProProfiles(),
      ])
      setPendingPros(pending)
      setApprovedPros(approved)
    } catch (err) {
      const message = err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.'
      setError(message)
      console.error('Error fetching pro profiles:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleApprove = async (id: string): Promise<void> => {
    setProcessingId(id)
    setError(null)

    try {
      await approveProProfile(id)
      // Refetch data to get updated lists
      await fetchData()
    } catch (err) {
      const message = err instanceof Error ? err.message : '승인 처리에 실패했습니다.'
      setError(message)
      console.error('Error approving pro:', err)
      throw err
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (id: string): Promise<void> => {
    setProcessingId(id)
    setError(null)

    try {
      await rejectProProfile(id)
      // Update local state
      setPendingPros(prev => prev.filter(pro => pro.id !== id))
    } catch (err) {
      const message = err instanceof Error ? err.message : '거절 처리에 실패했습니다.'
      setError(message)
      console.error('Error rejecting pro:', err)
      throw err
    } finally {
      setProcessingId(null)
    }
  }

  return {
    pendingPros,
    approvedPros,
    processingId,
    isLoading,
    error,
    handleApprove,
    handleReject,
    refetch: fetchData,
  }
}
