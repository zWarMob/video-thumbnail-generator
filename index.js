/**
 * Operates in the browser.
 * @param {!HTMLVideoElement} htmlVideoElement An html5 video element containing the
 *     video which we want to generate thumbnails for.
 * @param {!HTMLElement} outputElement The element snapshots from the video will be extracted to (separate images)
 * @return {void}
 */
captureVideo = function(htmlVideoElement,outputElement) {
    "use strict";
    var canv = document.createElement("canvas");
    canv.getContext('2d');
    var counter=0;
    var scale = 0.5;

    for(var i=1;i<6;i++){
        var n = i*3000;
        setTimeout(function(){
            for(var j=1;j<21;j++){
            var m = j*150;
            setTimeout(function(){
                counter += 1;
                var dur = (counter*htmlVideoElement.duration)/100;
                htmlVideoElement.currentTime = dur ;
                captureImg();
            },m);
            }
        },n);
    }
        
    function captureImg() {
        var canvas2 = document.createElement("canvas");
        canvas2.width = htmlVideoElement.videoWidth * scale;
        canvas2.height = htmlVideoElement.videoHeight * scale;
        canvas2.getContext('2d').drawImage(htmlVideoElement, 0, 0, canvas2.width, canvas2.height);

        var dataURL = canvas2.toDataURL('image/png');

            var img = document.createElement("img");
        img.src = canvas2.toDataURL();
        outputElement.appendChild(img);
    };
}