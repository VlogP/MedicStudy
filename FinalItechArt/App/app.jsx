import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './register/register.jsx';
import AuthForm from './auth/auth.jsx';
import UserCabinet from './UserCabinet/UserCabinet.jsx';
import Header from './header.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>     
                <Header />           
                    <main>
                        <Switch>
                            <Route path="/register" component={() => (<Register />)} />
                            <Route path="/auth" component={() => (<AuthForm />)} />
                            <Route path="/cabinet" component={() => (<UserCabinet />)} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};