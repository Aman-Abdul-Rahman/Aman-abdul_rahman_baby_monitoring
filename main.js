img="";
status="";
objects=[];

function preload()
{
    
}

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status : Detecting Objects";

}

function draw()
{
    image(video,0,0,380,380);
    
    if(status!="")
    {
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="status : Objects Detected";
            document.getElementById("no_of_objects").innerHTML="no of detected object are: "+objects.length;
            r=random(255);
            g=random(255);
            b=random(255);
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
             text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
             noFill();
             stroke(r,g,b);
             rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function modelloaded()
{
    console.log("model is loaded!");
    status=true;
    objectdetector.detect(video,gotresult);
}

function gotresult(error,result)
{
if(error)
{
    console.log(error);
}
console.log(result);
objects=result;

}