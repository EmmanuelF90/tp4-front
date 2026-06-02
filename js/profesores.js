const API = 'https://tp4-grupo10.onrender.com'

async function cargarProfesores() {
  try {
    const response = await fetch(`${API}/profesores`)
    const profesores = await response.json()

    const tabla =
      document.getElementById('tablaProfesores')

    tabla.innerHTML = ''

    profesores.forEach(profesor => {
      tabla.innerHTML += `
        <tr>
          <td>${profesor.idProfesor}</td>
          <td>${profesor.nombre}</td>
          <td>${profesor.especialidad}</td>
          <td>${profesor.email}</td>
          <td>${profesor.isActive}</td>
          <td>
            <button onclick="eliminarProfesor(${profesor.idProfesor})">
              Eliminar
            </button>
          </td>
        </tr>
      `
    })
  } catch (error) {
    console.error(
      'Error al cargar profesores:',
      error
    )
  }
}

async function crearProfesor() {
  try {
    const nombre =
      document.getElementById('nombre').value

    const especialidad =
      document.getElementById('especialidad').value

    const email =
      document.getElementById('email').value

    const response = await fetch(
      `${API}/profesores`,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json'
        },
        body: JSON.stringify({
          nombre,
          especialidad,
          email,
          isActive: true
        })
      }
    )

    if (!response.ok) {
      throw new Error(
        'No se pudo crear el profesor'
      )
    }

    cargarProfesores()
  } catch (error) {
    console.error(
      'Error al crear profesor:',
      error
    )
  }
}

async function eliminarProfesor(
  idProfesor
) {
  try {
    const response = await fetch(
      `${API}/profesores/${idProfesor}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error(
        'No se pudo eliminar el profesor'
      )
    }

    cargarProfesores()
  } catch (error) {
    console.error(
      'Error al eliminar profesor:',
      error
    )
  }
}

cargarProfesores()