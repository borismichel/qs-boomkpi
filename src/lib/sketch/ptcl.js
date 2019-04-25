class Particle {
    constructor(p, initialPos, intialVel, rocket, gravity, boomName, font){
        this.pos = initialPos; //createVector(width/2, height-3)
        this.acc = p.createVector(0, 0);
        this.vel = intialVel; //createVector(0, -8);
        this.color= p.random(255);
        this.rocket = rocket;
        this.boom = false;
        this.p = p;
        this.grvt = gravity;
        this.boomName = boomName;
        this.font = font;
    }

    show() {
        this.p.fill(this.p.color(this.color, 200, 255));
        this.p.stroke(this.p.color(this.color, 200, 255));
        this.p.noStroke();
        if(this.rocket&&!this.boom) {
            this.p.ellipse(this.pos.x, this.pos.y, 5);
        } else {
            this.boom.show();
        }
        
    }

    update() {
        this.applyForce(this.grvt);
        this.vel.add(this.acc);
        if (this.vel.y >=0&&this.rocket&&!this.boom) {
            this.boom = new NamesPlosion(this.p, this.pos.x, this.pos.y, this.boomName, this.color, this.grvt, this.font);
        }
        this.pos.add(this.vel);
        this.acc.setMag(0);
        if (this.boom) {
            this.boom.update();
        }
    }

    applyForce(vF) {
        this.acc.add(vF);
    }


}

class NamesPlosion {
    constructor(p, x, y, name, color, grvt, font){
        this.p = p;
        this.pos = p.createVector(x, y);
        this.acc = p.createVector(0, 0);
        this.pV = [];
        this.vV = [];
        this.maxX = 0;
        this.maxY = 0;
        this.lifespan = 255;
        this.particles = [];
        this.color = color;
        this.grvt = grvt;
        this.font = font;
        var pts = font.textToPoints(name, 0, 0, 100*p.width/800);
        for (let i=0; i < pts.length; i++) {
            this.maxX = (this.maxX > pts[i].x) ? this.maxX : pts[i].x;
            this.maxY = (this.maxY > pts[i].y) ? this.maxY : pts[i].y;
        }
        for (let i=0; i < pts.length; i++) {
            this.vV.push(p.createVector((pts[i].x-(this.maxX/2))/20, (pts[i].y-(this.maxY/2))/20));
            this.pV.push(p.createVector(x, y));
        }
    }

    show() {
        if (this.lifespan>-20) {
            this.lifespan -= 3.5;
            for(let i=0; i < this.pV.length; i++) {
                // ellipse(this.pV[i].x, this.pV[i].y, this.lifespan/5)
                this.p.strokeWeight(5);
                this.p.stroke(this.color, 255, 255, this.lifespan);
                this.p.point(this.pV[i].x, this.pV[i].y);
            }
        }
    }

    update() {
        if (this.lifespan>-20) {
            for(let i=0; i < this.pV.length; i++) {
                this.applyForce(this.grvt);
                this.vV[i].add(this.acc);
                this.pV[i].add(this.vV[i].mult(this.p.random(0.94, 0.95)));        
                this.acc.setMag(0);
            }
        }

    }
    
    applyForce(vF) {
        this.acc.add(vF);
    }
}

export default Particle;