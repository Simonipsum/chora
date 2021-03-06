export const parseNum = (input) => typeof input == "number" ? input : Number(input);
export const parseReg = (input) => typeof input == "number" ? input : Number(input.match(/\d+/i)[0]);
export const toUint32 = (n) => n >>> 0;
export const toInt32 = (n) => n | 0;
export const intToHex = (integer, length) => {
	integer = Number(integer);

	if (integer < 0) {
		integer = 0xFFFFFFFF + integer + 1;
	}
	return integer.toString(16).toUpperCase().padStart(length, "0");
};
export const intToHexStr = (integer, length) => {
	return `0x${intToHex(integer, length)}`;
};
