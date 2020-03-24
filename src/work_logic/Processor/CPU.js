import { Add, Sub, Xor, Nor, ShiftLeft, ShiftRight, Or, And,
	ShiftRightArithmetic, ShiftAdd, ShiftAdd2 } from "../Instructions/BinaryArithmetics/index";
import { Btest, Cmpeq, Cmple, Cmplt, Cmpneq, Cmpule, Cmpult } from "../Instructions/Compare/index";
import { Lws, Lwl, Lwc, Lwm, Lhs, Lhl, Lhc, Lhm, Lbs, Lbl, Lbc, 
	Lbm, Lhus, Lhul, Lhuc, Lhum, Lbus, Lbul, Lbuc, Lbum} from "../Instructions/LoadTyped/index";
import { Mul, Mulu } from "../Instructions/Multiply/index";
import { Pand, Pxor, Por } from "../Instructions/Predicate/index";
import { Sens, Sfree, Sres, Sspill } from "../Instructions/StackControl/index";
import { Sbc, Sbl, Sbm, Sbs, Shc, Shl, Shm, Shs, Swc, Swl, Swm, Sws} from "../Instructions/StoreTyped/index";
import Bcopy from "../Instructions/Bcopy";
import Mfs from "../Instructions/Mfs";
import Mts from "../Instructions/Mts";
import Storage from "./Storage";

class CPU {
	constructor() {
		this.storage = new Storage(); // Cache + registers
		this.dummy = new Storage(); // Dummy storage to use for predicate
		this.pc = 0;
		this.base = 0;
	}
	
	getReg() {
		return this.storage.getReg();
	}

	getCache() {
		return this.storage.getCache();
	}

	reset() {
		this.storage.reset(); 
		this.pc = 0 ;
		this.base = 0;
	}

	getBinary(inst) {
		let cInst = this.execute(inst);

		// Want a better fix than this..
		if (cInst["binary"] === undefined) {
			console.log("Can't get binary!!");
			return;
		}
		
		return cInst["binary"][0];
	}

	/**
 	* @param {array} 			inst 	- One instruction on form [pred, type, des, s1, s2]
	* @returns {Instruction} 	cInst 	- An instruction with its appropriate fields.
	*/
	execute(inst) {
		let cInst; 
		let state = this.storage;

		// Convert inst into the needed types of instructions
		let BinaryInst 	= {pred: inst[0], rd:  inst[2], rs1: inst[3], op2: inst[4]};
		let CompInst 	= {pred: inst[0], pd:  inst[2], rs1: inst[3], op2: inst[4]};
		let LoadInst 	= {pred: inst[0], rd:  inst[2], ra:  inst[3], imm: inst[4]};
		let MulInst 	= {pred: inst[0], rs1: inst[2], rs2: inst[3]};
		let PredInst 	= {pred: inst[0], pd:  inst[2], ps1: inst[3], ps2: inst[4]};
		let StackInst 	= {pred: inst[0], s1:  inst[2]};
		let StoreInst 	= {pred: inst[0], ra:  inst[2], imm: inst[3], rs:  inst[4]};
		let BcopyInst 	= {pred: inst[0], rd:  inst[2], rs1: inst[3], imm: inst[4], neg: inst[5], ps: inst[6]};

		// Pick and execute inst
		switch(inst[1]) {

			// BinaryArithmetics
			case "add": 
			case "addi": 
			case "addl": 
				cInst = new Add(BinaryInst);
				break;
			case "sub":
			case "subi":
			case "subl":
				cInst = new Sub(BinaryInst);
				break;
			case "or":
			case "ori":
			case "orl":
				cInst = new Or(BinaryInst);
				break;
			case "and":
			case "andi":
			case "andl":
				cInst = new And(BinaryInst);
				break;
			case "xor":
			case "xori":
			case "xorl":
				cInst = new Xor(BinaryInst);
				break;
			case "nor": 
			case "norl": 
				cInst = new Nor(BinaryInst);
				break;
			case "sl":
			case "sli":
			case "sll":
				cInst = new ShiftLeft(BinaryInst);
				break;
			case "sr": 
			case "sri":
			case "srl":
				cInst = new ShiftRight(BinaryInst);
				break;
			case "sra": 
			case "srai": 
			case "sral": 
				cInst = new ShiftRightArithmetic(BinaryInst);
				break;
			case "shadd": 
				cInst = new ShiftAdd(BinaryInst);
				break;
			case "shadd2": 
				cInst = new ShiftAdd2(BinaryInst);
				break;
			
			// Compare
			case "btest": 
			case "btesti":
				cInst = new Btest(CompInst);
				break;
			case "cmpeq": 
			case "cmpeqi": 
				cInst = new Cmpeq(CompInst);
				break;
			case "cmple":
			case "cmplei": 
				cInst = new Cmple(CompInst);
				break;
			case "cmplt": 
			case "cmplti": 
				cInst = new Cmplt(CompInst);
				break;
			case "cmpneq":
			case "cmpneqi": 
				cInst = new Cmpneq(CompInst);
				break;
			case "cmpule": 
			case "cmpulei": 
				cInst = new Cmpule(CompInst);
				break;
			case "cmpult": 
			case "cmpulti": 
				cInst = new Cmpult(CompInst);
				break;
			
			// LoadType 
			case "lbc": 
				cInst = new Lbc(LoadInst);
				break;
			case "lbl": 
				cInst = new Lbl(LoadInst);
				break;
			case "lbm": 
				cInst = new Lbm(LoadInst);
				break;
			case "lbs": 
				cInst = new Lbs(LoadInst);
				break;
			case "lbuc": 
				cInst = new Lbuc(LoadInst);
				break;
			case "lbul": 
				cInst = new Lbul(LoadInst);
				break;
			case "lbum": 
				cInst = new Lbum(LoadInst);
				break;
			case "lbus": 
				cInst = new Lbus(LoadInst);
				break;
			case "lhc": 
				cInst = new Lhc(LoadInst);
				break;
			case "lhl": 
				cInst = new Lhl(LoadInst);
				break;
			case "lhm": 
				cInst = new Lhm(LoadInst);
				break;
			case "lhs": 
				cInst = new Lhs(LoadInst);
				break;
			case "lhuc": 
				cInst = new Lhuc(LoadInst);
				break;
			case "lhul": 
				cInst = new Lhul(LoadInst);
				break;
			case "lhum": 
				cInst = new Lhum(LoadInst);
				break;
			case "lhus": 
				cInst = new Lhus(LoadInst);
				break;
			case "lwc": 
				cInst = new Lwc(LoadInst);
				break;
			case "lwl": 
				cInst = new Lwl(LoadInst);
				break;
			case "lwm": 
				cInst = new Lwm(LoadInst);
				break;
			case "lws": 
				cInst = new Lws(LoadInst);
				break;
			
			// Multiply 
			case "mul":
				cInst = new Mul(MulInst);
				break;
			case "mulu":
				cInst = new Mulu(MulInst);
				break;

			// Predicate
			case "pand":
				cInst = new Pand(PredInst);
				break;
			case "por":
				cInst = new Por(PredInst);
				break;
			case "pxor":
				cInst = new Pxor(PredInst);
				break;

			// StoreTyped
			case "sbc":
				cInst = new Sbc(StoreInst);
				break;
			case "sbl":
				cInst = new Sbl(StoreInst);
				break;
			case "sbm":
				cInst = new Sbm(StoreInst);
				break;
			case "sbs":
				cInst = new Sbs(StoreInst);
				break;
			case "shc":
				cInst = new Shc(StoreInst);
				break;
			case "shl":
				cInst = new Shl(StoreInst);
				break;
			case "shm":
				cInst = new Shm(StoreInst);
				break;
			case "shs":
				cInst = new Shs(StoreInst);
				break;
			case "swc":
				cInst = new Swc(StoreInst);
				break;
			case "swl":
				cInst = new Swl(StoreInst);
				break;
			case "swm":
				cInst = new Swm(StoreInst);
				break;
			case "sws":
				cInst = new Sws(StoreInst);
				break;

			// Stack Control
			case "sens":
				cInst = new Sens(StackInst);
				break;
			case "sfree":
				cInst = new Sfree(StackInst);
				break;
			case "sres":
				cInst = new Sres(StackInst);
				break;
			case "sspill":
				cInst = new Sspill(StackInst);
				break;

			// Rest
			case "bcopy":
				cInst = new Bcopy(BcopyInst);
				break;
			case "mfs":
				cInst = new Mfs({pred: inst[0], rd: inst[2], ss: inst[3]});
				break;
			case "mts":
				cInst = new Mts({pred: inst[0], rs1: inst[2], sd: inst[3]});
				break;
			default:
				console.log(`Instruction ${inst[1]} not implemented.`);
				return -1;
		}
		
		// Use dummy storage if (pred) = 0
		if ( ((inst[0] & 0b1000) >>> 3) === this.storage.reg[`p${inst[0] & 0b0111}`] ) {
			state = this.dummy;
		}

		// Execute and increase program counter
		cInst.execute(state);
		this.pc += 1;
		
		return cInst;
	}
}

export default CPU;
