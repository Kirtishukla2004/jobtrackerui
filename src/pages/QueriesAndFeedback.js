import React, { useState } from "react";
import { submitFeedback } from "../services/queriesAndFeedbackServices";

function QueriesAndFeedback() {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Please write your message before sending.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await submitFeedback({ comment });

      if (!response.success) {
        setError(response.message);
        return;
      }

      setMessage("😊 Thanks for reaching out! Your message has been sent.");
      setComment("");
    } catch {
      setError("Unable to send feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-6 sm:py-10 bg-gray-50 min-h-[calc(100vh-64px)]">
      
      {/* Page header */}
      <div className="max-w-3xl mx-auto mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Queries & Feedback
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Share your questions, suggestions, or feedback with us.
        </p>
      </div>

      {/* Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <textarea
            rows="6"
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your message here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {message && (
            <p className="text-green-600 text-sm">{message}</p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default QueriesAndFeedback;
