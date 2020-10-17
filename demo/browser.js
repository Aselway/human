/* global QuickSettings */

import human from '../dist/human.esm.js';

const ui = {
  baseColor: 'rgba(255, 200, 255, 0.3)',
  baseLabel: 'rgba(255, 200, 255, 0.9)',
  baseFontProto: 'small-caps {size} "Segoe UI"',
  baseLineWidth: 16,
  baseLineHeightProto: 2,
  columns: 3,
  busy: false,
  facing: 'user',
  worker: 'worker.js',
  samples: ['../assets/sample1.jpg', '../assets/sample2.jpg', '../assets/sample3.jpg', '../assets/sample4.jpg', '../assets/sample5.jpg', '../assets/sample6.jpg'],
};

const config = {
  backend: 'webgl',
  console: true,
  face: {
    enabled: true,
    detector: { maxFaces: 10, skipFrames: 10, minConfidence: 0.5, iouThreshold: 0.3, scoreThreshold: 0.7 },
    mesh: { enabled: true },
    iris: { enabled: true },
    age: { enabled: true, skipFrames: 10 },
    gender: { enabled: true },
    emotion: { enabled: true, minConfidence: 0.5, useGrayscale: true },
  },
  body: { enabled: true, maxDetections: 10, scoreThreshold: 0.7, nmsRadius: 20 },
  hand: { enabled: true, skipFrames: 10, minConfidence: 0.5, iouThreshold: 0.3, scoreThreshold: 0.7 },
};
let settings;
let worker;
let timeStamp;
const fps = [];

function str(...msg) {
  if (!Array.isArray(msg)) return msg;
  let line = '';
  for (const entry of msg) {
    if (typeof entry === 'object') line += JSON.stringify(entry).replace(/{|}|"|\[|\]/g, '').replace(/,/g, ', ');
    else line += entry;
  }
  return line;
}

const log = (...msg) => {
  // eslint-disable-next-line no-console
  if (config.console) console.log(...msg);
};

async function drawFace(result, canvas) {
  if (!result) return;
  const ctx = canvas.getContext('2d');
  for (const face of result) {
    ctx.font = ui.baseFont;
    ctx.strokeStyle = ui.baseColor;
    ctx.fillStyle = ui.baseColor;
    ctx.lineWidth = ui.baseLineWidth;
    ctx.beginPath();
    if (settings.getValue('Draw Boxes')) {
      ctx.rect(face.box[0], face.box[1], face.box[2], face.box[3]);
    }
    // silly hack since fillText does not suport new line
    const labels = [];
    if (face.agConfidence) labels.push(`${Math.trunc(100 * face.agConfidence)}% ${face.gender || ''}`);
    if (face.age) labels.push(`Age:${face.age || ''}`);
    if (face.iris) labels.push(`iris: ${face.iris}`);
    if (face.emotion && face.emotion[0]) labels.push(`${Math.trunc(100 * face.emotion[0].score)}% ${face.emotion[0].emotion}`);
    ctx.fillStyle = ui.baseLabel;
    for (const i in labels) ctx.fillText(labels[i], face.box[0] + 6, face.box[1] + 24 + ((i + 1) * ui.baseLineHeight));
    ctx.stroke();
    ctx.lineWidth = 1;
    if (face.mesh) {
      if (settings.getValue('Draw Points')) {
        for (const point of face.mesh) {
          ctx.fillStyle = `rgba(${127.5 + (2 * point[2])}, ${127.5 - (2 * point[2])}, 255, 0.5)`;
          ctx.beginPath();
          ctx.arc(point[0], point[1], 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      if (settings.getValue('Draw Polygons')) {
        for (let i = 0; i < human.facemesh.triangulation.length / 3; i++) {
          const points = [
            human.facemesh.triangulation[i * 3 + 0],
            human.facemesh.triangulation[i * 3 + 1],
            human.facemesh.triangulation[i * 3 + 2],
          ].map((index) => face.mesh[index]);
          const path = new Path2D();
          path.moveTo(points[0][0], points[0][1]);
          for (const point of points) {
            path.lineTo(point[0], point[1]);
          }
          path.closePath();
          ctx.strokeStyle = `rgba(${127.5 + (2 * points[0][2])}, ${127.5 - (2 * points[0][2])}, 255, 0.3)`;
          ctx.stroke(path);
          if (settings.getValue('Fill Polygons')) {
            ctx.fillStyle = `rgba(${127.5 + (2 * points[0][2])}, ${127.5 - (2 * points[0][2])}, 255, 0.3)`;
            ctx.fill(path);
          }
        }
      }
    }
  }
}

async function drawBody(result, canvas) {
  if (!result) return;
  const ctx = canvas.getContext('2d');
  for (const pose of result) {
    ctx.fillStyle = ui.baseColor;
    ctx.strokeStyle = ui.baseColor;
    ctx.font = ui.baseFont;
    ctx.lineWidth = ui.baseLineWidth;
    if (settings.getValue('Draw Points')) {
      for (const point of pose.keypoints) {
        ctx.beginPath();
        ctx.arc(point.position.x, point.position.y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    if (settings.getValue('Draw Polygons')) {
      const path = new Path2D();
      let part;
      // torso
      part = pose.keypoints.find((a) => a.part === 'leftShoulder');
      path.moveTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'rightShoulder');
      path.lineTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'rightHip');
      path.lineTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'leftHip');
      path.lineTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'leftShoulder');
      path.lineTo(part.position.x, part.position.y);
      // legs
      part = pose.keypoints.find((a) => a.part === 'leftHip');
      path.moveTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'leftKnee');
      path.lineTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'leftAnkle');
      path.lineTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'rightHip');
      path.moveTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'rightKnee');
      path.lineTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'rightAnkle');
      path.lineTo(part.position.x, part.position.y);
      // arms
      part = pose.keypoints.find((a) => a.part === 'leftShoulder');
      path.moveTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'leftElbow');
      path.lineTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'leftWrist');
      path.lineTo(part.position.x, part.position.y);
      // arms
      part = pose.keypoints.find((a) => a.part === 'rightShoulder');
      path.moveTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'rightElbow');
      path.lineTo(part.position.x, part.position.y);
      part = pose.keypoints.find((a) => a.part === 'rightWrist');
      path.lineTo(part.position.x, part.position.y);
      // draw all
      ctx.stroke(path);
    }
  }
}

async function drawHand(result, canvas) {
  if (!result) return;
  const ctx = canvas.getContext('2d');
  for (const hand of result) {
    ctx.font = ui.baseFont;
    ctx.lineWidth = ui.baseLineWidth;
    if (settings.getValue('Draw Boxes')) {
      ctx.lineWidth = ui.baseLineWidth;
      ctx.beginPath();
      ctx.strokeStyle = ui.baseColor;
      ctx.fillStyle = ui.baseColor;
      ctx.rect(hand.box[0], hand.box[1], hand.box[2], hand.box[3]);
      ctx.fillStyle = ui.baseLabel;
      ctx.fillText('hand', hand.box[0] + 2, hand.box[1] + 22, hand.box[2]);
      ctx.stroke();
    }
    if (settings.getValue('Draw Points')) {
      for (const point of hand.landmarks) {
        ctx.fillStyle = `rgba(${127.5 + (2 * point[2])}, ${127.5 - (2 * point[2])}, 255, 0.5)`;
        ctx.beginPath();
        ctx.arc(point[0], point[1], 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    if (settings.getValue('Draw Polygons')) {
      const addPart = (part) => {
        for (let i = 1; i < part.length; i++) {
          ctx.lineWidth = ui.baseLineWidth;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${127.5 + (2 * part[i][2])}, ${127.5 - (2 * part[i][2])}, 255, 0.5)`;
          ctx.moveTo(part[i - 1][0], part[i - 1][1]);
          ctx.lineTo(part[i][0], part[i][1]);
          ctx.stroke();
        }
      };
      addPart(hand.annotations.indexFinger);
      addPart(hand.annotations.middleFinger);
      addPart(hand.annotations.ringFinger);
      addPart(hand.annotations.pinky);
      addPart(hand.annotations.thumb);
      addPart(hand.annotations.palmBase);
    }
  }
}

async function drawResults(input, result, canvas) {
  // update fps
  settings.setValue('FPS', Math.round(1000 / (performance.now() - timeStamp)));
  fps.push(1000 / (performance.now() - timeStamp));
  if (fps.length > 20) fps.shift();
  settings.setValue('FPS', Math.round(10 * fps.reduce((a, b) => a + b) / fps.length) / 10);

  // eslint-disable-next-line no-use-before-define
  requestAnimationFrame(() => runHumanDetect(input, canvas)); // immediate loop

  // draw image from video
  const ctx = canvas.getContext('2d');
  ctx.drawImage(input, 0, 0, input.width, input.height, 0, 0, canvas.width, canvas.height);
  // draw all results
  drawFace(result.face, canvas);
  drawBody(result.body, canvas);
  drawHand(result.hand, canvas);
  // update log
  const engine = await human.tf.engine();
  const memory = `${engine.state.numBytes.toLocaleString()} bytes ${engine.state.numDataBuffers.toLocaleString()} buffers ${engine.state.numTensors.toLocaleString()} tensors`;
  const gpu = engine.backendInstance ? `GPU: ${engine.backendInstance.numBytesInGPU.toLocaleString()} bytes` : '';
  document.getElementById('log').innerText = `
    TFJS Version: ${human.tf.version_core} | Backend: ${human.tf.getBackend()} | Memory: ${memory} ${gpu}
    Performance: ${str(result.performance)} | Object size: ${(str(result)).length.toLocaleString()} bytes
  `;
}

// simple wrapper for worker.postmessage that creates worker if one does not exist
function webWorker(input, image, canvas) {
  if (!worker) {
    // create new webworker and add event handler only once
    log('Creating worker thread');
    worker = new Worker(ui.worker, { type: 'module' });
    // after receiving message from webworker, parse&draw results and send new frame for processing
    worker.addEventListener('message', (msg) => drawResults(input, msg.data, canvas));
  }
  // pass image data as arraybuffer to worker by reference to avoid copy
  worker.postMessage({ image: image.data.buffer, width: canvas.width, height: canvas.height, config }, [image.data.buffer]);
}

async function runHumanDetect(input, canvas) {
  timeStamp = performance.now();
  // perform detect if live video or not video at all
  if (input.srcObject) {
    // if video not ready, just redo
    const live = (input.srcObject.getVideoTracks()[0].readyState === 'live') && (input.readyState > 2) && (!input.paused);
    if (!live) {
      if (!input.paused) log(`Video not ready: state: ${input.srcObject.getVideoTracks()[0].readyState} stream state: ${input.readyState}`);
      setTimeout(() => runHumanDetect(input, canvas), 500);
      return;
    }
    if (settings.getValue('Use Web Worker')) {
      // get image data from video as we cannot send html objects to webworker
      const offscreen = new OffscreenCanvas(canvas.width, canvas.height);
      const ctx = offscreen.getContext('2d');
      ctx.drawImage(input, 0, 0, input.width, input.height, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // perform detection in worker
      webWorker(input, data, canvas);
    } else {
      let result = {};
      try {
        // perform detection
        result = await human.detect(input, config);
      } catch (err) {
        log('Error during execution:', err.message);
      }
      if (result.error) log(result.error);
      else drawResults(input, result, canvas);
    }
  }
}

// eslint-disable-next-line no-unused-vars
async function setupCamera() {
  if (ui.busy) return null;
  ui.busy = true;
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const output = document.getElementById('log');
  const live = video.srcObject ? ((video.srcObject.getVideoTracks()[0].readyState === 'live') && (video.readyState > 2) && (!video.paused)) : false;
  log(`Setting up camera: live: ${live} facing: ${ui.facing}`);
  // setup webcam. note that navigator.mediaDevices requires that page is accessed via https
  if (!navigator.mediaDevices) {
    const msg = 'Camera access not supported';
    output.innerText += '\n' + msg;
    log(msg);
    return null;
  }
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: ui.facing, width: window.innerWidth, height: window.innerHeight },
    });
  } catch (err) {
    output.innerText += '\nCamera permission denied';
    log(err);
  }
  if (stream) video.srcObject = stream;
  else return null;
  return new Promise((resolve) => {
    video.onloadeddata = async () => {
      video.width = video.videoWidth;
      video.height = video.videoHeight;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      if (live) video.play();
      ui.busy = false;
      // do once more because onresize events can be delayed or skipped
      if (video.width !== window.innerWidth) await setupCamera();
      resolve(video);
    };
  });
}

async function processImage(input) {
  ui.baseColor = 'rgba(200, 255, 255, 0.5)';
  ui.baseLabel = 'rgba(200, 255, 255, 0.8)';
  ui.baseFont = 'small-caps 3.5rem "Segoe UI"';
  ui.baseLineWidth = 16;
  ui.columns = 3;
  const cfg = {
    backend: 'webgl',
    console: true,
    face: {
      enabled: true,
      detector: { maxFaces: 10, skipFrames: 0, minConfidence: 0.1, iouThreshold: 0.3, scoreThreshold: 0.3 },
      mesh: { enabled: true },
      iris: { enabled: true },
      age: { enabled: true, skipFrames: 0 },
      gender: { enabled: true },
      emotion: { enabled: true, minConfidence: 0.1, useGrayscale: true },
    },
    body: { enabled: true, maxDetections: 10, scoreThreshold: 0.7, nmsRadius: 20 },
    hand: { enabled: true, skipFrames: 0, minConfidence: 0.5, iouThreshold: 0.3, scoreThreshold: 0.5 },
  };
  return new Promise((resolve) => {
    const image = document.getElementById('image');
    image.onload = async () => {
      log('Processing image:', image.src);
      const canvas = document.getElementById('canvas');
      image.width = image.naturalWidth;
      image.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const result = await human.detect(image, cfg);
      await drawResults(image, result, canvas);
      const thumb = document.createElement('canvas');
      thumb.width = window.innerWidth / (ui.columns + 0.02);
      thumb.height = canvas.height / (window.innerWidth / thumb.width);
      const ctx = thumb.getContext('2d');
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, thumb.width, thumb.height);
      document.getElementById('samples').appendChild(thumb);
      image.src = '';
      resolve(true);
    };
    image.src = input;
  });
}

async function detectVideo() {
  document.getElementById('samples').style.display = 'none';
  document.getElementById('canvas').style.display = 'block';
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  ui.baseFont = ui.baseFontProto.replace(/{size}/, '1.2rem');
  ui.baseLineHeight = ui.baseLineHeightProto;
  if (!video.paused) {
    document.getElementById('log').innerText += '\nPaused ...';
    video.pause();
  } else {
    await setupCamera();
    document.getElementById('log').innerText += '\nStarting Human Library ...';
    video.play();
  }
  runHumanDetect(video, canvas);
}

// eslint-disable-next-line no-unused-vars
async function detectSampleImages() {
  ui.baseFont = ui.baseFontProto.replace(/{size}/, `${ui.columns}rem`);
  ui.baseLineHeight = ui.baseLineHeightProto * ui.columns;
  document.getElementById('canvas').style.display = 'none';
  document.getElementById('samples').style.display = 'block';
  log('Running detection of sample images');
  for (const sample of ui.samples) await processImage(sample);
}

function setupUI() {
  // add all variables to ui control panel
  settings = QuickSettings.create(10, 10, 'Settings', document.getElementById('main'));
  const style = document.createElement('style');
  style.innerHTML = `
    .qs_main { font: 1rem "Segoe UI"; }
    .qs_label { font: 0.8rem "Segoe UI"; }
    .qs_content { background: darkslategray; }
    .qs_container { background: transparent; color: white; margin: 6px; padding: 6px; }
    .qs_checkbox_label { top: 2px; }
    .qs_button { width: -webkit-fill-available; font: 1rem "Segoe UI"; cursor: pointer; }
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
  settings.addButton('Play/Pause WebCam', () => detectVideo());
  settings.addButton('Process Images', () => detectSampleImages());
  settings.addDropDown('Backend', ['webgl', 'wasm', 'cpu'], async (val) => config.backend = val.value);
  settings.addHTML('title', 'Enabled Models'); settings.hideTitle('title');
  settings.addBoolean('Face Detect', config.face.enabled, (val) => config.face.enabled = val);
  settings.addBoolean('Face Mesh', config.face.mesh.enabled, (val) => config.face.mesh.enabled = val);
  settings.addBoolean('Face Iris', config.face.iris.enabled, (val) => config.face.iris.enabled = val);
  settings.addBoolean('Face Age', config.face.age.enabled, (val) => config.face.age.enabled = val);
  settings.addBoolean('Face Gender', config.face.gender.enabled, (val) => config.face.gender.enabled = val);
  settings.addBoolean('Face Emotion', config.face.emotion.enabled, (val) => config.face.emotion.enabled = val);
  settings.addBoolean('Body Pose', config.body.enabled, (val) => config.body.enabled = val);
  settings.addBoolean('Hand Pose', config.hand.enabled, (val) => config.hand.enabled = val);
  settings.addHTML('title', 'Model Parameters'); settings.hideTitle('title');
  settings.addRange('Max Objects', 1, 20, 5, 1, (val) => {
    config.face.detector.maxFaces = parseInt(val);
    config.body.maxDetections = parseInt(val);
  });
  settings.addRange('Skip Frames', 1, 20, config.face.detector.skipFrames, 1, (val) => {
    config.face.detector.skipFrames = parseInt(val);
    config.face.emotion.skipFrames = parseInt(val);
    config.face.age.skipFrames = parseInt(val);
    config.hand.skipFrames = parseInt(val);
  });
  settings.addRange('Min Confidence', 0.1, 1.0, config.face.detector.minConfidence, 0.05, (val) => {
    config.face.detector.minConfidence = parseFloat(val);
    config.face.emotion.minConfidence = parseFloat(val);
    config.hand.minConfidence = parseFloat(val);
  });
  settings.addRange('Score Threshold', 0.1, 1.0, config.face.detector.scoreThreshold, 0.05, (val) => {
    config.face.detector.scoreThreshold = parseFloat(val);
    config.hand.scoreThreshold = parseFloat(val);
    config.body.scoreThreshold = parseFloat(val);
  });
  settings.addRange('IOU Threshold', 0.1, 1.0, config.face.detector.iouThreshold, 0.05, (val) => {
    config.face.detector.iouThreshold = parseFloat(val);
    config.hand.iouThreshold = parseFloat(val);
  });
  settings.addHTML('title', 'UI Options'); settings.hideTitle('title');
  settings.addBoolean('Use Web Worker', false);
  settings.addBoolean('Camera Front/Back', true, (val) => {
    ui.facing = val ? 'user' : 'environment';
    setupCamera();
  });
  settings.addBoolean('Draw Boxes', true);
  settings.addBoolean('Draw Points', true);
  settings.addBoolean('Draw Polygons', true);
  settings.addBoolean('Fill Polygons', true);
  settings.addHTML('line1', '<hr>'); settings.hideTitle('line1');
  settings.addRange('FPS', 0, 100, 0, 1);
}

async function main() {
  log('Human demo starting ...');
  setupUI();

  const msg = `Human ready: version: ${human.version} TensorFlow/JS version: ${human.tf.version_core}`;
  document.getElementById('log').innerText += '\n' + msg;
  log(msg);
}

window.onload = main;
window.onresize = setupCamera;