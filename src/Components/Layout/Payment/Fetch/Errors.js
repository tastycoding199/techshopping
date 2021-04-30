function Errors(value) {
	let error = {};

	if (!value.address) {
		error.address = 'Address is required';
	}else if (!value.phoneNumber) {
		error.phoneNumber = 'Phone number is required';
	}
    else if (!value.phoneNumber.match(/[0-9]/)) {
		error.phoneNumber = 'Phone number must be number';
	}
    return error;
}

export default Errors;
