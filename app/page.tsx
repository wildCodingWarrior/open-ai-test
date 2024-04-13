"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [symptom, setSymptom] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptom }),
    });

    const data = await response.json();

    setRecommendation(data.recommendation);
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      setRecommendation("AI가 답변을 생각 중입니다...");
    }
  }, [loading]);

  return (
    <main className="container  h-screen mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">병원 AI 추천 서비스</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          placeholder="증상을 입력하세요"
          required
          className="border p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          추천 받기
        </button>
      </form>
      {recommendation && <p className="mt-4">AI의 답변: {recommendation}</p>}
    </main>
  );
}
