import React from "react";

const PGPrograms = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-900">Postgraduate Programs</h1>
      <p className="mt-4 text-gray-700">
        Our PG programs offer advanced knowledge and specialization in various fields.
      </p>

      <table className="mt-6 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border p-2">Program</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Seat Intake</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          <tr>
            <td className="border p-2">M.Tech in Artificial Intelligence</td>
            <td className="border p-2">2 Years</td>
            <td className="border p-2">30</td>
          </tr>
          <tr>
            <td className="border p-2">M.Tech in Computer Science</td>
            <td className="border p-2">2 Years</td>
            <td className="border p-2">30</td>
          </tr>
          <tr>
            <td className="border p-2">M.Tech in Electronics and Communications</td>
            <td className="border p-2">2 Years</td>
            <td className="border p-2">30</td>
          </tr>
          <tr>
            <td className="border p-2">Master of Computer Application</td>
            <td className="border p-2">2 Years</td>
            <td className="border p-2">60</td>
          </tr>
          <tr>
            <td className="border p-2">MSc in Data Science</td>
            <td className="border p-2">2 Years</td>
            <td className="border p-2">40</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PGPrograms;
