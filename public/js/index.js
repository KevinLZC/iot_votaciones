const socket = new WebSocket("wss://iot-votaciones.fly.dev")

socket.addEventListener("open", (event) => {
  console.log("WebSocket connection opened", event);
});

async function postData(data) {
  await fetch('/addVotacion', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

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

socket.addEventListener("message", async (event) => {
  let messageReceived = JSON.parse(event.data)
  await postData(messageReceived)
  await getCount()
})

getCount()