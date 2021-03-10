console.log("Estoy aqui");

//document.quer0ySelector('#json').addEventListener('click', getJSon);
let pointsArray=[];

function getJSon() {
    console.log("clickeado");
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'nombres.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let totales =0;
            let cont = JSON.parse(this.responseText);
            let res = document.querySelector('#res');
            res.innerHTML = '';
            pointsArray=[];
            for (let item of cont) {
                if ( item['author'] == document.getElementById('name').value){
                    res.innerHTML += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.points.length}</td>
                    <td><input id="${item.name}" onclick="dibujar(${item.name})" class="btn" type="button" value="Open"/></td>
                    </tr>
                    `;
                    pointsArray.push(item);

                    totales+=item['points'].length;
                }
            }
            if(res.innerHTML == ''){
                window.alert(document.getElementById('name').value+ " doesn't exist.");
            }
            let author = document.querySelector('#author');
            author.innerHTML = document.getElementById('name').value + "'s blueprints";
            let total = document.querySelector('#total');
            total.innerHTML = ("Total user points: "+totales);
        }
    }
}

function dibujar(name){

    let draw;
    for(let item of pointsArray){
        if(name.id==item['name']){
            draw=item['points'];
            console.log(draw)
        }
    }
    let canvas = document.getElementById('canvas');
    let contexto = canvas.getContext('2d');
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.beginPath();
    contexto.moveTo(draw[0]['x'],draw[0]['y']);
    for(let point of draw){
        contexto.lineTo(point['x'],point['y']);
    }
    contexto.strokeStyle = "rgba(0, 0, 255, 0.5)";
    contexto.stroke();
    contexto.closePath();
}