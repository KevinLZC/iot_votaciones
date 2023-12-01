// se inicializa los websocket
const socket = new WebSocket("wss://iot-votaciones.fly.dev")

// se inicializa la conexión websocket
socket.addEventListener("open", (event) => {
  console.log("WebSocket connection opened", event)
})

// función para enviar los datos al servidor
async function postData(data) {
  await fetch('/addVotacion', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

// función para obtener los votos por cada uno de los candidatos
async function getCount() {
  fetch('/count').then((conteo) => {
    return conteo.json()
  })
    .then((conteo) => {
      conteo.map((candidato) => {
        if (document.getElementById("nombre1")?.innerText === candidato.nombre) {
          document.getElementById("votos1").innerHTML = candidato.noVotos
        } else if (document.getElementById("nombre2")?.innerText === candidato.nombre) {
          document.getElementById("votos2").innerHTML = candidato.noVotos
        } else if (document.getElementById("nombre3")?.innerText === candidato.nombre) {
          document.getElementById("votos3").innerHTML = candidato.noVotos
        }
      })
    })
}

// se esta al pendiente de los mensajes del servidor
socket.addEventListener("message", async (event) => {
  let messageReceived = JSON.parse(event.data)
  await postData(messageReceived)
  await getCount()
})

// se inicializa la función para obtener los votos por cada uno de los candidatos
getCount()