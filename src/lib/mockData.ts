
export interface User {
  id: string;
  name: string;
  studentId: string;
  faculty: string;
  major: string;
  yearLevel: number;
  email: string;
  avatar?: string;
}

export interface ExamResult {
  id: string;
  courseId: string;
  courseName: string;
  examType: "midterm" | "final" | "quiz";
  score: number;
  maxScore: number;
  percentile: number;
  releaseDate: string; // ISO date string
  acknowledged: boolean;
  feedback?: string;
  unlocked: boolean;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
}

export interface ScheduleItem {
  id: string;
  courseId: string;
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  startTime: string; // 24hr format "14:30"
  endTime: string; // 24hr format "16:00"
  location: string;
  type: "lecture" | "lab" | "tutorial";
}

export const user: User = {
  id: "1",
  name: "นายนักศึกษา ใจดี",
  studentId: "64010123",
  faculty: "วิศวกรรมศาสตร์",
  major: "วิศวกรรมซอฟต์แวร์",
  yearLevel: 3,
  email: "student@example.ac.th",
};

export const courses: Course[] = [
  {
    id: "c1",
    code: "SW301",
    name: "การพัฒนาซอฟต์แวร์เชิงอ็อบเจกต์",
    instructor: "ดร.สมชาย ใจดี",
    credits: 3,
  },
  {
    id: "c2",
    code: "SW302",
    name: "การวิเคราะห์และออกแบบฐานข้อมูล",
    instructor: "ดร.สมหญิง มีสุข",
    credits: 3,
  },
  {
    id: "c3",
    code: "SW303",
    name: "การพัฒนาเว็บแอปพลิเคชัน",
    instructor: "ผศ.ดร.สมศักดิ์ เก่งกาจ",
    credits: 3,
  },
  {
    id: "c4",
    code: "SW304",
    name: "วิศวกรรมความต้องการ",
    instructor: "รศ.ดร.สมสมร พิทักษ์",
    credits: 3,
  },
  {
    id: "c5",
    code: "GE101",
    name: "ภาษาอังกฤษเพื่อการสื่อสาร",
    instructor: "อ.จอห์น สมิธ",
    credits: 2,
  },
];

export const examResults: ExamResult[] = [
  {
    id: "e1",
    courseId: "c1",
    courseName: "การพัฒนาซอฟต์แวร์เชิงอ็อบเจกต์",
    examType: "midterm",
    score: 85,
    maxScore: 100,
    percentile: 92,
    releaseDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    acknowledged: false,
    feedback: "",
    unlocked: false,
  },
  {
    id: "e2",
    courseId: "c2",
    courseName: "การวิเคราะห์และออกแบบฐานข้อมูล",
    examType: "quiz",
    score: 18,
    maxScore: 20,
    percentile: 88,
    releaseDate: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
    acknowledged: false,
    feedback: "",
    unlocked: false,
  },
  {
    id: "e3",
    courseId: "c3",
    courseName: "การพัฒนาเว็บแอปพลิเคชัน",
    examType: "final",
    score: 76,
    maxScore: 100,
    percentile: 65,
    releaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    acknowledged: true,
    feedback: "คุณทำได้ดีในส่วนของการออกแบบ UI แต่ควรปรับปรุงในส่วนของการจัดการ state และ lifecycle ให้มีประสิทธิภาพมากขึ้น ลองศึกษาเพิ่มเติมเกี่ยวกับ React hooks และ Context API",
    unlocked: true,
  },
  {
    id: "e4",
    courseId: "c4",
    courseName: "วิศวกรรมความต้องการ",
    examType: "midterm",
    score: 42,
    maxScore: 50,
    percentile: 95,
    releaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    acknowledged: true,
    feedback: "ยอดเยี่ยมมาก! คุณเข้าใจหลักการและกระบวนการรวบรวมความต้องการได้อย่างลึกซึ้ง การวิเคราะห์กรณีศึกษาของคุณมีความละเอียดและครอบคลุม ขอให้รักษาระดับการทำงานที่ดีนี้ไว้",
    unlocked: true,
  },
  {
    id: "e5",
    courseId: "c5",
    courseName: "ภาษาอังกฤษเพื่อการสื่อสาร",
    examType: "quiz",
    score: 8,
    maxScore: 10,
    percentile: 75,
    releaseDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    acknowledged: false,
    feedback: "",
    unlocked: false,
  },
];

export const schedule: ScheduleItem[] = [
  {
    id: "s1",
    courseId: "c1",
    day: "monday",
    startTime: "09:00",
    endTime: "12:00",
    location: "อาคารเรียนรวม 1 ห้อง 301",
    type: "lecture",
  },
  {
    id: "s2",
    courseId: "c1",
    day: "tuesday",
    startTime: "13:00",
    endTime: "16:00",
    location: "อาคารปฏิบัติการ ห้อง 205",
    type: "lab",
  },
  {
    id: "s3",
    courseId: "c2",
    day: "wednesday",
    startTime: "09:00",
    endTime: "12:00",
    location: "อาคารเรียนรวม 2 ห้อง 405",
    type: "lecture",
  },
  {
    id: "s4",
    courseId: "c3",
    day: "thursday",
    startTime: "09:00",
    endTime: "12:00",
    location: "อาคารวิศวกรรมศาสตร์ ห้อง 103",
    type: "lecture",
  },
  {
    id: "s5",
    courseId: "c3",
    day: "friday",
    startTime: "13:00",
    endTime: "16:00",
    location: "ห้องปฏิบัติการคอมพิวเตอร์ 2",
    type: "lab",
  },
  {
    id: "s6",
    courseId: "c4",
    day: "friday",
    startTime: "09:00",
    endTime: "12:00",
    location: "อาคารเรียนรวม 3 ห้อง 201",
    type: "lecture",
  },
  {
    id: "s7",
    courseId: "c5",
    day: "tuesday",
    startTime: "09:00",
    endTime: "11:00",
    location: "อาคารศูนย์ภาษา ห้อง 405",
    type: "lecture",
  },
];

export const getDayName = (day: string): string => {
  const days: Record<string, string> = {
    monday: "จันทร์",
    tuesday: "อังคาร",
    wednesday: "พุธ",
    thursday: "พฤหัสบดี",
    friday: "ศุกร์",
    saturday: "เสาร์",
    sunday: "อาทิตย์",
  };
  return days[day] || day;
};
