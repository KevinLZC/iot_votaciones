// id de los canvas
let $graficaPresidente = document.querySelector("#graficaPresidente")
let $graficaGobernador = document.querySelector("#graficaGobernador")
let $graficaMunicipal = document.querySelector("#graficaMunicipal")

// creando el websocket
socket.addEventListener("message", () => {
  // se eliminan los canvas para actualizarlos con las nuevas gráficas
  document.getElementById("divPresidente").removeChild($graficaPresidente)
  $graficaPresidente = document.createElement('canvas')
  $graficaPresidente.id = 'graficaPresidente'
  document.getElementById("divPresidente").appendChild($graficaPresidente)

  document.getElementById("divGobernador").removeChild($graficaGobernador)
  $graficaGobernador = document.createElement('canvas')
  $graficaGobernador.id = 'graficaGobernador'
  document.getElementById("divGobernador").appendChild($graficaGobernador)

  document.getElementById("divMunicipal").removeChild($graficaMunicipal)
  $graficaMunicipal = document.createElement('canvas')
  $graficaMunicipal.id = 'graficaMunicipal'
  document.getElementById("divMunicipal").appendChild($graficaMunicipal)
  getDatasets()
})
// función para obtener los datos de la base de datos y generar las gráficas
async function getDatasets() {
  let presidentesData = []
  let gobernadoresData = []
  let municipalesData = []

  await fetch('/count')
    .then(response => response.json())
    .then(data => {
      presidentesData.push(data[0], data[1], data[2])
      gobernadoresData.push(data[3], data[4], data[5])
      municipalesData.push(data[6], data[7], data[8])
    })
  // inicializando las gráficas
  initChart(
    $graficaPresidente,
    presidentesData.map((candidato) => candidato.noVotos),
    "Candidatos a la presidencia de México",
    presidentesData.map((candidato) => candidato.nombre)
  )
  initChart(
    $graficaGobernador,
    gobernadoresData.map((candidato) => candidato.noVotos),
    "Candidatos a la gobernatura de estado",
    gobernadoresData.map((candidato) => candidato.nombre)
  )
  initChart(
    $graficaMunicipal,
    municipalesData.map((candidato) => candidato.noVotos),
    "Candidatos a la presidencia municipal",
    municipalesData.map((candidato) => candidato.nombre)
  )
}

// función para inicializar las gráficas
function initChart(canvas, dataset, labels, etiquetas) {
  const datasetCandidato = {
    label: labels,
    data: dataset,
    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(0, 255, 0, 0.2)', 'rgba(0, 0, 255, 0.2)'],
    borderColor: ['rgba(255, 159, 64, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)'],
    borderWidth: 2,
    borderRadius: 10,
  };

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: etiquetas,
      datasets: [
        datasetCandidato,
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      responsive: true,
      scales: {
        y: {
          grid: {
            display: false
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}
// llamando a la función para obtener los datos de la base de datos y generar las gráficas
getDatasets()