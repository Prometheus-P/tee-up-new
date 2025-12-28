'use client'

// Fixed: Import React to resolve namespace errors
import React from 'react'
import { useState, useCallback } from 'react'
import { Sidebar } from './Sidebar'
import { DashboardHeader } from './DashboardHeader'
import { MobileNav } from './MobileNav'
import { Breadcrumbs } from './Breadcrumbs'

interface DashboardLayoutProps {
  children: React.ReactNode
  userEmail?: string
}

export function DashboardLayout({ children, userEmail }: DashboardLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const handleMenuClick = useCallback(() => {
    setIsMobileNavOpen(true)
  }, [])

  const handleMobileNavClose = useCallback(() => {
    setIsMobileNavOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-tee-background">
      {/* Sidebar - Desktop only */}
      <Sidebar />

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={handleMobileNavClose} />

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Header */}
        <DashboardHeader userEmail={userEmail} onMenuClick={handleMenuClick} />

        {/* Page content */}
        <main className="p-space-4 lg:p-space-6">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  )
}
