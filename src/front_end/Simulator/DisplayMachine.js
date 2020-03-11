import React from "react";
import "../../css/Simulator.css"

const DisplayMachine = (props) => {
	return (
		<div className="machine-container">
			<table className="table table-hover table-sm">
				<thead>
					<tr>
						<th scope="col">Machine Code</th>
						<th scope="col">Basic Code</th>
						<th scope="col">Original Code</th>
					</tr>
				</thead>
				
				<tbody>
					{GenMachineRows(props.instQue, props.instCount)}
				</tbody>
			</table>
		</div>
	)
}

const GenMachineRows = (instQue, instCount) => {
	let rows = [];

	for (let i = 0; i < instQue.length; i++) {
		rows.push(MachineRow(instQue[i], i===instCount));
	}
	return rows;
}

const MachineRow = (inst, current) => {
	let color = "";

	if (current) {
		color = "current-inst"
	}

	return(
		<tr className={color}>
			<td>machine</td>
			<td>b</td>
			<td>{inst[0]} {inst[1]} {inst[2]} {inst[3]}</td>
		</tr>
	)
}

export default DisplayMachine;
