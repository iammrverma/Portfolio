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
    .replace(/[^\w\s-]/g, "") // remove all special characters except hyphens and spaces
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
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

const fetchArticle = async (slug) => {
  try {
    const docRef = doc(db, "articles", slug);
    const articleSnap = await getDoc(docRef);

    if (articleSnap.exists()) {
      return { id: articleSnap.id, ...articleSnap.data() };
    } else {
      console.warn(`Article with slug "${slug}" not found.`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
};

const fetchArticlesMeta = async (slug = "") => {
  const auth = getAuth(app); //plement firestore rule instead of client side filtering.
  if (slug) {
    try {
      const docRef = doc(db, "articlesMeta", slug);
      const articleMetaSnap = await getDoc(docRef);
      if (articleMetaSnap.exists()) {
        const articleMeta = articleMetaSnap.data();
        if (articleMeta.isPublished)
          return { id: articleMetaSnap.id, ...articleMeta };
        if (auth.currentUser) return { id: articleMetaSnap.id, ...articleMeta };
      } else {
        console.warn(`ArticleMeta with slug "${slug}" not found.`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching articleMeta:", error);
      return null;
    }
  }
  try {
    const querySnapshot = await getDocs(collection(db, "articlesMeta"));
    const articlesMeta = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return auth.currentUser
      ? articlesMeta
      : articlesMeta.filter((a) => a.isPublished);
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

export const fetchWithCache = async (
  cacheKey,
  fetchFn,
  ttl = 5 * 60 * 1000
) => {
  try {
    // 1. Check cache
    // Only use localStorage in the browser
    if (typeof window !== "undefined" && window.localStorage) {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const { data, expiry } = JSON.parse(cachedData);
        if (Date.now() < expiry) return { data, fromCache: true }; // Still valid
      }
    }

    // 2. Fetch fresh data
    const data = await fetchFn();

    // 3. Store in cache with expiry
    // Only use localStorage in the browser
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          data,
          expiry: Date.now() + ttl, // default 5 min
        })
      );
    }

    return { data, fromCache: false };
  } catch (error) {
    console.error(`Cache fetch error for ${cacheKey}:`, error);
    return { data: null, expiry: null };
  }
};

export const getProjects = async () => {
  const startTime = performance.now(); // Start time
  const { data, fromCache} = await fetchWithCache(
    "projects",
    () => fetchProjects(),
    60 * 60 * 1000
  );

  // Converting firestore timestamps to ISO strings
  const normalizedData = Array.isArray(data)
    ? data.map((item) =>
        item.timestamp?.toDate
          ? { ...item, timestamp: item.timestamp.toDate().toISOString() }
          : item
      )
    : data?.timestamp?.toDate
    ? { ...data, timestamp: data.timestamp.toDate().toISOString() }
    : data;
  
  return {
    data: normalizedData,
    source: fromCache ? "local" : "cloud",
    time: (performance.now() - startTime).toFixed(2) + "ms",
  };
};

export const getSaas = async () => {
  const startTime = performance.now(); // Start time
  const { data, fromCache } = await fetchWithCache("saas", () => fetchSaas(), 60 * 60 * 1000);

    // Converting firestore timestamps to ISO strings
  const normalizedData = Array.isArray(data)
    ? data.map((item) =>
        item.timestamp?.toDate
          ? { ...item, timestamp: item.timestamp.toDate().toISOString() }
          : item
      )
    : data?.timestamp?.toDate
    ? { ...data, timestamp: data.timestamp.toDate().toISOString() }
    : data;
  
  return {
    data: normalizedData,
    source: fromCache ? "local" : "cloud",
    time: (performance.now() - startTime).toFixed(2) + "ms",
  };
};

export const getArticle = async (slug) => {
  const startTime = performance.now(); //Start time
  const { data, fromCache } = await fetchWithCache(
    "article" + slug,
    () => fetchArticle(slug),
    24 * 60 * 60 * 1000
  );
  // Convert Firestore Timestamp → ISO string
  if (data.timestamp && data.timestamp.toDate) {
    data.timestamp = data.timestamp.toDate().toISOString();
  }
  return {
    data,
    source: fromCache ? "local" : "cloud",
    time: (performance.now() - startTime).toFixed(2) + "ms",
  };
};

export const getArticlesMeta = async (slug = "") => {
  const startTime = performance.now(); // Start time
  const { data, fromCache } = await fetchWithCache(
    "articlesMeta",
    () => fetchArticlesMeta(slug),
    60 * 60 * 1000
  );

  // Converting firestore timestamps to ISO strings
  const normalizedData = Array.isArray(data)
    ? data.map((item) =>
        item.timestamp?.toDate
          ? { ...item, timestamp: item.timestamp.toDate().toISOString() }
          : item
      )
    : data?.timestamp?.toDate
    ? { ...data, timestamp: data.timestamp.toDate().toISOString() }
    : data;

  return {
    data: normalizedData,
    source: fromCache ? "local" : "cloud",
    time: (performance.now() - startTime).toFixed(2) + "ms",
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
    return docRef.id; // Return the ID of the added document
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};
