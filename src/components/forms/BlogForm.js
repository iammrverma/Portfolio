import React, { use, useEffect, useState } from "react";
import { createArticle } from "@/firebase";

import ImageInput from "../inputs/ImageInput";
import ArrInput from "../inputs/ArrInput";
import Switch from "../inputs/Switch";
import { ButtonFill } from "../Card";


export function calculateMinRead(content) {
  if (!content) return 0;

  const wordsPerMinute = 200;

  // Strip Markdown syntax (very basic)
  const cleanedContent = content
    .replace(/!\[.*?\]\(.*?\)/g, "") // remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // remove links
    .replace(/`{1,3}.*?`{1,3}/gs, "") // remove inline/code blocks
    .replace(/[#>*_\-\+`]/g, "") // remove markdown symbols
    .replace(/\n+/g, " ") // normalize line breaks
    .trim();

  const words = cleanedContent.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return minutes;
}

const BlogForm = () => {
  const defaultArticleMeta = {
    description: "",
    imageUrl: "",
    isFeatured: false,
    minRead: 0,
    isPublished: false,
    tags: [],
    title: "",
    views: 0,
  };
  const [articleMeta, setArticleMeta] = useState(defaultArticleMeta);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");

  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    try {
      setSaving(true);
      const slug = await createArticle(
        {
          ...articleMeta,
          minRead: calculateMinRead(content),
          imageUrl: images.length ? images[0] : null,
          tags,
        },
        content
      );
      alert(`Article Saved ${slug}`);
      setArticleMeta(defaultArticleMeta);
    } catch (e) {
      console.error("Error creating Article", e);
      alert("Sorry, Failed to save article");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <input
        type="text"
        placeholder="Title"
        value={articleMeta.title}
        onChange={(e) =>
          setArticleMeta((prev) => ({ ...prev, title: e.target.value }))
        }
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Short Description"
        value={articleMeta.description}
        onChange={(e) =>
          setArticleMeta((prev) => ({ ...prev, description: e.target.value }))
        }
        required
        className="w-full p-2 border rounded resize-none h-24"
      />
      <div className="flex gap-4 sm:flex-col">
        <ArrInput arr={tags} setArr={setTags} />
        <ImageInput images={images} setImages={setImages} max={1} />
      </div>

      <div className="flex gap-4 items-center">
        <h3 className="text-md text-dark/75 dark:text-light/75">
          Add in Featured
        </h3>
        <Switch
          enabled={articleMeta.isFeatured}
          setEnabled={() =>
            setArticleMeta((prev) => ({
              ...prev,
              isFeatured: !prev.isFeatured,
            }))
          }
        />
      </div>
      <div className="flex gap-4 items-center">
        <h3 className="text-md text-dark/75 dark:text-light/75">
          Publish on save
        </h3>
        <Switch
          enabled={articleMeta.isPublished}
          setEnabled={() =>
            setArticleMeta((prev) => ({
              ...prev,
              isPublished: !prev.isPublished,
            }))
          }
        />
      </div>
      <textarea
        placeholder="Article content goes here in .md format"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full p-2 border rounded resize-none h-96"
      />
      <div className="flex justify-end">
        <ButtonFill text={saving ? "Saving..." : "Save"} onClick={handleSave} />
      </div>
    </div>
  );
};

export default BlogForm;
