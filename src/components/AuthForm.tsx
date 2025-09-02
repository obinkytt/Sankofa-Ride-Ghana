
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Car, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/authService";

interface AuthFormProps {
  initialRole?: "rider" | "driver";
  onBack?: () => void;
}

export default function AuthForm({ initialRole = "rider", onBack }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<"rider" | "driver">(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { refreshProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (isSignUp) {
        await authService.signUp(email, password, role, fullName, phone);
        setMessage("Check your email for the confirmation link!");
      } else {
        await authService.signIn(email, password);
        await refreshProfile();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div className="flex items-center space-x-2 ml-auto">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">Sankofa Ride</span>
            </div>
          </div>
          
          <div className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {isSignUp ? "Create Account" : "Welcome back"}
            </CardTitle>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${role === "rider" ? "bg-blue-100" : "bg-green-100"}`}>
                {role === "rider" ? (
                  <User className="w-4 h-4 text-blue-600" />
                ) : (
                  <Car className="w-4 h-4 text-green-600" />
                )}
              </div>
              <Badge variant="outline" className="capitalize">
                {role}
              </Badge>
            </div>
            <p className="text-gray-600">
              {isSignUp ? "Sign up" : "Sign in"} to continue as a {role}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {isSignUp && (
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(value: "rider" | "driver") => setRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rider">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Rider</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="driver">
                    <div className="flex items-center space-x-2">
                      <Car className="w-4 h-4" />
                      <span>Driver</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {message && (
              <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-full text-lg font-medium"
            >
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <Button 
              variant="link" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isSignUp 
                ? "Already have an account? Sign in" 
                : "Don't have an account? Sign up"
              }
            </Button>
          </div>

          {isSignUp && (
            <div className="text-xs text-gray-500 text-center">
              By signing up, you agree to Sankofa Ride's Terms of Service and Privacy Policy
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}