'use strict';
var Oscilloscope = function(audioContext, analyser, width, height){
  this.width = width;
  this.height = height;
  this.bufferLength = 2048;
  this.dataArray = new Uint8Array(this.bufferLength);

  this.analyser = analyser;
  this.analyser.minDecibels = -90;
  this.analyser.maxDecibels = -10;
  this.analyser.smoothingTimeConstant = 0.85;
  this.init();
};

Oscilloscope.prototype.init = function(){
  this.oscilloscope = document.getElementById('oscilloscope');
  this.oscilloscope.width = this.width;
  this.oscilloscope.height = this.height;
  this.oContext = this.oscilloscope.getContext('2d');
  this.draw();
};

Oscilloscope.prototype.grid = function(){
  var p = 25;

  for (var x = 0; x <= this.width; x += p) {
      this.oContext.moveTo(x, 0);
      this.oContext.lineTo(x, this.height + p);
  }
  this.oContext.strokeStyle = "#ff0000";

  for (var y = 0; y <= this.height; y += p) {
      this.oContext.moveTo(0, y );
      this.oContext.lineTo(this.width, y);
  }

  this.oContext.strokeStyle = "#333";
  this.oContext.stroke();
  this.oContext.lineWidth = 0.5;
};

Oscilloscope.prototype.draw = function(){
  this.analyser.getByteTimeDomainData(this.dataArray);
  this.oContext.fillStyle = 'rgba(0,0,0,1.0)';
  this.oContext.fillRect(0,0,this.oscilloscope.width,this.oscilloscope.height);
  this.grid();
  this.oContext.lineWidth = 1;
  this.oContext.strokeStyle = 'rgba(0,255,0,1.0)';

  this.oContext.beginPath();

  var sliceWidth = this.oscilloscope.width * 1.0 / this.bufferLength;
  var x = 0;

  for (var i = 0; i < this.bufferLength; i++) {
    var v = this.dataArray[i] / 128.0;
    var y = v * this.oscilloscope.height / 2;

    if(i === 0){
      this.oContext.moveTo(x, y);
    } else {
      this.oContext.lineTo(x, y);
    }

    x += sliceWidth;
  }
  this.oContext.lineTo(this.width, this.height/2);
  this.oContext.stroke();
  var drawer = requestAnimationFrame(this.draw.bind(this));
};
