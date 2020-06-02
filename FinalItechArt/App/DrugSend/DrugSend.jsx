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
import styles from './DrugSendCss.css';
 
function validateName(Name,length){ 
    console.log(length);
    var reqular = "^[a-zA-Z0-9 _]{"+ length +",}$";

    reqular = new RegExp(reqular);
    if(Name===undefined)return false;

    return reqular.test(Name.trim());
}

export default class DrugAdd extends React.Component {
constructor(props) {
    super(props);    
    this.state = {DrugData:[],IsSuccess:false,IsRedirect:false,Count:1,MaxCount:1,ClinicId:1,DrugIndex:0,Error:false};      
    this.CountChange = this.CountChange.bind(this);
    this.DrugChange = this.DrugChange.bind(this);
    this.CloseNotification = this.CloseNotification.bind(this);
    this.ClinicIdChange = this.ClinicIdChange.bind(this);
    this.SendDrug = this.SendDrug.bind(this);

    axios.defaults.headers.common['Authorization'] = 
    'Bearer ' + sessionStorage.getItem('token');   
}

componentDidMount() {
    axios.get('/drugmanage').then(
        response => {
            let patientsData = response.data;
            console.log(patientsData)
            this.setState({
                DrugData:patientsData,
                MaxCount:patientsData[0].count
            });
        }
    );
}

SendDrug(event){     

    var isValid = this.state.Count <= this.state.MaxCount && this.state.Count !=0;
    if(isValid)
    {
    axios.post('/drugmanage/drugClinics',{
            DrugUnitId: this.state.DrugData[this.state.DrugIndex].drugUnitId,
            DrugUnitName : this.state.DrugData[this.state.DrugIndex].name,
            Count:this.state.Count,
            ClinicId:this.state.ClinicId
          }).then(_ => {
            this.setState({IsSuccess:true,error:false});
        }) 
    }
    else{
        this.setState({Error:true});
    }
}

CloseNotification(event){
    this.setState({IsRedirect:true});
}


CountChange(event){
    let number = Number.parseInt(event.target.value)
    if(Number.isInteger(number) && number >= 0 && number <= this.state.MaxCount){
    this.setState({Count:number});
    }
}

ClinicIdChange(event){
    this.setState({ClinicId:event.target.value});
}

DrugChange(event){
    this.setState({DrugIndex:event.target.value,
    MaxCount:this.state.DrugData[event.target.value].count
    });

}

render(){
    if (this.state.IsRedirect) {        
        return <Redirect to='/drug/sendclinic'/>;
    }

    return (
    <Paper className="DrugSend" elevation={10} Component="div">
      <Typography variant="h5" component="h3"> SEND DRUGS </Typography> 
        <ul>
            <li><FormControl>
                <InputLabel id="demo-simple-select-label-1">Clinic</InputLabel>
                <Select
                labelId="demo-simple-select-label-1"
                id="demo-simple-select-1"
                value={this.state.ClinicId}
                style ={{width:"250px",textAlign:"left"}}
                onChange={this.ClinicIdChange}
                >
                <MenuItem value={1}>Grodno clinic</MenuItem>
                <MenuItem value={2}>Minsk clinic</MenuItem>
                <MenuItem value={3}>Brest clinic</MenuItem>
                </Select>
                </FormControl>
            </li>
            <li><FormControl>
                <InputLabel id="demo-simple-select-label">Drug</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.DrugIndex}
                style ={{width:"250px",textAlign:"left"}}
                onChange={this.DrugChange}
                >
                {this.state.DrugData.map((row,index) => (
                <MenuItem value={index}>{row.name}</MenuItem>
                ))}
                </Select>
                </FormControl>
            </li>
            <li><TextField  label="Max count"  margin="normal" InputProps={{readOnly: true}}  value={this.state.MaxCount} /></li>
            <li><TextField type = "number" error = {this.state.Error} label="Count" margin="normal" InputProps={{ inputProps: { min: 1, max:this.state.MaxCount } }} onChange = {this.CountChange} value ={this.state.Count}/></li>
            <li><Button className="formButton" variant="contained" fullWidth={true} onClick = {this.SendDrug}>Send drug</Button></li>
        </ul> 
        <Snackbar
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={this.state.IsSuccess}
            onClose = {this.CloseNotification}
            key={"top" + "center"}
            autoHideDuration = {1000}
            >
            <Alert severity="success" style ={{width:"300px"}}>
            Success sended drug!
            </Alert>
        </Snackbar>      
    </Paper>
    );
}
}

