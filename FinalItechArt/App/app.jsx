import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './register/register.jsx';
import AuthForm from './auth/auth.jsx';
import UserCabinet from './UserCabinet/UserCabinet.jsx';
import PatientTable from './Patient/PatientTable.jsx';
import PatientAdd from './Patient/PatientAdd.jsx';
import PatientEdit from './Patient/PatientEdit.jsx';
import DrugAdd from './Drug/DrugAdd.jsx';
import DrugTable from './Drug/DrugTable.jsx';
import DrugEdit from './Drug/DrugEdit.jsx';
import DrugSend from './DrugSend/DrugSend.jsx';
import DrugSendTable from './DrugSend/DrugSendTable.jsx';
import VisitAdd from './Patient/VisitAdd.jsx';
import Analyze from './Analyze/Analyze.jsx';
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
                            <Route exact path="/cabinet" component={() => (<UserCabinet />)} />
                            <Route exact path="/patient" component={() => (<PatientTable />)} />
                            <Route exact path="/patient/add" component={() => (<PatientAdd />)} />
                            <Route exact path="/patient/:id" component={(props) => (<PatientEdit {...props}/>)} />
                            <Route exact path="/patient/visit/add/:id" component={(props) => (<VisitAdd {...props}/>)} />
                            <Route exact path="/drug/add" component={() => (<DrugAdd />)} />
                            <Route exact path="/drug" component={() => (<DrugTable />)} />
                            <Route exact path="/drug/edit/:id" component={(props) => (<DrugEdit {...props}/>)} />
                            <Route exact path="/drug/sendclinic" component={() => (<DrugSendTable />)} />
                            <Route exact path="/drug/sendclinic/send" component={() => (<DrugSend />)} />
                            <Route exact path="/analyze" component={() => (<Analyze />)} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};