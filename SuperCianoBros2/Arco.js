class Arco {
    constructor(nodoA, nodoB, peso=0) {
        this.incidenti = [nodoA, nodoB];
        this.peso = peso;
    }

    show() {
        stroke(0);
        if(this.peso > 0) {
            strokeWeight(this.peso*2);
        } else {
            strokeWeight(1);
        }
        line(
            this.incidenti[0].pos.x,
            this.incidenti[0].pos.y,
            this.incidenti[1].pos.x,
            this.incidenti[1].pos.y
            );
        
        
        let pos;
        if(this.incidenti[0].pos.x == this.incidenti[1].pos.x) {
            //arco verticale
            pos = {
                x: this.incidenti[0].pos.x + 10,
                y: min(this.incidenti[0].pos.y, this.incidenti[1].pos.y) + 50
            };
        } else {
            //arco orizzontale
            pos = {
                x: min(this.incidenti[0].pos.x, this.incidenti[1].pos.x) + 50,
                y: this.incidenti[0].pos.y - 10
            };
        }
        
        noStroke();
        fill(0);
        textSize(18);
        text(this.peso, pos.x, pos.y);

    }
}