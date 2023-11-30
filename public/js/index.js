const socket = new WebSocket("ws://localhost:3000")

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

socket.addEventListener("message", (event) => {
  let messageRecieved = JSON.parse(event.data)
  postData(messageRecieved)
    .then(() => {
      console.log("Datos enviados")
    })
    .catch((error) => {
      console.error(error)
    })
})