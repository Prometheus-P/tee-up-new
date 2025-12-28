import { ProfileTemplate } from './ProfileTemplate'
import { defaultProfileSlug, profileLibrary } from './profile-data'

export default function ProfileLandingPage() {
  const data = profileLibrary[defaultProfileSlug]
  return <ProfileTemplate data={data} />
}
