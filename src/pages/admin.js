import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";
import LoginForm from "@/components/forms/LoginForm";
import ProjectForm from "@/components/forms/ProjectForm";

const admin = () => {
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
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      {!user ? (
        <LoginForm
          email={email}
          password={password}
          onLogin={handleLogin}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
        />
      ) : (
        <>
          <div>Admin</div>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded"
          >
            Log Out
          </button>
          <ProjectForm />
        </>
      )}
    </div>
  );
};

export default admin;
