song1="";
song2="";
song1status="";
song2status="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function preload(){
    song1=loadSound("music.mp3 ");
    song2=loadSound("music2.mp3 ");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);

}

function draw(){
    image(video,0,0,600,500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    fill("#FF0000");
    stroke("#FF000");
    if(scoreRightWrist> 0.2)
    {
        circle(rightWristX,rightWristY,20);
       song2.stop();
       if(song1status==false){
        song1.play();
        document.getElementById("song").innerHTML="playing music";

       }
    }

    
    if(scoreLeftWrist> 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2status==false){
         song2.play();
         document.getElementById("song").innerHTML="playing song";
}
    }
}
function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}

function modelLoaded(){
    console.log('poseNet is Instialized')
}


function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRigthWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrsit="+scoreLeftWrist+"scoreRightWrist="+scoreRightWrist)
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);

    }
}

