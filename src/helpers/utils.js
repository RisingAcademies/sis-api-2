export default (number, size) => {
	let s = number.toString();
	while (s.length < (size || 2)) {
		s = `0${s}`;
	}
	return s;
};
