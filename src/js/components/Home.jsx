import React, { useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";


//create your first component
const Home = () => {

	const [newTask, setnewTask] = useState('');
	const [tasks, setTasks] = useState([]);


	useEffect(() => {
		fetch('https://playground.4geeks.com/todo/todos/daniela')
		.then(response => response.json())
		.then(data => {
			console.log(data);
			setTasks(data.todos);
		})
		.catch(error => console.error(error));
	}, []);

	function addTask(event) {
		if (event.key === "Enter" && newTask.trim() !== '') {
			fetch('https://playground.4geeks.com/todo/users/daniela', {
				method: "GET",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify ({label: newTask, is_done: false})
				})
				.then(response => response.json())
				.then(data => {
					setTasks([... tasks, data]);
					setnewTask('');
				})
				.catch(error => console.error(error));
			}
		}
	

	function deleteTask(index) {
		fetch(`https://playground.4geeks.com/todo/users/daniela${id}` , {
			method: 'DELETE'
		})
		.then(response => response.json())
		.then(() => {
			setTasks(tasks.filter((task) => task.id !== id));
		})
		.catch(error => console.error(error));

	}

	return (
		<div className="container">
			<div className="text-center">
				<h3 className="text-center mt-5 text-dark bg-tertiary">To Do List</h3>
				<div className="card">
					
					<input type="text" placeholder="ingresa texto" value={newTask} onChange={(event) => setnewTask(event.target.value)} onKeyDown={addTask}></input>

					<ul>
						{tasks.map((task, index) => (
							<li key={index} style={{ listStyleType: 'none' }}>{task}<button className="btn-close" onClick={() => deleteTask(index)}></button></li>
						))}
					</ul>

					<p></p>
				</div>
			</div>
		</div>
	);
};

export default Home;