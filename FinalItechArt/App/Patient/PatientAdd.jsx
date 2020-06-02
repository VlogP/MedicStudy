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
import styles from './PatientAddCss.css';
 
function validateName(Name){ 
    var reqular = /^[a-zA-Z]{3,}$/;
    if(Name===undefined)return false;

    return reqular.test(Name);
}

export default class PatientAdd extends React.Component {
constructor(props) {
    super(props);    
    this.state = {Firstname:'',Lastname:'',Birthday:Date.now(),Sex:'1',Errors:['','',''],IsSuccess:false,IsRedirect:false,IllnesId:1};      
    this.DateChange = this.DateChange.bind(this);
    this.SexChange = this.SexChange.bind(this);
    this.FirstnameChange = this.FirstnameChange.bind(this);
    this.LastnameChange = this.LastnameChange.bind(this);
    this.IllnesIdChange = this.IllnesIdChange.bind(this);
    this.CloseNotification = this.CloseNotification.bind(this);
    this.AddPatient = this.AddPatient.bind(this);

    axios.defaults.headers.common['Authorization'] = 
    'Bearer ' + sessionStorage.getItem('token');
        
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
    var date = new Date(this.state.Birthday).getDate() > 9 ? new Date(this.state.Birthday).getDate() : "0" + new Date(this.state.Birthday).getDate()
    var month = new Date(this.state.Birthday).getMonth() > 9 ? new Date(this.state.Birthday).getMonth() : "0" + new Date(this.state.Birthday).getMonth()
    if(isValid) {    
        axios.post('/patients',{
            NewPassword:this.state.NewPassword,
            Firstname: this.state.Firstname,
            Lastname: this.state.Lastname,
            BirthDate: date + "." + month + "." + new Date(this.state.Birthday).getFullYear(),
            Gender: this.state.Sex,
            IllnesId: this.state.IllnesId
          }).then(_ => {
            this.setState({IsSuccess:true});
        }) 
    } 
}

FirstnameChange(event){
    this.setState({Firstname:event.target.value});
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

DateChange(date) {
    this.setState({Birthday:date});
}

render(){
    if (this.state.IsRedirect) {        
        return <Redirect to='/patient'/>;
    }

    return (
    <Paper className="PatientAdd" elevation={10} Component="div">
      <Typography variant="h5" component="h3"> ADD PATIENT </Typography> 
        <ul>
            <li><TextField error={this.state.Errors[0].length}  label="Firstname"  margin="normal"  value={this.state.Firstname} onChange = {this.FirstnameChange}/></li>
                <Typography variant="caption" gutterBottom align="center" >  {this.state.Errors[0]}</Typography>
            <li><TextField error={this.state.Errors[1].length} label="Lastname" margin="normal" value={this.state.Lastname} onChange = {this.LastnameChange}/></li>
                <Typography variant="caption" gutterBottom align="center" >  {this.state.Errors[1]}</Typography>
            <li><FormControl>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.Sex}
                style ={{width:"200px",textAlign:"left"}}
                onChange={this.SexChange}
                >
                <MenuItem value={1}>M</MenuItem>
                <MenuItem value={2}>W</MenuItem>
                </Select>
                </FormControl>
            </li>
            <li><FormControl>
                <InputLabel id="demo-simple-select-label-1">Illnes</InputLabel>
                <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                value={this.state.IllnesId}
                style ={{width:"200px",textAlign:"left"}}
                onChange={this.IllnesIdChange}
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
                <KeyboardDatePicker margin="normal" error = {this.state.Errors[2].length} style = {{width:"200px"}} id="date-picker-dialog" label="Birthday" format="dd/MM/yyyy" value={this.state.Birthday} onChange={this.DateChange} KeyboardButtonProps={{ 'aria-label': 'change date', }} />
                </Grid>
                </MuiPickersUtilsProvider>
            </li>
            <Typography variant="caption" gutterBottom align="center" >  {this.state.Errors[2]}</Typography>
            <li><Button className="formButton" variant="contained" fullWidth={true} onClick = {this.AddPatient}>Add patient</Button></li>
        </ul> 
        <Snackbar
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={this.state.IsSuccess}
            onClose = {this.CloseNotification}
            key={"top" + "center"}
            autoHideDuration = {1000}
            >
            <Alert severity="success" style ={{width:"300px"}}>
            Success added patient!
            </Alert>
        </Snackbar>      
    </Paper>
    );
}
}

