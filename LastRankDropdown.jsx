import { useState, useEffect } from "react";

const LastRankDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastRank, setLastRank] = useState(null);

  useEffect(() => {
    // Fetch last rank from backend
    fetch("http://localhost:5000/last-rank")
      .then((res) => res.json())
      .then((data) => setLastRank(data.lastRank))
      .catch((err) => console.error("Error fetching last rank:", err));
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-blue-600 font-semibold hover:underline"
      >
        Last Rank
      </button>
      
      {isOpen && (
        <div className="absolute bg-white border shadow-lg mt-2 p-4 rounded w-48">
          <h3 className="text-sm font-bold">Last Admitted Rank</h3>
          <p className="text-gray-700">{lastRank ? lastRank : "Loading..."}</p>
        </div>
      )}
    </div>
  );
};

export default LastRankDropdown;
