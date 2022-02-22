This generator can be used to create thumbnails from a video.

Feed the interface with a video file and you get a zip with png thumbnails!
<br><br>

## Table Of Content
- [Usage](#usage)
   - [Examples](#option-examples)
   - [Supported formats](#supported-formats)
   - [Limitations and possibilities](#limitations)
- [GUI](#gui-example)
<br><br>

# Usage
1. Load dependencies: JS Zip, File Saver
```html
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js"></script>
    
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" ></script>
  ```

2. Load thumbGenerator.js
  ```html
  <script src="thumbGenerator.js"></script>
</head>
<body>
  ```

3. Choose a video in a supported format
  ```html
  <input id="videoInput" type="file">
  ```

4. Call generateThumbnails after video in input
  ```html
  <script>
  let video = document.getElementById("videoInput");
  generateThumbnails(video, {"frequencyType": "fixed", "frequency": 5})
  </script>
```

Format of option object expected:
```javascript
let options = {
  "frequencyType": string,
  "frequency": int
}
```

`frequency` determines how many thumbnails you want (depending on the `frequencyType`)<br>

`frequencyType` is the way you would like to slice the video:
- "`fixed`", the number of thumbnails generated in total
- "`duration`" - number of thumbnails per minute

---
## Option Examples

```javascript
let options = {
  "frequencyType": "fixed",
  "frequency": 5
}
```
Generates 5 thumbnails for the video, regardless of it's length*:<br>
***Note thumbnails will be equally spaced in time**:<br>
in gold - the video length, green for the thumbnail timeline
![Visualization of fixed frequency thumbnails](README_files/fixedFrequency.png)

<br>

```
let options = {
  "frequencyType": "duration",
  "frequency": 5
}
```
Generate 5 thumbnails for each 60 seconds of the video
- First frame taken at: 60/5/2 = 12/2 = 6 (or the 6th second)<br>
- Every next frame: 60/5 = 12 (12 seconds after the previous)

---
## Supported Formats
  - video - `mp4`
  - image - `png`

---
## Limitations and possibilities
- Currently can run only in browser. Possible to run on node with libraries like [npm canvas](https://www.npmjs.com/package/canvas)
- Libraries to create a zip from the images and save the file are not optional
- Video frames can be used as a frequency type. Thumbnail created for every X frames
- All html video formats should be easy to implement
<br><br>

# GUI Example
Open `/generator-app/index.html`

You can use a service like https://codeshack.io/css-sprite-generator/ to generate a sprite from the images

--- 

original source code from 2016

similar projects =^-^= 
https://www.npmjs.com/package/video-thumbnail-generator
https://github.com/flavioribeiro/video-thumbnail-generator