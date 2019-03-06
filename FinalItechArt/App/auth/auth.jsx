import React from 'react';

import{connect}from 'react-redux';

import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import {Redirect} from 'react-router';
import styles from './css.css';



 class AuthForm extends React.Component {

constructor(props) {
  

        super(props);
        
         this.state={Email:props.Email,Password:props.Password};

       
		this.ChangeEmailName = this.ChangeEmailName.bind(this);

		this.ChangePassword = this.ChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
      }

  

	  ChangeEmailName(e){

		  this.setState({Email:e.target.value});

	  }

	  ChangePassword(e){

		this.setState({Password:e.target.value});

	  }


	   handleSubmit(e) {

        e.preventDefault();
  
       this.props.CheckAuth(this.state.Email,this.state.Password);
      
      }

	  

  render () {

    if (this.props.IsSuccess) {
      return <Redirect to='/cabinet'/>;
    }

    return (

	

	<Paper className="AuthPaper" elevation={10} Component="div">

      <form onSubmit={this.handleSubmit}>

        <Typography variant="h5">

          AUTHORIZATION

        </Typography>

	  
        <Typography variant="h6" color="error" >
           {this.props.error}
        </Typography>
        

<ul>

<li>	 <TextField error={this.props.error==""?false:true}  label="Email"  margin="normal"  onChange={this.ChangeEmailName}/>  </li>
       
<li>	 <TextField error={this.props.error==""?false:true} label="Password" margin="normal" type='password'  onChange={this.ChangePassword}/>  </li>
       
<li>     <Button type="submit" className="formButton" variant="contained" fullWidth={true}>Authorize</Button></li>
    
</ul> 

	 

</form>

  </Paper>



    )

  }

}



 const mapStateToProps = state => {

  return {
    IsSuccess:state.auth.IsSuccess,
    error:state.auth.error

  };

};



const mapDispatchToProps =dispatch =>{

  return{

  CheckAuth: (Email,Password) => dispatch({ type: "CHECK_AUTH",Email:Email,Password:Password }),
  
  };

};





export default connect(mapStateToProps, mapDispatchToProps)(AuthForm); 