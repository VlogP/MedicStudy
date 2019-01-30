import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UserForm from './register.jsx';
import Header from './header.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>     
                <Header />           
                    <main>
                        <Switch>
                            <Route path="/register" component={() => (<UserForm />)} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};