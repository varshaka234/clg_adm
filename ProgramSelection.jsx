import React, { useState } from "react";

const ProgramSelection = ({ qualification }) => {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [confirmedPrograms, setConfirmedPrograms] = useState(false);
  const [confirmedTests, setConfirmedTests] = useState(false);

  const UGPrograms = ["B.Sc Computer Science", "B.Tech Mechanical", "B.Sc Physics"];
  const PGPrograms = ["MBA", "MCA", "M.Tech Civil", "M.Sc Mathematics"];

  // Determine available programs based on qualification
  const availablePrograms = qualification === "12th" ? UGPrograms : PGPrograms;

  const handleAddProgram = () => {
    if (selectedProgram && !selectedPrograms.includes(selectedProgram)) {
      setSelectedPrograms([...selectedPrograms, selectedProgram]);
      setSelectedProgram("");
    }
  };

  const handleRemoveProgram = (program) => {
    setSelectedPrograms(selectedPrograms.filter((p) => p !== program));
  };

  const handleConfirmPrograms = () => {
    if (selectedPrograms.length > 0) {
      setConfirmedPrograms(true);
    }
  };

  const handleConfirmTests = () => {
    if (confirmedPrograms) {
      setConfirmedTests(true);
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-100 min-h-screen p-6">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Select the Programmes to Apply for</h2>

        {!confirmedPrograms && (
          <>
            <label className="block font-medium mb-2">Select one from the list:</label>
            <select
              className="border rounded-lg p-2 w-full mb-4"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
            >
              <option value="">-- Select Program --</option>
              {availablePrograms.map((program, index) => (
                <option key={index} value={program}>
                  {program}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-4"
              onClick={handleAddProgram}
            >
              Add Program
            </button>
          </>
        )}

        {selectedPrograms.length > 0 && !confirmedPrograms && (
          <div className="mb-4">
            <h3 className="font-bold mb-2">Selected Programs</h3>
            {selectedPrograms.map((program, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-2">
                <span>{program}</span>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-lg"
                  onClick={() => handleRemoveProgram(program)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {!confirmedPrograms ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full mb-2"
            onClick={handleConfirmPrograms}
          >
            Confirm Programmes
          </button>
        ) : (
          <>
            <h3 className="font-bold mt-4">Confirm Your Tests</h3>
            <p className="mb-2">Test names based on selected programs:</p>
            <ul className="list-disc ml-5 mb-4">
              {selectedPrograms.map((program, index) => (
                <li key={index}>{program} Entrance Test</li>
              ))}
            </ul>

            {!confirmedTests ? (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                onClick={handleConfirmTests}
              >
                Confirm Tests
              </button>
            ) : (
              <p className="text-green-600 font-bold mt-4">Tests Confirmed Successfully!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProgramSelection;
