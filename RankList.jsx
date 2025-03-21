import React, { useEffect, useState } from "react";
import axios from "axios";

const RankList = () => {
    const [rankList, setRankList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/ranklist")
            .then((response) => {
                setRankList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching rank list:", error);
            });
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold mb-4">Rank List</h2>
            <table className="border-collapse border border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Rank</th>
                        <th className="border p-2">Student Name</th>
                        <th className="border p-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {rankList.map((student, index) => (
                        <tr key={index} className="border">
                            <td className="border p-2">{student.rank_position}</td>
                            <td className="border p-2">{student.name}</td>
                            <td className="border p-2">{student.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RankList;
