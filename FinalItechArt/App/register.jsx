import React from 'react';
import axios from 'axios';



export class Header extends React.Component {

    render() {

        return <h1>Header</h1>

    }

}



export   class Hello extends React.Component {

    constructor(props) {

        super(props);

        this.state = { String: "ll", Increment: 0 };

        this.down = this.down.bind(this);

    }

    down() {

        let letter = this.state.String === "l" ? "ll" : "l";



        this.setState({ String: letter, Increment: this.state.Increment + 1 });





    };





    render() {

        return <div className="Hello">

            <h2><Clock /></h2>

            <h1>{this.props.String}</h1>

            <h1>{this.state.Increment}</h1>

            <button onClick={this.down}>{this.state.String}{this.state.Increment}</button></div>

    }

}

Hello.defaultProps = { String: "Tom" };





export class Clock extends React.Component {

    constructor(props) {

        super(props);

        this.state = { date: new Date(), name: "Tom123", Increment: 0 };

    }



    componentDidMount() {

        this.timerId = setInterval(

            () => this.tick(),

            1000

        );

    }



    componentWillUnmount() {

        clearInterval(this.timerId);

    }



    tick() {

        this.setState({

            date: new Date(),

            Increment: this.state.Increment + 1

        });

    }



    render() {

        return (

            <div>

                <h1>Привет, {this.state.name},{this.state.Increment}</h1>

                <h2>Текущее время {this.state.date.toLocaleTimeString()}.</h2>

            </div>

        );

    }

}




export default class UserForm extends React.Component {
    constructor(props) {
      super(props);
      var name = props.name;
      var nameIsValid = this.validateName(name);
      var age = props.age;
      var ageIsValid = this.validateAge(age);
      this.state = {name: name, age: age, nameValid: nameIsValid, ageValid: ageIsValid};
 
      this.onNameChange = this.onNameChange.bind(this);
      this.onAgeChange = this.onAgeChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
      validateAge(age){
        var myRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[!-+.@#$%^&*]).{8,15}$/;
        var myArray = myRe.test(age);
          return myArray;
      }
      validateName(name){
          return name.length>2;
      }
      onAgeChange(e) {
          var val = e.target.value;
          var valid = this.validateAge(val);
          this.setState({age: val, ageValid: valid});
      }
      onNameChange(e) {
          var val = e.target.value;
          console.log(val);
          var valid = this.validateName(val);
          this.setState({name: val, nameValid: valid});
      }
 
      handleSubmit(e) {
          e.preventDefault();
          if(this.state.nameValid ===true && this.state.ageValid===true){
              alert("Имя: " + this.state.name + " Возраст: " + this.state.age);
          }

          axios.post()
      }
 
      render() {
          // цвет границы для поля для ввода имени
          var nameColor = this.state.nameValid===true?"green":"red";
          // цвет границы для поля для ввода возраста
          var ageColor = this.state.ageValid===true?"green":"red";
          return (
              <form onSubmit={this.handleSubmit}>
                  <p>
                      <label>Имя:</label><br />
                      <input type="text" value={this.state.name} 
                          onChange={this.onNameChange} style={{borderColor:nameColor}} />
                  </p>
                  <p>
                      <label>Возраст:</label><br />
                      <input type="text" value={this.state.age} 
                          onChange={this.onAgeChange}  style={{borderColor:ageColor}} />
                  </p>
                  <input type="submit" value="Отправить" />
              </form>
          );
      }
  }
  UserForm.defaultProps = { name:"", age:"0" };



