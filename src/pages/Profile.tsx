
import { user, examResults } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { User } from "lucide-react";

const Profile = () => {
  // Calculate average scores and percentiles
  const completedExams = examResults.filter(exam => exam.unlocked);
  
  const averageScore = completedExams.length 
    ? completedExams.reduce((sum, exam) => sum + (exam.score / exam.maxScore * 100), 0) / completedExams.length 
    : 0;
    
  const averagePercentile = completedExams.length
    ? completedExams.reduce((sum, exam) => sum + exam.percentile, 0) / completedExams.length
    : 0;
  
  return (
    <div className="min-h-screen pb-20 sm:pb-0 sm:pt-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-theme-primary flex items-center justify-center text-white mb-4">
            <User size={40} />
          </div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.studentId}</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ข้อมูลนักศึกษา</CardTitle>
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
            <CardTitle>ผลการเรียน</CardTitle>
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
                  className="h-2" 
                  indicatorClassName={averageScore >= 80 ? "bg-green-600" : averageScore >= 70 ? "bg-blue-600" : averageScore >= 60 ? "bg-amber-600" : "bg-red-600"} 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">อันดับเฉลี่ยในชั้นเรียน</span>
                  <span className="text-sm font-medium">TOP {100 - Math.round(averagePercentile)}%</span>
                </div>
                <Progress value={averagePercentile} className="h-2" indicatorClassName="bg-theme-primary" />
                <p className="text-xs text-gray-500 mt-1">
                  โดยเฉลี่ยแล้ว คุณทำคะแนนได้ดีกว่านักศึกษา {averagePercentile.toFixed(0)}% ในทุกวิชา
                </p>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">จำนวนข้อสอบที่เสร็จสิ้น</span>
                  <span className="text-sm">{completedExams.length} / {examResults.length}</span>
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
