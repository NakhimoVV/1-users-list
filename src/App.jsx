import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/navbar'
import Users from './components/layouts/users'
import MainPage from './components/layouts/main'
import Login from './components/layouts/login'

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path={'/'} component={MainPage} />
                <Route path={'/login'} component={Login} />
                <Route path={'/users/:userId?'} component={Users} />
            </Switch>
        </>
    )
}

export default App
