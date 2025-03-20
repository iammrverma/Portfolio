import { useState } from "react";

const SkillsInput = ({skills, setSkills}) => {
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
    <div className="w-96 p-6 bg-gray-200 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Enter Your Skills</h2>
      <input
        type="text"
        placeholder="Press Enter to add skill"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-2 mb-3 border rounded"
      />
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div key={index} className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
            {skill}
            <button
              onClick={() => removeSkill(index)}
              className="ml-2 text-white bg-red-500 px-2 rounded"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
