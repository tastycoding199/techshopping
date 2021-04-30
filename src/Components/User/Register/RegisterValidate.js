export default function (values) {
	let error = {};
	if (!values.username) {
		error.username = 'User Name cannot be null';
	} else if (!values.password) {
		error.password = 'Passowrd cannot be null';
	} else if (!values.confirm) {
		error.confirm = 'Confirm password cannot be null';
	} else if (values.confirm !== values.password) {
		error.confirm = 'Confirm password is not match with password';
	}

	return error;
}
