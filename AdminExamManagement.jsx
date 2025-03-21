import { useState, useEffect } from "react";

export default function AdminExamManagement() {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({ exam_name: "", exam_date: "", duration: "", total_marks: "" });

  useEffect(() => {
    fetch("/api/exams")
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/exams/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    window.location.reload();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Exam Management</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" placeholder="Exam Name" className="border p-2 m-2" onChange={(e) => setForm({ ...form, exam_name: e.target.value })} />
        <input type="date" className="border p-2 m-2" onChange={(e) => setForm({ ...form, exam_date: e.target.value })} />
        <input type="number" placeholder="Duration (mins)" className="border p-2 m-2" onChange={(e) => setForm({ ...form, duration: e.target.value })} />
        <input type="number" placeholder="Total Marks" className="border p-2 m-2" onChange={(e) => setForm({ ...form, total_marks: e.target.value })} />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Exam</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Exam Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td className="border p-2">{exam.exam_name}</td>
              <td className="border p-2">{exam.exam_date}</td>
              <td className="border p-2">{exam.duration} mins</td>
              <td className="border p-2">{exam.total_marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
