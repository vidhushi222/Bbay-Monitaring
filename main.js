img="";
status1="";
objects=[];

function preload(){
//img=loadSound("tense_alarm.mp3");
}




function draw(){
image(video,0,0,380,380);

if(status1!=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectdetector.detect(video,gotresult);
for(i=0;i<objects.length;i++){  
    document.getElementById("status").innerHTML="status:  Object Detected";

    //document.getElementById("number_of_objects").innerHTML="number of objects dectected are" + objects.length;
    fill(r,g,b);
    percent=floor(objects[i].confidence*100)
    text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    if(objects[i].label=="person"){
        document.getElementById("number_of_objects").innerHTML="Baby is found !!!";
      //  song.stop();
    }
    else{
        document.getElementById("number_of_objects").innerHTML="Baby is not  found :(";
       // song.play();
    }
}
if(objects.length==0){
    document.getElementById("number_of_objects").innerHTML="Baby is  not found :(";
   // song.play();
}
}



}




function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
objectdetector=ml5.objectDetector('cocossd',modelloaded);
document.getElementById("status").innerHTML="status:detecting object";
}

function modelloaded(){
    console.log("model is loaded");
    status1=true;
}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
