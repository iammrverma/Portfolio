import React from "react";

const LoginForm = ({
  email,
  password,
  onLogin,
  onEmailChange,
  onPasswordChange,
}) => {
  return (
    <form onSubmit={onLogin} className="w-96 p-6 bg-gray-200 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        required
        className="w-full p-2 mb-3 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
