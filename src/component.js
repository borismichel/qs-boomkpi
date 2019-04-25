import $ from "jquery";
import "./styles.css";
import p5 from "p5/lib/p5.js";
import {defineHTML} from "./lib/html/divDefinition";
import Particle from "./lib/sketch/ptcl";


export function main($element, layout) {
    var p;
    var grvt;
    var font;
    var boomName = (!layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText) ? "Firewords!" : layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
    var rockets = [];
    // const maxValue = layout.qHyperCube.qMeasureInfo[0].qMax;
    let divName = "Firewords";//+ Date.now();

    $element.empty();
    defineHTML($, $element, divName);
    let sketch = null;

    sketch = (sk) => {
        sk.preload = () => {
            preloadFont(sk);
        };
        sk.setup = () => {
            console.log(window.location.search.slice(1));
            sk.colorMode(sk.HSB, 255);
            sk.createCanvas($element[0].offsetWidth, $element[0].offsetHeight).parent(divName);
            grvt = sk.createVector(0, 0.18);
        };
        sk.draw = () => {
            sk.background(0, 15);
            if (sk.random(1) < 0.015) {
                rockets.push(new Particle(sk, sk.createVector(sk.width/2, sk.height-3), sk.createVector(0, (-12*(sk.height/600))).rotate(sk.random(-sk.PI/8, sk.PI/8)), true, grvt, boomName, font));
            }
            for (let i=0; i<rockets.length; i++) {
                rockets[i].update();
                rockets[i].show();
            }
        };
    };
    if (!p) {
        p = new p5(sketch);
    }

    function preloadFont(p) {
        font = p.loadFont("/content/default/Sniglet-ExtraBold.ttf");
    }
}

