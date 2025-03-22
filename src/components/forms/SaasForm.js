import React, { useState } from "react";
import { addSaas } from "@/firebase";
import { ButtonFill } from "../Card";

import ArrInput from "../inputs/ArrInput";
import ImageInput from "../inputs/ImageInput";

const SaasForm = () => {
  const [title, setTitle] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [link, setLink] = useState("");
  const [summary, setSummary] = useState("");
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState([]);

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
        <ArrInput arr={features} setArr={setFeatures} />
        <ImageInput images={images} setImages={setImages} max={1} />
      </div>
      <div className="flex justify-end">
        <ButtonFill
          text="Add Project"
          onClick={() => {
            addSaas({ title, githubLink, images, link, features, summary });
            setGithubLink("");
            setImages([]);
            setLink("");
            setFeatures([]);
            setSummary("");
            setTitle("");
          }}
        />
      </div>
    </div>
  );
};

export default SaasForm;
