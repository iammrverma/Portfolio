import React, { useState } from "react";
import SkillsInput from "../inputs/SkillsInput";
import ImageInput from "../inputs/ImageInput";
import { addProject } from "@/firebase";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [images, setImages] = useState([]);
  const [link, setLink] = useState("");
  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState("");

  return (
    <>
      <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
        Projects
      </h2>
      {/*title, githubLink, images, link, skills, summary */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        placeholder="GitHub Link"
        value={githubLink}
        onChange={(e) => setGithubLink(e.target.value)}
        required
        className="w-full p-2 mb-3 border rounded"
      />

      <ImageInput images={images} setImages={setImages} />

      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
        className="w-full p-2 mb-3 border rounded"
      />
      <SkillsInput skills={skills} setSkills={setSkills} />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        required
        className="w-full p-2 mb-3 border rounded"
      />
      <button
        onClick={() =>{
          addProject({ title, githubLink, images, link, skills, summary });
          setGithubLink("");
          setImages([]);
          setLink("");
          setSkills([]);
          setSummary("");
          setTitle("");
        }
        }
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Add Project
      </button>
    </>
  );
};

export default ProjectForm;
