import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/navbar'
import Users from './components/layouts/users'
import MainPage from './components/layouts/main'
import Login from './components/layouts/login'

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path={'/users/:userId?'} component={Users} />
                <Route path={'/login'} component={Login} />
                <Route path={'/'} exact component={MainPage} />
                <Redirect to={'/'} />
            </Switch>
        </>
    )
}

export default App
