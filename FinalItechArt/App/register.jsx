import React from 'react';

import{connect}from 'react-redux';

import {put, call,takeEvery} from 'redux-saga/effects';

import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import axios from 'axios';




// Reducer

const initialState = {

  FirstName:'',

  Lastname:'',

  Initials:'',

  Email:'',

  Password:'',

  ConfirmPassword:'',

  errors:["","","","","","","",""]

   

};

export const reducer = (state = initialState, action) => {

  switch (action.type) { 

    case 'REQUESTED_NAME':

      return {

        errors:action.errors

      };

    default:

      return state;

  }

};



const requestDogSuccess = (data) => {

	

  return { type: 'REQUESTED_NAME', errors: data}

};




function validatePassword(e){

	 var reqular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[!-+.@#$%^&*]).{8,16}$/;
	
    return reqular.test(e.Password);

}

function validateName(e){

	 var reqular = /^[a-zA-Z]{3,}$/;

	if(e.Name===undefined)return false;

    return reqular.test(e.Name);

}





function validateInitials(e){

	 var reqular = /^[A-Z][.][A-Z]$/;

    return reqular.test(e.Initials);

}

function validateConfirmPassword(e){

    return e.Password==e.ConfirmPassword;

}

function validateEmail(e){

	var reqular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return reqular.test(e.Email);
}
function RegisterRequest(e){

    return axios.post('',{
        Firstname:e.Info.FirstName,   
        Lastname:e.Info.Lastname,   
        Initials:e.Info.Initials,  
        Email:e.Info.Email,
        Password:e.Info.Password
        })
        .then(response=>{
        return "";
        })
        .catch(error=>{
        return "Error user with this Email already is";
        });   
	

   
}


export function* watchFetchDog() {

  yield takeEvery('VALIDATE', Validation);

}



function* Validation(e) {

  try {

    var errors=["","","","","","",""];
    var IsReadyToSend=true;
	

    var IsOk = yield call(validatePassword,{Password:e.Password});

	if(!IsOk){errors[4]="Password must be 8-16 characters and include both numbers";IsReadyToSend==false;}	

	

    IsOk = yield call(validateConfirmPassword,{Password:e.Password,ConfirmPassword:e.ConfirmPassword});

	if(!IsOk){errors[5]="Not confirm password";IsReadyToSend=false;}

	

    IsOk = yield call(validateEmail,{Email:e.Email});

	if(!IsOk){errors[3]="Not right email";IsReadyToSend=false;}		

	

	 IsOk = yield call(validateInitials,{Initials:e.Initials});

	 if(!IsOk){errors[2]="Must be in form {A.A}";IsReadyToSend=false;}

	

	

	 IsOk = yield call(validateName,{Name:e.FirstName});

	

	if(!IsOk){errors[0]="Consist only of letters";IsReadyToSend=false;	}

	

	 IsOk = yield call(validateName,{Name:e.Lastname});

	if(!IsOk){errors[1]="Consist only of letters";IsReadyToSend=false;}	

	
    if(IsReadyToSend){
    errors[6]=yield call(RegisterRequest,{Info:e});
    }
  
    yield put(requestDogSuccess(errors));
  } catch (error) {

	console.log(error);

  }

}



// Component

class Register extends React.Component {

constructor(props) {

        super(props);

         this.state={FirstName:props.FirstName,Lastname:props.Lastname,Initials:props.Initials,Email:props.Email,Password:props.Password,ConfirmPassword:props.ConfirmPassword};

        this.handleSubmit = this.handleSubmit.bind(this);

		this.ChangeFirstName = this.ChangeFirstName.bind(this);

		this.ChangeLastName = this.ChangeLastName.bind(this);

		this.ChangeInitialsName = this.ChangeInitialsName.bind(this);

		this.ChangeEmailName = this.ChangeEmailName.bind(this);

		this.ChangePassword = this.ChangePassword.bind(this);

		this.ChangeConfirmPassword = this.ChangeConfirmPassword.bind(this);

      }

	  ChangeFirstName(e){

		  this.setState({FirstName:e.target.value});

		

	  }

	  ChangeLastName(e){

	  this.setState({Lastname:e.target.value});

	  }

	  ChangeInitialsName(e){

		  this.setState({Initials:e.target.value});

	  }

	  ChangeEmailName(e){

		  this.setState({Email:e.target.value});

	  }

	  ChangePassword(e){

		this.setState({Password:e.target.value});

	  }

	  ChangeConfirmPassword(e){

		  this.setState({ConfirmPassword:e.target.value});

		  

	  }

	 

	  

	   handleSubmit(e) {

        e.preventDefault();

       this.props.Validate(this.state.FirstName,this.state.Lastname,this.state.Initials,this.state.Email,this.state.Password,this.state.ConfirmPassword);

      }

	  

  render () {

    return (

	

	<Paper className="paper" elevation={10} Component="div">

      <form onSubmit={this.handleSubmit}>

        <Typography variant="h5" component="h3">

          REGISTRATION

        </Typography>

	  

<ul>
   

<li>	 <TextField error={this.props.errors[0]==""?false:true}  label="Firstname"  margin="normal"  onChange={this.ChangeFirstName}/>  </li>
         <Typography variant="caption" gutterBottom align="center" >  {this.props.errors[0]} </Typography>
<li>	 <TextField error={this.props.errors[1]==""?false:true} label="Lastname" margin="normal"  onChange={this.ChangeLastName}/>  </li>
         <Typography variant="caption" gutterBottom align="center" >  {this.props.errors[1]}  </Typography>
<li>	 <TextField error={this.props.errors[2]==""?false:true} label="Initials" margin="normal"  onChange={this.ChangeInitialsName}/>  </li>
         <Typography variant="caption" gutterBottom align="center" >  {this.props.errors[2]}  </Typography>
<li>	 <TextField error={this.props.errors[3]==""?false:true} label="Email" margin="normal"  onChange={this.ChangeEmailName}/>  </li>
         <Typography variant="caption" gutterBottom align="center" >  {this.props.errors[3]==""?this.props.errors[6]:this.props.errors[3]} </Typography>
<li>	 <TextField error={this.props.errors[4]==""?false:true} label="Password" type="password" margin="normal"  onChange={this.ChangePassword}/>  </li>
         <Typography variant="caption" gutterBottom align="center" >  {this.props.errors[4]}  </Typography>
<li>	 <TextField error={this.props.errors[5]==""?false:true} label="Confirm Password" type="password" margin="normal"  onChange={this.ChangeConfirmPassword}/>  </li>
         <Typography variant="caption" gutterBottom align="center" >  {this.props.errors[5]}  </Typography>
<li>     <Button type="submit" className="formButton" variant="contained" fullWidth={true}>Register</Button></li>
    
</ul> 

	 

</form>

  </Paper>



    )

  }

}



// Store









const mapStateToProps = state => {

  return {

   

    errors:state.errors

  };

};



const mapDispatchToProps =dispatch =>{

  return{

  Validate: (FirstName,Lastname,Initials,Email,Password,ConfirmPassword) => dispatch({ type: "VALIDATE",FirstName:FirstName,Lastname:Lastname,Initials:Initials,Email:Email,Password:Password,ConfirmPassword:ConfirmPassword })

  

  };

};





export default connect(mapStateToProps, mapDispatchToProps)(Register); 