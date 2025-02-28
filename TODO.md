# To-Do list for Human library

## Work in Progress

### Exploring

- Optical flow: <https://docs.opencv.org/3.3.1/db/d7f/tutorial_js_lucas_kanade.html>
- Advanced histogram equalization: Adaptive, Contrast Limited, CLAHE
- TFLite models: <https://js.tensorflow.org/api_tflite/0.0.1-alpha.4/>
- Body segmentation: `robust-video-matting`

<br><hr><br>

## Known Issues

#### WebGPU

Experimental support only until support is officially added in Chromium

### Face Detection

Enhanced rotation correction for face detection is not working in NodeJS due to missing kernel op in TFJS  
Feature is automatically disabled in NodeJS without user impact  

- Backend NodeJS missing kernel op `RotateWithOffset`  
  <https://github.com/tensorflow/tfjs/issues/5473>  

<br><hr><br>

## Pending Release Notes

- Updated **FaceMesh-Landmarks** models
- Added **FaceMesh-with-Attention** model is disabled by defauls, enable using  
  `config.face.mesh.attention = true`
- If **FaceMesh-with-Attention** model is anbled, Iris model gets disabled  
  as its functionality is superseded by attention model
- Results include more detailed face mesh annotations  
  `result.face[].annotations`
