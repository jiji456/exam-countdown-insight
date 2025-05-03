
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExamResult } from "@/lib/mockData";

interface FeedbackModalProps {
  result: ExamResult;
  open: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ result, open, onClose }) => {
  const scorePercentage = (result.score / result.maxScore) * 100;
  
  // Generate feedback based on score and exam type
  const generateFeedback = () => {
    if (scorePercentage >= 85) {
      return {
        emoji: "🌟",
        title: "ยอดเยี่ยม!",
        message: "คุณทำได้ดีมากในการสอบครั้งนี้ คุณมีความเข้าใจในเนื้อหาอย่างลึกซึ้ง และสามารถนำไปประยุกต์ใช้ได้อย่างถูกต้อง",
        details: [
          "คุณสามารถนำความรู้ไปประยุกต์ใช้ได้อย่างดีเยี่ยม",
          "การวิเคราะห์โจทย์และการแก้ปัญหาของคุณเป็นระบบ",
          "คุณมีความเข้าใจในหลักการที่สำคัญอย่างละเอียด"
        ],
        improvement: "เพื่อรักษามาตรฐานที่ดี คุณควรศึกษาเพิ่มเติมในหัวข้อขั้นสูงเพื่อต่อยอดความรู้"
      };
    } else if (scorePercentage >= 70) {
      return {
        emoji: "👍",
        title: "ดีมาก",
        message: "คุณทำได้ดีในการสอบครั้งนี้ คุณมีความเข้าใจในเนื้อหาส่วนใหญ่ และสามารถตอบคำถามได้ถูกต้องเป็นส่วนมาก",
        details: [
          "คุณมีความรู้พื้นฐานที่แข็งแกร่ง",
          "คุณเข้าใจแนวคิดสำคัญส่วนใหญ่ได้ดี",
          "ทักษะการแก้ปัญหาของคุณอยู่ในระดับดี"
        ],
        improvement: "เพื่อพัฒนาต่อไป คุณควรทบทวนเนื้อหาเรื่อง การอัลกอริทึมซับซ้อนและการใช้งาน Design Patterns"
      };
    } else if (scorePercentage >= 50) {
      return {
        emoji: "🤔",
        title: "พอใช้",
        message: "คุณทำได้พอใช้ในการสอบครั้งนี้ คุณมีความเข้าใจในเนื้อหาบางส่วน แต่ยังมีบางจุดที่ต้องปรับปรุง",
        details: [
          "คุณเข้าใจแนวคิดพื้นฐานได้ดี",
          "มีบางส่วนที่คุณยังสับสนหรือเข้าใจคลาดเคลื่อน",
          "ทักษะการวิเคราะห์โจทย์ยังต้องฝึกฝนเพิ่มเติม"
        ],
        improvement: "คุณควรทบทวนเนื้อหาเรื่อง Object-Oriented Programming และ Data Structures เพิ่มเติม และลองทำแบบฝึกหัดเพิ่ม"
      };
    } else {
      return {
        emoji: "📚",
        title: "ต้องปรับปรุง",
        message: "คุณยังต้องปรับปรุงในการสอบครั้งนี้ คุณอาจยังไม่เข้าใจเนื้อหาหลายส่วนหรือมีความสับสนในแนวคิดสำคัญ",
        details: [
          "พื้นฐานยังไม่แข็งแรงพอ ควรทบทวนเนื้อหาทั้งหมด",
          "มีความสับสนในการประยุกต์ใช้ทฤษฎี",
          "ทักษะการแก้ปัญหายังต้องพัฒนามาก"
        ],
        improvement: "คุณควรพบอาจารย์เพื่อขอคำแนะนำเพิ่มเติม และลงเรียนคอร์สเสริม พร้อมทั้งทบทวนเนื้อหาพื้นฐานให้เข้าใจก่อน"
      };
    }
  };
  
  const feedback = generateFeedback();
  
  const getScoreColor = () => {
    if (scorePercentage >= 80) return "text-green-600";
    if (scorePercentage >= 70) return "text-blue-600";
    if (scorePercentage >= 60) return "text-amber-600";
    return "text-red-600";
  };
  
  const getProgressClass = () => {
    if (scorePercentage >= 80) return "bg-green-600";
    if (scorePercentage >= 70) return "bg-blue-600";
    if (scorePercentage >= 60) return "bg-amber-600";
    return "bg-red-600";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{feedback?.emoji}</span>
            <span>{feedback?.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{feedback?.message}</p>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">คะแนนของคุณ</span>
                <span className={`text-sm font-medium ${getScoreColor()}`}>{result.score}/{result.maxScore}</span>
              </div>
              <Progress value={scorePercentage} className={`h-2 ${getProgressClass()}`} />
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">จุดเด่น</h4>
              <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                {feedback?.details.map((detail, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-xs text-theme-primary">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator className="my-3" />
            
            <div>
              <h4 className="text-sm font-medium mb-2">คำแนะนำในการปรับปรุง</h4>
              <p className="text-xs text-gray-700 dark:text-gray-300">{feedback?.improvement}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>ปิด</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
