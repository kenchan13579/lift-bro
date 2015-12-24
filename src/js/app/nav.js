var React = require("react");
var ReactDOM = require("react-dom");

var Nav = React.createClass({
  show : function (){
    this.refs.menu.show();
  },
  render: function () {
    return (
      <div>
        <button type="button" onClick="{this.show}">Menu</button>
        <Menu ref="menu" />
      </div>
    );
  }
});

var Menu = React.createClass({
  getInitialState : function () {
    return {
      "visible" : false,
      "list" :["link1","link2","link3"]
    }
  },
  show : function(){
    this.setState({"visible" : true});
    document.addEventListener("click" , this.hide.bind(this))
  },
  hide : function(){
    document.removeEventListener("click" , this.hide.bind(this))
    this.setState({"visible":false});
  },
  render : function () {
    return (
      <div className={"app-menu" + (this.state.visible ? "-visible":"no")} >
        <MenuItem list={this.state.list} />
      </div>
    );
  }
});

var MenuItem = React.createClass({
  render : function(){
    var listItem = this.props.list.map(function(val){
      return <li>{val}</li>;
    });
    return (
      <ul>{listItem}</ul>
    );
  }
});
ReactDOM.render(
  <Nav/>,
  document.getElementById("nav")
);
