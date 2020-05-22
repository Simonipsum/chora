import BinaryArithmetics from "./BinaryArithmetics";

/** 
 * Addition instruction class. 
 * @extends BinaryArithmetics
 * @category BinaryArithmetics
 */
class Add extends BinaryArithmetics {
	/**
     * Create Add instruction.
     * @param {Object}          fields      - Fields to set
     * @param {string|number}   fields.pred - Predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
	constructor({ pred, rd, rs1, op2 }) {
		super({ name: "add", func: 0, pred, rd, rs1, op2 });
	}
	
	/**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
	execute({ reg }) {
		reg[this.rd] = (reg[this.rs1] + (this.type === "r" ? reg[this.op2] : Number(this.op2))) | 0;
	}
}

export default Add;