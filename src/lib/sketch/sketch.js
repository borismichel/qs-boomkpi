var p;
var grvt;
var font;
var path;
var boomName = (!window.location.search.slice(1)) ? 'Firewords!' : decodeURIComponent(window.location.search.slice(1));
var rockets = [];

function preload() {
    font = loadFont('../assets/Sniglet-ExtraBold.ttf');
}

function setup() {
    console.log(window.location.search.slice(1));
    colorMode(HSB, 255);
    createCanvas(800, 600)
    grvt = createVector(0, 0.18);
}

function draw() {
    background(0, 15);
    if (random(1) < 0.015) {
        rockets.push(new Particle(createVector(width/2, height-3), createVector(0, -12).rotate(random(-PI/8, PI/8)), true));
    }
    for (i=0; i<rockets.length; i++) {
        rockets[i].update();
        rockets[i].show();
    }
}

