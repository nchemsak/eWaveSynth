'use strict';
/*******************************************************************************
                            VARIABLES
/******************************************************************************/
let mediaSource = new MediaSource();
// mediaSource.addEventListener('sourceopen', false);
let mediaRecorder;
let blobs;
let liveVideo = document.getElementById('live');
let recordedVideo = document.getElementById('recorded');

// Button Variables
let recordButton = document.getElementById('recordButton');
recordButton.onclick = toggleRecording;

let playButton = document.getElementById('playButton');
playButton.onclick = play;

let downloadButton = document.getElementById('downloadButton');
downloadButton.onclick = download;

// Indicate whether to record audio and/or video
let audioVideo = {
  audio: true,
  video: true
};
/*******************************************************************************
                               LIVE STREAM
/******************************************************************************/
function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log('stream: ', stream);
  window.stream = stream;
  if (window.URL) {
    console.log("window.URL: ", window.URL);
    console.log("window: ", window);

// The Window.URL property returns an object that provides static methods used for creating and managing object URLs. It can also be called as a constructor to construct URL objects.

    liveVideo.src = window.URL.createObjectURL(stream);
  } else {
    liveVideo.src = stream;
  }
}

navigator.mediaDevices.getUserMedia(audioVideo).
then(handleSuccess);

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    blobs.push(event.data);
  }
}

function handleStop(event) {
  console.log('Recorder stopped: ', event);
}

/*******************************************************************************
                             TOGGLE Recording (start/stop)
/******************************************************************************/

function toggleRecording() {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
  }
}

/*******************************************************************************
                             Start Recording FUNCTION
/******************************************************************************/

function startRecording() {
  blobs = [];
  mediaRecorder = new MediaRecorder(window.stream);
  recordButton.textContent = 'STOP Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  // mediaRecorder.start(10); this indicates 10ms of data per blob...not sure how that affects anything quite yet....
  mediaRecorder.start(10);
  console.log('MediaRecorder start: ', mediaRecorder);
}

/*******************************************************************************
                            STOP RECORDING function
/******************************************************************************/

function stopRecording() {
  mediaRecorder.stop();
  console.log('blobs: ', blobs);
  recordedVideo.controls = true;
}

function play() {
  let playBack = new Blob(blobs, {
    type: 'video/webm'
  });
  recordedVideo.src = window.URL.createObjectURL(playBack);
  console.log("playBack: ", playBack);
}

/*******************************************************************************
                             DOWNLOAD FUNCTION
/******************************************************************************/
function download() {
  let blob = new Blob(blobs, { type: 'video/webm' });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
