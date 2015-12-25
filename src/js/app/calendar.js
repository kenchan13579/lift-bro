var React = require("react");
var ReactDOM = require("react-dom");


var CalendarContainer = React.createClass({
  getInitialState : function(){
    return {
      "date" : new Date()
    }
  },
  nextMonth: function(){
    var date = this.state.date;
    var next = date.setMonth(date.getMonth() + 1);
    this.setState({"date": date});
  },
  prevMonth: function(){
    var date = this.state.date;
    var prev = date.setMonth(date.getMonth() - 1);
    this.setState({"date": date});
  },
  render : function(){
    return (
      <div>
      <p>{this.state.date.toString()}</p>
      <Header prev={this.prevMonth} next={this.nextMonth}/>
      </div>
    );
  }
});

var Header = React.createClass({

  render : function (){
    return (
      <div>
      <button onClick={this.props.prev}>prev</button>
      Testng
      <button onClick={this.props.next}>next </button>
      </div>
    );
  }
});

ReactDOM.render(
  <CalendarContainer/>,
  document.getElementById("calendar")
);
