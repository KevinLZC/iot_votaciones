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

async function updateEstado(data) {
  await fetch('/updateEstado', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
let windowPath = window.location.pathname
socket.addEventListener("message", async (event) => {
  let messageReceived = JSON.parse(event.data)
  postData(messageReceived)
  if(windowPath === "/"){
    
  }
})

console.log(window.location.pathname)