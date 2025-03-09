import React from "react";

const Downloads = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-900">Downloads</h1>
      <p className="mt-4 text-gray-700">
        Download important brochures, syllabus, and admission forms.
      </p>

      {/* Download List */}
      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800">Admission Documents</h2>
        <ul className="mt-4 space-y-3 text-gray-800">
          <li>
            📄 <a href="/downloads/admission-form.pdf" download className="text-blue-700 hover:underline">
              Download Admission Form
            </a>
          </li>
          <li>
            📄 <a href="/downloads/prospectus-2025.pdf" download className="text-blue-700 hover:underline">
              Download University Prospectus 2025
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800">Syllabus</h2>
        <ul className="mt-4 space-y-3 text-gray-800">
          <li>
            📄 <a href="/downloads/btech-syllabus.pdf" download className="text-blue-700 hover:underline">
              Download B.Tech Syllabus
            </a>
          </li>
          <li>
            📄 <a href="/downloads/mba-syllabus.pdf" download className="text-blue-700 hover:underline">
              Download MBA Syllabus
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-800">Other Documents</h2>
        <ul className="mt-4 space-y-3 text-gray-800">
          <li>
            📄 <a href="/downloads/scholarship-form.pdf" download className="text-blue-700 hover:underline">
              Download Scholarship Form
            </a>
          </li>
          <li>
            📄 <a href="/downloads/exam-rules.pdf" download className="text-blue-700 hover:underline">
              Download Examination Rules
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Downloads;