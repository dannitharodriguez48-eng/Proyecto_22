// Preguntas y respuestas del quiz
const preguntas = [
    {
        pregunta: "En la película IT, ¿qué forma suele tomar la criatura para asustar a los niños?",
        opciones: ["Un payaso", "Un hombre lobo", "Una muñeca", "Un fantasma"],
        correcta: 0
    },
    {
        pregunta: "¿Cómo se llama la muñeca poseída que aparece en la saga El Conjuro?",
        opciones: ["Chucky", "Annabelle", "M3GAN", "Esther"],
        correcta: 1
    },
    {   
        pregunta: "En Psicosis, ¿en qué lugar ocurre la famosa escena de la ducha?",
        opciones: ["En un hospital", "En una escuela", "En un motel", "En una casa abandonada"],
        correcta: 2
    },
    {
        pregunta: "¿Qué objeto utiliza Michael Myers como arma característica en Halloween?",
        opciones: ["Un hacha", "Un cuchillo", "Una motosierra", "Una cuerda"],
        correcta: 1
    },
    {
        pregunta: "En El aro, ¿qué sucede después de ver la misteriosa cinta de video?",
        opciones: ["Se recibe una llamada", "Se pierde la memoria", "Aparece una marca", "Se escucha una canción"],
        correcta: 0
    },
    {
        pregunta: "¿Cómo se llama el asesino que usa una máscara blanca en la saga Scream?",
        opciones: ["Leatherface", "Freddy Krueger", "Ghostface", "Jason Voorhees"],
        correcta: 2
    },
    {
        pregunta: "En El exorcista, ¿qué personaje está poseído por un demonio?",
        opciones: ["Regan", "Carol Anne", "Carrie", "Samara"],
        correcta: 0
    },
    {
        pregunta: "¿Qué objeto identifica al personaje Freddy Krueger?",
        opciones: ["Una máscara de hockey", "Un guante con cuchillas", "Una motosierra", "Un martillo"],
        correcta: 1
    },
    {
        pregunta: "En Destino final, ¿qué intentan evitar los protagonistas?",
        opciones: ["Una maldición familiar", "Un fantasma", "La muerte después de escapar de un accidente", "Un monstruo del bosque"],
        correcta: 2
    },
    {
        pregunta: "¿En qué película aparece el personaje Leatherface?",
        opciones: ["La masacre de Texas", "El conjuro", "La noche del demonio", "Actividad paranormal"],
        correcta: 0
    }
];

let indice = 0;
let puntaje = 0;
let tiempo = 10;
let temporizador;
let respondida = false;
let resultados = [];

const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const final = document.getElementById("final");
const preguntaTexto = document.getElementById("pregunta");
const respuestas = document.getElementById("respuestas");
const retroalimentacion = document.getElementById("retroalimentacion");
const tiempoTexto = document.getElementById("tiempo");
const progresoTiempo = document.getElementById("progresoTiempo");
const puntajeTexto = document.getElementById("puntaje");
const btnSiguiente = document.getElementById("btnSiguiente");

document.getElementById("btnComenzar").addEventListener("click", comenzar);
btnSiguiente.addEventListener("click", siguientePregunta);
document.getElementById("btnReiniciar").addEventListener("click", reiniciar);

function comenzar() {
    inicio.classList.add("oculto");
    final.classList.add("oculto");
    juego.classList.remove("oculto");
    indice = 0;
    puntaje = 0;
    resultados = [];
    mostrarPregunta();
}

function mostrarPregunta() {
    respondida = false;
    tiempo = 10;
    preguntaTexto.textContent = preguntas[indice].pregunta;
    document.getElementById("numeroPregunta").textContent =
        "PREGUNTA " + (indice + 1) + " / " + preguntas.length;
    puntajeTexto.textContent = "Puntos: " + puntaje;
    retroalimentacion.textContent = "";
    btnSiguiente.classList.add("oculto");
    respuestas.innerHTML = "";

    preguntas[indice].opciones.forEach(function(opcion, i) {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.className = "respuesta";
        boton.addEventListener("click", function() {
            revisarRespuesta(i);
        });
        respuestas.appendChild(boton);
    });

    actualizarTiempo();
    clearInterval(temporizador);
    temporizador = setInterval(contarTiempo, 1000);
}

function contarTiempo() {
    if (respondida) return;

    tiempo--;
    actualizarTiempo();

    if (tiempo <= 0) {
        clearInterval(temporizador);
        respondida = true;
        puntaje--;
        puntajeTexto.textContent = "Puntos: " + puntaje;

        const correcta = preguntas[indice].opciones[preguntas[indice].correcta];
        retroalimentacion.textContent = "¡Se acabó el tiempo! La respuesta correcta era: " + correcta;
        bloquearRespuestas();
        resultados.push({
            pregunta: preguntas[indice].pregunta,
            respuesta: "Sin responder (tiempo agotado)",
            correcta: correcta,
            acierto: false
        });
        btnSiguiente.classList.remove("oculto");
    }
}

function actualizarTiempo() {
    tiempoTexto.textContent = tiempo;
    progresoTiempo.style.width = (tiempo / 10 * 100) + "%";
}

function revisarRespuesta(seleccion) {
    if (respondida) return;

    respondida = true;
    clearInterval(temporizador);

    const preguntaActual = preguntas[indice];
    const botones = respuestas.querySelectorAll(".respuesta");
    const esCorrecta = seleccion === preguntaActual.correcta;
    const respuestaCorrecta = preguntaActual.opciones[preguntaActual.correcta];

    botones.forEach(function(boton, i) {
        boton.disabled = true;

        if (i === preguntaActual.correcta) {
            boton.classList.add("correcta");
        } else if (i === seleccion) {
            boton.classList.add("incorrecta");
        }
    });

    if (esCorrecta) {
        puntaje++;
        retroalimentacion.textContent = "¡Correcto! Muy bien, conoces el cine de terror.";
    } else {
        retroalimentacion.textContent = "Incorrecto. La respuesta correcta era: " + respuestaCorrecta;
    }

    puntajeTexto.textContent = "Puntos: " + puntaje;

    resultados.push({
        pregunta: preguntaActual.pregunta,
        respuesta: preguntaActual.opciones[seleccion],
        correcta: respuestaCorrecta,
        acierto: esCorrecta
    });

    btnSiguiente.classList.remove("oculto");
}

function bloquearRespuestas() {
    const botones = respuestas.querySelectorAll(".respuesta");
    botones.forEach(function(boton, i) {
        boton.disabled = true;
        if (i === preguntas[indice].correcta) {
            boton.classList.add("correcta");
        }
    });
}

function siguientePregunta() {
    indice++;

    if (indice < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    clearInterval(temporizador);
    juego.classList.add("oculto");
    final.classList.remove("oculto");

    document.getElementById("resultadoFinal").textContent =
        "Tu puntaje fue: " + puntaje + " puntos";

    const lista = document.getElementById("listaResultados");
    lista.innerHTML = "";

    resultados.forEach(function(item, i) {
        const div = document.createElement("div");
        div.className = "resultado-item " + (item.acierto ? "acierto" : "fallo");
        div.innerHTML =
            "<strong>Pregunta " + (i + 1) + ":</strong> " + item.pregunta +
            "<br><strong>Tu respuesta:</strong> " + item.respuesta +
            "<br><strong>Respuesta correcta:</strong> " + item.correcta +
            "<br><strong>Resultado:</strong> " + (item.acierto ? "Correcto" : "Incorrecto");
        lista.appendChild(div);
    });
}

function reiniciar() {
    comenzar();
}
