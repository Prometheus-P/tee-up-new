'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

const pathLabels: Record<string, string> = {
  dashboard: '대시보드',
  portfolio: '포트폴리오',
  leads: '리드 관리',
  concierge: '컨시어지',
  settings: '설정',
  studio: '스튜디오',
}

export function Breadcrumbs() {
  const pathname = usePathname()

  // Parse pathname into breadcrumb items
  const segments = pathname.split('/').filter(Boolean)

  // Don't show breadcrumbs on dashboard home
  if (segments.length <= 1) {
    return null
  }

  const breadcrumbs: BreadcrumbItem[] = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const label = pathLabels[segment] || segment

    // Last item doesn't have a link
    return {
      label,
      href: index < segments.length - 1 ? href : undefined,
    }
  })

  return (
    <nav
      data-testid="breadcrumbs"
      aria-label="Breadcrumb"
      className="mb-space-4"
    >
      <ol className="flex items-center gap-space-1 text-sm">
        <li>
          <Link
            href="/dashboard"
            className={cn(
              'flex items-center text-tee-ink-muted hover:text-tee-ink-strong transition-colors',
              'hover:no-underline'
            )}
          >
            <Home className="h-4 w-4" aria-label="홈" />
          </Link>
        </li>
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center gap-space-1">
            <ChevronRight
              className="h-4 w-4 text-tee-ink-muted"
              aria-hidden="true"
            />
            {item.href ? (
              <Link
                href={item.href}
                className="text-tee-ink-muted hover:text-tee-ink-strong transition-colors hover:no-underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-tee-ink-strong font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
