function formatId(id) {
	if (id <= 9) {
		return `#0${id}`;
	}
	return `#${id}`;
}

export default formatId;
