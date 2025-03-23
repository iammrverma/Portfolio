import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";
import { Accordian, ButtonFill } from "@/components/Card";

import LoginForm from "@/components/forms/LoginForm";
import ProjectForm from "@/components/forms/ProjectForm";
import Head from "next/head";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import SaasForm from "@/components/forms/SaasForm";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Check login status on page load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("Login Successful", userCredential);
      // localStorage.setItem("adminAuth", "true"); // Store login status
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("adminAuth");
  };
  return (
    <>
      <Head>
        <title>Raj Verma | Admin panel</title>
        <meta name="description" content={""} />
      </Head>

      <main className="flex w-full flex-col items-center justtify-center ">
        <Layout className="pt-16">
          {!user ? (
            <LoginForm
              email={email}
              password={password}
              onLogin={handleLogin}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <AnimatedText
                text="Welcome Iammrverma"
                className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
              />
              <ButtonFill text="Log Out" onClick={handleLogout} />

              <Accordian title="Add Project">
                <ProjectForm />
              </Accordian>
              <Accordian title="Add Saas">
                <SaasForm />
              </Accordian>
            </div>
          )}
        </Layout>
      </main>
    </>
  );
};

export default Admin;
