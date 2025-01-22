export const aboutData = {
  metaDescription:
    "Welcome to Raj Verma (iammrverma)'s Portfolio! I am a passionate Front-end Developer with a strong focus on designing simple yet effective websites. Explore my diverse projects and works that showcase my skills in React.js, Tailwind CSS, MUI, MongoDB, Nodejs and Figma. I believe in creativity, innovation, and user-centric design. Let's connect and collaborate on exciting projects.",

  quote: "Passion Fuels Purpose!",

  bio: [
    "Hi, I'm Raj Verma digitally known as iammrverma, a web developer and UI/UX designer with a passion for creating beautiful, functional, and user-centered digital experiences. I am always looking for new and innovative ways to bring my clients' visions to life.",
    "I believe that design is about more than just making things look pretty. It's about solving problems and creating intuitive, enjoyable experiences for users.",
    "Explore my projects or learn more about me by searching for 'iammrverma' on your favourite browser."
  ],

  satisfiedClients: 3,
  projectsCompleted: 4,
  yearsOfExperience: 0,

  workDetails: [
    {
      position: "Sr. IT Executive",
      company: "3T Logistics",
      link: "https://3tl.in",
      time: "June 2024 - Present",
      address: "Rajiv Nagar, Sector 13, 122001 India",
      work: "Built several custom solutions and collaborated with the SEO and development team to enhance digital presence.",
    },

    {
      position: "Frontend Developer | Intern",
      company: "Webmistry",
      link: "https://askwebmistry.com",
      time: "June 2023 - July 2023",
      address: "Krishna Colony, Palwal, 121102 India",
      work: "Worked as a junior front-end developer, converting designs into code. Collaborated with a creative team to enhance designs through innovative thinking and effective implementation. Designed and developed a user-centric landing page for the company.",
    },
  ],

  educationDetails: [
    {
      type: "Master of Computer Applications",
      time: "2024 - Present",
      place: "Amity Online University",
      info: "Relevant courses include Data Structures and Algorithms, Computer Systems Engineering, and Web Technologies.",
    },

    {
      type: "Bachelor of Computer Applications",
      time: "2021 - 2024",
      place: "Gurugram, Haryana",
      info: "Relevant courses included Data Structures and Algorithms, Computer Systems Engineering, and Web Technologies.",
    },
  ],
};

export const saasData = [
  {
    title: "Browse Mate",
    summary:
      "Transform your browser into a personalized masterpiece with Browse Mate! Say goodbye to boring start pages and hello to endless customization. With zero cost and zero data tracking, you can enjoy a secure, stylish, and clutter-free browsing experience tailored to your unique taste. Elevate your productivity and make every click a delight—because your browser should be as unique as you are.",
    image: require("./images/soon.gif").default,
    link: null,
    tags: ["Desktop Only", "Zero Cost", "Zero Data Tracking"],
  },
];
export const projectsData = [
  {
    title: "Rajvi",
    summary:
      "Modern website for a digital agency offering services such as web development, web design, video editing, graphics designing, and digital marketing.",
    link: "https://iammrverma.github.io/Rajvi",
    images: [
      require("./images/projects/rajvi/img1.gif").default,
      require("./images/projects/rajvi/img2.png").default,
      require("./images/projects/rajvi/img3.png").default,
    ],
    githubLink: "https://github.com/iammrverma/Rajvi",
    skills: ["React.js", "Hash Router", "MUI"],
  },
  {
    title: "Airbnb",
    summary:
      "Platform allowing users to search for and book properties, featuring property listings, user authentication, comments, and ratings, similar to Airbnb.",
    link: "https://airbnb-3m2g.onrender.com/listings",
    images: [
      require("./images/projects/airbnb/img1.png").default,
      require("./images/projects/airbnb/img2.png").default,
      require("./images/projects/airbnb/img3.png").default,
    ],
    githubLink: "https://github.com/iammrverma/Airbnb",
    skills: ["MongoDB", "Node.js", "Express.js"],
  },
  {
    title: "Insights On Accounts",
    summary:
      "Full-stack web application with role-based access control, designed to streamline operations for the accounts team, finance team, and CFO. Features separate interfaces for managing daily entries and a consolidated analytical dashboard for the CFO to generate custom insights.",
    images: [
      require("./images/projects/ioa/img1.png").default,
      require("./images/projects/ioa/img2.png").default,
    ],
    githubLink: "https://github.com/iammrverma/demoMatched",
    skills: ["SQL", "Node.js", "Express.js", "Bootstrap"],
  },
  {
    title: "Task Manager",
    summary:
      "TaskTracker is a simple and intuitive task manager application built using HTML, CSS, JavaScript, React, and Bootstrap. It allows users to easily add, manage, and track their tasks.",
    link: "https://iammrverma-tasktracker.netlify.app/",
    images: [
      require("./images/projects/taskmanager/img1.png").default,
      require("./images/projects/taskmanager/img2.png").default,
      require("./images/projects/taskmanager/img3.png").default,
    ],
    githubLink: "https://github.com/iammrverma/Task-Tracker",
    skills: ["React.js", "HTML", "CSS"],
  },
  {
    title: "Python Library",
    summary:
      "Developed a Python library focused on a custom graph called Petersen. This library is a part of Python's graph libraries and is currently under development.",
    images: [
      require("./images/projects/petersen/img1.png").default,
      require("./images/projects/petersen/img2.png").default,
      require("./images/projects/petersen/img3.png").default,
      require("./images/projects/petersen/img4.png").default,
    ],
    githubLink: "https://github.com/iammrverma/Petersen",
    skills: ["Python", "Matplotlib", "NetworkX"],
  },
];
