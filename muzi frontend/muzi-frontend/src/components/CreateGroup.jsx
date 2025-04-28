import { useState } from "react";
import { createGroup } from "../services/api";

const CreateGroup = ({ onGroupCreated }) => {
  const [groupName, setGroupName] = useState("");

  const handleCreate = async () => {
    if (!groupName) return alert("Group name cannot be empty!");

    try {
      await createGroup(groupName);
      setGroupName("");
      onGroupCreated(); // Refresh the group list
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div>
      <h3>Create a New Group</h3>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateGroup;
