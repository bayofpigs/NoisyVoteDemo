(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
/*
 * File Name: keydown.js
 * Description: Handle keydown events in a non-insane manner
 * Author: Mike Zhang (mz3@princeton.edu)
 */
module.exports = (function() {
  var funcs = {};
  function listener(e) {
    var method = funcs[e.keyCode];

    if (method) method();
  };

  document.addEventListener('keydown', listener);
  
  /* Keypress exports object */
  var KeyDown = {};
  KeyDown.enter = function(method) {
    funcs[13] = method;
    return KeyDown;
  };

  KeyDown.space = function(method) {
    funcs[32] = method;
    return KeyDown;
  }

  return KeyDown;
})();

},{}],3:[function(require,module,exports){
/*
 * File Name: main.js
 * Description: Main file for noisy choice application
 * Author: Mike Zhang (mz3@princeton.edu)
 */
document.addEventListener("DOMContentLoaded", function(event) {
  var dom = require('./domtool.js');

  /* Button with class submit DOM element */
  var submitBtn = dom.getFirstClass("submit");
  
  /* Handle the result of pressing the button submit */
  var handleButtonPress = function() {
    var choice1 = dom.getFirstClass("first").value;
    var choice2 = dom.getFirstClass("second").value;
    var avg     = dom.getFirstClass("pace").value;
    var rep     = dom.getFirstClass("cont").checked;
    
    // Verify inputs
    if (!choice1 || !choice2 || !avg) {
      alert ("No inputs can be blank!");
      return;
    } 

    var average_time = Number(avg);
    if (isNaN(average_time)) {
      alert ("Average time must be a number!");
      return;
    }

    console.log("Your choices: ");
    console.log(choice1);
    console.log(choice2);
    console.log("Average time: " + average_time);
    console.log("Repeated?: " + rep);
    dom.removeId("input");
    
    /* Execute the main module for running the actual voting application */
    require('./runvoter.js')(choice1, choice2, average_time, rep);
  };

  submitBtn.addEventListener('click', handleButtonPress);
});

},{"./domtool.js":1,"./runvoter.js":5}],4:[function(require,module,exports){
/*
 * File Name: Random.js
 * Description: Simple mechanism for generating a random number with
 * mean m
 * Author: Mike Zhang (mz3@princeton.edu)
 */
/* Generate a number with mean m */
/* The default implements a janky uniform distribution calculation */
module.exports = function(m) {
  if (m < 0) {
    throw "Mean must be positive";
  }

  return m * Math.random();
}

},{}],5:[function(require,module,exports){
/*
 * File Name: runvoter.js
 * Description: The main voter dom manipulator
 * Author: Mike Zhang (mz3@princeton.edu)
 */
/* Where opt1, opt2, m, and cont are the first option,
 * second option, mean time and whether the test should be repeated,
 * respectively                                                      */
module.exports = function(opt1, opt2, m, cont) {
  var key = require('./keydown.js');
  var rand = require('./random.js');
  var dom = require('./domtool.js');

  var opt_display = dom.createDiv("flash");
  var contentDiv = dom.getId("content");
  console.log("Content: " + contentDiv);
  
  /* The current option number displayed on the screen */
  var cur = 1;
  var counter1 = 0;
  var counter2 = 0;
  var opt1 = dom.createTextElement("div", opt1, "words");
  var opt2 = dom.createTextElement("div", opt2, "words");
 
  var remove = function() {
    if (cur === 1) {
      opt_display.removeChild(opt1);
    } else {
      opt_display.removeChild(opt2);
    }
  };

  var next = function() {
    remove();
    if (cur === 1) {
      counter1++;
      cur = 2;
      opt_display.appendChild(opt2);
    } else {
      counter2++;
      cur = 1; 
      opt_display.appendChild(opt1);
    }
  };

  var setup = function() {
    // Create a container to hold the flashing text
    contentDiv.appendChild(opt_display);
    opt_display.appendChild(opt1);
    cur = 1;
  };

  var showDataSingle = function() {
    var opt_info = dom.createDiv("info");
    contentDiv.appendChild(opt_info);

    var chosen = (cur === 1) ? opt1 : opt2; 
    var results = dom.createTextElement("h1", "Chosen: " + chosen, "words");
    
    opt_info.appendChild(results);
  };

  var showDataRepeated = function() {

  };

  var done = function() {
    remove(); 
    contentDiv.removeChild(opt_display);
    counter1 = 0;
    counter2 = 0;
  };

  var doRepeated = function() {
     
  };

  var doSingleRun = function() {
    setup();

    var selected = false; 
    
    setTimeout(repeat, rand(m));
    function repeat() {
      if (selected) {
        done();
        showDataSingle();
      } else {
        next();
        setTimeout(repeat, rand(m));
      }
    };
  };


  if (cont) {
    doRepeated(); 
  } else {
    doSingleRun();
  }
}

},{"./domtool.js":1,"./keydown.js":2,"./random.js":4}]},{},[3]);
