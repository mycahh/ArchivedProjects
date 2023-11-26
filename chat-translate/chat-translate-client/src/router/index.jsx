import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ChatPage from '../pages/ChatPage'
import AuthPage from '../pages/AuthPage'

import PrivateRoute from "./PrivateRoutes"
import PublicRoute from "./PublicRoutes"

function RouteChat() { return (<PrivateRoute> <ChatPage /> </PrivateRoute>) }
function RouteAuth() { return (<PublicRoute> <AuthPage /> </PublicRoute>) }

const router = createBrowserRouter([
    { path: "/", element: <RouteChat /> },
    { path: "/auth", element: <RouteAuth /> }
])

const RouterApp = () => <RouterProvider router={router} />

export default RouterApp