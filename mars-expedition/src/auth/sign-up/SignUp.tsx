import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import signinValidationSchema from '../schemas/SignInSchema';
import { ErrorMessage, Field, Form, Formik } from 'formik';

function SignUp() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const goToMain = () => navigate('/play');

    const handleLogin = (values: { username: string; email: string; password: string }) => {
        // temporary login with fakeUser before connecting with API
        const fakeUser = { username: 'User123', email: 'user@example.com', password: '1234Aa.!a' };
        if (
            values.username === fakeUser.username &&
            values.email === fakeUser.email &&
            values.password === fakeUser.password
        ) {
            signup(fakeUser);
            goToMain();
        } else {
            alert('Invalid username/email or password.');
        }
    };

    return (
        <div className="page">
            <Link to="/">
                <img src="logo.png" alt="Mars Expedition" />
            </Link>
            <div className="content">
                <div className="form-content">
                    <h2>Become a pioneer. Lead your people to Mars.</h2>
                    <Formik
                        initialValues={{ username: '', email: '', password: '' }}
                        validationSchema={signinValidationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ isSubmitting }) => (
                            <Form className="signup-form">
                                <div className="form-fields">
                                    <div className="form-field">
                                        <Field name="username" as="input" placeholder="Username" />
                                        <div className="error-msg">
                                            <ErrorMessage name="username" />
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <Field name="email" as="input" placeholder="E-mail" />
                                        <div className="error-msg">
                                            <ErrorMessage name="email" />
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <Field name="password" as="input" type="password" placeholder="Password" />
                                        <div className="error-msg">
                                            <ErrorMessage name="password" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="signup-btn" disabled={isSubmitting}>
                                    Sign up
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <p>
                        Already have an account?
                        <Link to="/login" className="link">
                            Log in
                        </Link>
                        !
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
