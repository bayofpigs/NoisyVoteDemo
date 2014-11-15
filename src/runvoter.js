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
