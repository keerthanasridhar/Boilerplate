import React from 'react';
import {Router,Route, Switch} from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/Dashboard';
import NotFoundPage from '../components/NotFoundPage';
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from '../routers/PrivateRoute'
import PublicRoute from '../routers/PublicRoute'

export const history = createHistory();

const AppRouter = ()=>(
    <Router history = {history}>
    <div>
    <Switch>
    <PublicRoute path = "/" component = {LoginPage} exact = {true}/>
    <PrivateRoute path = "/dashboard" component = {DashboardPage}/>
    <Route component = {NotFoundPage} />
    </Switch>
    </div>
    </Router>
);

export default AppRouter;