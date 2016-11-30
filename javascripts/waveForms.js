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
  upperAsh = 466.164,
  B4 = 493.883,
  C5 = 523.251,

  D5 = 587.330,
  E5 = 659.255;

// var frequency = 220;                      // 220 Hz = "A" note
// var samples_length = 44100;               // Plays for 1 second (44.1 KHz)
// for (var i=0; i < samples_length ; i++) { // fills array with samples
//   var t = i/samples_length;               // time from 0 to 1
//   samples[i] = sin( frequency * 2*PI*t ); // wave equation (between -1,+1)
// }

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


// When a key on the keyboard is pressed, your browser fires a "keydown" event. When it is released, a "keyup" event fires.
// addEventListener("keydown", function() {
//   if (event.keyCode === 82)
//     sineStart();
// document.body.style.background = "violet";


// });
// addEventListener("keyup", function(event) {
//   if (event.keyCode === 82)
//     document.body.style.background = "black";
// });


// 24 keys
// 14 white keys - middle c is "R"
// 10 black keys

/********************************************
               SINE WAVE
**********************************************/

// THIS CODE WORKS!!!!!! JUST TRYING CODE BELOW
// addEventListener("keydown", function() {
//   if (event.keyCode === 82) {
//     var sineOscillator = oscContext.createOscillator();
//     // console.log("sineOscillator: ", sineOscillator);
//     sineOscillator.type = oscTypeSine;
//     sineOscillator.frequency.value = middleC.freq;
//     sineOscillator.connect(oscContext.destination);
//     sineOscillator.start();
//     // sineOscillator.stop(1);
//     addEventListener("keyup", function(event) {
//       if (event.keyCode === 82)
//         sineOscillator.stop();
//       // document.body.style.background = "black";
//     });
//   }
//   document.getElementById('sineStart').addEventListener('mouseout', function() {
//     sineOscillator.stop();
//   });
// });





// TESTING NEW EVENT LISTENER
addEventListener("keydown", function() {
  if (event.keyCode === 82) {
    // console.log("82");
    // sineOscillator.frequency.value = middleC.freq;
    sineStart(middleC.freq);
  } else if (event.keyCode === 84) {
    // console.log("84");
    sineStart(G4);
    sineOscillator.frequency.value = D4;

  } else if (event.keyCode === 89) {
    sineOscillator = E4;
    console.log("89");

  } else if (event.keyCode === 85) {
    sineOscillator.frequency.value = F4;
    console.log("85");

  } else if (event.keyCode === 73) {
    sineOscillator.frequency.value = G4;
    console.log("73");

  } else if (event.keyCode === 79) {
    sineOscillator.frequency.value = G4;
    console.log("79");

  } else if (event.keyCode === 80) {
    sineOscillator.frequency.value = G4;
    console.log("80");

  } else if (event.keyCode === 219) {
    sineOscillator.frequency.value = D4;
    console.log("219");

  } else if (event.keyCode === 221) {
    sineOscillator.frequency.value = D4;
    console.log("221");

  } else if (event.keyCode === 220) {
    sineOscillator.frequency.value = D4;
    console.log("220");

  }

});



function sineStart(freq) {
  var sineOscillator = oscContext.createOscillator();
  // console.log("sineOscillator: ", sineOscillator);
  sineOscillator.type = oscTypeSine;
  sineOscillator.frequency.value = freq;
  sineOscillator.connect(oscContext.destination);
  sineOscillator.start();
  // sineOscillator.stop(1);
  addEventListener("keyup", function(event) {
    if (event.keyCode === 82)
      sineOscillator.stop();
    // document.body.style.background = "black";
  });
}
// document.getElementById('sineStart').addEventListener('mouseout', function() {
//   sineOscillator.stop();

// });



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
