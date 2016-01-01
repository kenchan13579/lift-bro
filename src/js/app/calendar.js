var React = require("react");
var ReactDOM = require("react-dom");


var CalendarContainer = React.createClass({
  getInitialState : function(){
    return {
      "date" : new Date(),
        "weeks": [],
    }
  },
  nextMonth: function(){
    var date = this.state.date;
    var next = date.setMonth(date.getMonth() + 1);
    this.setState({"date": date});
    this.loadCalendar();
  },
  prevMonth: function(){
    var date = this.state.date;
    var prev = date.setMonth(date.getMonth() - 1);
    this.setState({"date": date});
    this.loadCalendar();
  },
  updateDate : function(date){
    var target = new Date(date);
    this.setState({"date": target});
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
          week.push({
            date : currentDate.getDate(),
            longDate: currentDate.toString()
          });
          currentDate = new Date(currentDate.getFullYear(),currentDate.getMonth(), ++day);
        }
      }
      weeks.push(week);
    }
    this.setState({weeks:weeks});
  },
  componentWillMount: function(){
    this.loadCalendar();
  },
  render : function(){
    return (
      <div>
      <p>{this.state.date.toString()}</p>
      <Header prev={this.prevMonth} next={this.nextMonth}/>
      <Calendar onDateChange={this.updateDate} data={this.state.weeks} date={this.state.date.toString()} />
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
  setDate : function(date){
    this.props.onDateChange(date);
  },
  getCalendar: function(){
    var that = this;
    var cal =  this.props.data.map(function(week,i){
        var days = week.map(function(day,j){
            return <li className="calendar-day"  key={i+""+j} onClick={that.setDate.bind(that,day.longDate)}>{day.date}</li>;
        });
        return <ul key={i} >{days}</ul>;
    });
    return cal;
  },
  render: function(){

    return (
      <div className="calendar">
        <ul className="calendar-weekday-name">
          {this.state.names.map(function(v,i){
            return <li key={i}>{v}</li>
          })}
        </ul>
        {this.getCalendar()}
      </div>
    );
  }
});
ReactDOM.render(
  <CalendarContainer/>,
  document.getElementById("calendar")
);
