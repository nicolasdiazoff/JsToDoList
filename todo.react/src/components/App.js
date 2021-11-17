import react, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [numberOfTask, setNumberOfTask] = useState(3);
	const [showModal, setShowModal] = useState(false);
	const [taskSelected, setTaskSelected] = useState({});

	const handleNumber = (e) => {
		setNumberOfTask(e.target.value);
	};

	const handleModal = (task) => {
		setShowModal(true);
		setTaskSelected(task);
	};

	const handleDone = async (task) => {
		setShowModal(false);
		setTaskSelected({});
		let findIndex = tasks
			.map(function (e) {
				return e.id;
			})
			.indexOf(task.id);
		tasks[findIndex].status = true;
		setTasks(tasks);
	};

	const Modal = (task) => {
		const { id, title, status } = task.task;
		return (
			<div className='Modal'>
				<div className='Modal-container'>
					<h1>Task #</h1>
					<p>id: {id}</p>
					<p>title: {title}</p>
					<div className='Modal-box'>
						<button onClick={() => setShowModal(false)}>Close</button>
						<button
							onClick={() =>
								handleDone({ id: id, title: title, status: status })
							}>
							Complete task
						</button>
					</div>
				</div>
			</div>
		);
	};

	useEffect(() => {
		const getTask = async () => {
			const req = await axios.get(
				`http://localhost:4000/tasks/${numberOfTask}`
			);
			const tasksReq = req.data;
			setTasks(tasksReq);
		};
		getTask();
	}, [numberOfTask]);

	return (
		<>
			{showModal ? <Modal task={taskSelected} /> : null}
			{!showModal ? (
				<>
					<div className='container-search'>
						<input
							type='number'
							placeholder='Type the numbers of task'
							onChange={(e) => handleNumber(e)}
							value={numberOfTask}
						/>
					</div>
					<div className='container'>
						{tasks.length > 0 ? (
							tasks.map((task, index) => (
								<div
									className='task'
									style={{ border: task.status ? "1px solid green" : "none" }}>
									<h1>Task #{index}</h1>
									<p>id: {task.id}</p>
									<p>title: {task.title}</p>
									<button onClick={() => handleModal(task)}>Show</button>
								</div>
							))
						) : (
							<h1>Not found task</h1>
						)}
					</div>
				</>
			) : null}
		</>
	);
};

export default App;
