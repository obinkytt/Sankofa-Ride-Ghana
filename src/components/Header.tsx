import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, LogOut, Shield, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onLogout: () => void;
  isAuthenticated: boolean;
  userRole?: "rider" | "driver" | "admin";
  onAdminClick?: () => void;
}

export default function Header({ onLogout, isAuthenticated, userRole, onAdminClick }: HeaderProps) {
  const { user, profile } = useAuth();

  const handleLogoutClick = () => {
    console.log("Header logout clicked - User:", user?.email, "Role:", userRole);
    onLogout();
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Sankofa Ride</h1>
            </div>
            <span className="text-sm text-gray-500">Ghana's Ride Share</span>
          </div>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated && userRole === "admin" && onAdminClick && (
              <Button variant="outline" onClick={onAdminClick}>
                <Settings className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            )}
            
            {isAuthenticated && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {profile?.full_name || user?.email} ({userRole})
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleLogoutClick}
                  className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}