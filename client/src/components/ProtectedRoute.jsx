import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useLayoutContext } from '../pages/LayoutPage'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

function ProtectedRoute({ requiredRole, children }) {
  const { user } = useLayoutContext()

  if (!user?._id || (requiredRole && user.role !== requiredRole)) {
    return <Navigate to={'/login'} replace />
  }

  return children
}
export default ProtectedRoute
