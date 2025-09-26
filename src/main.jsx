// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google"
import ViewTrip from "./view-trip/[tripId]/index.jsx"
import MyTrips from './my-trips/index.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />   {/* ✅ now inside Router */}
        <App />
      </>
    )
  },
  {
    path: '/create-trip',
    element: (
      <>
        <Header />
        <CreateTrip />
      </>
    )
  },
  {
    path: '/view-trip/:tripId',
    element: (
      <>
        <Header />
        <ViewTrip />
      </>
    )
  },
  {
    path: '/my-trips',
    element:(
      <>
         <Header/>
         <MyTrips/>
      </>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)

