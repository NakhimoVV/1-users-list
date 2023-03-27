import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import NavBar from './components/ui/navbar'
import Users from './layouts/users'
import MainPage from './layouts/main'
import Login from './layouts/login'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'

function App() {
    return (
        <>
            <NavBar />
            <ProfessionProvider>
                <QualitiesProvider>
                    <Switch>
                        <Route
                            path={'/users/:userId?/:edit?'}
                            component={Users}
                        />
                        <Route path={'/login/:type?'} component={Login} />
                        <Route path={'/'} exact component={MainPage} />
                        <Redirect to={'/'} />
                    </Switch>
                </QualitiesProvider>
            </ProfessionProvider>
            <ToastContainer />
        </>
    )
}

export default App
