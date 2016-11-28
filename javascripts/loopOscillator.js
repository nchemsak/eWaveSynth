'use strict';
var Tone;

document.getElementById('synthStart').addEventListener('click', function() {
  synthStart();
});

function synthStart() {

  //create a synth and connect it to the master output (your speakers)
  var synth = new Tone.Synth().toMaster();

  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease("C4", "32n");


  // var loop = new Tone.Loop(function(time) {
  //   synth.triggerAttackRelease("C4", "32n", time);
  // }, "4n");

  // loop.start().stop("2m");
  // Tone.Transport.start();

  //  // /********************************************
  // //                4 VOICE SYNTH
  // // **********************************************/
  // var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
  // //play a chord
  // polySynth.triggerAttackRelease(["C4", "E4", "G4", "B4"], "2n");
  // Tone.Transport.start();


  // // /********************************************
  // //                EFFECTS
  // // **********************************************/
  // // // DISTORTION
  // var reverb = new Tone.JCReverb(40).toMaster();
  // // //connect a synth to the reverb
  // polySynth.connect(reverb);



}
