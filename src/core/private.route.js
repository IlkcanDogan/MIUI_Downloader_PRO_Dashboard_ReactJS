import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth';
import Layout from '../components/layout';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <Layout>
                        <RouteComponent {...routeProps} />
                    </Layout>

                ) : (
                    <Redirect to='/' />
                )
            }
        />
    )
}

export default PrivateRoute;