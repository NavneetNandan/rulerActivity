/* Global Variables */
/* the developer should define variables and constants here */
/* We define a room with 3 walls, floor and ceiling */
/* We define a ball which bounces in the xy plane */
/* We define modifiable prameters : gravity, ball size, initial velocity */
/* We support draggable ball */
/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Room Objects */
var myFloor;            /* Floor */
var myCeiling;          /* Ceiling */
var myBack;             /* Back */
var myRight;            /* Right */
var myLeft;             /* Left */

/* Ball variables */
var myBallRadius;       /* Radius */
var object_position_x;
var object_position_y;
var object_position_z;
/* Parameters, Variables */
var gravityX;           /* X component of Gravity in m/S2 */
var gravityY;           /* Y component of Gravity in m/S2 */
var bow;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

function inArray(value, array) {
    for (var i = 0; i < array.length; i++) {
        if (value == array[i])
            return true;
    }
    return false;
}

function updateInitialVelocity() {
}
/******************* End of Interaction functions ***********************/

/******************* GUI control objects code ***********************/


function handleZrotationmeter(newValue) {
    meters_ruler.rotation.z=newValue/180*Math.PI;
    PIErender();
}

function handleZrotationfeet(newValue) {
    feet_ruler.rotation.z=newValue/180*Math.PI;
    PIErender();
}

function initialiseControlVariables() {
    /* Labels */
}

function addButtonToControls(text) {
    var button=document.createElement("button");
    button.setAttribute("id", text);
    button.setAttribute("class", "objects");
    button.setAttribute("style","margin-left: 5px;");

    button.innerHTML = text;
    document.getElementById("object_selection_list").appendChild(button);
}
function initialiseControls() {
    initialiseControlVariables();
    var list=document.createElement("li");
    list.setAttribute("id","object_selection_list");
    document.getElementsByClassName("dg main a")[0].children[1].appendChild(list);
    addButtonToControls("Ball");
    addButtonToControls("Cube");
    addButtonToControls("Teapot");
    addButtonToControls("Arrow");
    addButtonToControls("Music Player");

    document.getElementById("Ball").onclick=function () {
      createAndAddBall();
    };
    document.getElementById("Cube").onclick=function () {
      createAndAddCube();
      PIErender();
    };
    document.getElementById("Teapot").onclick=function () {
      createAndAddTeapot();
      PIErender();
    };
    document.getElementById("Arrow").onclick=function () {
      createAndAddArrow();
      PIErender();
    };

    document.getElementById("Music Player").onclick=function () {
      createAndAddMusicPlayer();
      PIErender();
    };
    PIEaddInputSlider("Rotate Meter Scale", 0, handleZrotationmeter, -180, 180, 1);
    PIEaddInputSlider("Rotate Feet Scale", 0, handleZrotationfeet, -180, 180, 1);
    /* Create Display Panel */
}


/******************* End of GUI control objects code ***********************/

/******************* Load Experiment objects code ***********************/

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows two type of rulers. User can drag and rotate them and measure length and breadth of different objects. User can select objects by clicking on buttons on control section</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>User can rotate both rulers using controller on top right corner.</p>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>Show a meter scale and a foot scale. Allow students to place (drag and rotate) the scale across various objects placed on the screen and note their lengths in meters/cm and feet/inches.</p>";
    PIEupdateInfo(infoContent);
}

function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 3.0;
    mySceneBRX = 6.0;
    mySceneBRY = 0.0;
    object_position_x=2.964652908993941;
    object_position_y=1.5;
    object_position_z=0.26;

    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    arrowZ    = -2.0;
}

function initialiseOtherVariables()
{
    /* Initialise variables */
    myBallRadius = 0.6;
    wallThickness =  0.20;

    /* Gravity */
    gravityX = 0.0;
    gravityY = -9.8;

    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
var planeGeo ;
var table;
var teapot;
var meters_ruler;
var feet_ruler;
var cube;
var current;
var myBall;
var loader;
var musicplayer;
function createAndAddTeapot() {
    loader.load("teapot-claraio.json", function (obj) {
        if(current!=null){
            PIEscene.remove(current);
        }
        teapot = obj;
        teapot.position.set(object_position_x, object_position_y, object_position_z);
        teapot.scale.x = 0.4;
        teapot.scale.y = 0.4;
        teapot.scale.z = 0.4;
        teapot.rotateX(-Math.PI / 2);
        current=teapot;
        PIEaddElement(teapot);
        teapot.castShadow = false;
        PIEdragElement(teapot);
        PIErender();
    });
}
function createAndAddArrow() {
    loader.load("sun-dial-arrow.json", function (obj) {
        if(current!=null){
            PIEscene.remove(current);
        }
        arrow = obj.children[0];
        arrow.position.set(object_position_x, object_position_y, object_position_z);
        arrow.scale.x = 0.8;
        arrow.scale.y = 0.8;
        arrow.scale.z = 0.8;
        arrow.rotateY(-Math.PI / 2);
        // arrow.rotateZ(-Math.PI / 2);
        arrow.rotateX(-Math.PI / 2);
        current=arrow;
        PIEaddElement(arrow);
        arrow.castShadow = false;
        PIEdragElement(arrow);
        PIErender();
    });
}
function createMusicPlayer() {
    loader.load("cassette-player.json", function (obj) {
        musicplayer = obj;
        musicplayer.position.set(object_position_x, object_position_y, object_position_z);
        musicplayer.scale.x = 0.02;
        musicplayer.scale.y = 0.02;
        musicplayer.scale.z = 0.02;
        musicplayer.rotateY(-Math.PI);
        // musicplayer.rotateZ(-Math.PI / 2);
        musicplayer.rotateX(Math.PI / 2);
        musicplayer.castShadow = false;
        console.log("af");
        return musicplayer;
        // PIEdragElement(musicplayer);
    });
}
function createAndAddMusicPlayer() {
    if (current != null) {
        PIEscene.remove(current);
    }
    if(musicplayer!=null) {
        PIEaddElement(musicplayer);
        current = musicplayer;
        PIErender();
    }else{
        setTimeout(createAndAddMusicPlayer, 500);
    }
}
function createAndAddCube() {
    loader.load("rubiks-cube.json", function (obj) {
        if (current != null) {
            PIEscene.remove(current);
        }
        cube = obj;
        cube.position.set(object_position_x, object_position_y, object_position_z);
        cube.scale.x = 0.05;
        cube.scale.y = 0.05;
        cube.scale.z = 0.05;
        PIEdragElement(cube);
        PIEaddElement(cube);
        current = cube;
        cube.castShadow = false;
        cube.receiveShadow = false;
        PIErender();
    });
}
function createAndAddBall() {
    console.log("a");
    if (current != null) {
        console.log("b");
        PIEscene.remove(current);
    }
    myBall = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshLambertMaterial({color: 0xededed}));
    myBall.position.set(object_position_x,object_position_y,object_position_z);
    PIEdragElement(myBall);
    PIEaddElement(myBall);
    current=myBall;
    myBall.castShadow = false;
    PIErender();
}
function loadExperimentElements()
{
    planeGeo = new THREE.PlaneBufferGeometry( 100.1, 100.1 );
    var material;
    var texture;
    PIEsetExperimentTitle("The standard scales");
    PIEsetDeveloperName("Navneet Nandan");
    PIEhideControlElement();
    loader = new THREE.ObjectLoader();
    musicplayer=createMusicPlayer();

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();
    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();
    // loader.load('https://raw.githubusercontent.com/NavneetNandan/MirrorActivity/master/Experiment/table-0001.json',function (obj) {
    loader.load('table-0001.json',function (obj) {
        table=obj;
        table.position.set(3,-0.18,0);

        PIEaddElement(table)
    });
    var geometry_meter_ruler = new THREE.BoxGeometry(0.3,2, 0.05);
    var material_meter_ruler = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('15cm.png')});
    meters_ruler = new THREE.Mesh(geometry_meter_ruler, material_meter_ruler);
    meters_ruler.rotateX(-Math.PI/2);
    PIEdragElement(meters_ruler);
    PIEaddElement(meters_ruler);

    meters_ruler.castShadow = false;
    meters_ruler.receiveShadow = false;
    var geometry_feet_ruler = new THREE.BoxGeometry(0.3,2.05, 0.05);
    var material_feet_ruler = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('f6.jpg')});
    feet_ruler = new THREE.Mesh(geometry_feet_ruler, material_feet_ruler);
    feet_ruler.rotateX(-Math.PI/2);
    PIEdragElement(feet_ruler);
    PIEaddElement(feet_ruler);
    feet_ruler.castShadow = false;
    feet_ruler.receiveShadow = false;

    // loader.load("https://raw.githubusercontent.com/NavneetNandan/MirrorActivity/master/Experiment/teapot-claraio.json", function (obj) {
    // createAndAddTeapot(loader);
    // loader.load("https://raw.githubusercontent.com/NavneetNandan/PIEshadow/master/sampleExperiment/sampleExperiment/rubiks-cube.json?token=AKRkIv1xy4V3T-N784hWJLAY5B86iYnBks5YsQ2wwA%3D%3D",function (obj) {
    // createAndAddCube(loader);
    // createAndAddBall();
    geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100);
    material = new THREE.MeshLambertMaterial( {color: 0x4E342E} );
    myFloor  = new THREE.Mesh( geometry, material );
    // myFloor.lookAt(new THREE.Vector3(0,1,0));
    myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    myFloor.receiveShadow = true;
    PIEaddElement(myFloor);
    /* Ceiling */
    geometry = new THREE.BoxGeometry( 100, wallThickness, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0x2196F3} );
    myCeiling = new THREE.Mesh( geometry, material );
    myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    myFloor.receiveShadow = true;
    // PIEaddElement(myCeiling);
    /* Left */
    geometry = new THREE.BoxGeometry( wallThickness, 100, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0x4CAF50} );
    myLeft = new THREE.Mesh( geometry, material );
    myLeft.position.set(leftB-(wallThickness), myCenterY, 0.0);
    myLeft.receiveShadow = true;
    PIEaddElement(myLeft);
    /* Right */
    geometry = new THREE.BoxGeometry( wallThickness, 100, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0x4CAF50} );
    myRight = new THREE.Mesh( geometry, material );
    myRight.position.set(rightB+(wallThickness/2), myCenterY, 0.0);
    myRight.receiveShadow = true;
    PIEaddElement(myRight);
    // var light= new THREE.PointLight(0xffffff, 1, 0, 2);
    // light.position.set(3,4,-0.2);
    // PIEscene.add(light);
    /* Back */
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
    // geometry = new THREE.PlaneBufferGeometry( mySceneW * 2, mySceneH * 2 );

    /* Instantiate experiment controls */

    var planeFront = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x7f7fff } ) );
    planeFront.position.z = 2;
    planeFront.position.y = 0;
    planeFront.rotateY( Math.PI );
    PIEscene.add( planeFront );
    initialiseControls();
    /* Reset all positions */

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
    PIEcamera.position.y=6;
    PIEcamera.position.z-=5.2;
    PIEcamera.position.x+=0.5;
    // PIEcamera.position.set(7.5,2,2.5);
    PIEcamera.rotateX(-2*Math.PI/4);
    PIEscene.remove(PIEspotLight);
    // PIEcamera.rotateY(1.2*Math.PI/4);
    // PIEcamera.rotateOnAxis()
    resetExperiment();
    // document.getElementById('reset').click();


}

/******************* End of Load Experiment objects code ***********************/

/******************* Reset Experiment code ***********************/

/**
 * This function resets the position of all experiment elements to their default values.
 * <p>
 * This is called during initial document load.
 * This is also be called by the system provided reset button.
 * <p>
 * Apart from the position, this should also reset all variables which can be controlled by the user.
 * This function will also clear any output variables/graphs
 */
function resetExperiment()
{
    document.getElementsByClassName("dg main a")[1].style.width="340px";
    document.getElementsByClassName("dg main a")[0].style.width="340px";
    setTimeout(PIEstartAnimation, 1000);
    /* initialise Other Variables */
    initialiseOtherVariables();
    // PIEaddElement(line);
    meters_ruler.rotation.x=-1.5707963267948963;
    meters_ruler.rotation.y=0;
    meters_ruler.rotation.z=0;
    feet_ruler.rotation.x=-1.5707963267948963;
    PIEchangeInputSlider("Rotate Meter Scale",0);
    feet_ruler.rotation.y=0;
    feet_ruler.rotation.z=0;
    meters_ruler.position.set(4.3,1.5,0.25);
    feet_ruler.position.set(4.65,1.5,0.25);
    PIEchangeInputSlider("Rotate Feet Scale",0);
    if(current!=null) {
        PIEscene.remove(current);
    }
    // var light1= new THREE.PointLight(0xffffff, 1, 0, 0);
    // light1.position.set(3,2,0.5);
    // PIEscene.add(light1);
    /* Reset Wall position */
    /* Floor */
    myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    /* Ceiling */
    myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    /* Left */
    myLeft.position.set(leftB-(wallThickness/2)-1, myCenterY, 0.0);
    /* Right */
    myRight.position.set(rightB+(wallThickness/2)+1, myCenterY, 0.0);
    PIEadjustAnimationTime(1);
}

/******************* End of Reset Experiment code ***********************/

/******************* Update (animation changes) code ***********************/

/**
 * This function updates the location of all experiment elements during each animation frame.
 * <p>
 * The function receives both animation time as well as the dt (time difference) from last call.
 * This function is expected to implement the laws of physics to update the position.
 * This function will also update any output variables/graphs
 * <p>
 * Important Note : Boundary Events
 * <p>
 * During any physics simulation you will reach a boundary event.
 * In our case, the boundary even is the ball hitting any of the walls.
 * The boundary event typically changes the sign of velocity/acceleration.
 * The boundary event is most likely to happen in the middle of the two calls.
 * The library allows the experiment to change the simulation time by processing partial time.
 * This function can call a library function with the time remaining to be processed before exiting.
 * <p>
 * @param  t       The time in milliseconds elapsed since the beginning of animation cycle
 * @param  dt      The time in milliseconds elapsed since the last acll to this function
 */
function updateExperimentElements(t, dt)
{
    // PIEscene.remove(PIEspotLight);
    PIEspotLight.position.set(3,5,0.5);
    // PIEambientLight.intensity=1;
    PIEspotLight.castShadow=false;
    // PIEambientLight.castShadow=true;

    document.getElementsByClassName("dg main a")[1].style.width="340px";
    document.getElementsByClassName("dg main a")[0].style.width="340px";
    PIErender();
    PIEstopAnimation();
}

/******************* Update (animation changes) code ***********************/
