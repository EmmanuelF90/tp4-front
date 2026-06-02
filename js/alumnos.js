const API = 'https://tp4-grupo10.onrender.com'

async function cargarAlumnos() {
  try {
    const response = await fetch(`${API}/alumnos`)
    const alumnos = await response.json()

    const tabla = document.getElementById('tablaAlumnos')

    tabla.innerHTML = ''

    alumnos.forEach(alumno => {
      tabla.innerHTML += `
        <tr>
          <td>${alumno.legajo}</td>
          <td>${alumno.nombre}</td>
          <td>${alumno.apellido}</td>
          <td>${alumno.email}</td>
          <td>
            <button onclick="eliminarAlumno(${alumno.legajo})">
              Eliminar
            </button>
          </td>
        </tr>
      `
    })
  } catch (error) {
    console.error('Error al cargar alumnos:', error)
  }
}

async function crearAlumno() {
  try {
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const email = document.getElementById('email').value

    const response = await fetch(`${API}/alumnos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        apellido,
        email
      })
    })

    if (!response.ok) {
      throw new Error('No se pudo crear el alumno')
    }

    cargarAlumnos()
  } catch (error) {
    console.error('Error al crear alumno:', error)
  }
}

async function eliminarAlumno(legajo) {
  try {
    const response = await fetch(
      `${API}/alumnos/${legajo}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error('No se pudo eliminar el alumno')
    }

    cargarAlumnos()
  } catch (error) {
    console.error('Error al eliminar alumno:', error)
  }
}

cargarAlumnos()