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
