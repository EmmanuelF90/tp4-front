const API = 'https://tp4-grupo10.onrender.com'

async function cargarNotas() {
  try {
    const response = await fetch(`${API}/notas`)
    const notas = await response.json()

    const tabla =
      document.getElementById('tablaNotas')

    tabla.innerHTML = ''

    notas.forEach(nota => {
      tabla.innerHTML += `
        <tr>
          <td>${nota.id}</td>
          <td>${nota.legajo}</td>
          <td>${nota.idMateria}</td>
          <td>${nota.nota}</td>
          <td>${nota.fecha}</td>
          <td>
            <button onclick="eliminarNota(${nota.id})">
              Eliminar
            </button>
          </td>
        </tr>
      `
    })
  } catch (error) {
    console.error(
      'Error al cargar notas:',
      error
    )
  }
}

async function crearNota() {
  try {
    const legajo =
      document.getElementById('legajo').value

    const idMateria =
      document.getElementById('idMateria').value

    const nota =
      document.getElementById('nota').value

    const fecha =
      document.getElementById('fecha').value

    const response = await fetch(
      `${API}/notas`,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json'
        },
        body: JSON.stringify({
          legajo,
          idMateria,
          nota,
          fecha
        })
      }
    )

    if (!response.ok) {
      throw new Error(
        'No se pudo crear la nota'
      )
    }

    cargarNotas()
  } catch (error) {
    console.error(
      'Error al crear nota:',
      error
    )
  }
}

async function eliminarNota(id) {
  try {
    const response = await fetch(
      `${API}/notas/${id}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error(
        'No se pudo eliminar la nota'
      )
    }

    cargarNotas()
  } catch (error) {
    console.error(
      'Error al eliminar nota:',
      error
    )
  }
}

cargarNotas()