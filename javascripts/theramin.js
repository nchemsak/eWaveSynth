'use strict';
var thereminContext = new AudioContext();
var WIDTH = 500;
var HEIGHT = 500;
var maxFreq = 750;
var maxVol = 0.1;
var initialFreq = 200;
var oscillator = thereminContext.createOscillator();

var myCanvas = document.getElementById('thereminCanvas');
var canvas = document.querySelector('#thereminCanvas');



document.getElementById('thereminStart').addEventListener('click', function() {
  thereminStart();
});
// canvas.addEventListener('mousedown', thereminStart());
// canvas.addEventListener('mouseout', oscillator.stop());


// /********************************************
//                THEREMIN START
// **********************************************/
function thereminStart() {

  // var oscillator = thereminContext.createOscillator();
  var gain = thereminContext.createGain();
  oscillator.connect(thereminContext.destination);
  gain.connect(thereminContext.destination);
  gain.gain.value = 0.3;
  oscillator.type = 'square';
  oscillator.frequency.value = initialFreq;
  oscillator.start();
  canvas.addEventListener('mouseout', oscillator.stop());


  // THEREMIN STOP and CLEAR CANVAS
  // document.getElementById('thereminStop').addEventListener('click', function() {

  //   oscillator.stop();
  // });



  //   myCanvas.addEventListener('mousemove', SynthPad.updateFrequency);
  //   myCanvas.addEventListener('touchmove', SynthPad.updateFrequency);

  //   myCanvas.addEventListener('mouseout', SynthPad.stopSound);
  // };



  // SynthPad.stopSound = function(event) {
  //   oscillator.stop(0);

  //   // myCanvas.removeEventListener('mousemove', SynthPad.updateFrequency);
  //   // myCanvas.removeEventListener('touchmove', SynthPad.updateFrequency);
  //   canvas.removeEventListener('mouseout', oscillator.stop(););
  // };

  /********************************************
                MOUSE POINTER COORDINATES
  **********************************************/
  var CurX;
  var CurY;
  canvas.onmousemove = updatePage;

  function updatePage(e) {
    CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    oscillator.frequency.value = (CurX / WIDTH) * maxFreq;
    gain.gain.value = (CurY / HEIGHT) * maxVol;
    canvasDraw();
  }

  function random(number1, number2) {
    var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
    return randomNo;
  }



  //   /********************************************
  //              THERAMIN CANVAS DRAWING
  //   **********************************************/


  // var canvas = document.createElement('canvas');
  // canvas.className = "thereminCanvas";
  // canvas.width = 800;
  // canvas.height = 385;


  canvas.width = WIDTH;
  canvas.height = HEIGHT;


  var canvasCtx = canvas.getContext('2d');

  function canvasDraw() {
    var rC = Math.floor((gain.gain.value / maxVol) * 30);
    for (var i = 1; i <= 15; i = i + 2) {

      canvasCtx.beginPath();

      // COLOR
      canvasCtx.strokeStyle = 'rgb(' + 100 + (i * 10) + ',' + Math.floor((gain.gain.value / maxVol) * 255) + ',' + Math.floor((oscillator.frequency.value / maxFreq) * 255) + ')';

      // CIRCLES pattern
      canvasCtx.rect(CurX + random(-30, 30), CurY + random(-30, 30), rC / 2 + i, (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);
      canvasCtx.rect(CurX + random(-30, 30), CurY + random(-30, 30), rC / 2 + i, (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);


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


/********************************************
           ALL NEW CODE
**********************************************/

var SynthPad = function() {
  // Variables
  var myCanvas;
  var frequencyLabel;
  var volumeLabel;

  var myAudioContext;
  var oscillator;
  var gainNode;

  // Notes
  var lowNote = 261.63; // C4
  var highNote = 493.88; // B4


  // Constructor
  var SynthPad = function() {
    myCanvas = document.getElementById('thereminCanvas');
    // frequencyLabel = document.getElementById('frequency');
    // volumeLabel = document.getElementById('volume');

    // Create an audio context.
    myAudioContext = new AudioContext();

    SynthPad.setupEventListeners();
  };

  // Event Listeners
  SynthPad.setupEventListeners = function() {
    myCanvas.addEventListener('mousedown', SynthPad.playSound);
    myCanvas.addEventListener('touchstart', SynthPad.playSound);


    myCanvas.addEventListener('mouseup', SynthPad.stopSound);
    document.addEventListener('mouseleave', SynthPad.stopSound);
    myCanvas.addEventListener('touchend', SynthPad.stopSound);
  };


  // Play a note.
  SynthPad.playSound = function(event) {
    oscillator = myAudioContext.createOscillator();
    gainNode = myAudioContext.createGain();

    oscillator.type = 'sawtooth';

    gainNode.connect(myAudioContext.destination);
    oscillator.connect(gainNode);

    SynthPad.updateFrequency(event);

    oscillator.start(0);

    myCanvas.addEventListener('mousemove', SynthPad.updateFrequency);
    myCanvas.addEventListener('touchmove', SynthPad.updateFrequency);

    myCanvas.addEventListener('mouseout', SynthPad.stopSound);
  };


  SynthPad.stopSound = function(event) {
    oscillator.stop(0);

    myCanvas.removeEventListener('mousemove', SynthPad.updateFrequency);
    myCanvas.removeEventListener('touchmove', SynthPad.updateFrequency);
    myCanvas.removeEventListener('mouseout', SynthPad.stopSound);
  };

  // Calculate the note frequency.
  SynthPad.calculateNote = function(posX) {
    var noteDifference = highNote - lowNote;
    var noteOffset = (noteDifference / myCanvas.offsetWidth) * (posX - myCanvas.offsetLeft);
    return lowNote + noteOffset;
  };

  // Calculate the volume.
  SynthPad.calculateVolume = function(posY) {
    var volumeLevel = 1 - (((100 / myCanvas.offsetHeight) * (posY - myCanvas.offsetTop)) / 100);
    return volumeLevel;
  };

  // Fetch the new frequency and volume.
  SynthPad.calculateFrequency = function(x, y) {
    var noteValue = SynthPad.calculateNote(x);
    // console.log("noteValue: ", noteValue);
    var volumeValue = SynthPad.calculateVolume(y);

    oscillator.frequency.value = noteValue;
    gainNode.gain.value = volumeValue;

    // frequencyLabel.innerHTML = Math.floor(noteValue) + ' Hz';
    // volumeLabel.innerHTML = Math.floor(volumeValue * 100) + '%';
  };

  // Update the note frequency.
  SynthPad.updateFrequency = function(event) {
    if (event.type == 'mousedown' || event.type == 'mousemove') {
      SynthPad.calculateFrequency(event.x, event.y);
    } else if (event.type == 'touchstart' || event.type == 'touchmove') {
      var touch = event.touches[0];
      SynthPad.calculateFrequency(touch.pageX, touch.pageY);
    }
  };

  // Export SynthPad.
  return SynthPad;

}();
var synthPad = new SynthPad();
