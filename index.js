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

    if(options.frequencyType=="duration"){
      this.currentTime += 60 / options.frequency;
    }else if(options.frequencyType=="fixed"){
      this.currentTime += this.duration / options.frequency + 1;
    }else{
      //frames based
    }
  }

  function drawFrame(e) {
      if(!finished){
        ctx.drawImage(this, 0, 0);
        canvas.toBlob(saveFrame, 'image/jpeg');
      }
        
      if (this.currentTime != this.duration) {
        if(options.frequencyType=="duration"){
          this.currentTime += 60 / options.frequency;
        }else if(options.frequencyType=="fixed"){
          this.currentTime += this.duration / options.frequency + 1;
        }else{
          //frames based
        }
      }else{
        finished = true;
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
}
