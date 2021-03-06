import { compile_reg, compile_imm, compile_long } from "./compilers";

/** 
 * Represents a BinaryArithmetics instruction. Sets common fields. 
 */
class BinaryArithmetics {
	/**
     * Create base instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string}          fields.name - Name of instruction
     * @param {number}          fields.func - Instruction function
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.rs1  - First source register
     * @param {string|number}   fields.op2  - Second operand. Can be a second source register or immediate value.
     */
	constructor({ name, func, pred, rd, rs1, op2 }) {
		this.type = isNaN(op2) ? "r" : (Number(op2) > 0x0FFF ? "l" : "i");
		this.pred = pred;
		this.rd = rd;
		this.rs1 = rs1;
		this.op2 = op2;
		this.name = name;
		this.func = func;
        
		// nor, shadd, shadd2 does not have an immediate format
		if([0b1011, 0b1100, 0b1101].includes(func) && this.type === "i"){
			this.type = "l";
		}

		switch (this.type) {
			case "r":
				this.binary = compile_reg(pred, rd, rs1, op2, func);
				break;
			case "i":
				this.op2 &= 0xFFF;
				this.binary = compile_imm(pred, func, rd, rs1, op2);
				break;
			case "l":
				this.binary = compile_long(pred, rd, rs1, func, op2);
				break;
			default:
				throw new Error(`Unexpected type in ${this.name}`);
		}
	}
    
	execute(){
		throw new Error("Missing execute handler for", this);
	}

	toString(){
		return `${this.pred ? `(${this.pred&0b1000 ? "!" : ""}p${this.pred&0b0111}) ` : ""}${this.name} ${this.rd} = ${this.rs1}, ${this.op2}`;
	}
}

export default BinaryArithmetics;