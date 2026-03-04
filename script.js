
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
        title:"Borde pileta",
        img:"./images/fotos/A.jpg",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    B:{
        title:"Borde pileta",
        img:"./images/fotos/B.jpg",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    C:{
        title:"Cantero",
        img:"./images/fotos/C.png",
        text:"<li>Herbaceas</li>"
                +"<li>Gramineas</li>"
                +"<li>Cortaderas</li>",
    },

    D:{
        title:"Costado del camino",
        img:"./images/fotos/D.png",
        text:"<li>Gramineas</li>"
                +"<li>Salvia</li>"
                +"<li>Lavanda</li>",
    },

    D1:{
        title:"Herbaceas y salvias",
        img:"./images/fotos/D1.png",
        text:"<li>Gramineas altas</li>"
                +"<li>Delante varias herbaceas</li>",
    },

    E:{
        title:"Vista borde completo en pendiente",
        img:"./images/fotos/E.png",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },

    K:{
        title:"Cortaderas",
        img:"./images/fotos/K.png",
        text:"<li>Aca se pude agregar descripciones</li>"
                +"<li>O mas data, si pensas que hace falta</li>",
    },


    J:{
        title:"Canteros",
        img:"./images/fotos/J.png",
        text:"<li>Gramineas</li>"+
                "<li>Salvias</li>",
             
    },

    F:{
        title:"Cantero",
        img:"./images/fotos/F.png",
        text:"<li>Gramineas</li>",
    },
//----------------------------------------------------------------------------------
    O:{
        title:"Arboles Frutales",
        img:"./images/fotos/O.png",
        text:"<li>Ciruelo - Manzano</li>"
                +"<li>Higuera - Damasco</li>",
    },

    P:{
        title:"Cortina para vientos",
        img:"./images/fotos/P.png",
        text:"<li>Arboles que hacen de barrera</li>"
                +"<li>Casuarinas - Tuyas</li>"
                +"<li>Eucalyptus - Cypres - Leyland</li>",

    },

    M:{
        title:"Maceteros",
        img:"./images/fotos/M.png",
        text:"<li>Hiedras y vincas</li>",
    },

    H:{
        title:"Pergola",
        img:"./images/fotos/H.png",
        text:"<li>Amphelops - Glicina</li>"
                +"<li>Ipomeas - Jazmin</li>"
                +"<li>Rosa trepadora - Santa rita</li>",
    },

    X:{
        title:"Flores",
        img:"./images/fotos/X.png",
        text:"<li>Agaves azules</li>",
    },
}


// shorthand func
function byId(e){return document.getElementById(e);}

// takes a string that contains coords eg - "227,307,261,309, 339,354, 328,371, 240,331"
// draws a line from each co-ord pair to the next - assumes starting point needs to be repeated as ending point.

function myHover(element)
{
    var areaClass=element.getAttribute("class");
    console.log(areaClass);
    switch (areaClass)
    {
        case 'X':
            refreshData(dataBase.X);
        break;
        case 'M':
            refreshData(dataBase.M);
        break;
        case 'P':
            refreshData(dataBase.P);
        break;
        case 'O':
            refreshData(dataBase.O);
        break;
        case 'H':
            refreshData(dataBase.H);
        break;
        case 'F':
            refreshData(dataBase.F);
        break;
        case 'J':
            refreshData(dataBase.J);
        break;
        case 'K':
            refreshData(dataBase.K);
        break;
     
        case 'E':
            refreshData(dataBase.E);
        break;
        
        case 'D1':
            refreshData(dataBase.D1);
        break;
        case 'D':
            refreshData(dataBase.D);
        break;
        case 'C':
            refreshData(dataBase.C);
            break;
        case "B":
            refreshData(dataBase.B);
        break;
        case 'A':
            refreshData(dataBase.A);
        break;
    }
}

function myLeave()
{
    var canvas = byId('myCanvas');
    //Clear all canvas when stop hovering over
    hdc.clearRect(0, 0, canvas.width, canvas.height);
    clearData();
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

function clearData(){
    var title=document.getElementById("dataTitle");
            title.innerHTML="";

            var textImage=document.getElementById("dataImage1");
            textImage.setAttribute("src","");

            var infoList=document.getElementById("dataList");
            infoList.innerHTML=""; 
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