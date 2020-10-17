/**
 * Operates in the browser.
 * @param {!HTMLInputElement} vidInput Input containing the video we want to generate thumbnails for
 * @param {object} options Overwrite the default settings for thumbnail frequency and size
 * @return {Array} 
 */

/*
options = {
          "frequencyType": frequencyType,
          "frequency": frequency
        }
        */
function generateThumbnails(vidInput, options) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var array = [];
  
  // we will extract the frames from the video in the browser
  var video = document.createElement('video');
  video.muted = true;
  video.addEventListener('loadedmetadata', initCanvas, false);
  video.addEventListener('timeupdate', drawFrame, false);
  video.addEventListener('ended', onend, false);

  // loadmetadata will fire after the source has loaded
  // inside we will seek a new time and timeupdate will fire after
  video.src = URL.createObjectURL(vidInput.files[0]);
  
  function initCanvas(e) {
    // TODO TO-DO TO DO
    // Change thumbnail size based on options?
    canvas.width = this.videoWidth;
    canvas.height = this.videoHeight;

    this.currentTime += 0.1;
  }

  function drawFrame(e) {
    if (this.currentTime < this.duration) {
      ctx.drawImage(this, 0, 0);
      /* 
      this will save as a Blob, less memory consumptive than toDataURL
      a polyfill can be found at
      https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
      */
      canvas.toBlob(saveFrame, 'image/jpeg');
      this.currentTime += 60 / options.frequency;
    }
  }

  function saveFrame(blob) {
    array.push(blob);
  }

  function revokeURL(e) {
    URL.revokeObjectURL(this.src);
  }
  
  function onend(e) {
    URL.revokeObjectURL(this.src);
    var zip = new JSZip();
    
    // do whatever with the frames
    /*  var img;
      for (var i = 0; i < array.length; i++) {
      img = new Image();
      img.onload = revokeURL;
      img.src = URL.createObjectURL(array[i]);
      document.body.appendChild(img);
    }*/

    for(var i = 0; i < array.length; i++){
      zip.file("thumb-"+i+".jpeg", array[i]);
    }
    
    zip.generateAsync({type:"blob"}).then(function (blob) { // 1) generate the zip file
      saveAs(blob, "thumbnails.zip");                          // 2) trigger the download
    }, function (err) {
      jQuery("#blob").text(err);
    });
  }
}
