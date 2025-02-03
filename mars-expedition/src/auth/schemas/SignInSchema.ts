import * as Yup from 'yup';

const passwordError = `Password must be 8-16 characters long and must contain at least one 
  lowercase letter, one uppercase letter, one number and a special character.`;

const signinValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username should have at least 3 characters.')
        .matches(/^[a-zA-Z0-9_.]+$/, 'Username should only contain letters, numbers, _ or .')
        .required('Username is required.'),
    email: Yup.string().email('Invalid e-mail.').required('E-mail is required.'),
    password: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.<>-]).{8,16}$/, passwordError)
        .required('Password is required'),
});

export default signinValidationSchema;
