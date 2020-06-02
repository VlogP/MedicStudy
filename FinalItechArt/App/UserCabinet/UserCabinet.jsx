import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styles from './css.css';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

function validateName(Name){ 
    var reqular = /^[a-zA-Z]{3,}$/;
    if(Name===undefined)return false;

    return reqular.test(Name);
}

function validateInitials(Initials){
    var reqular = /^[A-Z][.][A-Z]$/;

    return reqular.test(Initials);
}
function validatePassword(Password){
    var reqular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[!-+.@#$%^&*]).{8,16}$/;
 
    return reqular.test(Password);
}

export default class UserCabinet extends React.Component {
constructor(props) {
    super(props);    
    this.state={Firstname:'',Lastname:'',Initials:'',NewPassword:'',NewConfirmPassword:'',ClinicId:'1',TabNumber:0,Errors:["","","","",""],IsLoaded:false,OldFirstname:'',OldLastname:'',OldInitials:'',NotificationShow:false};      
    this.ChangeTab=this.ChangeTab.bind(this);
    this.UpdateMainData=this.UpdateMainData.bind(this);
    this.ChangeFirstname=this.ChangeFirstname.bind(this);
    this.ChangeInitials=this.ChangeInitials.bind(this);
    this.ChangeLastname=this.ChangeLastname.bind(this);
    this.ChangeClinicId=this.ChangeClinicId.bind(this);
    this.ChangePassword=this.ChangePassword.bind(this);
    this.ChangeConfirmPassword=this.ChangeConfirmPassword.bind(this);
    this.UpdatePassword=this.UpdatePassword.bind(this);
    this.CloseNotification=this.CloseNotification.bind(this);

    axios.defaults.headers.common['Authorization'] = 
    'Bearer ' + sessionStorage.getItem('token'); 
}
  
componentDidMount() {
  axios.get(`cabinet/getdata`).then(
        response => {
          let person = response.data;
          this.setState({
            Firstname:person.firstname,
            Lastname:person.lastname,
            Initials:person.initials,
            OldFirstname:person.firstname,
            OldLastname:person.lastname,
            OldInitials:person.initials,
            ClinicId:person.clinicId,
            IsLoaded:true
          });
        }
    );
}

UpdateMainData() {
  let isValid = true;
  let arrayErrors = this.state.Errors;

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

  if(!validateInitials(this.state.Initials)){
    arrayErrors[2] = "Must be in form {A.A}"
    isValid = false
  }
  else{
    arrayErrors[2] = ""
  }

  this.setState({
    Errors:arrayErrors
  })

  if(isValid) {
    this.setState({IsLoaded:false},_ => {
      axios.post('cabinet/secondary',{
        Firstname:this.state.Firstname,   
        Lastname:this.state.Lastname,   
        Initials:this.state.Initials,
        ClinicId:this.state.ClinicId
      }).then(_ => {
        this.setState({
          NotificationShow:true,
          Errors:arrayErrors,
          OldFirstname:this.state.Firstname,
          OldInitials:this.state.Initials,
          OldLastname:this.state.Lastname,
          IsLoaded:true
        })
      })  
    })
  }
}

UpdatePassword(e){
  let isValid = true;
  let arrayErrors = this.state.Errors;

  if(!validatePassword(this.state.NewPassword)){
    arrayErrors[3] = "Password must be 8-16 characters and include both numbers"
    isValid = false
  }
  else{
    arrayErrors[3] = ""
  }

  if(this.state.NewConfirmPassword != this.state.NewPassword){
    arrayErrors[4] = "Not confirm password"
    isValid = false
  }
  else{
    arrayErrors[4] = ""
  }

  this.setState({
    Errors:arrayErrors
  })

  if(isValid) {
    this.setState({IsLoaded:false},_ => {
      axios.post('cabinet/primary',{
        NewPassword:this.state.NewPassword,
      }).then(_ => {
        this.setState({
          NotificationShow:true,
          Errors:arrayErrors,
          IsLoaded:true,
          NewConfirmPassword:'',
          NewPassword:''
        })
      })  
    })
  }
 }

ChangeTab(e,value) {
  this.setState({TabNumber:value});
}

ChangePassword(e) {
 this.setState({NewPassword:e.target.value});
}

ChangeConfirmPassword(e) {
 this.setState({NewConfirmPassword:e.target.value});
}

ChangeFirstname(e){
 this.setState({Firstname:e.target.value});
}

ChangeLastname(e){
  this.setState({Lastname:e.target.value});
}

ChangeInitials(e){
  this.setState({Initials:e.target.value});
}

ChangeClinicId(e){
  this.setState({ClinicId:e.target.value});
}

CloseNotification(e){
  this.setState({NotificationShow:false});
}

render () {
return ( 
  <Paper className="UserCabinet" elevation={10} Component="div">
    <Typography variant="h5" component="h3"> PERSONAL CABINET </Typography>
    <AppBar position="static">
            <Tabs value={this.state.TabNumber} onChange={this.ChangeTab}>
              <Tab label="User data" />
              <Tab label="Password" />           
            </Tabs>
    </AppBar>
  {(this.state.IsLoaded && this.state.TabNumber == 0) ? 
    <ul>
      <li><TextField error={this.state.Errors[0].length}  label="Firstname"  margin="normal"  value={this.state.Firstname} onChange = {this.ChangeFirstname}  helperText={"Actual "+'"'+this.state.OldFirstname+'"'}/></li>
            <Typography variant="caption" gutterBottom align="center" >  {this.state.Errors[0]}</Typography>
      <li><TextField error={this.state.Errors[1].length} label="Lastname" margin="normal" value={this.state.Lastname} onChange = {this.ChangeLastname} helperText={"Actual "+'"'+this.state.OldLastname+'"'}/></li>
            <Typography variant="caption" gutterBottom align="center" >  {this.state.Errors[1]}</Typography>
      <li><TextField error={this.state.Errors[2].length} label="Initials" margin="normal" value={this.state.Initials} onChange = {this.ChangeInitials} helperText={"Actual "+'"'+this.state.OldInitials+'"'}/></li>
            <Typography variant="caption" gutterBottom align="center" >  {this.state.Errors[2]}</Typography>  
      <li><FormControl>
            <InputLabel id="demo-simple-select-label-1">Clinic</InputLabel>
            <Select
            labelId="demo-simple-select-label-1"
            id="demo-simple-select-1"
            value={this.state.ClinicId}
            style ={{width:"200px",textAlign:"left"}}
            onChange={this.ChangeClinicId}
            >
            <MenuItem value={1}>Grodno clinic</MenuItem>
            <MenuItem value={2}>Minsk clinic</MenuItem>
            <MenuItem value={3}>Brest clinic</MenuItem>
            </Select>
            </FormControl>
      </li>  
      <li><Button className="formButton" variant="contained" fullWidth={true} onClick = {this.UpdateMainData}>Update main data</Button></li>
    </ul> : this.state.TabNumber == 0 && <CircularProgress color="secondary" style ={{margin:"200px"}} />   
  }

  {(this.state.IsLoaded && this.state.TabNumber == 1) ?
   <ul>
    <li><TextField error={this.state.Errors[3].length} label="Password" type="password" margin="normal" value={this.state.NewPassword} onChange={this.ChangePassword}/></li>
         <Typography variant="caption" gutterBottom align="center" >{this.state.Errors[3]}</Typography>
    <li><TextField error={this.state.Errors[4].length} label="Confirm Password" type="password" margin="normal" value={this.state.NewConfirmPassword} onChange={this.ChangeConfirmPassword}/></li>
         <Typography variant="caption" gutterBottom align="center" >{this.state.Errors[4]}</Typography>
    <li><Button className="formButton" variant="contained" fullWidth={true} onClick = {this.UpdatePassword}>Update password</Button></li>
   </ul>: this.state.TabNumber == 1 && <CircularProgress color="secondary" style ={{margin:"200px"}} />  
  }

  <Snackbar
    anchorOrigin={{ vertical:"top", horizontal:"center" }}
    open={this.state.NotificationShow}
    onClose={this.CloseNotification}
    key={"top" + "center"}
    autoHideDuration = {3000}
  >
  <Alert severity="success" style ={{width:"300px"}}>
  Success update!
  </Alert>
  </Snackbar>
  </Paper>
    )
  }
}

