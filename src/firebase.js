import { getFirestore, collection, getDocs, addDoc, serverTimestamp, setDoc, doc, getDoc, } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDT17V8DKY9CKoZCLB27T4xQMAxHyzypwk",
  authDomain: "portfolio-533b7.firebaseapp.com",
  projectId: "portfolio-533b7",
  storageBucket: "portfolio-533b7.firebasestorage.com",
  messagingSenderId: "805706449107",
  appId: "1:805706449107:web:d0e9d182da73bo679d5426",
};

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove all special characters except hyphens and spaces
    .replace(/\s+/g, '-')       // replace spaces with hyphens
    .replace(/-+/g, '-')        // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');   // trim leading/trailing hyphens
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

const fetchSaas = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "saas"));
    const saas = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return saas;
  } catch (error) {
    console.log("Error getting documents: ", error);
    return [];
  }
};

const fetchArticlesMeta = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "articlesMeta"));
    const articlesMeta = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return articlesMeta;
  } catch (error) {
    console.log("Failed to fetch articlesMeta");
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
  return {
    projects,
    source: "cloud",
    time: (endTime - startTime).toFixed(2) + "ms",
  };
};

export const getSaas = async () => {
  const startTime = performance.now(); // Start time

  const cachedSaas = localStorage.getItem("saas");
  const saasTimestamp = localStorage.getItem("saasTimestamp");
  const currentTimestamp = createTimestamp();

  // Check if cached data is still valid
  if (cachedSaas && saasTimestamp === currentTimestamp) {
    const endTime = performance.now(); // End time
    return {
      saas: JSON.parse(cachedSaas),
      source: "local",
      time: (endTime - startTime).toFixed(2) + "ms",
    };
  }

  // Fetch fresh data if timestamp doesn't match or data is missing
  const saas = await fetchSaas();

  // Update localStorage
  localStorage.setItem("saas", JSON.stringify(saas));
  localStorage.setItem("saasTimestamp", currentTimestamp);

  // return projects;
  const endTime = performance.now(); // End time
  return {
    saas,
    source: "cloud",
    time: (endTime - startTime).toFixed(2) + "ms",
  };
};

export const getArticlesMeta = async () => {
  const startTime = performance.now(); // Start time

  const cachedArticlesMeta = localStorage.getItem("articlesMeta");
  const storedTimestamp = localStorage.getItem("articlesMetaTimestamp");
  const currentTimestamp = createTimestamp();

  // Check if cached data is still valid
  if (cachedArticlesMeta && storedTimestamp === currentTimestamp) {
    const endTime = performance.now(); // End time
    return {
      articlesMeta: JSON.parse(cachedArticlesMeta),
      source: "local",
      time: (endTime - startTime).toFixed(2) + "ms",
    };
  }

  // Fetch fresh data if timestamp doesn't match or data is missing
  const articlesMeta = await fetchArticlesMeta();

  // Update localStorage
  localStorage.setItem("articlesMeta", JSON.stringify(articlesMeta));
  localStorage.setItem("articlesMetaTimestamp", currentTimestamp);

  // return projects;
  const endTime = performance.now(); // End time
  return {
    articlesMeta,
    source: "cloud",
    time: (endTime - startTime).toFixed(2) + "ms",
  };
};

export const addProject = async (project) => {
  const auth = getAuth();
  if (!auth.currentUser) {
    console.error("User not logged in");
    return null;
  }
  if (
    !project.title ||
    !project.summary ||
    !project.skills ||
    !Array.isArray(project.images)
  ) {
    console.error(
      "Missing required fields: Ensure title, summary, skills, and attleast one image is provided"
    );
    return null;
  }
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...project,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return the ID of the added document
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};

export const addSaas = async (saas) => {
  const auth = getAuth();
  if (!auth.currentUser) {
    console.error("User not logged in");
    return null;
  }
  
  if (
    !saas.title ||
    !saas.summary ||
    !saas.link ||
    !Array.isArray(saas.images) ||
    !saas.images.length === 1 || // ensures that only one image is uploaded but in a array
    !Array.isArray(saas.features) ||
    saas.features.length === 0 
  ) {
    console.error(
      "Missing required fields: Ensure title, summary, skills, image and link is provided"
    );
    return null;
  }
  try {
    const docRef = await addDoc(collection(db, "saas"), {
      ...saas,
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return the ID of the added document
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};

const addArticleMeta = async (slug, articleMeta) => {
  const docRef = doc(db, "articlesMeta", slug);
  await setDoc(docRef, {
    ...articleMeta,
    slug,
    minRead: 0,
    status: "draft",
    timestamp: serverTimestamp(),
  });
  return slug;
};

const addArticle = async (slug, content) => {
  const docRef = doc(db, "articles", slug);
  await setDoc(docRef, {
    slug,
    content,
    timestamp: serverTimestamp(),
  });
  return slug;
};

export const createArticle = async (articleMeta, content) => {
  const auth = getAuth();
  if (!auth.currentUser) {
    console.error("User not logged in");
    return null;
  }

  if (
    !articleMeta.description ||
    !articleMeta.imageUrl ||
    !articleMeta.isFeatured ||
    !articleMeta.title ||
    !Array.isArray(articleMeta.tags) ||
    articleMeta.tags.length === 0 ||
    !content
  ) {
    console.error("Missing required fields");
    return null;
  }

  const baseSlug = generateSlug(articleMeta.title);
  let finalSlug = baseSlug;
  let counter = 1;

  const checkSlugAvailability = async (slug) => {
    const docRef = doc(db, "articlesMeta", slug);
    const docSnap = await getDoc(docRef);
    return !docSnap.exists();
  };

  while (!(await checkSlugAvailability(finalSlug))) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  try {
    await addArticleMeta(finalSlug, articleMeta);
    await addArticle(finalSlug, content);
    console.log("Article created with slug:", finalSlug);
    return finalSlug;
  } catch (e) {
    console.error("Error creating article:", e);
    return null;
  }
};
