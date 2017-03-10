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

var teapotX;
var teapotY;
var teapotZ;
/* Parameters, Variables */
var gravityX;           /* X component of Gravity in m/S2 */
var gravityY;           /* Y component of Gravity in m/S2 */
var bow;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
// camera
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 500;
var distance_from_mirror;

function myTeapotDrag(element, newpos)
{

    // PIEaddElement(line);

}

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


function initialiseControls() {
    initialiseControlVariables();
    /* Create Input Panel */
    // PIEaddDisplaySlider("Distance from Mirror", 1.5, 0.82, 2.14, 0.01);

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
    helpContent = helpContent + "<p>The experiment shows two type of rulers. User can drag and rotate them and measure length and breadth of different objects. User can note down their observation in table provided on top right corner.</p>";
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
var frame;
// function callbackMirrorLoad() {
//     verticalMirror = new THREE.Mirror( PIErenderer, PIEcamera, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color:0x889999 } );
//     var verticalMirrorMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 1.5 ), verticalMirror.material );
//     verticalMirrorMesh.add( verticalMirror );
//     verticalMirrorMesh.position.y = 1.8;
//     verticalMirrorMesh.position.x = 3;
//     verticalMirrorMesh.position.z = -1.5;
//     var geometry = new THREE.BoxGeometry( 2.2, 1.7, 0.001);
//     var material = new THREE.MeshLambertMaterial( {color: 0x4E342E} );
//     frame  = new THREE.Mesh( geometry, material );
//     frame.position.set(3,1.8,-1.6);
//     PIEaddElement(frame);
//     PIEscene.add( verticalMirrorMesh );
//     distance_from_mirror=1.5;
//     console.log(distance_from_mirror);
//     PIEstartAnimation();
// }
var chessboard;
var table;
var teapot;
var meters_ruler;
var feet_ruler;
var cube;
function loadExperimentElements()
{
    planeGeo = new THREE.PlaneBufferGeometry( 100.1, 100.1 );
    var obj1=document.createElement("li");
    obj1.style="height:180px;";
    obj1.innerHTML="<table cellspacing='5px'><tbody><tr><th>Objects</th><th>breadth in cm</th><th>length in cm</th><th>breadth in inches</th><th>length in inches</th></tr><tr><th>Ball</th><td><input size='2'></td><td><input size='2'></td><td><input size='2'></td><td><input size='2'></td></tr><tr><th>Ball</th><td><input size='2'></td><td><input size='2'></td><td><input size='2'></td><td><input size='2'></td></tr><tr><th>Ball</th><td><input size='2'></td><td><input size='2'></td><td><input size='2'></td><td><input size='2'></td></tr></tbody></table>";
    document.getElementsByClassName("dg main a")[0].children[1].appendChild(obj1);
var material;
var loader;
var texture;
    PIEsetExperimentTitle("Position of the image");
    PIEsetDeveloperName("Navneet Nandan");
    PIEhideControlElement();
    loader = new THREE.ObjectLoader();
    // loadScript("https://threejs.org/examples/js/Mirror.js",callbackMirrorLoad);

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();
    loader.load('https://raw.githubusercontent.com/NavneetNandan/MirrorActivity/master/Experiment/table-0001.json',function (obj) {
        table=obj;
        table.position.set(3,-0.18,0);

        PIEaddElement(table)
    });
    var geometry_meter_ruler = new THREE.BoxGeometry(0.3,2, 0.05);
    var material_meter_ruler = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('https://raw.githubusercontent.com/NavneetNandan/rulerActivity/master/Experiment/15cm.png')});
    meters_ruler = new THREE.Mesh(geometry_meter_ruler, material_meter_ruler);
    meters_ruler.position.set(4.3,1.5,0.25);
    meters_ruler.rotateX(-Math.PI/2);
    meters_ruler.castShadow = false;
    meters_ruler.receiveShadow = false;
    PIEdragElement(meters_ruler);
    PIEaddElement(meters_ruler);
    var geometry_feet_ruler = new THREE.BoxGeometry(0.3,2.05, 0.05);
    var material_feet_ruler = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture('https://raw.githubusercontent.com/NavneetNandan/rulerActivity/master/Experiment/f6.jpg')});
    feet_ruler = new THREE.Mesh(geometry_feet_ruler, material_feet_ruler);
    feet_ruler.position.set(4.65,1.5,0.25);
    feet_ruler.rotateX(-Math.PI/2);
    feet_ruler.castShadow = false;
    feet_ruler.receiveShadow = false;
    PIEdragElement(feet_ruler);
    PIEaddElement(feet_ruler);
    loader.load("https://raw.githubusercontent.com/NavneetNandan/MirrorActivity/master/Experiment/teapot-claraio.json", function (obj) {
        teapot = obj;
        teapot.position.set(3.4,1.5,1.25);
        teapot.scale.x=0.4;
        teapot.scale.y=0.4;
        teapot.scale.z=0.4;
        teapot.rotateX(-Math.PI/2);
        PIEaddElement(teapot);
        PIEdragElement(teapot);

    });
    loader.load("https://raw.githubusercontent.com/NavneetNandan/PIEshadow/master/sampleExperiment/sampleExperiment/rubiks-cube.json?token=AKRkIv1xy4V3T-N784hWJLAY5B86iYnBks5YsQ2wwA%3D%3D",function (obj) {
        cube = obj;
        cube.position.set(1.5+0.5,1.5,0.25)
        cube.scale.x = 0.05;
        cube.scale.y = 0.05;
        cube.scale.z = 0.05;
        PIEdragElement(cube);
        PIEaddElement(cube);
    });
    var myBall;
    myBall = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshLambertMaterial({color:0xededed}));
    myBall.position.set(3.8,1.5,-0.5);
    PIEdragElement(myBall);
    PIEaddElement(myBall);

    myBall.castShadow = true;
    // tab
    // PIEaddElement(cube);
    // var img = new THREE.MeshLambertMaterial({
    //     map:THREE.ImageUtils.loadTexture('rinG8A7qT.gif')
    // });
    // var geometry=new THREE.BoxGeometry(20,20,50);
    // var box=new THREE.Mesh(geometry,img);
    // box.position.set(arrowX,arrowY,arrowZ);
    // PIEaddElement(box);
    /* Create Ball and add it to scene */
    // arrow = new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), new THREE.MeshLambertMaterial({color:0xededed}));
    // arrow.position.set(arrowX, arrowY, myBallZ);
    // arrow.castShadow = true;
    // arrow.receiveShadow = true;
    // PIEaddElement(arrow);
    /* Allow Dragging of the ball */


    /* Initialise Wall variables */
    /* All walls extend beynd the room size in both directions */
    /* Floor */
    // loader = new THREE.TextureLoader();
    // texture = loader.load( '../PIE/images/hardwood2_diffuse.jpg' );
    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 25, 25 );
    // texture.anisotropy = 16;
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
    // geometry = new THREE.PlaneBufferGeometry( mySceneW * 2, backB * 2 );
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
    PIEcamera.position.x+=0.5
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
    setTimeout(PIEstartAnimation, 500);
    PIEscene.remove(PIEspotLight);
    /* initialise Other Variables */
    initialiseOtherVariables();
    // PIEaddElement(line);


    // var light1= new THREE.PointLight(0xffffff, 1, 0, 0);
    // light1.position.set(3,2,0.5);
    // PIEscene.add(light1);

    document.getElementsByClassName("dg main a")[1].style.width="280px";
    document.getElementsByClassName("dg main a")[0].style.width="280px";
    /* Reset Wall position */
    /* Floor */
    myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    /* Ceiling */
    myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    /* Left */
    myLeft.position.set(leftB-(wallThickness/2)-1, myCenterY, 0.0);
    /* Right */
    myRight.position.set(rightB+(wallThickness/2)+1, myCenterY, 0.0);
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

    // PIEambientLight.castShadow=true;
    PIErender();
    PIEstopAnimation();

    document.getElementsByClassName("dg main a")[1].style.width="280px";
    document.getElementsByClassName("dg main a")[0].style.width="280px";
}

/******************* Update (animation changes) code ***********************/
