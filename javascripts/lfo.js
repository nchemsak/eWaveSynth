'use strict';

var lfoContext = new AudioContext();
/********************************************
               LFO
**********************************************/

document.getElementById('lfoStart').addEventListener('click', function() {
  lfoStart();
});

function lfoStart() {
  var oscc = lfoContext.createOscillator();
  var lfo = lfoContext.createOscillator();
  var gains = lfoContext.createGain();
  console.log("gains: ", gains);
  oscc.frequency.value = 500;
  lfo.type = 'square';
  lfo.frequency.value = 100;
  lfo.connect(gains);
  console.log("oscc.gains: ", oscc.gains);
  gains.gain.value = 100;
  gains.connect(oscc.frequency);
  oscc.connect(lfoContext.destination);
  lfo.start();
  oscc.start();

  // LFO Stop function
  document.getElementById('lfoStop').addEventListener('click', function() {
    lfo.stop();
    oscc.stop();
  });
}
