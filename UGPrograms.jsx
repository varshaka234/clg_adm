import React from "react";

const UGPrograms = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-900">Undergraduate Programs</h1>
      <p className="mt-4 text-gray-700">
        Our UG programs provide students with a strong foundation in various disciplines.
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
            <td className="border p-2">B.Tech in Computer Science</td>
            <td className="border p-2">4 Years</td>
            <td className="border p-2">120</td>
          </tr>
          <tr>
            <td className="border p-2">B.Tech in Civil</td>
            <td className="border p-2">4 Years</td>
            <td className="border p-2">120</td>
          </tr>
          <tr>
            <td className="border p-2">B.Tech in Electronics and Communications</td>
            <td className="border p-2">4 Years</td>
            <td className="border p-2">120</td>
          </tr>
          <tr>
            <td className="border p-2">B.Tech in Mechanical Engineering</td>
            <td className="border p-2">4 Years</td>
            <td className="border p-2">60</td>
          </tr>
          <tr>
            <td className="border p-2">BBA (Bachelor of Business Administration)</td>
            <td className="border p-2">3 Years</td>
            <td className="border p-2">80</td>
          </tr>
          <tr>
            <td className="border p-2">BSc in Physics</td>
            <td className="border p-2">3 Years</td>
            <td className="border p-2">30</td>
          </tr>
          <tr>
            <td className="border p-2">BSc in Chemistry</td>
            <td className="border p-2">3 Years</td>
            <td className="border p-2">30</td>
          </tr>
          <tr>
            <td className="border p-2">BSc in Mathematics</td>
            <td className="border p-2">3 Years</td>
            <td className="border p-2">30</td>
          </tr>
          <tr>
            <td className="border p-2">BCA(Bachelor of Computer Application)</td>
            <td className="border p-2">3 Years</td>
            <td className="border p-2">80</td>
          </tr>
          <tr>
            <td className="border p-2">BSc in Botany</td>
            <td className="border p-2">3 Years</td>
            <td className="border p-2">30</td>
          </tr>
          <tr>
            <td className="border p-2">BSc in Zoology</td>
            <td className="border p-2">3 Years</td>
            <td className="border p-2">30</td>
          </tr>
          <tr>
            <td className="border p-2">BSc in Biotechnology</td>
            <td className="border p-2">3 Years</td>
            <td className="border p-2">50</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UGPrograms;
