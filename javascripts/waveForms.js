'use strict';
var AudioContext;
var oscContext = new AudioContext();


// shapes
var oscTypeSquare = "square";
var oscTypeSine = "sine";
var oscTypeSaw = "sawtooth";
var oscTypeTri = "triangle";


// frequencies
var squareFreqVal = 1000;
var sineFreqVal = 261.625565;
var sawFreqVal = 1000;
var triFreqVal = 1000;


var lowerF = 174.614;
var lowerG = 195.998;
var lowerA = 220;
var lowerB = 246.942;
var middleC = {
  freq: 261.625565,
  color: 'red'
};
console.log("middleC: ", middleC);
var middleCsh = 277.183;
var middleD = 293.665;

var middleE = 329.628;
var middleF = 349.228;
var middleG = 391.995;

var upperA = 440;
var upperAsh = 466.164;
var upperB = 493.883;
var upperC = 523.251;

var upperD = 587.330;
var upperE = 659.255;

// var frequency = 220;                      // 220 Hz = "A" note
// var samples_length = 44100;               // Plays for 1 second (44.1 KHz)
// for (var i=0; i < samples_length ; i++) { // fills array with samples
//   var t = i/samples_length;               // time from 0 to 1
//   samples[i] = sin( frequency * 2*PI*t ); // wave equation (between -1,+1)
// }





document.getElementById('squareStart').addEventListener('click', function() {
  squareStart();
});

document.getElementById('sineStart').addEventListener('mouseover', function() {
  sineStart();
});

document.getElementById('sawStart').addEventListener('click', function() {
  sawStart();
});

document.getElementById('triStart').addEventListener('click', function() {
  triStart();
});


/********************************************
               SINE WAVE
**********************************************/


function sineStart() {
  var sineOscillator = oscContext.createOscillator();
  // console.log("sineOscillator: ", sineOscillator);
  sineOscillator.type = oscTypeSine;
  sineOscillator.frequency.value = middleC.freq;
  sineOscillator.connect(oscContext.destination);
  sineOscillator.start();
  // sineOscillator.stop(1);
  document.getElementById('sineStart').addEventListener('mouseout', function() {
    sineOscillator.stop();
  });
}

/********************************************
               SQUARE WAVE
**********************************************/
function squareStart() {
  var squareOscillator = oscContext.createOscillator();
  // console.log("squareOscillator: ", squareOscillator);
  squareOscillator.type = oscTypeSquare;
  squareOscillator.frequency.value = squareFreqVal;
  squareOscillator.connect(oscContext.destination);
  squareOscillator.start();
  document.getElementById('squareStop').addEventListener('click', function() {
    squareOscillator.stop();
  });
}




/********************************************
               SAWTOOTH WAVE
**********************************************/
function sawStart() {
  var sawOscillator = oscContext.createOscillator();
  // console.log("sawOscillator: ", sawOscillator);
  sawOscillator.type = oscTypeSine;
  sawOscillator.frequency.value = sawFreqVal;
  sawOscillator.connect(oscContext.destination);
  sawOscillator.start();
  document.getElementById('sawStop').addEventListener('click', function() {
    sawOscillator.stop();
  });
}

/********************************************
               TRIANGLE WAVE
**********************************************/
function triStart() {
  var triOscillator = oscContext.createOscillator();
  // console.log("triOscillator: ", triOscillator);
  triOscillator.type = oscTypeSine;
  triOscillator.frequency.value = triFreqVal;
  triOscillator.connect(oscContext.destination);
  triOscillator.start();
  document.getElementById('triStop').addEventListener('click', function() {
    triOscillator.stop();
  });
}


// module.exports = { sineStart, squareStart, sawStart, triStart };
