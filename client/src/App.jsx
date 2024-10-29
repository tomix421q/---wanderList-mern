import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  LayoutPage,
  TrendsPage,
  RegisterPage,
  ProfilePage,
  OthersActivityPage,
  MyStatsPage,
  LoginPage,
  LandingPage,
  ErrorPage,
  EditPlacePage,
  AllMyPlacesPage,
  AdminPage,
  AddPlacePage,
} from './pages/index'
// actions
import { action as registerAction } from './pages/RegisterPage'
import { action as loginAction } from './pages/LoginPage'
import { action as addPlaceAction } from './pages/AddPlacePage'
import { action as editPlaceAction } from './pages/EditPlacePage'
import { action as deletePlace } from './pages/DeletePlace'
import { action as profileAction } from './pages/ProfilePage'
// loaders
import { loader as homeLayoutLoader } from './pages/LayoutPage'
import { loader as allPlace } from './pages/AllMyPlacesPage'
import { loader as editPlaceLoader } from './pages/EditPlacePage'
import { loader as adminLoader } from './pages/AdminPage'
import { loader as statsLoader } from './pages/MyStatsPage'
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    loader: homeLayoutLoader,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'add-place',
        element: (
          <ProtectedRoute>
            <AddPlacePage />
          </ProtectedRoute>
        ),
        action: addPlaceAction,
      },
      {
        path: 'edit-place/:id',
        element: (
          <ProtectedRoute>
            <EditPlacePage />
          </ProtectedRoute>
        ),
        loader: editPlaceLoader,
        action: editPlaceAction,
      },
      {
        path: 'delete-place/:id',
        action: deletePlace,
      },
      {
        path: 'stats',
        element: (
          <ProtectedRoute>
            <MyStatsPage />
          </ProtectedRoute>
        ),
        loader: statsLoader,
      },
      {
        path: 'all-myplaces',
        element: (
          <ProtectedRoute>
            <AllMyPlacesPage />
          </ProtectedRoute>
        ),
        loader: allPlace,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        action: profileAction,
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute requiredRole={'admin'}>
            <AdminPage />
          </ProtectedRoute>
        ),
        loader: adminLoader,
      },
    ],
  },
  {
    path: 'register',
    element: <RegisterPage />,
    action: registerAction,
  },
  { path: 'login', element: <LoginPage />, action: loginAction },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
