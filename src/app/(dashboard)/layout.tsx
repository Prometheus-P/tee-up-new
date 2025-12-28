import React from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
// Fixed: Corrected import casing and ensured membership matches components/layout/index.ts
import { DashboardLayout } from '@/components/layout/DashboardLayout'

export default async function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/dashboard')
  }

  // Check if user has pro role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'pro') {
    redirect('/')
  }

  return <DashboardLayout userEmail={user.email}>{children}</DashboardLayout>
}
