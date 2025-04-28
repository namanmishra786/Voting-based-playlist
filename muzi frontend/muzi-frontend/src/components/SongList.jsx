import { useState, useEffect } from "react";
import {
  fetchSongsByGroup,
  addSong,
  voteSong,
} from "../services/api";

const extractYouTubeID = (url) => {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const SongList = ({ groupId }) => {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    youtubeUrl: "",
  });
  const [nowPlaying, setNowPlaying] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    getSongs();

    const pollInterval = setInterval(() => {
      getSongs(true);
    }, 5000);

    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          moveToNextSong();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(pollInterval);
      clearInterval(countdown);
    };
  }, []);

  const getSongs = async (preservePlaying = false) => {
    try {
      const data = await fetchSongsByGroup(groupId);
      const sorted = [...data].sort(
        (a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
      );
      setSongs(sorted);
      if (!preservePlaying && sorted.length > 0) {
        setNowPlaying(sorted[0]); // top voted becomes now playing
      }
    } catch (error) {
      console.error("❌ Error fetching songs:", error);
    }
  };

  const moveToNextSong = () => {
    if (songs.length <= 1) return;
    const remaining = songs.slice(1);
    setNowPlaying(remaining[0]);
  };

  const handleAddSong = async () => {
    const { title, artist, youtubeUrl } = newSong;
    if (!title || !artist || !youtubeUrl) return alert("Fill all fields");

    try {
      await addSong(groupId, newSong);
      setNewSong({ title: "", artist: "", youtubeUrl: "" });
      getSongs();
    } catch (error) {
      console.error("❌ Error adding song:", error);
    }
  };

  const handleVote = async (songId, upvote) => {
    try {
      await voteSong(groupId, songId, upvote);
      getSongs(true);
    } catch (error) {
      console.error("❌ Error voting:", error);
    }
  };

  return (
    <div className="song-container">
      <h2>🎶 Now Playing:</h2>
      {nowPlaying ? (
        <div>
          <h3>{nowPlaying.title} - {nowPlaying.artist}</h3>
          <iframe
            width="400"
            height="220"
            src={`https://www.youtube.com/embed/${extractYouTubeID(nowPlaying.youtubeUrl)}?autoplay=1`}
            title={nowPlaying.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p>⏱ Next song in: {timeLeft}s</p>
        </div>
      ) : (
        <p>No song playing yet</p>
      )}

      <hr />

      <h3>Add Song</h3>
      <input
        type="text"
        placeholder="Title"
        value={newSong.title}
        onChange={(e) =>
          setNewSong({ ...newSong, title: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Artist"
        value={newSong.artist}
        onChange={(e) =>
          setNewSong({ ...newSong, artist: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="YouTube URL"
        value={newSong.youtubeUrl}
        onChange={(e) =>
          setNewSong({ ...newSong, youtubeUrl: e.target.value })
        }
      />
      <button onClick={handleAddSong}>➕ Add Song</button>

      <h3>🎧 Playlist Voting</h3>
      <ul>
        {songs.map((song, index) => (
          <li key={song.id} style={{ marginBottom: "10px" }}>
            <strong>{index === 0 ? "🔥 " : ""}{song.title} - {song.artist}</strong>
            <p>👍 {song.upvotes} | 👎 {song.downvotes}</p>
            <button onClick={() => handleVote(song.id, true)}>👍 Upvote</button>
            <button onClick={() => handleVote(song.id, false)}>👎 Downvote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
