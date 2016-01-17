var React = require("react");
var ReactDOM = require("react-dom");

var notesContainer  = React.createClass({
  render : function(){
    return (
      <form>
      <exercises/>
    </form>
  );
  }
});

var exercises = React.createClass({
  getInitialState : function(){
    return {
      exercises:[]
    };
  },
  addExercise : function (data) {
    if ( typeof data === 'object' && data) {
      this.setState(function(state){
        return {
          exercises : state.push(data)
        };
      });
    }

  },
  render : function(){
    return (
        <ul>
          {this.state.map(function(d , i ){
            return <li><sets/></li>;
          })}
        </ul>
    );
  }
});
