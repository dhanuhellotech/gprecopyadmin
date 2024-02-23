import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import MinimalLayout from '../layout/MinimalLayout';
import NavMotion from '../layout/NavMotion';
import AuthLogin from '../views/pages/authentication/login';

const LoginRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/login']}>
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <NavMotion>
                        <Route path="/login" component={AuthLogin} />
                    </NavMotion>
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default LoginRoutes;
