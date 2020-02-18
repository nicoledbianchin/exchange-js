import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ExchangePage from './pages/exchangePage';

const Routs = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ExchangePage}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;