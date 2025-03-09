import React, { useState } from "react";

const AdmissionForm = () => {
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [keraliteStatus, setKeraliteStatus] = useState("");
  const [nriQuota, setNriQuota] = useState("");
  const [cgwQuota, setCgwQuota] = useState("");
  const [differentlyAbled, setDifferentlyAbled] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Personal Details</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Nationality</label>
          <input type="text" value="Indian" readOnly className="w-full border p-2 rounded-md" />
        </div>
        <div>
          <label className="block font-semibold">Aadhar Number</label>
          <input type="text" className="w-full border p-2 rounded-md" />
        </div>
        <div>
          <label className="block font-semibold">Alternate Mobile Number</label>
          <input type="text" className="w-full border p-2 rounded-md" />
        </div>
      </div>
      
      <h2 className="text-xl font-bold mt-6 mb-4">Permanent Address</h2>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Address" className="w-full border p-2 rounded-md" />
        <select className="w-full border p-2 rounded-md">
          <option>Select State</option>
        </select>
        <input type="text" placeholder="District" className="w-full border p-2 rounded-md" />
        <input type="text" placeholder="Pincode" className="w-full border p-2 rounded-md" />
      </div>
      
      <label className="block mt-4">
        <input type="checkbox" onChange={() => setIsSameAddress(!isSameAddress)} /> Communication Address is same as Permanent Address?
      </label>
      
      {!isSameAddress && (
        <div>
          <h2 className="text-xl font-bold mt-6 mb-4">Communication Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Address" className="w-full border p-2 rounded-md" />
            <select className="w-full border p-2 rounded-md">
              <option>Select State</option>
            </select>
            <input type="text" placeholder="District" className="w-full border p-2 rounded-md" />
            <input type="text" placeholder="Pincode" className="w-full border p-2 rounded-md" />
          </div>
        </div>
      )}
      
      <h2 className="text-xl font-bold mt-6 mb-4">Additional Details</h2>
      <div className="flex flex-col gap-2">
        <label>Do you have Keralite status?</label>
        <div className="flex gap-4">
          <label><input type="radio" name="keralite" value="Yes" onChange={() => setKeraliteStatus("Yes")} /> Yes</label>
          <label><input type="radio" name="keralite" value="No" onChange={() => setKeraliteStatus("No")} /> No</label>
        </div>
        
        <label>Do you wish to apply under Non-Resident Indian (NRI) quota?</label>
        <div className="flex gap-4">
          <label><input type="radio" name="nri" value="Yes" onChange={() => setNriQuota("Yes")} /> Yes</label>
          <label><input type="radio" name="nri" value="No" onChange={() => setNriQuota("No")} /> No</label>
        </div>
        
        <label>Do you wish to apply under Child of an Indian Gulf Worker (CGW) quota?</label>
        <div className="flex gap-4">
          <label><input type="radio" name="cgw" value="Yes" onChange={() => setCgwQuota("Yes")} /> Yes</label>
          <label><input type="radio" name="cgw" value="No" onChange={() => setCgwQuota("No")} /> No</label>
        </div>
        
        <label>Are you a Differently Abled Candidate?</label>
        <div className="flex gap-4">
          <label><input type="radio" name="disabled" value="Yes" onChange={() => setDifferentlyAbled("Yes")} /> Yes</label>
          <label><input type="radio" name="disabled" value="No" onChange={() => setDifferentlyAbled("No")} /> No</label>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
