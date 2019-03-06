import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Header(props) {   
  const { classes } = props;
 if(sessionStorage.getItem("token")==null)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/register" className="link"><Button color="inherit" > Register</Button></Link>
          <Link to="/auth" className="link"><Button color="inherit">Login</Button></Link>
          <Link to="/" className="link" ><Button color="inherit" >Menu</Button></Link>      
        </Toolbar>
      </AppBar>
    </div>
  );
  else
  return(
<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>         
          <Link to="/" className="link" ><Button color="inherit" >Menu</Button></Link>
         <Link to="/cabinet" className="link" ><Button color="inherit" >My cabinet</Button></Link>
         <Link to="/" className="link"><Button color="inherit" onClick={()=>sessionStorage.removeItem("token")}>Exit</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
 );
 
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);









