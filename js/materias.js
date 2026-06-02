const API = 'https://tp4-grupo10.onrender.com'

async function cargarMaterias() {
  try {
    const response = await fetch(`${API}/materias`)
    const materias = await response.json()

    const tabla =
      document.getElementById('tablaMaterias')

    tabla.innerHTML = ''

    materias.forEach(materia => {
      tabla.innerHTML += `
        <tr>
          <td>${materia.idMateria}</td>
          <td>${materia.nombre}</td>
          <td>${materia.cuatrimestre}</td>
          <td>
            <button onclick="eliminarMateria('${materia.idMateria}')">
              Eliminar
            </button>
          </td>
        </tr>
      `
    })
  } catch (error) {
    console.error(
      'Error al cargar materias:',
      error
    )
  }
}

async function crearMateria() {
  try {
    const idMateria =
      document.getElementById('idMateria').value

    const nombre =
      document.getElementById('nombre').value

    const cuatrimestre =
      document.getElementById('cuatrimestre').value

    const response = await fetch(
      `${API}/materias`,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json'
        },
        body: JSON.stringify({
          idMateria,
          nombre,
          cuatrimestre
        })
      }
    )

    if (!response.ok) {
      throw new Error(
        'No se pudo crear la materia'
      )
    }

    cargarMaterias()
  } catch (error) {
    console.error(
      'Error al crear materia:',
      error
    )
  }
}

async function eliminarMateria(
  idMateria
) {
  try {
    const response = await fetch(
      `${API}/materias/${idMateria}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error(
        'No se pudo eliminar la materia'
      )
    }

    cargarMaterias()
  } catch (error) {
    console.error(
      'Error al eliminar materia:',
      error
    )
  }
}

cargarMaterias()