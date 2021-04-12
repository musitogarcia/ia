
const network = new brain.NeuralNetwork();
console.log(
    network.train(
        [
            { input: { x: 1, y: 0.5 }, output: { x: 0, y: 0.5 } },
            { input: { x: 0, y: 0.5 }, output: { x: 1, y: 0.5 } },
            { input: { x: 0.5, y: 1 }, output: { x: 0.5, y: 0 } },
            { input: { x: 0.5, y: 0 }, output: { x: 0.5, y: 1 } },
            { input: { x: 0.5, y: 0.5 }, output: { x: 0.5, y: 0.5 } }
        ]
    )
);

resultado = network.run({ dias: 1 / 30 });
console.log(resultado['casos'] * 475);

resultado = network.run({ dias: 15 / 30 });
console.log(resultado['casos'] * 475);

resultado = network.run({ dias: 30 / 30 });
console.log(resultado['casos'] * 475);
var bolita;

var areaCanvas = {
    canvas: document.createElement('canvas'),
    iniciar: function () {
        this.canvas.width = 480;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        hacerFondo();
    },
    limpiar: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        hacerFondo();
    }
}

function hacerFondo() {
    contexto = areaCanvas.context;
    contexto.beginPath();
    contexto.fillStyle = 'skyblue';
    contexto.fillRect(0, 0, 480, 360);
    contexto.fill();

    contexto.beginPath();
    contexto.fillStyle = 'green';
    contexto.fillRect(0, 360, 480, 360);
    contexto.fill();

    radio = 10;
    for (let i = 0; radio > 0; i++) {
        contexto.beginPath();
        if (i % 2 != 0)
            contexto.fillStyle = 'white';
        else
            contexto.fillStyle = 'red';
        contexto.arc(240, 360, radio, 0, 2 * Math.PI);
        contexto.fill();
        contexto.stroke();
        radio -= 2;
    }

    radio = 50;
    for (let i = 0; radio > 0; i++) {
        contexto.beginPath();
        if (i % 2 != 0)
            contexto.fillStyle = 'white';
        else
            contexto.fillStyle = 'red';
        contexto.arc(50, 670, radio, 0, 2 * Math.PI);
        contexto.fill();
        contexto.stroke();
        radio -= 10;
    }
}

function bolita(radio, x, y) {
    this.radio = radio;
    this.x = x;
    this.y = y;
    this.actualizar = function () {
        contexto = areaCanvas.context;
        contexto.beginPath();
        contexto.fillStyle = 'blue';
        contexto.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        contexto.fill();
        contexto.stroke();
    }
}

function actualizarArea() {
    areaCanvas.limpiar();
    bolita.actualizar();
}

function procesar(x, y) {
    contexto = areaCanvas.context;
    contexto.beginPath();
    contexto.arc(240, 360, 10, 0, 2 * Math.PI);
    contexto.closePath();

    if (contexto.isPointInPath(x, y)) {
        var entrada = {
            x: (250 - x) / 20,
            y: (370 - y) / 20
        }

        console.log(entrada);

        var resultado = network.run(entrada);

        console.log(resultado['x'] + '|' + resultado['y']);
        bolita.x = (resultado['x'] * 100);
        bolita.y = 620 + (resultado['y'] * 100);
        actualizarArea();
    }
}

function iniciarJuego() {
    bolita = new bolita(5, 50, 670);
    areaCanvas.iniciar();

    areaCanvas.canvas.onclick = function (e) {
        var rect = this.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
        procesar(x, y);
    }
}



