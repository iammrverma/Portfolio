import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDT17V8DKY9CKoZCLB27T4xQMAxHyzypwk",
  authDomain: "portfolio-533b7.firebaseapp.com",
  projectId: "portfolio-533b7",
  storageBucket: "portfolio-533b7.firebasestorage.com",
  messagingSenderId: "805706449107",
  appId: "1:805706449107:web:d0e9d182da73bo679d5426",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

const fetchProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return projects;
  } catch (error) {
    console.log("Error getting documents: ", error);
    return [];
  }
};

const createTimestamp = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // Full month name
  const year = date.getFullYear();
  return `${day}${month}${year}`; // Example: 15March2025
};

export const getProjects = async () => {
  const startTime = performance.now(); // Start time

  const cachedProjects = localStorage.getItem("projects");
  const storedTimestamp = localStorage.getItem("projectsTimestamp");
  const currentTimestamp = createTimestamp();

  // Check if cached data is still valid
  if (cachedProjects && storedTimestamp === currentTimestamp) {
    const endTime = performance.now(); // End time
    return {
      projects: JSON.parse(cachedProjects),
      source: "local",
      time: (endTime - startTime).toFixed(2) + "ms",
    };
  }

  // Fetch fresh data if timestamp doesn't match or data is missing
  const projects = await fetchProjects();

  // Update localStorage
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("projectsTimestamp", currentTimestamp);
  
  // return projects;
  const endTime = performance.now(); // End time
  return {projects, source: "cloud", time: (endTime - startTime).toFixed(2) + "ms"};
};

export const addProject = async (project) => {
  const auth = getAuth();
  console.log("Auth User Email Before Firestore Request:", auth.currentUser?.email);
  console.log("Adding project to Firestore:", project);
  
  try {
    const docRef = await addDoc(collection(db, "projects"), {...project, timestamp: serverTimestamp()});
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};