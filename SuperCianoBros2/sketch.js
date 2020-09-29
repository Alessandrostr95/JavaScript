let G;
let risoluzione = 100;
let SuperCiano;
let panelPeso;

function setup() {
    //createCanvas(windowWidth, windowHeight);
    createCanvas(1001,501);
    panelPeso = createP('P');
    G = new Grafo();
    frameRate(15);
    creaLabirinto(G);
    SuperCiano = new Character(G);
}

function draw() {
    background(150);
    G.show();
    SuperCiano.show();
    panelPeso.html("Peso: " + SuperCiano.peso);
    if( SuperCiano.nodo.type == 'stop' ){
        win();
    }
}

function win() {
    background(255, 150);
    textSize(72);
    fill(0);
    noStroke();
    text("YOU WIN!", width/2-180, height/2);
    textSize(28);
    text("SuperCiano e' riuscito a scappare con la pancia piena ;)", width/2-320, height/2+ 50);
    noLoop();
    //text("YOU WIN!")
}

function keyPressed() {
    SuperCiano.move(keyCode);
}


function creaLabirinto(G) {
    // inserisco i nodi a griglia
    for(let y = risoluzione; y < height; y += risoluzione) {
        for(let x = risoluzione; x < width; x += risoluzione) {
            let nodo = new Nodo(x-50, y-50);
            nodo.visitato = false;
            G.add([nodo]);
        }
    }

    //per ogni nodo definisco una lista con gli indici dei nodi adiacenti nella griglia
    for(let nodo of G.nodi){
        nodo.indiciVicini = vicini(nodo);
    }

    //definisco partenza e arrivo
    G.nodi[0].type = 'start';
    G.nodi[G.nodi.length-1].type = 'stop';

    let prob = [true, true, true, false, false];
    let colori = [1,1,1,2,2,3];

    //definisco dove si trova il cibo
    for(let i = 1; i < G.nodi.length-1; i++){
        shuffle(prob, true);
        if( !prob[0] ){
            shuffle(colori, true);
            G.nodi[i].type = colori[0];
        }
    }

    //visita in profondità per creare il labirinto
    let partenza = G.nodi[0];
    partenza.visitato = true;
    let pila = [partenza];

    
    while(pila.length != 0) {
        let u = pila.pop();

        if( u != null ){
            for( let indiceVicino of u.indiciVicini ) {
                console.log(u.id,indiceVicino);
                let v = G.nodi[indiceVicino];
                if( !v.visitato ) {
                    v.visitato = true;
                    G.attacca(u,v, pesoRandom());
                    pila.push(v);
                }
            }
        }
    }
    //console.log("Visita terminata");
    
    /*
    //in fine assegno i pesi agli archi in maniera casuale
    let pesi = [1,2,2,3,3,3,4,4,4,4];
    for(let arco of G.archi) {
        shuffle(pesi, true);
        arco.peso = pesi[0];
    }*/
    
}

function pesoRandom(){
    let pesi = [1,2,2,3,3,3,4,4,4,4];
    shuffle(pesi, true);
    return pesi[0];
}

 /*
  * Ritorna gli indici dei vicini dei nodi nella griglia
  */
function vicini(nodo) {
    let cols = floor(width/risoluzione);
    let rows = floor(height/risoluzione);
    let indiciVicini = [];
    //caso spigoli
    if( nodo.id == 0 ){
        console.log("alto-sinistra");
        indiciVicini = [1, cols];
    }
    else if( nodo.id == cols-1 ) {
        console.log("alto-destra");
        indiciVicini = [nodo.id-1, nodo.id+cols];
    }
    else if( nodo.id == cols*(rows-1) ) {
        console.log("basso-sinistra");
        indiciVicini = [nodo.id-cols, nodo.id+1];
    }
    else if( nodo.id == cols*(rows)-1 ) {
        console.log("basso-destra");
        indiciVicini = [nodo.id-1, nodo.id-cols];
    }

    //caso bordi
    else if( nodo.id > 0 && nodo.id < cols-1 ) {
        console.log("top");
        indiciVicini = [nodo.id-1, nodo.id+cols, nodo.id+1];
    }
    else if( nodo.id > cols*(rows-1) && nodo.id < cols*(rows)-1 ) {
        console.log("bot");
        indiciVicini = [nodo.id-1, nodo.id-cols, nodo.id+1];
    }
    else if( nodo.id%cols == 0 && nodo.id/cols > 0 && nodo.id/cols < rows-1 ) {
        console.log("left");
        indiciVicini = [nodo.id-cols, nodo.id+1, nodo.id+cols];
    }
    else if( (nodo.id+1)%cols == 0 && (nodo.id+1)/cols > 1  && (nodo.id+1)/cols < rows ) {
        console.log("rigth");
        indiciVicini = [nodo.id-cols, nodo.id-1, nodo.id+cols];
    }
    
    //tutti gli altri
    else {
        console.log("center");
        indiciVicini = [nodo.id-1, nodo.id-cols, nodo.id+1, nodo.id+cols];
    }
    
    return shuffle(indiciVicini);
}



