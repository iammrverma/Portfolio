import { useState } from "react";
import { Label } from "../Card";
import { Delete } from "../Icons";

const SkillsInput = ({ skills, setSkills }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setSkills([...skills, inputValue.trim()]);
      setInputValue(""); // Clear input after adding
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full p-6 flex flex-col gap-2 rounded-lg text-dark/75 dark:text-light/75 border">
      <h2 className="text-lg font-bold">Enter Your Skills</h2>
      <div className="flex flex-wrap gap-2 ">
        {skills.map((skill, index) => (
          <Label
            key={index}
            text={skill}
            icon={<Delete width="16" height="16" />}
            onIconClick={() => removeSkill(index)}
          />
        ))}
      </div>
      <input
        type="text"
        placeholder="Press Enter to add skill"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border rounded text-dark"
      />
    </div>
  );
};

export default SkillsInput;
