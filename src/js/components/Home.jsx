import React, { useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";


//create your first component

// funciones para la app => CrearUsuario(), ObtenerTareas(), agregarTarea(), eliminarTarea() !!!

const Home = () => {
	//const [usuarios, setUsuarios] = useState(); en caso de crear varios usuarios
	
	const [tareas, setTareas] = useState([]);
	const [nuevaTarea, setNuevaTarea] = useState('');
	const [nuevoUsuario, setNuevoUsuario] = useState('');

	const url = 'https://playground.4geeks.com/todo'; //se puede crear una variable de la url que vamos a fechear? o la url en cada caso(get, post, delete) cambia? 

	const CrearUsuario = async () => {
		try {
			const response = await fetch( url + `/users/` + nuevoUsuario, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				}
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	const ObtenerTareas = async () => {
		try {
			const response = await fetch( url + `/users/daniela`);
			const data = await response.json();
			console.log(data);
			if (data.todos == []) {
				console.error('no se encontraron tareas');
			} else {
				setTareas(data.todos);
			}

		} catch (error) {
			console.error(error);
		}
	};

	const agregarTarea = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/daniela`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				
				body: JSON.stringify({
					"label": nuevaTarea,
					"is_done": false
				})  // ============> qué datos debo obtener segun la documentacion de la API ?
		});
		const data = await response.json();
		console.log(data);
		ObtenerTareas();
	} catch (error) {
		console.error(error);
	}
};

const eliminarTarea = async (pepitobonito) => {
	try {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${pepitobonito}`, {
			method: 'DELETE'
		});
		if (response.ok) {
			console.log('tarea eliminada correctamente');
			ObtenerTareas();
		} else {
			console.log('Error al eliminar la tarea');
		}
	} catch (error) {
		console.error(error);
	}
};

useEffect(() => {
	ObtenerTareas();
}, []);



return (
	<div className="container">
		<div className="card">
			<h1 className="text-center mb-2">APP ToDo LIST</h1>
			<input type="text" value={nuevoUsuario} onChange={(e) => setNuevoUsuario(e.target.value)} placeholder="Nombre de usuario" />
			<button className="btn btn-primary" onClick={CrearUsuario}>Crea tu usuario</button>
			<br />
			<input type="text" value={nuevaTarea} onChange={(e) => setNuevaTarea(e.target.value)} placeholder="Nueva tarea" />
			<button className="btn btn-success" onClick={agregarTarea}>Agregar tarea</button>
			<ul>
				{tareas.map((tarea) => (
					<li key={tarea.id}>
						{tarea.label}
						<button onClick={() => eliminarTarea(tarea.id)}>X</button>
					</li>
				))}
			</ul>
		</div>
	</div>
);
};


export default Home;