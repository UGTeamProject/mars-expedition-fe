import { Link, useNavigate } from 'react-router-dom';
import { Form, ErrorMessage, Field, Formik } from 'formik';
import loginValidationSchema from '../schemas/LogInSchema';
import { useAuth } from '../useAuth';
import '../auth.css';

function LogIn() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (values: { usernameOrEmail: string; password: string }) => {
        try {
            await login(values);
            navigate('/play');
        } catch (error) {
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
                    <h2>Return to your colony</h2>
                    <Formik
                        initialValues={{ usernameOrEmail: '', password: '' }}
                        validationSchema={loginValidationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ isSubmitting }) => (
                            <Form className="login-form">
                                <div className="form-field">
                                    <Field name="usernameOrEmail" as="input" placeholder="Username or e-mail" />
                                    <div className="error-msg">
                                        <ErrorMessage name="usernameOrEmail" />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <Field name="password" as="input" type="password" placeholder="Password" />
                                    <div className="error-msg">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>
                                <button type="submit" className="signup-btn" disabled={isSubmitting}>
                                    Log in
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <p>
                        Don't have an account?
                        <Link to="/signup" className="link">
                            Sign up
                        </Link>
                        !
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
