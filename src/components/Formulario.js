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
            setLista(response.data);
        })
    }, []);

    const registrar = () => {
        const NuevoEmpleado = { nombre, apellido, salario }
        Axios.post('http://localhost:4000/api/insert', NuevoEmpleado);

        setLista([...lista, NuevoEmpleado]);
    };

    const eliminar = (ID) => {
        Axios.put('http://localhost:4000/api/delete', {ID: ID});

        // setLista([...lista]);
    };


    return (
        <div className="container col-md-6 mt-4">
            <h1>ReactJS + NodeJS + mySql: CRUD</h1>
            <label>Por favor ingrese los siguientes datos:</label>
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

            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Salario</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((val) => {
                        return (
                            <tr>
                                <td>{val.ID}</td>
                                <td>{val.NOMBRE}</td>
                                <td>{val.APELLIDO}</td>
                                <td>{val.SALARIO}</td>
                                <td>
                                    <button className="btn btn-danger"
                                        onClick={() => { eliminar(val.ID) }}>Delete
                                    </button>
                                </td>
                                <td><button className="btn btn-warning">Update</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <footer>
                <p>Made by Rodrigo Centurión  &copy;  {new Date().getFullYear()}</p>
                <p>Villa Elisa - Paraguay </p>
                <p>
                    <a href='mailto:centu95@hotmail.com'>centu95@hotmail.com</a>
                </p>
                <p>
                    <a href='tel:+595972471250'>+595972471250</a>
                </p>
            </footer>
        </div >
    )
}
