
import { useState } from "react";
import { type ExamResult as ExamResultType } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CountdownTimer from "./CountdownTimer";
import FeedbackModal from "./FeedbackModal";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface ExamResultProps {
  result: ExamResultType;
  onAcknowledge: (id: string) => void;
}

const ExamResult = ({ result, onAcknowledge }: ExamResultProps) => {
  const [showModal, setShowModal] = useState(false);
  const releaseDate = new Date(result.releaseDate);
  const now = new Date();
  const isReleased = releaseDate <= now;
  
  const scorePercentage = (result.score / result.maxScore) * 100;
  
  const getScoreColor = () => {
    if (scorePercentage >= 80) return "text-green-600";
    if (scorePercentage >= 70) return "text-blue-600";
    if (scorePercentage >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = () => {
    if (scorePercentage >= 80) return "bg-green-600";
    if (scorePercentage >= 70) return "bg-blue-600";
    if (scorePercentage >= 60) return "bg-amber-600";
    return "bg-red-600";
  };

  const handleAcknowledge = () => {
    onAcknowledge(result.id);
    setShowModal(true);
    toast.success("รับทราบผลสอบเรียบร้อยแล้ว");
  };

  const examTypeText = {
    midterm: "สอบกลางภาค",
    final: "สอบปลายภาค",
    quiz: "แบบทดสอบย่อย",
  };

  return (
    <>
      <Card className={`overflow-hidden transition-all duration-200 ${isReleased && !result.acknowledged ? "border-theme-primary shadow-md" : ""}`}>
        <CardHeader className="bg-gray-50 dark:bg-gray-900 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-500 mb-1">{result.courseId.toUpperCase()}</p>
              <CardTitle className="text-base">{result.courseName}</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">{examTypeText[result.examType]}</p>
            </div>
            {!isReleased && (
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300 font-medium">
                รอผล
              </div>
            )}
            {isReleased && result.acknowledged && (
              <div className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full text-xs text-green-600 dark:text-green-300 font-medium">
                รับทราบแล้ว
              </div>
            )}
            {isReleased && !result.acknowledged && (
              <div className="bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full text-xs text-amber-600 dark:text-amber-300 font-medium animate-pulse-subtle">
                ยังไม่รับทราบ
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          {!isReleased ? (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">กำหนดประกาศผล</p>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {releaseDate.toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="mt-3">
                <CountdownTimer targetDate={result.releaseDate} />
              </div>
            </div>
          ) : result.unlocked ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">คะแนน:</span>
                <span className={`text-lg font-bold ${getScoreColor()}`}>
                  {result.score}/{result.maxScore} 
                </span>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">อยู่ในอันดับ</span>
                  <span className="text-sm font-medium">{result.percentile} เปอร์เซ็นต์</span>
                </div>
                <Progress value={result.percentile} className={`h-2 ${getProgressColor()}`} />
                <p className="text-xs text-gray-500 mt-1">
                  คุณทำคะแนนได้ดีกว่านักศึกษา {result.percentile}% ในวิชานี้
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="text-5xl mb-3">🔒</div>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                กรุณากดรับทราบผลสอบเพื่อดูคะแนนและคำแนะนำจากอาจารย์
              </p>
            </div>
          )}
        </CardContent>
        
        {isReleased && !result.acknowledged && (
          <CardFooter className="pt-0">
            <Button 
              className="w-full gradient-bg hover:opacity-90"
              onClick={handleAcknowledge}
            >
              รับทราบผลสอบ
            </Button>
          </CardFooter>
        )}
        
        {isReleased && result.acknowledged && result.unlocked && (
          <CardFooter className="pt-0">
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => setShowModal(true)}
            >
              ดูคำแนะนำจากอาจารย์
            </Button>
          </CardFooter>
        )}
      </Card>
      
      {showModal && (
        <FeedbackModal 
          result={result} 
          open={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ExamResult;
