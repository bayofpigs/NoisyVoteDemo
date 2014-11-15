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
