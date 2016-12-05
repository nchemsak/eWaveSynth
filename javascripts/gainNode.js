"use strict";

// NODE order so far:  LFO -> freqGain -> OSCILLATOR -> volume -> panner -> destination(speakers)


var context = new window.AudioContext() || new window.webkitAudioContext();


function lfoStart2() {
  var osc = context.createOscillator();
  var vol = context.createGain();
  var panner = context.createStereoPanner();
  var freqGain = context.createGain();
  var lfo = context.createOscillator();

  // get html controls
  var volControl = document.getElementById("volume");
  var panControl = document.getElementById("panner");

  //PANNER
  panner.connect(context.destination);

  // VOLUME
  vol.gain.value = volControl.value;
  vol.connect(panner);

  // OSCILLATOR
  osc.frequency.value = 440;
  osc.connect(vol);


  // LFO
  freqGain.gain.value = 100;
  freqGain.connect(osc.frequency);

  lfo.frequency.value = 1;
  lfo.connect(freqGain);
  lfo.type = 'sawtooth';


  // LISTENERS
  volControl.addEventListener("input", function() {
    vol.gain.value = volControl.value;
  });

  panControl.addEventListener("input", function() {
    panner.pan.value = panControl.value;
  });

  osc.start();
  lfo.start();


  // LFO Stop
  document.getElementById('lfoStop2').addEventListener('click', function() {
    lfo.stop();
    osc.stop();

  });

}
