class Nodo {
    constructor(x, y, contenuto) {
        this.pos = createVector(x, y);
        if(contenuto) {
            this.contenuto = contenuto;
        }
        this.vicini = {};
        this.type = "empty";
    }

    show() {
        fill(255);
        stroke(0);
        strokeWeight(3);
        circle(this.pos.x, this.pos.y, 40);

        switch(this.type) {
            case "empty":
                break;
            case "start":
                fill('red');
                noStroke();
                circle(this.pos.x, this.pos.y, 40);
                break;
            case "stop":
                fill('red');
                noStroke();
                circle(this.pos.x, this.pos.y, 40);
                break;
            case 1:
                fill('green');
                noStroke();
                circle(this.pos.x, this.pos.y, 20);
                break;
            case 2:
                fill('blue');
                noStroke();
                circle(this.pos.x, this.pos.y, 20);
                break;
            case 3:
                fill('yellow');
                noStroke();
                circle(this.pos.x, this.pos.y, 20);
                break;                        
        }
    }
}