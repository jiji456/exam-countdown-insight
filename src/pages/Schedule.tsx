
import { useState } from "react";
import { schedule, courses, getDayName } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Schedule = () => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const todayIndex = today === 0 ? 6 : today - 1; // Convert to our day array index
  
  const [activeTab, setActiveTab] = useState(days[todayIndex]);
  
  const getCourseById = (courseId: string) => {
    return courses.find(course => course.id === courseId);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="min-h-screen pb-20 sm:pb-0 sm:pt-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">ตารางเรียน</h1>
          <p className="text-gray-500">ตารางเวลาเรียนประจำสัปดาห์</p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full grid grid-flow-col auto-cols-fr">
              {days.map((day) => (
                <TabsTrigger 
                  key={day} 
                  value={day}
                  className={`${days[todayIndex] === day ? "font-medium" : ""}`}
                >
                  {getDayName(day)}
                  {days[todayIndex] === day && (
                    <span className="ml-1 text-xs text-theme-primary">(วันนี้)</span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {days.map((day) => (
            <TabsContent key={day} value={day} className="mt-4">
              <div className="space-y-4">
                {schedule
                  .filter(item => item.day === day)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((item) => {
                    const course = getCourseById(item.courseId);
                    const typeClass = 
                      item.type === "lecture" 
                        ? "border-l-blue-500 bg-blue-50 dark:bg-blue-950" 
                        : item.type === "lab" 
                          ? "border-l-green-500 bg-green-50 dark:bg-green-950" 
                          : "border-l-amber-500 bg-amber-50 dark:bg-amber-950";
                    
                    return (
                      <Card key={item.id} className={`border-l-4 ${typeClass}`}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">{course?.code}</p>
                              <CardTitle className="text-base">{course?.name}</CardTitle>
                            </div>
                            <div className="text-sm font-medium">
                              {formatTime(item.startTime)} - {formatTime(item.endTime)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-500">สถานที่</div>
                            <div>{item.location}</div>
                            
                            <div className="text-gray-500">อาจารย์</div>
                            <div>{course?.instructor}</div>
                            
                            <div className="text-gray-500">ประเภท</div>
                            <div>
                              {item.type === "lecture" ? "บรรยาย" : item.type === "lab" ? "ปฏิบัติการ" : "พบอาจารย์"}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                
                {schedule.filter(item => item.day === day).length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">ไม่มีคลาสเรียนในวัน{getDayName(day)}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Navbar />
    </div>
  );
};

export default Schedule;
