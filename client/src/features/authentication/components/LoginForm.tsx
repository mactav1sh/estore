import React, { useState } from 'react';
import FormButton from '../../../components/elements/FormButton';
import useAuth from '../../../hooks/useAuth';

const LoginForm = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const { signIn, error } = useAuth();

  // Handle inputs change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  // Handle submitting form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formValues;
    // MAKE THE HTTP REQUEST
    const user = await signIn(email, password);
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit} className="flex  flex-col rounded-md">
      {/* -- EMAIL */}
      <div className="mb-3 flex flex-col space-y-1">
        <label htmlFor="email" className=" font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="John@email.com"
          className="rounded-md border-2 py-1 px-2"
          onChange={handleChange}
        />
      </div>
      {/* -- PASSWORD */}
      <div className="mb-7 flex flex-col space-y-1">
        <label htmlFor="password" className=" font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="rounded-md border-2 py-1 px-2"
          onChange={handleChange}
        />
      </div>

      {/* -- ERROR */}
      {error && (
        <h1 className="mb-2 border border-red-600 py-1 text-center text-sm font-semibold capitalize text-red-600">
          {error.message}
        </h1>
      )}

      {/* -- SUBMIT BUTTON */}
      <FormButton title="Login" />
    </form>
  );
};

export default LoginForm;
