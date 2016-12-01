'use strict';
var AudioContext;
var oscContext = new AudioContext();

// Create an audio-context
var audioContext = new window.AudioContext();
// oscillator = audioContext.createOscillator();

// shapes
var oscTypeSquare = "square";
var oscTypeSine = "sine";
var oscTypeSaw = "sawtooth";
var oscTypeTri = "triangle";
var oscType;

// frequencies
var squareFreqVal = 1000;
var sineFreqVal = 261.625565;
var sawFreqVal = 1000;
var triFreqVal = 1000;


let F3 = 174.614,
  G3 = 195.998,
  A3 = 220,
  B3 = 246.942,
  middleC = 261.625565,
  Csh4 = 277.183,
  D4 = 293.665,
  E4 = 329.628,
  F4 = 349.228,
  G4 = 391.995,
  A4 = 440,
  B4 = 493.883,
  C5 = 523.251,
  D5 = 587.330,
  E5 = 659.255;


document.getElementById('squareStart').addEventListener('click', function() {
  squareStart();
});

// document.getElementById('keyPlay').addEventListener('mouseover', function() {
//   keyPlay();
// });

document.getElementById('sawStart').addEventListener('click', function() {
  sawStart();
});

document.getElementById('triStart').addEventListener('click', function() {
  triStart();
});

/********************************************
      RADIO BUTTONS CHOOSING WAVE FORM
**********************************************/

$(document).ready(function() {
  oscType = 'square';
  $('input[type=radio]').click(function() {
    if (this.id === 'Sine') {
      oscType = "sine";
    } else if (this.id === 'Square') {
      oscType = "square";
    } else if (this.id === 'Saw') {
      oscType = "sawtooth";
    } else if (this.id === 'Triangle') {
      oscType = "triangle";
    }
    return oscType;
  });
});


/********************************************
          Keyboard Event Listener
**********************************************/

addEventListener("keydown", function() {
  if (event.keyCode === 9) {
    $('#F3').addClass('close4');
    keyPlay(F3);
  } else if (event.keyCode === 81) {
    $('#G3').addClass('nick');
    keyPlay(G3);
  } else if (event.keyCode === 87) {
    $('#A3').addClass('nick');
    keyPlay(A3);
  } else if (event.keyCode === 69) {
    $('#B3').addClass('nick');
    keyPlay(B3);
  } else if (event.keyCode === 82) {
    $('#middleC').addClass('close5');
    keyPlay(middleC);
  } else if (event.keyCode === 84) {
    $('#D4').addClass('nick');
    keyPlay(D4);
  } else if (event.keyCode === 89) {
    $('#E4').addClass('nick');
    keyPlay(E4);
  } else if (event.keyCode === 85) {
    $('#F4').addClass('close3');
    keyPlay(F4);
  } else if (event.keyCode === 73) {
    $('#G4').addClass('close1');
    keyPlay(G4);
  } else if (event.keyCode === 79) {
    $('#A4').addClass('close2');
    keyPlay(A4);
  } else if (event.keyCode === 80) {
    $('#B4').addClass('nick');
    keyPlay(B4);
  } else if (event.keyCode === 219) {
    $('#C5').addClass('nick');
    keyPlay(C5);
  } else if (event.keyCode === 221) {
    $('#D5').addClass('nick');
    keyPlay(D5);
  } else if (event.keyCode === 220) {
    $('#E5').addClass('nick');
    keyPlay(E5);
  }

});

/********************************************
Keyboard play note and listen for Keyup to stop
**********************************************/


function keyPlay(freq) {
  var oscillator = oscContext.createOscillator();
  // console.log("oscillator: ", oscillator);
  oscillator.type = oscType;
  console.log("oscType: ", oscType);
  oscillator.frequency.value = freq;
  oscillator.connect(oscContext.destination);
  oscillator.start();
  // oscillator.stop(1);
  addEventListener("keyup", function(event) {
    if (event.keyCode === 9) {
      $('#F3').removeClass('close4');
      oscillator.stop();
    } else if (event.keyCode === 81) {
      $('#G3').removeClass('nick');
      oscillator.stop();
    } else if (event.keyCode === 87) {
      $('#A3').removeClass('nick');
      oscillator.stop();
    } else if (event.keyCode === 69) {
      $('#B3').removeClass('nick');
      oscillator.stop();
    } else if (event.keyCode === 82) {
      $('#middleC').removeClass('close5');
      oscillator.stop();
    } else if (event.keyCode === 84) {
      $('#D4').removeClass('nick');
      oscillator.stop();
    } else if (event.keyCode === 89) {
      $('#E4').removeClass('nick');
      oscillator.stop();
    } else if (event.keyCode === 85) {
      $('#F4').removeClass('close3');
      oscillator.stop();
    } else if (event.keyCode === 73) {
      $('#G4').removeClass('close1');
      oscillator.stop();
    } else if (event.keyCode === 79) {
      $('#A4').removeClass('close2');
      oscillator.stop();
    } else if (event.keyCode === 80) {
      $('#B4').removeClass('nick');
      oscillator.stop();
    } else if (event.keyCode === 219) {
      $('#C5').removeClass('nick');
      oscillator.stop();
    } else if (event.keyCode === 221) {
      $('#D5').removeClass('nick');
      oscillator.stop();
    } else if (event.keyCode === 220) {
      $('#E5').removeClass('nick');
      oscillator.stop();
    }

  });

}


// create Oscilloscope
// var analyser = oscContext.createAnalyser();
// var contentWidth = document.getElementById('content').offsetWidth;
// var oscilloscope = new Oscilloscope(oscContext, analyser, contentWidth, 150);
// oscillator.connect(oscilloscope.analyser);


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


// module.exports = { keyPlay, squareStart, sawStart, triStart };
