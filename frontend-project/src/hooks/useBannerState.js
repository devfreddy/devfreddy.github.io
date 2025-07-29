import { useState, useEffect } from 'react'

export const useBannerState = () => {
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    const bannerDismissed = localStorage.getItem('constructionBannerDismissed')
    if (bannerDismissed === 'true') {
      setShowBanner(false)
    }

    const handleStorageChange = () => {
      const dismissed = localStorage.getItem('constructionBannerDismissed')
      setShowBanner(dismissed !== 'true')
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Custom event for same-tab updates
    window.addEventListener('bannerDismissed', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('bannerDismissed', handleStorageChange)
    }
  }, [])

  return showBanner
}