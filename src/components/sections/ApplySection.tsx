import React from 'react';

const ApplySection: React.FC = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Apply</h2>
    <form className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Your Name" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" className="w-full border rounded px-3 py-2" placeholder="Your Email" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Position Applying For</label>
        <input type="text" className="w-full border rounded px-3 py-2" placeholder="e.g. Frontend Developer" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Resume</label>
        <input type="file" className="w-full" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Application</button>
    </form>
  </div>
);

export default ApplySection; 