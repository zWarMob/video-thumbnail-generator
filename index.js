/**
 * Operates in the browser.
 * @param {!HTMLInputElement} vidFile File from Input containing the video we want to generate thumbnails for
 * @param {object} options Overwrite the default settings for thumbnail frequency and size
 * @return {Array} 
 */

/*
options = {
          "frequencyType": frequencyType,
          "frequency": frequency
        }
        */
function generateThumbnails(vidFile, options) {
  var finished = false;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var array = [];

  // we will extract the frames from the video in the browser
  var video = document.createElement('video');
  video.muted = true;
  
  // on firefox, timeupdate fires twice (unlike seek)
  // had to change to circumvent frame duplication
  video.addEventListener('seeked', drawFrame, false);
  video.addEventListener('ended', onend, false);
  video.addEventListener('loadedmetadata', initCanvas, false);

  // loadmetadata will fire after the source has loaded
  // inside we will seek a new time and timeupdate will fire after
  video.src = URL.createObjectURL(vidFile);
  
  function initCanvas(e) {
    // TODO TO-DO TO DO
    // Change thumbnail size based on options?
    canvas.width = this.videoWidth;
    canvas.height = this.videoHeight;

    seekVideo(this, true);
  }

  function drawFrame(e) {
    if(this.duration != this.currentTime){
      console.log("draw", this.currentTime)
      ctx.drawImage(this, 0, 0);
      canvas.toBlob(saveFrame, 'image/jpeg');
      seekVideo(this);
    }
  }

  function saveFrame(blob) {
    array.push(blob);
  }

  function revokeURL(e) {
    URL.revokeObjectURL(this.src);
  }
  
  function onend(e) {
    //figure out why is timeout necessary. Last picture hasn't been added to the list when onend fires
    setTimeout(()=>{
      URL.revokeObjectURL(this.src);
      var zip = new JSZip();
    
      for(var i = 0; i < array.length; i++){
        zip.file("thumb-"+i+".jpeg", array[i]);
      }
      
      zip.generateAsync({type:"blob"}).then(function (blob) { // 1) generate the zip file
        saveAs(blob, "thumbnails.zip");                          // 2) trigger the download
      }, function (err) {
        jQuery("#blob").text(err);
      });
    },100);
  }

  function seekVideo(vid, firstFrame){
    if(options.frequencyType=="duration"){
      console.log("seek1", finished, vid.duration, vid.currentTime, 60 / options.frequency)
      vid.currentTime += 60 / options.frequency;
    }else if(options.frequencyType=="fixed"){
      console.log("seek2", finished, vid.duration, vid.currentTime, vid.duration / options.frequency)
      if(firstFrame)
        vid.currentTime += vid.duration / options.frequency / 2;
      else
        vid.currentTime += vid.duration / options.frequency;
    }else{
      //frames based
    }
  }
}
