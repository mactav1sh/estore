import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

export const Login = () => {
  return (
    <Layout
      title="Login"
      additionalContent={{
        text: "Don't have an Account?",
        boldtext: 'Register here',
        linkTo: 'register',
      }}
    >
      <LoginForm />
    </Layout>
  );
};
