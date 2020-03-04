import React, { Component } from "react";
import "./css/App.css";

//import Registers from "./work_logic/Processor/Registers";
import FrontEnd from "./front_end/FrontEnd"

//export const frontEnd = React.createContext();

class App extends Component {
    constructor(props) {
        super(props);

		this.instCount = 0;
		//reg = new Registers();


        this.state = {
			isRunning: false, 
			consoleOutput: "",
            instructions: "",
            inst: {
                type: "",
                rd: "",
                r1: "",
                op2: "",
			},

		};
	}
	
	// Class variables

	// Class variables

	/**
	 * Sets state.instructions to input
	 * @param {string} 	instructions 	- User input instructions
	 */
    getUserInput = (instructions) => {
        this.setState({instructions: instructions});
    }

	/**
	 * Adds input to consoleOutput and goes to new line
	 * @param {string | number} 	line 	- Line to be added to consoleOutput
	 */
	addConsoleOutput = (line) => {
		this.setState((prevState) => ({
			consoleOutput: prevState.consoleOutput + line + '\n'
		}));
	}

	/**
	 * Check if there is an instruction to be executed
	 * @param {string} 		que 		- All instructions in editor
	 * @param {number}		queLength 	- Number of instructions in total
	 */ 
	checkStep(que, queLength) {
        if ( que === "" || que == null) {
            console.log("Error: Instruction queue is empty.");
            return false;
        } else if (this.instCount === queLength - 1) {
            console.log("Error: All instructions executed.");
            return false;
		} 
		return true;
	}

	/**
	 * Step one instruction
	 * @field que : All instructions
	 * @field queLength: Amount of instructions
	 */
    stepInst = () => {
		let que = this.state.instructions;
		let queLength = que.split(/\r\n|\r|\n/).length;

		// Run next instruction if any
		if (this.checkStep(que, queLength)) {
			this.instCount += 1;

			// Decode and set next instruction
			let instnext = que.split("\n")[this.instCount];
			let [type, rd, r1, op2] = instnext.split(" ");
			this.setState({type : type, rd: rd, r1: r1, op2: op2});

			// Execute Instruction
			this.addConsoleOutput(`${type} ${rd} ${r1} ${op2}`) // replace with instruction execution
		}
    }

	/**
	 * Run remaining instruction
	 * @field que : All instructions
	 * @field queLength: Amount of instructions
	 */
	 runInst = () => {
        let que = this.state.instructions;
		let queLength = que.split(/\r\n|\r|\n/).length;
		
		if (this.checkStep(que, queLength)) {
			while (this.instCount < queLength-1) {
				this.stepInst();
			}
		}
	}

    resetInst = () => {
		this.instCount = 0;
		this.setState({consoleOutput: "", type : "", rd: "", r1: "", op2: "", instCount: 0});
        console.log("Reset");
    }

    render() {
        return (
			<div>
				<FrontEnd
					parentCallback={this.getUserInput}
					stepClick = {this.stepInst}
					runClick = {this.runInst}
					resetClick = {this.resetInst}
					consoleOutput = {this.state.consoleOutput}
				/>
            </div>
        );
    }
}

export default App;
