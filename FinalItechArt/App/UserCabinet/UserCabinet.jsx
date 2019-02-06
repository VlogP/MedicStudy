import React from 'react';

import{connect}from 'react-redux';

import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './css.css';

 class UserCabinet extends React.Component {

constructor(props) {
  

        super(props);
        
    this.state={Email:props.Email,Password:props.Password,TabNumber:0};      
		this.ChangeEmailName = this.ChangeEmailName.bind(this);
		this.ChangePassword = this.ChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ChangeTab=this.ChangeTab.bind(this);
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
      
      ChangeTab(e,value) {

   this.setState({TabNumber:value});

    }

	  

  render () {

    return (

	

	<Paper className="UserCabinet" elevation={10} Component="div">
<AppBar position="static">
          <Tabs value={this.state.TabNumber} onChange={this.ChangeTab}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
{this.state.TabNumber === 0 && <ul>

  <li>	 <TextField   label="Firstname"  margin="normal"  onChange={this.ChangeEmailName}/>  </li>
         
  <li>	 <TextField  label="Password" margin="normal" type='password'  onChange={this.ChangePassword}/>  </li>
         
  <li>     <Button type="submit" className="formButton" variant="contained" fullWidth={true}>Authorize</Button></li>
      
  </ul> }
{this.state.TabNumber === 1 && <p>Item Two</p>}
{this.state.TabNumber === 2 && <p>Item Three</p>}

      <form onSubmit={this.handleSubmit}>

        <Typography variant="h5">

          Cabinet

        </Typography>

	  
        <Typography variant="h6" color="error" >
           {this.props.error}
        </Typography>



	 

</form>

  </Paper>



    )

  }

}



 const mapStateToProps = state => {

  return {

    error:state.error

  };

};



const mapDispatchToProps =dispatch =>{

  return{

  CheckAuth: (Email,Password) => dispatch({ type: "CHECK_AUTH",Email:Email,Password:Password }),
  
  };

};





export default connect(mapStateToProps, mapDispatchToProps)(UserCabinet); 