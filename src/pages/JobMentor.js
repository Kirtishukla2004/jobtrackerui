import React, { useEffect, useState } from "react";
import {
  fetchCategoryDDL,
  fetchQuestionTypeDDL,
  InterviewAiAnswerFetch,
} from "../services/JobMentorServices";

const difficulties = ["Easy", "Beginner", "Advanced"];

function JobMentor() {
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
    if (!categoryId) return;

    fetchQuestionTypeDDL(categoryId).then(setQuestionTypes);

    const selectedCategory = categories.find(
  (c) => c.categoryId === Number(categoryId)
);

    setCategoryName(selectedCategory?.categoryName || "");
    setQuestionType("");
  }, [categoryId, categories]);

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
      const response = await InterviewAiAnswerFetch(payload);
      setQuestions(response.questions);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            🤖 AI Interview Generator
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Create personalized interview questions in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Interview Setup
            </h2>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Job Description
              </label>
              <textarea
                rows={4}
                className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Paste job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  className="w-full border rounded-xl p-2 text-sm"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.categoryId} value={c.categoryId}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Question Type
                </label>
                <select
                  className="w-full border rounded-xl p-2 text-sm"
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  disabled={!questionTypes.length}
                >
                  <option value="">Select type</option>
                  {questionTypes.map((q) => (
                    <option
                      key={q.questionTypeId}
                      value={q.questionTypeName}
                    >
                      {q.questionTypeName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Difficulty
                </label>
                <select
                  className="w-full border rounded-xl p-2 text-sm"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="">Select difficulty</option>
                  {difficulties.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Questions Count
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full border rounded-xl p-2 text-sm"
                  value={questionLimit}
                  onChange={(e) => setQuestionLimit(+e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Minutes per Question
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full border rounded-xl p-2 text-sm"
                  value={minutesPerQuestion}
                  onChange={(e) =>
                    setMinutesPerQuestion(+e.target.value)
                  }
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium text-sm disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Interview"}
            </button>
          </div>
          <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6
                          lg:h-[520px] flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Generated Questions
            </h2>

            <div className="flex-1 space-y-3 overflow-visible lg:overflow-y-auto pr-1">
              {questions.length === 0 ? (
                <div className="flex items-center justify-center text-gray-400 text-sm h-full">
                  Your AI-generated questions will appear here
                </div>
              ) : (
                questions.map((q, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-blue-50 border"
                  >
                    <span className="text-xs font-semibold text-blue-600">
                      Question {i + 1}
                    </span>
                    <p className="text-sm text-gray-800 mt-1">{q}</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default JobMentor;
