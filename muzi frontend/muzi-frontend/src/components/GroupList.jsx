import { useState, useEffect } from "react";
import { fetchGroups, createGroup } from "../services/api";
import SongList from "./SongList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);

  const getGroups = async () => {
    try {
      const data = await fetchGroups();
      setGroups(data);
    } catch (err) {
      console.error("Failed to fetch groups:", err);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleCreateGroup = async () => {
    if (!newGroupName) return;
    try {
      await createGroup(newGroupName);
      setNewGroupName("");
      getGroups();
    } catch (err) {
      console.error("Failed to create group:", err);
    }
  };

  if (selectedGroup) {
    return <SongList groupId={selectedGroup.id} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <h1 className="text-4xl font-bold mb-4">🎵 Join or Create a Music Group</h1>

      <div className="flex items-center gap-2">
        <Input
          className="bg-white text-black"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="Enter group name"
        />
        <Button onClick={handleCreateGroup}>Create</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {Array.isArray(groups) &&
          groups.map((group) => (
            <Card
              key={group.id}
              className="hover:bg-muted cursor-pointer transition-all duration-200 w-64"
              onClick={() => setSelectedGroup(group)}
            >
              <CardContent className="p-4 text-center text-lg font-medium">
                🎤 {group.name}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default GroupList;
