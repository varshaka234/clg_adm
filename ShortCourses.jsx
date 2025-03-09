import React from "react";

const ShortCourses = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-900">Short-Term Courses</h1>
      <p className="mt-4 text-gray-700">
        These certification courses help enhance skills in specialized areas.
      </p>

      <table className="mt-6 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border p-2">Course</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Seat Intake</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          <tr>
            <td className="border p-2">Certificate in Digital Marketing</td>
            <td className="border p-2">6 Months</td>
            <td className="border p-2">40</td>
          </tr>
          <tr>
            <td className="border p-2">Python Programming for Beginners</td>
            <td className="border p-2">3 Months</td>
            <td className="border p-2">50</td>
          </tr>
          <tr>
            <td className="border p-2">Cyber Security Essentials</td>
            <td className="border p-2">4 Months</td>
            <td className="border p-2">35</td>
          </tr>
          <tr>
            <td className="border p-2">Java Programming for Beginners</td>
            <td className="border p-2">4 Months</td>
            <td className="border p-2">35</td>
          </tr>
          <tr>
            <td className="border p-2">Certificate in Cloud Computing</td>
            <td className="border p-2">4 Months</td>
            <td className="border p-2">35</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShortCourses;
