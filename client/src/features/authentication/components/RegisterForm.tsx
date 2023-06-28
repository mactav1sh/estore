import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { FormButton } from '../../../components';

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });

  const { signUp, error } = useAuth();

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
    const { name, email, password, passwordConfirm } = formValues;
    // MAKE THE HTTP REQUEST
    await signUp(name, email, password, passwordConfirm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex  flex-col rounded-md">
      {/* -- USERNAME */}
      <div className="mb-3 flex flex-col space-y-1">
        <label htmlFor="name" className=" font-semibold">
          Username
        </label>
        <input
          id="name"
          type="text"
          placeholder="John123"
          className="rounded-md border-2 py-1 px-2"
          onChange={handleChange}
        />
      </div>
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
      <div className="mb-3 flex flex-col space-y-1">
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

      {/* -- CONFIRM PASSWORD */}
      <div className="mb-7 flex flex-col space-y-1">
        <label htmlFor="passwordConfirm" className=" font-semibold">
          Confirm Password
        </label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder="Confirm your password"
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
      <FormButton title="Register" />
    </form>
  );
};

export default RegisterForm;
