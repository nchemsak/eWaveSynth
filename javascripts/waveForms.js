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
var sineFreqVal = 1000;
var sawFreqVal = 1000;
var triFreqVal = 1000;



document.getElementById('squareStart').addEventListener('click', function() {
  squareStart();
});

document.getElementById('sineStart').addEventListener('click', function() {
  sineStart();
});

document.getElementById('sawStart').addEventListener('click', function() {
  sawStart();
});

document.getElementById('triStart').addEventListener('click', function() {
  triStart();
});

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
               SINE WAVE
**********************************************/


function sineStart() {
  var sineOscillator = oscContext.createOscillator();
  // console.log("sineOscillator: ", sineOscillator);
  sineOscillator.type = oscTypeSine;
  sineOscillator.frequency.value = sineFreqVal;
  sineOscillator.connect(oscContext.destination);
  sineOscillator.start();
  document.getElementById('sineStop').addEventListener('click', function() {
    sineOscillator.stop();
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
