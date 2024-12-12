let dim_y = 15;
let dim_x = 9;

window.onload = function () {
    dim_y = parseInt(prompt("Dimesione X"));
    dim_x = parseInt(prompt("Dimesione Y"));

    if (isNaN(dim_x) || isNaN(dim_y)) {window.location.href = window.location.href;}

    let tabella = document.createElement("table");
    tabella.style.height = "100vh";
    tabella.style.width = "100vw";
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
            
            puls.dataset.tempo = 0;

            puls.id = `puls/${x}/${y}`;
            puls.onclick = function () {
                clickTalpa();
            };

            cella.appendChild(puls);
            riga.appendChild(cella);
        }
        tabella.appendChild(riga);
    }
    document.getElementById("gioco").appendChild(tabella);

    impostaTurno(2);
}

function impostaTurno (maxSec) {
    setTimeout(turno, 1000*Math.floor(Math.random()*maxSec));
}

function turno () {
    let talpa_x = Math.floor(Math.random()*dim_x);
    let talpa_y = Math.floor(Math.random()*dim_y);
    let button = document.getElementById("puls/" + talpa_x + "/" + talpa_y);
    let img = document.createElement("img");
    img.src = "img/TalpaBella.gif";
    img.draggable = false;
    img.style.height = "100%";
    img.style.width = "100%";
    button.appendChild(img);
}