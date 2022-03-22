// import axios, { Axios } from 'axios'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2/src/sweetalert2.js'

export default function Formulario() {
    const [nombre, setNombre] = useState(0)
    const [apellido, setApellido] = useState(0)
    const [salario, setSalario] = useState(0)

    const [lista, setLista] = useState([])

    //rc95 19/03/2022 11:18 - to display
    useEffect(() => {
        Axios.get('http://localhost:4000/api/get').then((response) => {
            // console.log(response.data);
            setLista(response.data);
        })
    }, []);

    const registrar = async (e) => {
        e.preventDefault()

        const NuevoEmpleado = { nombre, apellido, salario }
        // const respuesta = await axios.post('http://localhost:4000/api', NuevoEmpleado) //mongodb
        // const respuesta = await axios.post('http://localhost:4000/api/insert', NuevoEmpleado) //mysql
        const respuesta = await Axios.post('http://localhost:4000/api/insert', NuevoEmpleado) //mysql
        console.log(respuesta)

        const mensaje = respuesta.data.mensaje

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: mensaje,
            // showConfirmButton: false,
            // timer: 1500
        })
    }

    return (
        <div className="container col-md-3 mt-4">
            <form onSubmit={registrar}>
                <div className="mb-3">
                    <input type="text" className="form-control" required placeholder='Nombre'
                        onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" required placeholder='Apellido'
                        onChange={e => setApellido(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" required placeholder='Salario'
                        onChange={e => setSalario(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
            <hr />
            {lista.map((val) => {
                return <p>Nombre: {val.NOMBRE} | Apellido: {val.APELLIDO} | Salario: {val.SALARIO}</p>

            })}

        </div>
    )
}
