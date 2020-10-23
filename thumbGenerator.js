//https://stackoverflow.com/a/32708998

//set accepted files acceptedFiles https://www.dropzonejs.com/#config-acceptedFiles
var videoDropzone = new Dropzone("div#video-dropzone", { url: null, maxFiles: 1,autoProcessQueue: false});
setTimeout(()=>{document.querySelector("#video-dropzone").classList.add("dropzone");},100);

var stepsContainer = document.querySelector("#steps-container");

document.querySelectorAll(".next_step").forEach((e)=>{
e.addEventListener("click",(x)=>{
    stepsContainer.dataset.step = parseInt(stepsContainer.dataset.step) + 1;
});
});
document.querySelectorAll('.previous_step').forEach((e)=>{
e.addEventListener("click",(x)=>{
    stepsContainer.dataset.step = parseInt(stepsContainer.dataset.step) - 1;
});
});

document.querySelector("#btnGenerate").addEventListener("click", ()=>{
let frequencyType = document.querySelector('input[type="radio"][name="thumbFrequencyType"]:checked').value;
let vidInputType = "own"/*document.querySelector('input[type="radio"][name="vidInputType"]:checked').value*/;
//callback for each frame to options too

switch(vidInputType) {
    case "own":
    let vidFile = videoDropzone.files[0];
    let frequency;
    switch(frequencyType){
        case "duration":
            frequency = parseInt(document.getElementById("thumbsPerMinuteInput").value)
            break;
        case "fixed":
            frequency = parseInt(document.getElementById("thumbsTotalInput").value)
            break;
        case "frames":
            frequency = parseInt(document.getElementById("thumbsPerFramesInput").value)
            // TODO TO-DO TO DO
            break;
    }
    
    // TODO TO-DO TO DO
    generateThumbnails(vidFile, {
        "frequencyType": frequencyType,
        "frequency": frequency
    });
    break;
    case "url":
    // TODO TO-DO TO DO
    // xhr to get vid and pass blob/data to our generator
    break;
}
});

//document.querySelector('input').addEventListener('change', extractFrames, false);
