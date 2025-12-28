'use client'

// Fixed: Import React to resolve namespace errors
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FileImage,
  Users,
  Settings,
  MessageCircle,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    label: '대시보드',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: '포트폴리오',
    href: '/dashboard/portfolio',
    icon: FileImage,
  },
  {
    label: '리드 관리',
    href: '/dashboard/leads',
    icon: Users,
  },
  {
    label: '컨시어지',
    href: '/dashboard/concierge',
    icon: MessageCircle,
  },
  {
    label: '설정',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <aside
      data-testid="sidebar"
      className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-tee-stone lg:bg-tee-surface"
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-space-6 border-b border-tee-stone">
        <Link
          href="/dashboard"
          className="font-pretendard text-xl font-bold text-tee-ink-strong hover:no-underline"
        >
          TEE:UP
        </Link>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto py-space-4"
        role="navigation"
        aria-label="주 메뉴"
      >
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
                    'flex items-center gap-space-3 px-space-3 py-space-2 rounded-md text-sm font-medium transition-colors',
                    'hover:bg-tee-background hover:text-tee-ink-strong hover:no-underline',
                    'focus-visible:ring-2 focus-visible:ring-tee-accent-primary focus-visible:ring-offset-2',
                    active
                      ? 'bg-tee-accent-primary/10 text-tee-accent-primary'
                      : 'text-tee-ink-light'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export { navItems }
export type { NavItem }
