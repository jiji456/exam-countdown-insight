
import { type ExamResult } from "@/lib/mockData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface FeedbackModalProps {
  result: ExamResult;
  open: boolean;
  onClose: () => void;
}

const FeedbackModal = ({ result, open, onClose }: FeedbackModalProps) => {
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

  const getIcon = () => {
    if (scorePercentage >= 80) return "🌟";
    if (scorePercentage >= 70) return "👍";
    if (scorePercentage >= 60) return "🙂";
    return "📚";
  };

  const getTitle = () => {
    if (scorePercentage >= 80) return "ยอดเยี่ยม!";
    if (scorePercentage >= 70) return "ดีมาก!";
    if (scorePercentage >= 60) return "ผ่าน";
    return "ต้องปรับปรุง";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <span>{getIcon()}</span>
            <span>{getTitle()}</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            {result.courseName} ({result.examType === "midterm" ? "สอบกลางภาค" : result.examType === "final" ? "สอบปลายภาค" : "แบบทดสอบย่อย"})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <span className="text-base font-medium">คะแนนของคุณ</span>
            <span className={`text-xl font-bold ${getScoreColor()}`}>
              {result.score}/{result.maxScore} 
              <span className="text-sm text-gray-500 font-normal ml-1">
                ({scorePercentage.toFixed(0)}%)
              </span>
            </span>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">อันดับในชั้นเรียน</span>
              <span className="text-sm font-bold">TOP {100 - result.percentile}%</span>
            </div>
            <Progress value={result.percentile} className="h-2 mb-2" indicatorClassName={getProgressColor()} />
            <p className="text-xs text-gray-500">
              คุณทำคะแนนได้ดีกว่านักศึกษา {result.percentile}% ในวิชานี้
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium mb-2">คำแนะนำจากอาจารย์</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {result.feedback || "ไม่มีคำแนะนำเพิ่มเติมจากอาจารย์"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
