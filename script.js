
// stores the device context of the canvas we use to draw the outlines
// initialized in myInit, used in myHover and myLeave
var hdc;

//Variable for storing the canvas. Initialized in Init
var can;

//Save original values for resizing porpuses
var originalValues={
    coords:[],
    width:"",
    height:"",
};

// shorthand func
function byId(e){return document.getElementById(e);}

// takes a string that contains coords eg - "227,307,261,309, 339,354, 328,371, 240,331"
// draws a line from each co-ord pair to the next - assumes starting point needs to be repeated as ending point.

function refreshText(type){
    switch(type){
        case "tree1":
            console.log("Tree1");
            var title=document.getElementById("infoTitle");
            title.innerHTML="Tree 1";

            var textImage=document.getElementById("infoImage");
            textImage.setAttribute("src","./images/tree1.jpeg");

            var infoList=document.getElementById("infoList");
            infoList.innerHTML="";
            infoList.innerHTML=
                "<li>This is a tree</li>"+
                "<li>Cant you fucking see?</li>";
        break;

        case "plant1":
            console.log("plant1");
            var title=document.getElementById("infoTitle");
            title.innerHTML="Plant 1";

            var textImage=document.getElementById("infoImage");
            textImage.setAttribute("src","./images/plant1.jpeg");

            var infoList=document.getElementById("infoList");
            infoList.innerHTML="";
            infoList.innerHTML=
                "<li>This is not a tree</li>"+
                "<li>I dont know what the fuck it is</li>"+
                "<li>Ñam</li>";

        break;
    }
}

function myHover(element)
{
    var areaClass=element.getAttribute("class");
    switch (areaClass)
    {
        case 'tree1':
            drawImage("tree1")
            refreshText("tree1");
            break;
        case "plant1":
            drawImage("plant1");
            refreshText("plant1");
            break;
    }
}

function myLeave()
{
    var canvas = byId('myCanvas');
    //Clear all canvas when stop hovering over
    hdc.clearRect(0, 0, canvas.width, canvas.height);
}

function drawImage(imageId){
    //Draw the image specified by the id
    var image=document.getElementById(imageId);
    image.style.visibility="visible";
    //Draw it on the center of the canvas
    hdc.drawImage(image,can.width/4,can.height/4,image.width,image.height);

}

function resizeAreas(newWidth,newHeigth){
    const imageMap = document.getElementById('laurelesMap');
    var coordinates=0;
    // 2. Get all <area> elements within the map
    const areas = imageMap.getElementsByTagName('area');
    for (var i=0;i<areas.length;i++){
        coordinates=areas[i].coords;

        var scale=can.width/originalValues.width;
        
        var newCords=originalValues.coords[i][0]*scale
            +","+originalValues.coords[i][1]*scale
            +","+originalValues.coords[i][2]*scale;
        areas[i].setAttribute("coords",newCords);
    }
}

function resizeImageAndCanvas(){    
    //Rezising image
    //Get base image
    var img = byId('PLANTAlaureles');

    //By default lets set its heigth to auto, to mantain ratio
    img.setAttribute("height","auto");

    var winWidth = window.innerWidth;
    var winHeight= window.innerHeight;
    
    //And its width to match the windows
    img.width=winWidth;

    //If in dosnt fit in Y
    if(img.height>winHeight-100){
        //Adjust heigth so it does
        img.setAttribute("width","auto")
        img.height=winHeight-100;
    }

    
    //Resizing canvas to match base image
    var x,y, w,h;

    // get it's position and width+height
    x = img.offsetLeft;
    y = img.offsetTop;
    w = img.clientWidth;
    h = img.clientHeight;


    // move the canvas, so it's contained by the same parent as the image
    var imgParent = img.parentNode;
    
    imgParent.appendChild(can);

    // place the canvas in front of the image
    can.style.zIndex = 1;

    // position it over the image
    can.style.left = x+'px';
    can.style.top = y+'px';

    // make same size as the image
    can.setAttribute('width', w+'px');
    can.setAttribute('height', h+'px');


    //Lastly, resize the areas of the imagmap
    resizeAreas(img.width,img.height);
}

//Used for resizing the imagmap areas
function getOriginalValues(){
    var img = byId('PLANTAlaureles');
    originalValues.width=img.width;
    originalValues.height=img.height;
    const imageMap = document.getElementById('laurelesMap');
    const areas = imageMap.getElementsByTagName('area');
    for (var i=0;i<areas.length;i++){
        originalValues.coords[i]=areas[i].coords.split(",");
    }
}

function myInit()
{
    //Load original value variable for sizing
    getOriginalValues();

    //Adjust image (=> canvas => context) to window size
    window.addEventListener('resize', function(event) {
        // Code to run when the window is resized
        const newWidth = window.innerWidth; // Get current window width
        const newHeight = window.innerHeight; // Get current window height
        resizeImageAndCanvas();
    });

    //Get the canvas
    can = byId('myCanvas');

    // get it's context
    hdc = can.getContext('2d');


    //Resize it once when ititializationg
    resizeImageAndCanvas();
}