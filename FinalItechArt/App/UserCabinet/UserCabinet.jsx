import React from 'react';

import{connect}from 'react-redux';

import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {InitialRequest} from './create_action.jsx';
import styles from './css.css';

 class UserCabinet extends React.Component {

constructor(props) {
  

        super(props);
     
    this.state={Ddd:"g",Firstname:this.props.Firstname,TabNumber:0};      
		this.ChangeEmailName = this.ChangeEmailName.bind(this);
		this.ChangePassword = this.ChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ChangeTab=this.ChangeTab.bind(this);
    this.props.Initial()
   
  
      }

     
 

	  ChangeEmailName(e){

		  this.setState({Email:e.target.value});

	  }

	  ChangePassword(e){

		this.setState({Password:e.target.value});

	  }


	   handleSubmit(e) {

        e.preventDefault();
        
       
      

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
          </Tabs>
        </AppBar>

{this.state.TabNumber === 0 && <ul>
 <form onSubmit={this.handleSubmit}>

<li>	 <TextField error={this.props.errors==""?false:true}  label="Firstname"  margin="normal"  onChange={this.ChangeFirstName} helperText={"Actual "+'"'+this.props.Firstname+'"'}/></li>
         <Typography variant="caption" gutterBottom align="center" >  {this.props.errors[0]} </Typography>
<li>	 <TextField error={this.props.errors==""?false:true} label="Lastname" margin="normal"  onChange={this.ChangeLastName} helperText={"Actual "+'"'+this.props.Lastname+'"'}/>  </li>
         <Typography variant="caption" gutterBottom align="center" >  {this.props.errors[1]}  </Typography>
<li>	 <TextField error={this.props.errors==""?false:true} label="Initials" margin="normal"  onChange={this.ChangeInitialsName}helperText={"Actual "+'"'+this.props.Initials+'"'}/>  </li>
         <Typography variant="caption" gutterBottom align="center" >  {this.props.errors[2]}  </Typography>
     
  <li>     <Button type="submit" className="formButton" variant="contained" fullWidth={true}>Authorize</Button></li>
  </form>
  </ul> }
{this.state.TabNumber === 1 && <p>Item Two</p>}

     
       
	  
        <Typography variant="h6" color="error" >
           {this.props.error}
        </Typography>



	 



  </Paper>



    )

  }

}



 const mapStateToProps = state => {

  return {
    Firstname:state.CabinetReducer.Firstname,
    Lastname:state.CabinetReducer.Lastname,
    Initials:state.CabinetReducer.Initials,
    errors:state.CabinetReducer.error

  };

};



const mapDispatchToProps =dispatch =>{

  return{

  Initial: () => dispatch({ type: "CHECK_CABINET" }),
  
  
  };

};





export default connect(mapStateToProps, mapDispatchToProps)(UserCabinet); 