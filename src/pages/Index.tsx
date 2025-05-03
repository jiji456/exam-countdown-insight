
import { useState } from "react";
import { examResults, user } from "@/lib/mockData";
import ExamResult from "@/components/ExamResult";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [results, setResults] = useState(examResults);

  const handleAcknowledge = (id: string) => {
    setResults(
      results.map((result) => {
        if (result.id === id) {
          return { ...result, acknowledged: true, unlocked: true };
        }
        return result;
      })
    );
  };

  // Sort results: unacknowledged released exams first, then upcoming exams by date, then acknowledged
  const sortedResults = [...results].sort((a, b) => {
    // Check if released
    const aReleased = new Date(a.releaseDate) <= new Date();
    const bReleased = new Date(b.releaseDate) <= new Date();
    
    // Unacknowledged but released exams go first
    if (aReleased && !a.acknowledged && !(bReleased && !b.acknowledged)) return -1;
    if (bReleased && !b.acknowledged && !(aReleased && !a.acknowledged)) return 1;
    
    // Then upcoming exams sorted by closest first
    if (!aReleased && !bReleased) {
      return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
    }
    
    // Then acknowledged exams
    if (a.acknowledged && b.acknowledged) {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    }
    
    return 0;
  });

  // Count unacknowledged but released exams
  const unacknowledgedCount = results.filter(
    (result) => !result.acknowledged && new Date(result.releaseDate) <= new Date()
  ).length;

  return (
    <div className="min-h-screen pb-20 sm:pb-0 sm:pt-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold gradient-text">ยินดีต้อนรับ</h1>
          <p className="text-gray-500">{user.name} • {user.studentId}</p>
        </div>
        
        {unacknowledgedCount > 0 && (
          <div className="p-4 mb-6 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm">
              คุณมี {unacknowledgedCount} รายวิชาที่ประกาศผลสอบแล้วและรอการรับทราบ
            </p>
          </div>
        )}
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">ผลการสอบ</h2>
            <span className="text-xs text-gray-500">{results.length} รายการ</span>
          </div>
          
          <div className="grid gap-4">
            {sortedResults.map((result) => (
              <ExamResult 
                key={result.id} 
                result={result} 
                onAcknowledge={handleAcknowledge} 
              />
            ))}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Index;
