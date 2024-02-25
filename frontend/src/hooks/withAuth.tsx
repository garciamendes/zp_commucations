import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { localStorage } from '../utils'

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  shouldBeAuthenticated = true
) => {
  const AuthenticatedComponent = (props: P) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const authToken = localStorage.getItem('token')

      if (!authToken && shouldBeAuthenticated) {
        navigate('/')
        return
      }

      if (authToken && !shouldBeAuthenticated) {
        navigate('/home')
        return
      }

      setLoading(false)
    }, [])

    return loading ? (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}>
        <Loader2 className="animation-loader" style={{ color: 'white' }} size={30} />
      </div>
    ) : <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}