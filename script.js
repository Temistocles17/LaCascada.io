
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

var dataBase={
    A:{
        title:"Borde Pileta 1",
        img:"./images/fotos/A bordo pileta 1.jpg",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    B:{
        title:"Borde pileta 2",
        img:"./images/fotos/B bordo pileta.jpg",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    C:{
        title:"Variados de herbaceas, gramineas y cortaderas",
        img:"./images/fotos/C vista de cantero variado herbaceas , gramineas y cortadera.png",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    D:{
        title:"Graminia, salvia y lavanda",
        img:"./images/fotos/D vista de bordo de gramm salvia y lavanda, costeando camino.png",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    D1:{
        title:"Herbaceas y salvias",
        img:"./images/fotos/D1  bordo de herbaceas y salvias, equinaceas y lavandas delante.png",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    E:{
        title:"Vista borde completo en pendiente",
        img:"./images/fotos/E vista de bordo completo en pendiente.png",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    K1:{
        title:"Cortaderas",
        img:"./images/fotos/K1 cortadder.png",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    K2:{
        title:"Cortaderas",
        img:"./images/fotos/K2cortaderas.png",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    J:{
        title:"Canteros completos, salvias y gramineas",
        img:"./images/fotos/J canteros completos. atras gramm, salvias equinac ceanotus etc.png",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },
}


// shorthand func
function byId(e){return document.getElementById(e);}

// takes a string that contains coords eg - "227,307,261,309, 339,354, 328,371, 240,331"
// draws a line from each co-ord pair to the next - assumes starting point needs to be repeated as ending point.

function myHover(element)
{
    var areaClass=element.getAttribute("class");
    switch (areaClass)
    {

        case 'J':
            drawImage("J");
            refreshData(dataBase.J);
        break;
        case 'K2':
            drawImage("K2");
            refreshData(dataBase.K2);
        break;
        case 'K1':
            drawImage("K1");
            refreshData(dataBase.K1);
        break;
        case 'E':
            drawImage("E");
            refreshData(dataBase.E);
        break;
        case 'D1':
            drawImage("D1");
            refreshData(dataBase.D1);
        break;
        case 'D':
            drawImage("D");
            refreshData(dataBase.D);
        break;
        case 'C':
            drawImage("C");
            refreshData(dataBase.C);
            break;
        case "B":
            drawImage("B");
            refreshData(dataBase.B);
        break;
        case 'A':
            drawImage("A");
            refreshData(dataBase.A);
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
   
   /*
    //Draw the image specified by the id
    var image=document.getElementById(imageId);
    image.style.visibility="visible";
    //Draw it on the center of the canvas
    hdc.drawImage(image,can.width/4,can.height/4,image.width,image.height);
    */

}



function refreshData(X){
    
            console.log(X.title);
            var title=document.getElementById("dataTitle");
            title.innerHTML=X.title;

            var textImage=document.getElementById("dataImage1");
            textImage.setAttribute("src",X.img);

            var infoList=document.getElementById("dataList");
            infoList.innerHTML=X.text;
       
    
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

    var imgParent=img.parentElement;

    console.log(imgParent.offsetWidth);
    console.log(imgParent.offsetHeight);

    var iw=imgParent.offsetWidth
    var ih=imgParent.offsetHeight


    var winWidth = iw;
    var winHeight= ih;
    
    //And its width to match the windows
    img.width=winWidth-2;

    //If in dosnt fit in Y
    if(img.height>winHeight){
        //Adjust heigth so it does
        img.setAttribute("width","auto")
        img.height=winHeight;
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