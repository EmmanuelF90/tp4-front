const API = 'http://localhost:3000'

async function cargarProfesores() {
  const response = await fetch(
    `${API}/profesores`
  )

  const profesores =
    await response.json()

  const tabla =
    document.getElementById(
      'tablaProfesores'
    )

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
}

async function crearProfesor() {
  const nombre =
    document.getElementById(
      'nombre'
    ).value

  const especialidad =
    document.getElementById(
      'especialidad'
    ).value

  const email =
    document.getElementById(
      'email'
    ).value

  await fetch(
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

  cargarProfesores()
}

async function eliminarProfesor(
  idProfesor
) {
  await fetch(
    `${API}/profesores/${idProfesor}`,
    {
      method: 'DELETE'
    }
  )

  cargarProfesores()
}

cargarProfesores()