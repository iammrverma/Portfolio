import React, { useState } from "react";
import SkillsInput from "../inputs/SkillsInput";
import ImageInput from "../inputs/ImageInput";
import { addProject } from "@/firebase";
import { ButtonFill } from "../Card";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [images, setImages] = useState([]);
  const [link, setLink] = useState("");
  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState("");

  return (
    <div className="w-full flex flex-col gap-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <div className="flex item-start justify-between gap-4 sm:flex-col">
        <input
          type="text"
          placeholder="GitHub Link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <textarea
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        required
        className="w-full p-2 border rounded resize-none h-24"
      />
      <div className="flex item-start justify-between gap-4 sm:flex-col">
        <SkillsInput skills={skills} setSkills={setSkills} />
        <ImageInput images={images} setImages={setImages} />
      </div>
      <div className="flex justify-end">
        <ButtonFill
          text="Add Project"
          onClick={() => {
            addProject({ title, githubLink, images, link, skills, summary });
            setGithubLink("");
            setImages([]);
            setLink("");
            setSkills([]);
            setSummary("");
            setTitle("");
          }}
        />
      </div>
    </div>
  );
};

export default ProjectForm;
