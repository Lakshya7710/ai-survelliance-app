video="";
objects=[];
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(275,275);
    canvas.center();
}

function draw(){
    image(video,0,0,275,275);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected : " + objects.length;
        r=random(255);
        g=random(255);
        b=random(255);
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded(){
    console.log("model is loaded");
    status=true;
    video.speed(1);
    video.loop();
    video.volume(0);
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}