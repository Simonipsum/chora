import React, { Component } from "react";
import FrontEnd from "./Front End/FrontEnd";
import CPU from "./Work Logic/Processor/CPU";
import Assembler from "./Work Logic/Processor/Assembler";
import "./CSS/App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.cpu = new CPU();
		this.assembler = new Assembler();
		this.state = {
			consoleOutput: "",
		};
	}

	/**
	 * Handles code editor updates.
	 * Resets CPU and runs assembler to generate instruction que and labels.
	 * @param {string} 	editor 	- User input instructions
	 */
	editorUpdate = (editor) => {
		console.clear();
		console.log("Run Assembler");
		if (!this.assembler.run(editor)) {
			console.log(this.assembler.error);
			this.forceUpdate(); // need this here to make sure simulator tab is disabled.
			return;
		}
		console.log("Assembler ran successfully");
		this.cpu.populate(this.assembler.bundles);
		this.forceUpdate();
	}

	/**
	 * Adds input to consoleOutput and goes to new line
	 * @param {string | number} 	line 	- Line to be added to consoleOutput
	 */
	addConsoleOutput = (line) => {
		this.setState((prevState) => ({
			consoleOutput: prevState.consoleOutput + line + "\n"
		}));
	}

	/**
	 * Step one instruction, if any left to execute
	 * @field que : All instructions
	 * @field queLength: Amount of instructions
	 */
	stepBtn = () => {
		this.cpu.step();
		this.forceUpdate(); // To re-render
	}

	/**
	 * Run button pressed. Runs remaining instructions.
	 */
	runBtn = () => {
		this.cpu.run();
		this.forceUpdate(); // To re-render
	}

	resetBtn = () => {
		this.cpu.populate(this.assembler.bundles);
		this.forceUpdate(); // To re-render
	}

	prevBtn = () => {
		this.cpu.prev();
		this.forceUpdate(); // To re-render
	}

	render() {
		document.body.style.overflowY = "hidden";
		return (
			<div className="no-scroll">
				<FrontEnd
					registers={this.cpu.getReg()}
					memory={this.cpu.getMem()}
					editorUpdate={this.editorUpdate}
					stepClick={this.stepBtn}
					runClick={this.runBtn}
					prevClick={this.prevBtn}
					resetClick={this.resetBtn}
					consoleOutput={this.state.consoleOutput}
					pc={this.cpu.getPC()}
					bundles={this.cpu.bundles}
					error={this.assembler.error}
				/>
			</div>
		);
	}
}

export default App;
