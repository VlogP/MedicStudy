import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './register.jsx';
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
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};