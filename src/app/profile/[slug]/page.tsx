import type { Metadata } from 'next'
import { ProfileTemplate } from '../ProfileTemplate'
import { defaultProfileSlug, profileLibrary } from '../profile-data'

type Params = {
  slug: string
}

export function generateStaticParams(): Params[] {
  return Object.keys(profileLibrary).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = profileLibrary[params.slug] ?? profileLibrary[defaultProfileSlug]
  const { profile } = data

  const title = `${profile.name} - ${profile.title} | TEE:UP`
  const description = profile.summary.slice(0, 160)
  const url = `https://teeup.golf/profile/${params.slug}`

  return {
    title,
    description,
    keywords: [
      profile.name,
      'golf pro',
      'golf lessons',
      profile.city || 'Seoul',
      ...(profile.languages || []),
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'profile',
      locale: 'ko_KR',
      url,
      title,
      description,
      siteName: 'TEE:UP',
      images: [
        {
          url: profile.heroImage,
          width: 1200,
          height: 630,
          alt: `${profile.name} - ${profile.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [profile.heroImage],
    },
  }
}

export default function ProfileDetailPage({ params }: { params: Params }) {
  const data = profileLibrary[params.slug] ?? profileLibrary[defaultProfileSlug]
  return <ProfileTemplate data={data} />
}
