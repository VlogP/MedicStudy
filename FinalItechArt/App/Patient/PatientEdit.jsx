import React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from 'react-router';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VisitTable from './VisitTable.jsx';
import styles from './PatientEditCss.css';
 
function validateName(Name){ 
    var reqular = /^[a-zA-Z]{3,}$/;
    if(Name===undefined)return false;

    return reqular.test(Name);
}

function parseDate(dateString){ 
    let repl = dateString.split('.');
    let buff = repl[0];
    repl[0] = repl[2];
    repl[2] = buff;
    let date = repl.join('-');

    return new Date(date);
}

export default class PatientEdit extends React.Component {
constructor(props) {
    super(props);    

    this.state = {Firstname:'',Lastname:'',Birthday:Date.now(),Sex:'1',Errors:['','',''],IsSuccess:false,IsRedirect:false,Status:'1',TabNumber:0,IllnesId:1};      
    this.DateChange = this.DateChange.bind(this);
    this.SexChange = this.SexChange.bind(this);
    this.StatusChange = this.StatusChange.bind(this);
    this.FirstnameChange = this.FirstnameChange.bind(this);
    this.LastnameChange = this.LastnameChange.bind(this);
    this.IllnesIdChange = this.IllnesIdChange.bind(this);
    this.CloseNotification = this.CloseNotification.bind(this);
    this.AddPatient = this.AddPatient.bind(this);
    this.ChangeTab = this.ChangeTab.bind(this);
    axios.defaults.headers.common['Authorization'] = 
    'Bearer ' + sessionStorage.getItem('token');        
}

componentDidMount() {
    axios.get('/patients/'+this.props.match.params.id).then(
        response => {
            let patientsData = response.data;
            console.log(patientsData);
            this.setState({
                Firstname:patientsData.firstname,
                Lastname:patientsData.lastname,
                Birthday:parseDate(patientsData.birthDate),
                Sex:patientsData.gender,
                IllnesId:patientsData.illnesId,
                Status:patientsData.status
            });
        }
    );
}

AddPatient(event){
    let isValid = true;
    let arrayErrors = this.state.Errors;
    let currentDate = new Date(this.state.Birthday);

    if(!validateName(this.state.Firstname)){
        arrayErrors[0] = "Consist only of letters. Must be more then 3"
        isValid = false
    }
    else{
        arrayErrors[0] = ""
    }

    if(!validateName(this.state.Lastname)){
        arrayErrors[1] = "Consist only of letters. Must be more then 3"
        isValid = false
    }
    else{
        arrayErrors[1] = ""
    }

    if(Date.parse(currentDate) > Date.now()){
        arrayErrors[2] = "Date must be not in future"
        isValid = false
    }
    else{
        arrayErrors[2] = ""
    }

    this.setState({Errors:arrayErrors});

    if(isValid) {    
        axios.post('/patients/update',{
            PatientId:this.props.match.params.id,
            Status: this.state.Status,         
          }).then(_ => {
            this.setState({IsSuccess:true});
        }) 
    } 
}

FirstnameChange(event){
    this.setState({Firstname:event.target.value});
}

ChangeTab(e,value) {
    this.setState({TabNumber:value});
}

CloseNotification(event){
    this.setState({IsRedirect:true});
}

LastnameChange(event){
    this.setState({Lastname:event.target.value});
}

SexChange(event){
    this.setState({Sex:event.target.value});
}

IllnesIdChange(event){
    this.setState({IllnesId:event.target.value});
}

StatusChange(event){
    this.setState({Status:event.target.value});
}

DateChange(date) {
    this.setState({Birthday:date});
}

render(){
    if (this.state.IsRedirect) {        
        return <Redirect to='/patient'/>;
    }

    return (
    <Paper className="PatientEdit" elevation={10} Component="div">
        <Typography variant="h5" component="h3"> {this.state.Lastname} {this.state.Firstname}</Typography> 
        <AppBar position="static">
            <Tabs value={this.state.TabNumber} onChange={this.ChangeTab}>
              <Tab label="Patient data" />
              <Tab label="Visits" />           
            </Tabs>
        </AppBar>
        {this.state.TabNumber == 0 &&
            <ul>
            <li><TextField error={this.state.Errors[0].length}  label="Firstname"  margin="normal"  value={this.state.Firstname} InputProps={{readOnly: true}} onChange = {this.FirstnameChange}/></li>
            <li><TextField error={this.state.Errors[1].length} label="Lastname" margin="normal" value={this.state.Lastname} InputProps={{readOnly: true}} onChange = {this.LastnameChange}/></li>
            <li><FormControl>
                <InputLabel id="GenderLabel">Gender</InputLabel>
                <Select
                labelId="GenderLabel"
                id="GenderSelect"
                value={this.state.Sex}
                style ={{width:"200px",textAlign:"left"}}
                onChange={this.SexChange}
                inputProps={{ readOnly: true }}
                >
                <MenuItem value={1}>M</MenuItem>
                <MenuItem value={2}>W</MenuItem>
                </Select>
                </FormControl>
            </li>
            <li><FormControl>
                <InputLabel id="GenderLabel1">Illnes</InputLabel>
                <Select
                labelId="GenderLabel1"
                id="GenderSelect1"
                value={this.state.IllnesId}
                style ={{width:"200px",textAlign:"left"}}
                onChange={this.IllnesIdChange}
                inputProps={{ readOnly: true }}
                >
                <MenuItem value={1}>Illnes 1</MenuItem>
                <MenuItem value={2}>Illnes 2</MenuItem>
                <MenuItem value={3}>Illnes 3</MenuItem>
                <MenuItem value={4}>Illnes 4</MenuItem>
                </Select>
                </FormControl>
            </li>
            <li><MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                <KeyboardDatePicker margin="normal" disabled={true} error = {this.state.Errors[2].length} style = {{width:"200px"}} id="date-picker-dialog" label="Birthday" format="dd/MM/yyyy" value={this.state.Birthday} onChange={this.DateChange} KeyboardButtonProps={{ 'aria-label': 'change date', }} />
                </Grid>
                </MuiPickersUtilsProvider>
            </li>
            <li><FormControl>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.Status}
                style ={{width:"200px",textAlign:"left"}}
                inputProps={{ readOnly: sessionStorage.getItem('role')!='Researcher' }}
                onChange={this.StatusChange}
                >
                <MenuItem value={1}>Pre-Screening</MenuItem>
                <MenuItem value={2}>Research on</MenuItem>
                <MenuItem value={3}>Success</MenuItem>
                <MenuItem value={4}>Not success</MenuItem>
                <MenuItem value={5}>Force exit</MenuItem>
                </Select>
                </FormControl>
            </li>            
            <li><Button className="formButton" variant="contained" fullWidth={true} onClick = {this.AddPatient} disabled ={sessionStorage.getItem('role')!='Researcher'}>Update status</Button></li>
        </ul> 
        }

        {this.state.TabNumber == 1 &&
            <VisitTable PatientId = {this.props.match.params.id}/>
        }

        <Snackbar
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={this.state.IsSuccess}
            onClose = {this.CloseNotification}
            key={"top" + "center"}
            autoHideDuration = {1000}
            >
            <Alert severity="success" style ={{width:"300px"}}>
            Success updated
            </Alert>
        </Snackbar>      
    </Paper>
    );
}
}

