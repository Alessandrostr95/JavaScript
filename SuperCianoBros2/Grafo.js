class Grafo {
    constructor() {
        this.serial = 0;
        this.nodi = [];
        this.archi = [];
    }

    /**
     * @param [nodi]
     */
    add(nodes){
        for(let nodo of nodes){
            this.nodi.push(nodo);
            nodo.id = this.serial++;
        }
    }

    attacca(nodoA, nodoB, peso=5){
        this.archi.push(new Arco(nodoA, nodoB, peso));
        if(nodoA.pos.x == nodoB.pos.x) {
            //A e B sono in colonna
            if(nodoA.pos.y > nodoB.pos.y){
                //B sta sopra A
                nodoA.vicini.top = {nodo:nodoB, peso:peso};
                nodoB.vicini.bot = {nodo:nodoA, peso:peso};
            } else {
                //A sta sopra B
                nodoA.vicini.bot = {nodo:nodoB, peso:peso};
                nodoB.vicini.top = {nodo:nodoA, peso:peso};
            }
        } else {
            //A e B sono in riga
            if(nodoA.pos.x > nodoB.pos.x) {
                //A sta a destra di B
                nodoA.vicini.left = {nodo:nodoB, peso:peso};
                nodoB.vicini.right = {nodo:nodoA, peso:peso};
            } else {
                //A sta a sinistra di B
                nodoA.vicini.right = {nodo:nodoB, peso:peso};
                nodoB.vicini.left = {nodo:nodoA, peso:peso};
            }
        }
    }

    show() {
        //console.log(this.archi);
        //console.log(this.nodi);
        for(let arco of this.archi) {
            arco.show();
        }
        for(let nodo of this.nodi) {
            nodo.show();
        }
    }
}