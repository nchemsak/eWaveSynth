'use strict';
var AudioContext;
var oscContext = new AudioContext();

// Create an audio-context
var audioContext = new window.AudioContext(),
  oscillator = audioContext.createOscillator();

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

var sineOscillator = oscContext.createOscillator();

let F3 = 174.614,
  G3 = 195.998,
  A3 = 220,
  B3 = 246.942,
  middleC = {
    freq: 261.625565,
    color: 'red'
  },
  Csh4 = 277.183,
  D4 = 293.665,

  E4 = 329.628,
  F4 = 349.228,
  G4 = 391.995,

  A4 = 440,
  // B4 = 466.164,
  B4 = 493.883,
  C5 = 523.251,

  D5 = 587.330,
  E5 = 659.255;


document.getElementById('squareStart').addEventListener('click', function() {
  squareStart();
});

// document.getElementById('sineStart').addEventListener('mouseover', function() {
//   sineStart();
// });

document.getElementById('sawStart').addEventListener('click', function() {
  sawStart();
});

document.getElementById('triStart').addEventListener('click', function() {
  triStart();
});


/********************************************
               SINE WAVE
**********************************************/



addEventListener("keydown", function(event) {
  if (event.keyCode === 9) {
    $('#F3').addClass('close4');
    sineStart(F3);
  } else if (event.keyCode === 81) {
    $('#G3').addClass('nick');
    sineStart(G3);
  } else if (event.keyCode === 87) {
    $('#A3').addClass('nick');
    sineStart(A3);
  } else if (event.keyCode === 69) {
    $('#B3').addClass('nick');
    sineStart(B3);
  } else if (event.keyCode === 82) {
    $('#middleC').addClass('close5');
    sineStart(middleC.freq);
  } else if (event.keyCode === 84) {
    $('#D4').addClass('nick');
    sineStart(D4);
  } else if (event.keyCode === 89) {
    $('#E4').addClass('nick');
    sineStart(E4);
  } else if (event.keyCode === 85) {
    $('#F4').addClass('close3');
    sineStart(F4);
  } else if (event.keyCode === 73) {
    $('#G4').addClass('close1');
    sineStart(G4);
  } else if (event.keyCode === 79) {
    $('#A4').addClass('close2');
    sineStart(A4);
  } else if (event.keyCode === 80) {
    $('#B4').addClass('nick');
    sineStart(B4);
  } else if (event.keyCode === 219) {
    $('#C5').addClass('nick');
    sineStart(C5);
  } else if (event.keyCode === 221) {
    $('#D5').addClass('nick');
    sineStart(D5);
  } else if (event.keyCode === 220) {
    $('#E5').addClass('nick');
    sineStart(E5);
  }

});



function sineStart(freq) {
  var sineOscillator = oscContext.createOscillator();
  // console.log("sineOscillator: ", sineOscillator);
  sineOscillator.type = oscTypeSaw;
  sineOscillator.frequency.value = freq;
  sineOscillator.connect(oscContext.destination);
  sineOscillator.start();
  // sineOscillator.stop(1);
  addEventListener("keyup", function(event) {
    if (event.keyCode === 9) {
      $('#F3').removeClass('close4');
      sineOscillator.stop();
    } else if (event.keyCode === 81) {
      $('#G3').removeClass('nick');
      sineOscillator.stop();
    } else if (event.keyCode === 87) {
      $('#A3').removeClass('nick');
      sineOscillator.stop();
    } else if (event.keyCode === 69) {
      $('#B3').removeClass('nick');
      sineOscillator.stop();
    } else if (event.keyCode === 82) {
      $('#middleC').removeClass('close5');
      sineOscillator.stop();
    } else if (event.keyCode === 84) {
      $('#D4').removeClass('nick');
      sineOscillator.stop();
    } else if (event.keyCode === 89) {
      $('#E4').removeClass('nick');
      sineOscillator.stop();
    } else if (event.keyCode === 85) {
      $('#F4').removeClass('close3');
      sineOscillator.stop();
    } else if (event.keyCode === 73) {
      $('#G4').removeClass('close1');
      sineOscillator.stop();
    } else if (event.keyCode === 79) {
      $('#A4').removeClass('close2');
      sineOscillator.stop();
    } else if (event.keyCode === 80) {
      $('#B4').removeClass('nick');
      sineOscillator.stop();
    } else if (event.keyCode === 219) {
      $('#C5').removeClass('nick');
      sineOscillator.stop();
    } else if (event.keyCode === 221) {
      $('#D5').removeClass('nick');
      sineOscillator.stop();
    } else if (event.keyCode === 220) {
      $('#E5').removeClass('nick');
      sineOscillator.stop();
    }

  });

}


// create Oscilloscope
// var analyser = oscContext.createAnalyser();
// var contentWidth = document.getElementById('content').offsetWidth;
// var oscilloscope = new Oscilloscope(oscContext, analyser, contentWidth, 150);
// sineOscillator.connect(oscilloscope.analyser);


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
