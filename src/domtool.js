/*
 * File Name: domtool.js
 * Description: Helper function library for dom manipulation
 * Author: Mike Zhang (mz3@princeton.edu)
 */

module.exports = (function() {
  var tools = {};

  /* Get the first dom element with the given class */
  tools.getFirstClass = function(className) {
    return document.getElementsByClassName(className)[0];
  };

  /* Get the first dom element with the given id */
  tools.getId = function(id) {
    return document.getElementById(id);
  };
  
  /* Add an element to the first class of type className */
  tools.addToClass = function(className, element) {
    var el = tools.getFirstClass(className); 

    el.appendChild(element);
  };
  
  /* Add an element to an element with id parameter id */
  tools.addToId = function(id, element) {
    var el = tools.getId(id);

    el.appendChild(element);
  };
  
  /* Creates a div dom element with class className */
  tools.createDiv = function(className) {
    var el = document.createElement("div");
    if (className) {
      el.className = className;
    }

    return el;
  };

  /* Create an element of type type with text and class className */
  tools.createTextElement = function(type, text, className) {
    var el = document.createElement(type);
    var content = document.createTextNode(text);
    el.appendChild(content);

    if (className) {
      el.className = className;
    }

    return el;
  };
  
  /* Remove the first instance of a given class */
  tools.removeFirstClass = function(className) {
    var el = tools.getFirstClass(className);
    if (!el) throw "Error: No element with class name " + className + " found!";

    var par = el.parentNode;

    par.removeChild(el);
  };

  /* Remove an instance of the given id */
  tools.removeId = function(id) {
    var el = tools.getId(id);
    if (!el) throw "Error: No element with id " + id + " found!";
    var par = el.parentNode;
    par.removeChild(el);
  };

  return tools;
})();
