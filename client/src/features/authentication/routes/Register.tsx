import Layout from '../components/Layout';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <Layout
      title="create a new account"
      additionalContent={{
        text: 'Already have an Account?',
        boldtext: 'Login here',
        linkTo: 'login',
      }}
    >
      <RegisterForm />
    </Layout>
  );
};

export default Register;
