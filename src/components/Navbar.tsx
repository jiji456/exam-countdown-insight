
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 z-50 px-2 py-3 sm:top-0 sm:bottom-auto sm:border-t-0 sm:border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="hidden sm:block">
            <Link to="/" className="text-2xl font-bold gradient-text">UniExamPro</Link>
          </div>

          <div className="flex items-center justify-around w-full sm:w-auto sm:space-x-8">
            <Link 
              to="/" 
              className={`flex flex-col items-center px-4 py-1 rounded-md transition-colors ${
                location.pathname === "/" ? "text-theme-primary" : "text-gray-500 hover:text-theme-primary"
              }`}
            >
              <span className="text-2xl mb-1">📊</span>
              <span className="text-xs">หน้าหลัก</span>
            </Link>

            <Link 
              to="/schedule" 
              className={`flex flex-col items-center px-4 py-1 rounded-md transition-colors ${
                location.pathname === "/schedule" ? "text-theme-primary" : "text-gray-500 hover:text-theme-primary"
              }`}
            >
              <Calendar size={20} className="mb-1" />
              <span className="text-xs">ตารางเรียน</span>
            </Link>

            <div className="relative flex flex-col items-center px-4 py-1">
              <Bell size={20} className="text-gray-500 mb-1" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-theme-secondary">
                  {notifications}
                </Badge>
              )}
              <span className="text-xs text-gray-500">แจ้งเตือน</span>
            </div>

            <Link 
              to="/profile" 
              className={`flex flex-col items-center px-4 py-1 rounded-md transition-colors ${
                location.pathname === "/profile" ? "text-theme-primary" : "text-gray-500 hover:text-theme-primary"
              }`}
            >
              <User size={20} className="mb-1" />
              <span className="text-xs">โปรไฟล์</span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-theme-secondary">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
