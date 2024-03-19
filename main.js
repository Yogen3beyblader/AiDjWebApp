var canvas;
var video;
var song1;
var song2;

var leftWristx=0;
var leftWristy=0;

var rightWristx=0;
var rightWristy=0;

var scorerightwrist=0;
var scoreleftwrist=0;

function preload () {
song1=loadSound("music.mp3");
song2=loadSound("Phonk boi.mp3");
}

function setup () {
canvas= createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotRoses);
}

function gotRoses(resultsrsr) {
if (resultsrsr.length > 0);{
    console.log(resultsrsr);
    leftWristx=resultsrsr[0].pose.leftWrist.x;
    leftWristy=resultsrsr[0].pose.leftWrist.y;
    rightWristx=resultsrsr[0].pose.rightWrist.x;
    rightWristy=resultsrsr[0].pose.rightWrist.y;

    console.log("LeftWristX = " + leftWristx + "LeftWristY = " + leftWristy);
    console.log("RightWristX = " + rightWristx + "RightWristY = " + rightWristy);
    scoreleftwrist=resultsrsr[0].pose.keypoints[9].score;
    console.log(scoreleftwrist);

    scorerightwrist=resultsrsr[0].pose.keypoints[10].score;
    console.log(scorerightwrist);
}
}

function modelLoaded() {
    console.log("--Pose Net Is Active--");
}

function draw () {
image (video, 0,0,600,500);

fill("#FF0000");
stroke("#00FFFF");
var leftStatus=song1.isPlaying();
var rightStatus=song2.isPlaying();

if(scoreleftwrist > 0.2) {
circle(leftWristx,leftWristy,20);
song2.stop();
if (leftStatus==false){
    song1.play();
    document.getElementById("bestsongname").innerHTML="music.mp3";

}


}
if (scorerightwrist > 0.2) {
circle(rightWristx,rightWristy,20);
song1.stop();
if (rightStatus==false){
    song2.play();
    document.getElementById("bestsongname").innerHTML="Phonk boi.mp3";

}
}}