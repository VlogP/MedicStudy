import React from 'react';

import{connect}from 'react-redux';

import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import {Redirect} from 'react-router';
import styles from './css.css';


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
    if (this.props.IsSuccess) {
      return <Redirect to='/auth'/>;
    }

    return (

	

	<Paper className="RegPaper" elevation={10} Component="div">

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
<li>	 <TextField error={(this.props.errors[3]==""&&this.props.errors[6]=="")?false:true} label="Email" margin="normal"  onChange={this.ChangeEmailName}/>  </li>
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












 const mapStateToProps = state => {

  return {
    IsSuccess:state.register.IsSuccess,
    errors:state.register.errors

  };

};



const mapDispatchToProps =dispatch =>{

  return{

  Validate: (FirstName,Lastname,Initials,Email,Password,ConfirmPassword) => dispatch({ type: "VALIDATE",FirstName:FirstName,Lastname:Lastname,Initials:Initials,Email:Email,Password:Password,ConfirmPassword:ConfirmPassword }),
  
  };

};





export default connect(mapStateToProps, mapDispatchToProps)(Register); 