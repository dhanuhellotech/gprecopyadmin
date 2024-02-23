import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import MinimalLayout from './../layout/MinimalLayout';
import AuthLogin3 from '../views/pages/authentication/authentication3/Login3';
import AuthRegister3 from '../views/pages/authentication/authentication3/Register3';

const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/pages/login/login3',
                '/pages/register/register3'
            ]}
        >
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>

                    <Route path="/pages/login/login3" component={AuthLogin3} />
                    <Route path="/pages/register/register3" component={AuthRegister3} />

                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default AuthenticationRoutes;
