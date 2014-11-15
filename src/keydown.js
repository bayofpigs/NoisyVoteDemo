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
