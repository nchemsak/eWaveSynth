'use strict';
var AudioContext;
var thereminContext = new AudioContext();

var WIDTH = 800;
var HEIGHT = 385;
var maxFreq = 750;
var maxVol = 0.1;
var initialFreq = 500;
var initialVol = 0.1;
// var gain = thereminContext.createGain();
// var oscillator = thereminContext.createOscillator();

// gainNode2.gain.value = 0.3; // Set gain node 2 to 30 percent


// console.log("gain: ", gain);
// console.log("oscillator: ", oscillator);

document.getElementById('thereminStart').addEventListener('click', function() {
  thereminStart();
});


/********************************************
               THEREMIN START
**********************************************/
function thereminStart() {
  var squareFreqVal = 500;
  var oscillator = thereminContext.createOscillator();
  var gain = thereminContext.createGain();
  oscillator.frequency.value = squareFreqVal;
  oscillator.connect(thereminContext.destination);
  gain.connect(thereminContext.destination);
  gain.gain.value = 0.3;
  console.log("gain.gain.value: ", gain.gain.value);
  oscillator.type = 'sine';
  oscillator.frequency.value = initialFreq;
  oscillator.start();


  // THEREMIN STOP and CLEAR CANVAS
  document.getElementById('thereminStop').addEventListener('click', function() {
    var c = document.getElementById("thereminCanvas");
    c.width = 800;
    c.height = 385;
    oscillator.stop();
  });


  /********************************************
                MOUSE POINTER COORDINATES
  **********************************************/
  var CurX;
  var CurY;
  document.onmousemove = updatePage;

  function updatePage(e) {
    CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    console.log("window: ", window);
    console.log("CurX: ", CurX);
    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    console.log("CurY: ", CurY);
    oscillator.frequency.value = (CurX / WIDTH) * maxFreq;
    gain.gain.value = (CurY / HEIGHT) * maxVol;
    console.log("gain.gain.value: ", gain.gain.value);

    canvasDraw();
  }

  function random(number1, number2) {
    var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
    return randomNo;
  }



  /********************************************
             THERAMIN CANVAS DRAWING
  **********************************************/


  // var canvas = document.createElement('canvas');
  // canvas.className = "thereminCanvas";
  // canvas.width = 800;
  // canvas.height = 385;
  var canvas = document.querySelector('.thereminCanvas');

  canvas.width = WIDTH;
  canvas.height = HEIGHT;


  var canvasCtx = canvas.getContext('2d');
  console.log("canvasCtx: ", canvasCtx);

  function canvasDraw() {
    var rC = Math.floor((gain.gain.value / maxVol) * 30);

    // canvasCtx.globalAlpha = 1;

    for (var i = 1; i <= 15; i = i + 2) {

      canvasCtx.beginPath();

      // COLOR
      canvasCtx.strokeStyle = 'rgb(' + 100 + (i * 10) + ',' + Math.floor((gain.gain.value / maxVol) * 255) + ',' + Math.floor((oscillator.frequency.value / maxFreq) * 255) + ')';

      // CIRCLES pattern
      canvasCtx.arc(CurX + random(-30, 30), CurY + random(-30, 30), rC / 2 + i, (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);
      canvasCtx.arc(CurX + random(-30, 30), CurY + random(-30, 30), rC / 2 + i, (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);


      //SQUARES pattern
      // for (var k = 0; k < 12; k++) {
      //   for (var j = 0; j < 25; j++) {
      //     canvasCtx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * k) + ',' +
      //       Math.floor(255 - 42.5 * j) + ',0)';
      //     canvasCtx.fillRect(j * 32, k * 32, 25, 25);
      //   }
      // }

      canvasCtx.fill();
      canvasCtx.stroke();
      canvasCtx.closePath();
    }
  }
}
