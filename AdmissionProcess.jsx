import React, { useState } from "react";
import RegisterPage from "../pages/RegisterPage";
import PhotoSignUpload from "./PhotoSignUpload";
import ProgramSelection from "./ProgramSelection";
import CenterSelection from "./CenterSelection";

const AdmissionProcess = () => {
  const [step, setStep] = useState(1); // Step starts at 1

  // Function to move to the next step
  const nextStep = () => setStep(step + 1);

  // Function to move to the previous step
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      {step === 1 && <RegisterPage onNext={nextStep} />}
      {step === 2 && <PhotoSignUpload onNext={nextStep} onBack={prevStep} />}
      {step === 3 && <ProgramSelection onNext={nextStep} onBack={prevStep} />}
      {step === 4 && <CenterSelection onNext={nextStep} onBack={prevStep} />}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default AdmissionProcess;
