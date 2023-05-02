Status = "";
objects = [];


function setup()
{
   canvas = createCanvas(380,380);
   canvas.center();

   video = createCapture(VIDEO);
   video.hide();
}
function start()
{
    objectDetection = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw()
{
    image(video,0,0,380,380);
    if(Status != "")
    {
        r = random(255);
        b = random(255);
        g = random(255);
        objectDetection.detect(video,gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status - objects detected";
            document.getElementById("number_of_obj").innerHTML = "Number of objects detected are : " + objects.length;
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }

}
function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
    
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
