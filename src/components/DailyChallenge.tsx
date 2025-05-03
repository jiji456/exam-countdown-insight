
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses, schedule, getDayName } from "@/lib/mockData";
import { toast } from "sonner";
import { Award, BookOpen, CheckCircle } from "lucide-react";

interface DailyChallengeProps {
  forceNew?: boolean;
}

const DailyChallenge = ({ forceNew }: DailyChallengeProps) => {
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Get today's schedule to sync challenge with classes
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1;
  const dayName = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"][dayIndex];
  
  // Find today's classes
  const todaysClasses = schedule.filter(item => item.day === dayName);
  
  // Find a relevant course for today's challenge
  const relevantCourse = todaysClasses.length > 0 
    ? courses.find(course => course.id === todaysClasses[0].courseId)
    : courses[Math.floor(Math.random() * courses.length)];
  
  // Generate a challenge based on course topics
  const challengeTopics = {
    "CS101": ["algorithms", "data structures", "programming basics"],
    "CS201": ["software architecture", "design patterns", "clean code"],
    "CS301": ["database optimization", "query performance", "indexing"],
    "CS401": ["system security", "encryption", "authentication"],
    "CS501": ["cloud deployment", "scalability", "containerization"]
  };
  
  const getChallengeForCourse = (courseId: string) => {
    const topics = challengeTopics[courseId as keyof typeof challengeTopics] || ["software engineering", "coding", "problem solving"];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    const challenges = [
      `Implement a simple ${topic} solution in any language of your choice.`,
      `Research and summarize a recent advancement in ${topic}.`,
      `Design a flowchart for a ${topic} process.`,
      `Debug the provided ${topic} code snippet.`,
      `Create test cases for a ${topic} implementation.`
    ];
    
    return challenges[Math.floor(Math.random() * challenges.length)];
  };
  
  const challenge = getChallengeForCourse(relevantCourse?.id || "CS101");
  
  const handleStartChallenge = () => {
    toast.info("Challenge started! Good luck!");
    setProgress(10);
  };
  
  const handleProgressChallenge = () => {
    if (progress < 100) {
      const newProgress = Math.min(progress + 30, 100);
      setProgress(newProgress);
      
      if (newProgress === 100) {
        setCompleted(true);
        toast.success("🎉 Challenge completed! +50 XP earned!");
      } else {
        toast.info(`Progress saved! Keep going!`);
      }
    }
  };
  
  const handleShowHint = () => {
    setShowHint(true);
    toast.info("Hint revealed!");
  };

  return (
    <Card className={`border-l-4 ${completed ? 'border-l-green-500' : 'border-l-theme-primary'} transition-all duration-300`}>
      <CardHeader className="pb-2 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {completed ? 
                <CheckCircle size={16} className="text-green-500" /> : 
                <Award size={16} className="text-theme-primary" />
              }
              <p className="text-xs text-gray-500">Daily Challenge</p>
            </div>
            <CardTitle className="text-base">
              {relevantCourse ? `${relevantCourse.name} Challenge` : 'Software Engineering Challenge'}
            </CardTitle>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            completed ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600 animate-pulse-subtle'
          }`}>
            {completed ? 'Completed' : 'New'}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex gap-2 items-start">
            <BookOpen size={18} className="text-gray-500 mt-0.5" />
            <p className="text-sm">{challenge}</p>
          </div>
          
          {showHint && (
            <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-700">
              <p className="font-medium mb-1">Hint:</p>
              <p>Consider breaking down the problem into smaller steps and tackle each part independently.</p>
            </div>
          )}
          
          {progress > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        {progress === 0 ? (
          <Button onClick={handleStartChallenge} className="w-full gradient-bg hover:opacity-90">
            Start Challenge
          </Button>
        ) : !completed ? (
          <>
            <Button onClick={handleProgressChallenge} className="flex-1 gradient-bg hover:opacity-90">
              Save Progress
            </Button>
            {!showHint && (
              <Button onClick={handleShowHint} variant="outline" className="flex-1">
                Get Hint
              </Button>
            )}
          </>
        ) : (
          <Button onClick={() => { setCompleted(false); setProgress(0); setShowHint(false); }} 
            variant="outline" className="w-full">
            Try Another Challenge
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DailyChallenge;
