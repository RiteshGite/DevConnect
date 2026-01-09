const validator = require("validator");

const validateSignUpData = (req) => {
    // logic for validation 
    const { firstName, lastName, emailId, password } = req;
    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("Fields are empty");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Password is weak");
    }
}

const validateProfileEdit = (data) => {
    const allowedEditFields = [
        'firstName', 'lastName', 'age', 'about', "photoUrl", 'skills', 'gender'
    ]
    const isEditAllowed = Object.keys(data).every(field => allowedEditFields.includes(field));
    return isEditAllowed;
}

module.exports = {
    validateSignUpData, validateProfileEdit
}