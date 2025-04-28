// File: src/services/api.js

const API_BASE_URL = "http://localhost:8080/api";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ✅ Login
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

// ✅ Register
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

// ✅ Fetch all groups
export const fetchGroups = async () => {
  const res = await fetch(`${API_BASE_URL}/groups`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Fetch groups failed");
  return res.json();
};

// ✅ Create group
export const createGroup = async (groupName) => {
  const res = await fetch(`${API_BASE_URL}/groups`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ name: groupName }),
  });
  if (!res.ok) throw new Error("Create group failed");
  return res.json();
};

// ✅ Fetch songs in a group
export const fetchSongsByGroup = async (groupId) => {
  const res = await fetch(`${API_BASE_URL}/groups/${groupId}/songs`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Fetch songs failed");
  return res.json();
};

// ✅ Add song to a group
export const addSong = async (groupId, song) => {
  const res = await fetch(`${API_BASE_URL}/groups/${groupId}/songs`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(song),
  });
  if (!res.ok) throw new Error("Add song failed");
  return res.json();
};

// ✅ Upvote/downvote a song
export const voteSong = async (groupId, songId, upvote) => {
  const res = await fetch(
    `${API_BASE_URL}/groups/${groupId}/songs/${songId}/vote?upvote=${upvote}`,
    {
      method: "PUT",
      headers: authHeaders(),
    }
  );
  if (!res.ok) throw new Error("Vote song failed");
  return res.json();
};
