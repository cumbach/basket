var ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require('./components/app');

document.addEventListener("DOMContentLoaded", function(){
  var root = document.querySelector('#root');
  ReactDOM.render(<App />, root);
});
