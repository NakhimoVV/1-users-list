import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import NavBar from './components/ui/navbar'
import Users from './layouts/users'
import MainPage from './layouts/main'
import Login from './layouts/login'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'

function App() {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <ProtectedRoute
                                path={'/users/:userId?/:edit?'}
                                component={Users}
                            />
                            <Route path={'/login/:type?'} component={Login} />
                            <Route path={'/logout'} component={LogOut} />
                            <Route path={'/'} exact component={MainPage} />
                            <Redirect to={'/'} />
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    )
}

export default App
