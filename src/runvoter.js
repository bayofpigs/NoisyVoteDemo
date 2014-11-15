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
  var opt1_div = dom.createTextElement("div", opt1, "words");
  var opt2_div = dom.createTextElement("div", opt2, "words");
 
  var remove = function() {
    if (cur === 1) {
      opt_display.removeChild(opt1_div);
    } else {
      opt_display.removeChild(opt2_div);
    }
  };

  var next = function() {
    remove();
    if (cur === 1) {
      cur = 2;
      opt_display.appendChild(opt2_div);
    } else {
      cur = 1; 
      opt_display.appendChild(opt1_div);
    }
  };

  var setup = function() {
    // Create a container to hold the flashing text
    contentDiv.appendChild(opt_display);
    opt_display.appendChild(opt1_div);
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
    var opt_info = dom.createDiv("info");
    contentDiv.appendChild(opt_info);

    var text = opt1 + ": " + counter1 + "; " + opt2 + ": " + counter2;
    var results = dom.createTextElement("h1", text, "words");

    opt_info.appendChild(results);
  };

  var done = function() {
    remove(); 
    contentDiv.removeChild(opt_display);
  };

  var doRepeated = function() { 
    setup();

    var selected = false; 
    var num_trials = 10;

    var toggleSelected = function() {
      selected = true;
    }
    
    setTimeout(repeat, rand(m));
    key.enter(toggleSelected).space(toggleSelected);
    function repeat() {
      if (selected) {
        if (cur == 1) counter1++;
        else counter2++;
        
        num_trials--; 

        if (num_trials === 0) {
          done();
          showDataRepeated();
        } else {
          selected = false;
          next();
          setTimeout(repeat, rand(m));
        }
      } else {
        next();
        setTimeout(repeat, rand(m));
      }
    };
  };

  var doSingleRun = function() {
    setup();

    var selected = false; 

    var toggleSelected = function() {
      selected = true;
    }
    
    setTimeout(repeat, rand(m));
    key.enter(toggleSelected).space(toggleSelected);
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
