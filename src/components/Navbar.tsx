
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Calendar, User, Layout, Award, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);
  const { toast } = useToast();
  
  const handleNotificationClick = () => {
    toast({
      title: "3 unread notifications",
      description: "You have exam results waiting for your acknowledgement",
    });
  };

  const navItems = [
    {
      path: "/",
      label: "หน้าหลัก",
      icon: <Layout size={20} className="mb-1" />,
      desktopIcon: <Layout size={20} />,
      activeBg: "from-theme-primary to-theme-secondary"
    },
    {
      path: "/schedule",
      label: "ตารางเรียน",
      icon: <Calendar size={20} className="mb-1" />,
      desktopIcon: <Calendar size={20} />,
      activeBg: "from-blue-500 to-blue-600"
    },
    {
      path: "/profile",
      label: "โปรไฟล์",
      icon: <User size={20} className="mb-1" />,
      desktopIcon: <User size={20} />,
      activeBg: "from-purple-600 to-indigo-600"
    }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 z-50 px-2 py-2 sm:top-0 sm:bottom-auto sm:border-t-0 sm:border-b sm:backdrop-blur-lg sm:bg-white/70 sm:dark:bg-gray-950/70">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/" className="text-2xl font-bold">
              <span className="flex items-center gap-2">
                <CheckCircle size={28} className="text-theme-primary" />
                <span className="gradient-text">UniExamPro</span>
              </span>
            </Link>
            
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1 mx-4 hidden sm:flex">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-sm transition-all duration-200 ${
                    location.pathname === item.path 
                      ? `bg-gradient-to-r ${item.activeBg} text-white font-medium` 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.desktopIcon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-around w-full sm:w-auto sm:justify-end sm:space-x-4">
            <div className="flex flex-col items-center sm:hidden">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex flex-col items-center px-4 py-1 rounded-md transition-colors ${
                    location.pathname === item.path ? "text-theme-primary" : "text-gray-500 hover:text-theme-primary"
                  }`}
                >
                  {item.icon}
                  <span className="text-xs">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="relative flex flex-col items-center px-4 py-1 sm:hidden">
              <Bell 
                size={20} 
                className="text-gray-500 mb-1 cursor-pointer" 
                onClick={handleNotificationClick}
              />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-theme-secondary">
                  {notifications}
                </Badge>
              )}
              <span className="text-xs text-gray-500">แจ้งเตือน</span>
            </div>

            <div className="hidden sm:block">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-gray-100 rounded-full p-2"
                onClick={handleNotificationClick}
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-theme-secondary">
                    {notifications}
                  </Badge>
                )}
              </Button>
              
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 rounded-full p-2">
                <Award size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
