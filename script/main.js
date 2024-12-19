let dim_y = 15;
let dim_x = 9;
let difficolta = 0;
let punteggio = 0;
let tempo;

let timerHandle;

function genera () {
    document.getElementById("punteggio").style.display = "block";
    document.getElementById("genera").style.display = "none";
    document.getElementById("difficolasceglibile").style.display = "none";
    document.getElementById("difficolasceglibilel").style.display = "none";
    document.getElementById("dimens").style.display = "none";
    document.getElementById("tempo").style.display = "none";
    document.getElementById("tempolabel").style.display = "none";
    tempo = document.getElementById("tempo").value;

    difficolta = (1 - parseFloat(document.getElementById("difficolasceglibile").value))*3; //in realtà è inversa
    dim_x = parseFloat(document.getElementById("dx").value);
    dim_y = parseFloat(document.getElementById("dy").value);
    if (Math.trunc(dim_x) == dim_x && Math.trunc(dim_y) == dim_y
        && !isNaN(dim_x) && !isNaN(dim_y)
        && dim_x>0 && dim_y>0
        && !isNaN(parseInt(tempo))) {
        dim_x = Math.trunc(dim_x);
        dim_y = Math.trunc(dim_y);
    } else {
        alert("Non valido");
        window.location.href = window.location.href;
    }
    let tabella = document.createElement("table");
    tabella.style.height = "85vh";
    tabella.style.width = "95vw";
    for (let y = 0; y<dim_y; y++) {
        let riga = document.createElement("tr");
        for (let x = 0; x<dim_x; x++) {
            let cella = document.createElement("td");
            let puls = document.createElement("button");

            cella.style.width = 1/dim_x*100 + "%";
            cella.style.height = 1/dim_y*100 + "%";

            puls.style.width = "100%";
            puls.style.height = "100%";
            puls.classList.add("pulstalpa");
            
            puls.dataset.x = x;
            puls.dataset.y = y;

            puls.id = `puls/${x}/${y}`;
            puls.onclick = function () {
                if (this.dataset.x == document.querySelector("table").dataset.x &&
                    this.dataset.y == document.querySelector("table").dataset.y
                ) {
                    punteggio++;
                    applicaAnimazione();
                    togliTalpa(this.dataset.x, this.dataset.y);
                } else if (punteggio > 0) {
                    punteggio--;
                }
                applicaPunteggio();
            };

            cella.appendChild(puls);
            riga.appendChild(cella);
        }
        tabella.appendChild(riga);
    }
    document.getElementById("gioco").appendChild(tabella);

    let timerHandle = impostaTimerFunz(turno, 1, 2.5);
    impostaTimerFunz(fine, tempo, tempo);
}

function impostaTimerFunz (funz, minSec, maxSec, ...args) { //... serve per convertire un array in argomenti separati da virgola. In questo caso serve per passare un numero indefinito di argomenti alla funzione
    return setTimeout(funz, 1000*minSec+Math.floor(Math.random()*(maxSec-minSec)*1000), ...args);
}

function turno () {
    let talpa_x = Math.floor(Math.random()*dim_x);
    let talpa_y = Math.floor(Math.random()*dim_y);
    document.querySelector("table").dataset.x = talpa_x;
    document.querySelector("table").dataset.y = talpa_y;
    let button = document.getElementById("puls/" + talpa_x + "/" + talpa_y);
    let img = document.createElement("img");
    img.src = "img/TalpaBella.gif";
    img.draggable = false;
    resizeImage(img, button);
    button.appendChild(img);
    let tmin = difficolta*0.4+0.2; //imposta tempo in base alla difficolta e al progresso
    let tmax = difficolta*1+1.5;
    impostaTimerFunz(togliTalpa, tmin, tmax, talpa_x, talpa_y); //talpa_xy sono parametri che vengono passati
}

function togliTalpa (talpa_x, talpa_y) {
    let button = document.getElementById("puls/" + talpa_x + "/" + talpa_y);
    button.removeChild(button.childNodes[0]);
    document.querySelector("table").dataset.x = -1;
    document.querySelector("table").dataset.y = -1;
    let timerHandle = impostaTimerFunz(turno, 1, 3);
}

function resizeImage(img, parent) {
    let parentWidth = parent.offsetWidth;
    let parentHeight = parent.offsetHeight;

    let minSide = Math.min(parentWidth, parentHeight);

    img.style.width = (minSide - 5) + "px";
    img.style.height = (minSide - 5) + "px";
}

function applicaAnimazione () {
    document.getElementById("punteggio").animate([
        { color: 'black' },
        { color: 'yellow' },
        { color: 'red' },
        { color: 'brown' },
        { color: 'black' }
    ], {
        duration: 400,
        iterations: 1
    });
}

function applicaPunteggio () {
    document.getElementById("punteggio").innerText = punteggio;
}

function fine () { //scaduto
    clearTimeout(timerHandle);
    document.getElementById("gioco").innerHTML = `Hai fatto ${punteggio} punti in ${tempo} secondi`;

}