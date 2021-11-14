function borrar() {
    let textarea = document.getElementById("textarea");
    textarea.value = "";
}


async function consultar() {
    const respuesta = await fetch("https://cc6-dbms.herokuapp.com/parseQuery", {
    //const respuesta = await fetch("http://localhost:5000/parseQuery", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: document.getElementById("textarea").value, origin: "ws" })
    }).then(function (response) {
        return response.text().then(function (text) {
            const resultado = document.getElementById("resultados");
            const respuesta = JSON.parse(text);
            resultado.innerHTML = respuesta.message;
            console.log("text " + text);
            const hora = document.getElementById("hora");
            hora.innerHTML = new Date().toLocaleString("sv-SE", {timeZone: "America/Guatemala"});
            const table = document.getElementById("tabla");
            table.innerHTML = '';
            if (typeof respuesta.table != 'undefined' && typeof respuesta.table.columns !='undefined') {
                const header = document.createElement("thead");
                const trh = document.createElement("tr");
                header.appendChild(trh);
                table.appendChild(header);
                for (let i = 0; i < respuesta.table.columns.length; i++) {
                    let data = document.createElement("th");
                    data.innerHTML = respuesta.table.columns[i];
                    trh.appendChild(data);
                }
                const tbody = document.createElement("tbody");
                table.appendChild(tbody);

                for (let i = 0; i < respuesta.table.data.length; i++) {
                    let tr = document.createElement("tr");
                    for (let j = 0; j < respuesta.table.data[i].length; j++) {
                        let td = document.createElement("td");
                        td.innerHTML = respuesta.table.data[i][j];
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
            }
        });
    });

}

function consultar2() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", "http://localhost:5000/parseQuery", true); // true for asynchronous 
    let data = { query: document.getElementById("textarea").value };
    console.log(data);
    xmlHttp.send(data);
}

