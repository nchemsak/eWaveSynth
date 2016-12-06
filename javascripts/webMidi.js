"use strict";
// var WebMidi;
// WebMidi.enable(function (err) {

//   if (err) {
//     console.log("WebMidi could not be enabled.", err);
//   } else {
//     console.log("WebMidi enabled!");
//   }

// });


WebMidi.enable(function (err) {
  console.log("WebMidi: ", WebMidi);
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);
});
