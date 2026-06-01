async function cargarAlumnos() {
    const response = await fetch(
        'http://localhost:3000/alumnos'
    )

    const alumnos = await response.json()

    const tabla =
        document.getElementById(
            'tablaAlumnos'
        )

    tabla.innerHTML = ''

    alumnos.forEach(alumno => {
        tabla.innerHTML += `
            <tr>
                <td>${alumno.legajo}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.email}</td>
                <td>
                    <button>
                        Editar
                    </button>

                    <button>
                        Eliminar
                    </button>
                </td>
            </tr>
        `
    })
}

cargarAlumnos()