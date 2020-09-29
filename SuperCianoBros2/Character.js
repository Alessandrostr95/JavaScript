class Character {
    constructor(G) {
        this.peso = 0;
        this.nodo = G.nodi[0];
        this.ang = 0;
    }

    move( dir ) {
        if( dir === UP_ARROW && this.nodo.vicini.top != null ) {
            if( this.peso <= this.nodo.vicini.top.peso ) {
                //console.log("UP");
                this.nodo = this.nodo.vicini.top.nodo;
            } 
        }
        else if( dir === RIGHT_ARROW && this.nodo.vicini.right != null ) {
            if( this.peso <= this.nodo.vicini.right.peso ) {
                //console.log("RIGTH");
                this.nodo = this.nodo.vicini.right.nodo;
            } 
        }
        else if( dir === DOWN_ARROW && this.nodo.vicini.bot != null  ) {
            if( this.peso <= this.nodo.vicini.bot.peso ) {
                //console.log("DOWN");
                this.nodo = this.nodo.vicini.bot.nodo;
            }
        }
        else if( dir === LEFT_ARROW && this.nodo.vicini.left != null ) {
            if( this.peso <= this.nodo.vicini.left.peso ) {
                //console.log("LEFT");
                this.nodo = this.nodo.vicini.left.nodo;
            }
        }

        if( typeof(this.nodo.type) == "number" ) {
            this.peso = this.nodo.type;
        }

    }

    show() {
        const pos = this.nodo.pos;
        rectMode(CENTER);
        //fill(255, 153, 51);
        fill('orange');
        stroke('purple');
        push();
        translate(pos.x, pos.y);
        rotate(this.ang);
        //rect(0, 0, 30);
        ellipse(0, 0, 45, 45);
        this.ang += 0.1;
        strokeWeight(6);
        textSize(36);
        fill(255,215,0);
        text('C',-13,13);
        pop();
    }
}