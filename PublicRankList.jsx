import { useEffect, useState } from "react";
import axios from "axios";

const PublicRankList = () => {
    const [rankList, setRankList] = useState([]);

    useEffect(() => {
        axios.get("/api/public-ranklist")
            .then(res => setRankList(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Public Rank List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {rankList.map((student, index) => (
                        <tr key={index}>
                            <td>{student.rank}</td>
                            <td>{student.name}</td>
                            <td>{student.marks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PublicRankList;
