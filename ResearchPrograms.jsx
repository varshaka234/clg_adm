import React from "react";

const ResearchPrograms = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-900">Research Programs</h1>
      <p className="mt-4 text-gray-700">
        Our research programs offer opportunities for innovation and discovery in various disciplines.
      </p>

      <h2 className="text-2xl font-semibold text-blue-800 mt-6">PhD Programs</h2>

      {/* Table for Course Duration & Seat Intake */}
      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border p-2">Program</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Seat Intake</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          <tr>
            <td className="border p-2">PhD in Computer Science & Engineering</td>
            <td className="border p-2">3-5 Years</td>
            <td className="border p-2">15</td>
          </tr>
          <tr>
            <td className="border p-2">PhD in Mechanical Engineering</td>
            <td className="border p-2">3-5 Years</td>
            <td className="border p-2">10</td>
          </tr>
          <tr>
            <td className="border p-2">PhD in Biotechnology</td>
            <td className="border p-2">3-5 Years</td>
            <td className="border p-2">8</td>
          </tr>
          <tr>
            <td className="border p-2">PhD in Environmental Science</td>
            <td className="border p-2">3-5 Years</td>
            <td className="border p-2">12</td>
          </tr>
          <tr>
            <td className="border p-2">PhD in Business Management</td>
            <td className="border p-2">3-5 Years</td>
            <td className="border p-2">10</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold text-blue-800 mt-6">Research Facilities</h2>
      <p className="mt-2 text-gray-700">
        Our university provides state-of-the-art laboratories, funding opportunities, and collaborations with top research institutions worldwide.
      </p>

      <h2 className="text-2xl font-semibold text-blue-800 mt-6">How to Apply?</h2>
      <p className="mt-2 text-gray-700">
        Interested candidates can apply by submitting a research proposal and meeting the eligibility criteria.
      </p>
    </div>
  );
};

export default ResearchPrograms;
