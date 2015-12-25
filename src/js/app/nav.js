var React = require("react");
var ReactDOM = require("react-dom");

var Nav = React.createClass({
  show : function (){
    this.refs.menu.show();
  },
  render: function () {
    return (
      <div>
        <span onClick={this.show}><i className="fa fa-2x fa-bars"></i></span>
        <Menu ref="menu" />
      </div>
    );
  }
});

var Menu = React.createClass({
  getInitialState : function () {
    return {
      "visible" : false,
      "list" :[{
        href: "link",
        content:"link1"
      },{
          href:"link2",
          content:"link2"
        },{
          href:"link3",
          content:"link3"
        }]
    }
  },
  show : function(){
    this.setState({"visible" : true});
    document.addEventListener("click" , this.hide);
  },
  hide : function(){
    document.removeEventListener("click" , this.hide)
    this.setState({"visible":false});
  },
  render : function () {
    var listItem = this.state.list.map(function(val , index){
      return <li key={index}><a href={val.href}>{val.content}</a></li>;
    });
    return (
      <ul className={"nav-menu" + (this.state.visible ? "-visible":"")}>
        {listItem}
      </ul>
    );
  }
});


ReactDOM.render(
  <Nav/>,
  document.getElementById("nav")
);
