
import { user, examResults } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { User, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Profile = () => {
  // Calculate average scores and percentiles
  const completedExams = examResults.filter(exam => exam.unlocked);
  
  const averageScore = completedExams.length 
    ? completedExams.reduce((sum, exam) => sum + (exam.score / exam.maxScore * 100), 0) / completedExams.length 
    : 0;
    
  const averagePercentile = completedExams.length
    ? completedExams.reduce((sum, exam) => sum + exam.percentile, 0) / completedExams.length
    : 0;
  
  const getProgressColorClass = (value: number) => {
    if (value >= 80) return "bg-green-600";
    if (value >= 70) return "bg-blue-600"; 
    if (value >= 60) return "bg-amber-600";
    return "bg-red-600";
  };

  const handleShareResults = () => {
    toast.info("คัดลอกลิงก์สำหรับแชร์ผลการเรียนแล้ว");
  };

  const handleDownloadReport = () => {
    toast.success("กำลังดาวน์โหลดรายงานผลการเรียน");
  };
  
  return (
    <div className="min-h-screen pb-20 sm:pb-0 sm:pt-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-theme-primary to-theme-secondary flex items-center justify-center text-white mb-4">
            <User size={40} />
          </div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.studentId}</p>
          
          <div className="flex gap-3 mt-4">
            <Button variant="outline" size="sm" onClick={handleShareResults} className="text-xs">
              แชร์ผลการเรียน
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadReport} className="text-xs">
              ดาวน์โหลดรายงาน
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen size={18} className="text-theme-primary" />
              ข้อมูลนักศึกษา
            </CardTitle>
            <CardDescription>รายละเอียดส่วนตัว</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">คณะ</div>
                <div className="text-sm font-medium">{user.faculty}</div>
              </div>
              <Separator />
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">สาขาวิชา</div>
                <div className="text-sm font-medium">{user.major}</div>
              </div>
              <Separator />
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">ชั้นปี</div>
                <div className="text-sm font-medium">{user.yearLevel}</div>
              </div>
              <Separator />
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">อีเมล</div>
                <div className="text-sm font-medium">{user.email}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award size={18} className="text-theme-secondary" />
              ผลการเรียน
            </CardTitle>
            <CardDescription>สรุปผลคะแนนจากการสอบ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">คะแนนเฉลี่ย</span>
                  <span className="text-sm font-medium">{averageScore.toFixed(2)}%</span>
                </div>
                <Progress 
                  value={averageScore} 
                  className={`h-2 ${getProgressColorClass(averageScore)}`} 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">อันดับเฉลี่ยในชั้นเรียน</span>
                  <span className="text-sm font-medium">TOP {100 - Math.round(averagePercentile)}%</span>
                </div>
                <Progress value={averagePercentile} className="h-2 bg-theme-primary" />
                <p className="text-xs text-gray-500 mt-1">
                  โดยเฉลี่ยแล้ว คุณทำคะแนนได้ดีกว่านักศึกษา {averagePercentile.toFixed(0)}% ในทุกวิชา
                </p>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">จำนวนข้อสอบที่เสร็จสิ้น</span>
                  <span className="text-sm">{completedExams.length} / {examResults.length}</span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-lg font-bold text-theme-primary">{completedExams.length}</p>
                    <p className="text-xs text-gray-600">รายวิชาที่สอบแล้ว</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">
                      {examResults.filter(exam => !exam.unlocked).length}
                    </p>
                    <p className="text-xs text-gray-600">รายวิชาที่รอสอบ</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Navbar />
    </div>
  );
};

export default Profile;
