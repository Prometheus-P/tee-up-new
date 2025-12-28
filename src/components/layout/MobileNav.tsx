'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { navItems } from './Sidebar'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Close on navigation
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        data-testid="mobile-nav"
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-tee-surface shadow-xl lg:hidden',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-tee-stone px-space-4">
          <Link
            href="/dashboard"
            className="font-pretendard text-xl font-bold text-tee-ink-strong hover:no-underline"
            onClick={onClose}
          >
            TEE:UP
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="메뉴 닫기"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-space-4" role="navigation">
          <ul className="space-y-space-1 px-space-3">
            {navItems.map((item) => {
              const active = isActive(item.href)
              const Icon = item.icon

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={active}
                    className={cn(
                      'flex items-center gap-space-3 px-space-3 py-space-3 rounded-md text-base font-medium transition-colors',
                      'hover:bg-tee-background hover:text-tee-ink-strong hover:no-underline',
                      'focus-visible:ring-2 focus-visible:ring-tee-accent-primary focus-visible:ring-offset-2',
                      active
                        ? 'bg-tee-accent-primary/10 text-tee-accent-primary'
                        : 'text-tee-ink-light'
                    )}
                    onClick={onClose}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </>
  )
}
