import { useEffect, useState } from "react";
import axios from "axios";

const ExamDetails = () => {
    const [examDetails, setExamDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/exam-details")
            .then(response => {
                console.log("Fetched Exam Details:", response.data);
                setExamDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching exam details:", error);
                setError("Failed to load exam details");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading exam details...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Exam Details</h2>
            <p><strong>Date:</strong> {examDetails.date}</p>
            <p><strong>Time:</strong> {examDetails.time}</p>
            <p><strong>Center:</strong> {examDetails.center}</p>
        </div>
    );
};

export default ExamDetails;
