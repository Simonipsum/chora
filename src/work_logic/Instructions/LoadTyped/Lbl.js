import LoadTyped from "./LoadTyped";
import { toInt32 } from "../../../helper";

/** 
 * Lbl instruction class. 
 * @extends LoadTyped
 * @category LoadTyped
 */
class Lbl extends LoadTyped{
    /**
     * Create Lbl instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
	 * @param {number}			fields.imm	- Immediate value 
     */
	constructor({ pred, rd, ra, imm }) {
		super({name: "lbl", pred, rd, ra, type: 0b01001, imm});
	}

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg, lm }) {
        reg[this.rd] = toInt32(lm[reg[this.ra] + this.imm] & 0xFF); 
    }

}

export default Lbl;
