'use strict';
var AudioContext;
var context = new AudioContext();

var audio = new Audio();
audio.src = 'All%20the%20Same.wav';
audio.controls = true;
audio.volume = 1;
document.body.appendChild(audio);


var analyser = context.createAnalyser();

window.addEventListener('load', function(e) {
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
}, false);
