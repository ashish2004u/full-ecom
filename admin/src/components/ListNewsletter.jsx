import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const NewsletterList = () => {
  const [emails, setEmails] = useState([]);

  // Dummy data or fetch from backend
  useEffect(() => {
    // Replace with your fetch API
    setEmails([
      { id: 1, email: "ashu@example.com" },
      { id: 2, email: "style@squad.in" },
      { id: 3, email: "brandnews@fashion.com" },
    ]);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      setEmails(emails.filter((item) => item.id !== id));
      // Optional: Send DELETE request to backend
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Newsletter Subscribers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-800">
            {emails.map(({ id, email }) => (
              <tr key={id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4">{id}</td>
                <td className="py-2 px-4">{email}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {emails.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterList;
