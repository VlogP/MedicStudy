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
import styles from './DrugAddCss.css';
 
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
    this.state = {DrugName:'',Manufacturer:'',Description:'',DrugType:'1',Errors:['','','','',''],IsSuccess:false,IsRedirect:false,Count:0,Capacity:''};      
    this.DrugTypeChange = this.DrugTypeChange.bind(this);
    this.DescriptionChange = this.DescriptionChange.bind(this);
    this.CountChange = this.CountChange.bind(this);
    this.DrugNameChange = this.DrugNameChange.bind(this);
    this.ManufacturerChange = this.ManufacturerChange.bind(this);
    this.CapacityChange = this.CapacityChange.bind(this);
    this.CloseNotification = this.CloseNotification.bind(this);
    this.AddDrug = this.AddDrug.bind(this);

    axios.defaults.headers.common['Authorization'] = 
    'Bearer ' + sessionStorage.getItem('token');   
}


AddDrug(event){
    let isValid = true;
    let arrayErrors = this.state.Errors;

    if(!validateName(this.state.DrugName,3)){
        arrayErrors[0] = "Must be more then 3. Only latin and numbers"
        isValid = false
    }
    else{
        arrayErrors[0] = ""
    }

    if(!validateName(this.state.Capacity,3)){
        arrayErrors[1] = "Must be more then 3. Only latin and numbers"
        isValid = false
    }
    else{
        arrayErrors[1] = ""
    }

    if(!validateName(this.state.Manufacturer,5)){
        arrayErrors[2] = "Must be more then 5. Only latin and numbers"
        isValid = false
    }
    else{
        arrayErrors[2] = ""
    }

    if(!validateName(this.state.Description,10)){
        arrayErrors[3] = "Must be more then 10. Only latin and numbers"
        isValid = false
    }
    else{
        arrayErrors[3] = ""
    }

    this.setState({Errors:arrayErrors});

    if(isValid) {    
        axios.post('/drugmanage',{
            Name:this.state.DrugName,
            TypeCapacity:'1',
            Capacity: this.state.Capacity,
            Manufacturer: this.state.Manufacturer,
            Count: this.state.Count,
            DrugType: this.state.DrugType,
            Description : this.state.Description
          }).then(_ => {
            this.setState({IsSuccess:true});
        }) 
    } 
}

DrugNameChange(event){
    this.setState({DrugName:event.target.value});
}

CloseNotification(event){
    this.setState({IsRedirect:true});
}

ManufacturerChange(event){
    this.setState({Manufacturer:event.target.value});
}

CapacityChange(event){
    this.setState({Capacity:event.target.value});
}

CountChange(event){
    let number = Number.parseInt(event.target.value)
    if(Number.isInteger(number) && number >= 0){
    this.setState({Count:number});
    }
}

DrugTypeChange(event){
    this.setState({DrugType:event.target.value});
}

DescriptionChange(event){
    this.setState({Description:event.target.value});
}

render(){
    if (this.state.IsRedirect) {        
        return <Redirect to='/drug'/>;
    }

    return (
    <Paper className="DrugAdd" elevation={10} Component="div">
      <Typography variant="h5" component="h3"> ADD DRUG </Typography> 
        <ul>
            <li><TextField error={this.state.Errors[0].length}  label="Name"  margin="normal"  value={this.state.DrugName} onChange = {this.DrugNameChange} style={{width:"450px"}}/></li>
                <Typography variant="caption" gutterBottom align="center" >  {this.state.Errors[0]}</Typography>
            <li><TextField error={this.state.Errors[1].length} label="Capacity" margin="normal" value={this.state.Capacity} onChange = {this.CapacityChange} style={{width:"450px"}}/></li>
                <Typography variant="caption" gutterBottom align="center" >  {this.state.Errors[1]}</Typography>
            <li><TextField error={this.state.Errors[2].length}  label="Manufacturer"  margin="normal"  value={this.state.Manufacturer} onChange = {this.ManufacturerChange} style={{width:"450px"}}/></li>
                <Typography variant="caption" gutterBottom align="center" >  {this.state.Errors[2]}</Typography>    
            <li><FormControl>
                <InputLabel id="demo-simple-select-label">Drug Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.DrugType}
                style ={{width:"450px",textAlign:"left"}}
                onChange={this.DrugTypeChange}
                >
                <MenuItem value={1}>A</MenuItem>
                <MenuItem value={2}>B</MenuItem>
                <MenuItem value={3}>C</MenuItem>
                </Select>
                </FormControl>
            </li>
            <li><TextField multiline variant="outlined" error={this.state.Errors[3].length} label="Description" margin="normal" rows = {8} style={{width:"450px"}} onChange = {this.DescriptionChange} value = {this.state.Description}/></li>
                <Typography variant="caption" gutterBottom align="center" >  {this.state.Errors[3]}</Typography>
            <li><TextField type = "number" label="Count" margin="normal" InputProps={{ inputProps: { min: 0 } }} onChange = {this.CountChange} value ={this.state.Count} style={{width:"450px"}}/></li>
            <li><Button className="formButton" variant="contained" fullWidth={true} onClick = {this.AddDrug}>Add drug</Button></li>
        </ul> 
        <Snackbar
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={this.state.IsSuccess}
            onClose = {this.CloseNotification}
            key={"top" + "center"}
            autoHideDuration = {1000}
            >
            <Alert severity="success" style ={{width:"300px"}}>
            Success added drug!
            </Alert>
        </Snackbar>      
    </Paper>
    );
}
}

