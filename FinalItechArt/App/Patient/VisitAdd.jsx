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
import styles from './VisitAddCss.css';
 

export default class VisitAdd extends React.Component {
constructor(props) {
    super(props);    
    this.state = {DrugData:[],IsSuccess:false,IsRedirect:false,Count:1,MaxCount:1,DrugIndex:0,Error:false,VisitDate:Date.now()};      
    this.CountChange = this.CountChange.bind(this);
    this.DrugChange = this.DrugChange.bind(this);
    this.VisitDateChange = this.VisitDateChange.bind(this);
    this.CloseNotification = this.CloseNotification.bind(this);
    this.SendDrug = this.SendDrug.bind(this);

    axios.defaults.headers.common['Authorization'] = 
    'Bearer ' + sessionStorage.getItem('token');   
}

componentDidMount() {
    axios.get('/drugmanage/drugClinicsResearcher').then(
        response => {
            let drugData = response.data;
            console.log(drugData)
            this.setState({
                DrugData:drugData,
                MaxCount:drugData[0].count
            });
        }
    );
}

SendDrug(event){     

    var isValid = this.state.Count <= this.state.MaxCount && this.state.Count != 0;
    var date = new Date(this.state.VisitDate).getDate() > 9 ? new Date(this.state.VisitDate).getDate() : "0" + new Date(this.state.VisitDate).getDate()
    var month = new Date(this.state.VisitDate).getMonth() > 9 ? new Date(this.state.VisitDate).getMonth() : "0" + new Date(this.state.VisitDate).getMonth()
    if(isValid)
    {
    axios.post('/drugmanage/visit',{
            VisitDate: date + "." + month + "." + new Date(this.state.VisitDate).getFullYear(),
            PatientId: this.props.match.params.id,
            DrugAtClinicId: this.state.DrugData[this.state.DrugIndex].rowId,
            Count: this.state.Count
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

VisitDateChange(date) {
    this.setState({VisitDate:date});
}

CountChange(event){
    let number = Number.parseInt(event.target.value)
    if(Number.isInteger(number) && number >= 0 && number <= this.state.MaxCount){
    this.setState({Count:number});
    }
}

DrugChange(event){
    this.setState({DrugIndex:event.target.value,
    MaxCount:this.state.DrugData[event.target.value].count
    });

}

render(){
    if (this.state.IsRedirect) {        
        return <Redirect to={"/patient/" +this.props.match.params.id}/>;
    }

    return (
    <Paper className="VisitAdd" elevation={10} Component="div">
      <Typography variant="h5" component="h3"> NEW VISIT </Typography> 
        <ul>
            <li><FormControl>
                <InputLabel id="demo-simple-select-label">Drug</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.DrugIndex}
                style ={{width:"200px",textAlign:"left"}}
                onChange={this.DrugChange}
                >
                {this.state.DrugData.map((row,index) => (
                <MenuItem value={index}>{row.drugName}</MenuItem>
                ))}
                </Select>
                </FormControl>
            </li>
            <li><TextField  label="Max count"  margin="normal" InputProps={{readOnly: true}}  value={this.state.MaxCount} /></li>
            <li><TextField type = "number" error = {this.state.Error} label="Count" margin="normal" InputProps={{ inputProps: { min: 1, max:this.state.MaxCount } }} onChange = {this.CountChange} value ={this.state.Count}/></li>
            <li><MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                <KeyboardDatePicker margin="normal"  style = {{width:"200px"}} id="date-picker-dialog" label="Birthday" format="dd/MM/yyyy" onChange ={this.VisitDateChange} value = {this.state.VisitDate}  KeyboardButtonProps={{ 'aria-label': 'change date', }} />
                </Grid>
                </MuiPickersUtilsProvider>
            </li>
            <li><Button className="formButton" variant="contained" fullWidth={true} onClick = {this.SendDrug}>Add</Button></li>
        </ul> 
        <Snackbar
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={this.state.IsSuccess}
            onClose = {this.CloseNotification}
            key={"top" + "center"}
            autoHideDuration = {1000}
            >
            <Alert severity="success" style ={{width:"300px"}}>
            Success!
            </Alert>
        </Snackbar>      
    </Paper>
    );
}
}

