import React, { useEffect, useState } from "react";
import {
  fetchCategoryDDL,
  fetchQuestionTypeDDL,
  InterviewAiAnswerFetch,
} from "../services/InterviewAIServices";

const difficulties = ["Easy", "Beginner", "Advanced"];

function InterviewQuestionAI() {
  const [jobDescription, setJobDescription] = useState("");

  const [categories, setCategories] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [minutesPerQuestion, setMinutesPerQuestion] = useState(1);
  const [questionLimit, setQuestionLimit] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategoryDDL().then(setCategories);
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchQuestionTypeDDL(categoryId).then(setQuestionTypes);

      const selectedCategory = categories.find(
        (c) => c.categoryId === categoryId
      );
      setCategoryName(selectedCategory?.categoryName || "");
      setQuestionType("");
    }
  }, [categoryId]);

  const handleGenerate = async () => {
    const payload = {
      jobDescription,
      difficulty,
      category: categoryName,
      questionType,
      minutesPerQuestion,
      questionLimit,
    };

    try {
      setLoading(true);
      const response = await InterviewAiAnswerFetch(payload, token);

      setQuestions(response.questions);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold">Interview Question AI</h2>

      <textarea
        className="w-full border rounded p-3"
        rows="4"
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <select
        className="w-full border rounded p-2"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.categoryId} value={c.categoryId}>
            {c.categoryName}
          </option>
        ))}
      </select>

      <select
        className="w-full border rounded p-2"
        value={questionType}
        onChange={(e) => setQuestionType(e.target.value)}
        disabled={!questionTypes.length}
      >
        <option value="">Select Question Type</option>
        {questionTypes.map((q) => (
          <option key={q.questionTypeId} value={q.questionTypeName}>
            {q.questionTypeName}
          </option>
        ))}
      </select>

      <select
        className="w-full border rounded p-2"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="">Select Difficulty</option>
        {difficulties.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <div className="flex gap-4">
        <input
          type="number"
          className="border rounded p-2 w-1/2"
          placeholder="Minutes per question"
          value={minutesPerQuestion}
          onChange={(e) => setMinutesPerQuestion(e.target.value)}
        />

        <input
          type="number"
          className="border rounded p-2 w-1/2"
          placeholder="Question limit"
          value={questionLimit}
          onChange={(e) => setQuestionLimit(e.target.value)}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      {questions.length > 0 && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-3">Generated Questions</h3>
          <ul className="list-decimal pl-5 space-y-2">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InterviewQuestionAI;
