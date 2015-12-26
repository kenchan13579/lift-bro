var React = require("react");
var ReactDOM = require("react-dom");


var CalendarContainer = React.createClass({
  getInitialState : function(){
    return {
      "date" : new Date(),
      "weeks": []
    }
  },
  nextMonth: function(){
    var date = this.state.date;
    var next = date.setMonth(date.getMonth() + 1);
    this.setState({"date": date});
    this.onUpdate();
  },
  prevMonth: function(){
    var date = this.state.date;
    var prev = date.setMonth(date.getMonth() - 1);
    this.setState({"date": date});
    this.onUpdate();
  },
  loadCalendar:function(){
    var MAX_WEEK_DAY = 7;
    var today = new Date(this.state.date);
    var day = 1;
    var weeks = [];
    var currentDate = new Date(today.getFullYear(), today.getMonth(), day);
    while (currentDate.getMonth() == today.getMonth()){
      var week = [];
      for ( var i = 0 ; i < MAX_WEEK_DAY ; i++){
        if (currentDate.getDay() !== i ||  currentDate.getMonth() !== today.getMonth()){
          // last month or next month
          if ( week.length < MAX_WEEK_DAY ){
              week.push("");
          } else {
            break;
          }
        } else {
          week.push(currentDate.getDate());
          currentDate = new Date(currentDate.getFullYear(),currentDate.getMonth(), ++day);
        }
      }
      weeks.push(week);
    }
    this.setState({weeks:weeks});
  },
  componentWillMount(){
      this.loadCalendar();
  },
  onUpdate : function(){
    this.loadCalendar();
  },
  render : function(){
    return (
      <div>
      <p>{this.state.date.toString()}</p>
      <Header prev={this.prevMonth} next={this.nextMonth}/>
      <Calendar weeks={this.state.weeks}/>
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

var Calendar = React.createClass({
  getInitialState : function(){
    return {
      names: ['S','M','T','W','T','F','S'],

    }
  },
  render: function(){

    return (
      <div className="calendar">
        <ul className="calendar-weekday-name">
          {this.state.names.map(function(v,i){
            return <li key={i}>{v}</li>
          })}
        </ul>
        {
            this.props.weeks.map(function(week,i){
              var days = week.map(function(day,j){
                return <li className="calendar-day" key={j+i}>{day}</li>;
              });
            return <ul key={i}>{days}</ul>;
          })
        }
      </div>
    );
  }
});
ReactDOM.render(
  <CalendarContainer/>,
  document.getElementById("calendar")
);
