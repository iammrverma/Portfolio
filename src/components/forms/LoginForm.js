import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import image from "../../../public/images/login-sprite2.jpg";

const FramerImage = motion(Image);

const LoginForm = ({
  email,
  password,
  onLogin,
  onEmailChange,
  onPasswordChange,
}) => {
  return (
    <div className="w-full flex items-center sm:flex-col">
      <div className="w-1/2 overflow-hidden rounded-lg lg:w-full">
        <FramerImage
          src={image}
          alt={image}
          className="w-full h-full"
          sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </div>
      <form
        onSubmit={onLogin}
        className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6"
      >
        <h2 className="mb-6 text-5xl font-bold  text-dark/75 dark:text-light/75">
          Hello Iammrverma
        </h2>
        <h2 className="mb-4 text-2xl font-bold  text-dark/75 dark:text-light/75">
          Enter Credentials
        </h2>
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
          className="rounded-lg p-2 px-6 text-lg font-semibold bg-dark dark:bg-light text-light dark:text-dark sm:px-4 sm:text-base"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
