import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NavBar from './components/ui/navbar'
import Users from './layouts/users'
import MainPage from './layouts/main'
import Login from './layouts/login'
import { ProfessionProvider } from './hooks/useProfession'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionsList } from './store/professions'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionsList())
    }, [])

    return (
        <>
            <AuthProvider>
                <NavBar />
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
            </AuthProvider>
            <ToastContainer />
        </>
    )
}

export default App
