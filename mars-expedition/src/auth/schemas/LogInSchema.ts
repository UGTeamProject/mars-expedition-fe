import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
    usernameOrEmail: Yup.string().required('This field is required.'),
    password: Yup.string().required('Password is required.'),
});

export default loginValidationSchema;
