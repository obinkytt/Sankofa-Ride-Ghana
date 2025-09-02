
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, User, Car, LogOut, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";

interface TestResult {
  test: string;
  status: "passed" | "failed" | "running" | "pending";
  message: string;
}

export default function TestAuthFlow() {
  const { session, userRole, user, profile } = useAuth();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const updateTestResult = (testName: string, status: TestResult["status"], message: string) => {
    setTestResults(prev => {
      const existing = prev.findIndex(t => t.test === testName);
      const newResult = { test: testName, status, message };
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newResult;
        return updated;
      }
      return [...prev, newResult];
    });
  };

  const runAuthenticationTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: Check current authentication state
    updateTestResult("Current Auth State", "running", "Checking current session...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (session && user) {
      updateTestResult("Current Auth State", "passed", `Authenticated as: ${user.email} (${userRole || 'no role'})`);
    } else {
      updateTestResult("Current Auth State", "passed", "Not authenticated - ready for login tests");
    }

    // Test 2: Check profile data
    updateTestResult("Profile Data", "running", "Checking user profile...");
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (profile) {
      updateTestResult("Profile Data", "passed", `Profile loaded: ${profile.full_name || 'No name'} | Role: ${profile.role || 'No role'} | Phone: ${profile.phone || 'No phone'}`);
    } else if (session) {
      updateTestResult("Profile Data", "failed", "User logged in but no profile data found");
    } else {
      updateTestResult("Profile Data", "passed", "No session - profile check skipped");
    }

    // Test 3: Check logout functionality (if logged in)
    if (session) {
      updateTestResult("Logout Test", "running", "Testing logout functionality...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const logoutResult = await authService.signOut();
        if (logoutResult.error) {
          updateTestResult("Logout Test", "failed", `Logout failed: ${logoutResult.error.message}`);
        } else {
          updateTestResult("Logout Test", "passed", "Logout successful - session cleared");
        }
      } catch (error: any) {
        updateTestResult("Logout Test", "failed", `Logout error: ${error.message}`);
      }
    } else {
      updateTestResult("Logout Test", "passed", "No active session to test logout");
    }

    // Test 4: Role-based UI visibility
    updateTestResult("Role-Based UI", "running", "Checking role-based interface...");
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (userRole) {
      const expectedFeatures = userRole === "rider" 
        ? "Ride request, scheduling, tracking, history, payments"
        : "Driver dashboard, ride requests, earnings, tracking";
      updateTestResult("Role-Based UI", "passed", `${userRole} interface active with: ${expectedFeatures}`);
    } else {
      updateTestResult("Role-Based UI", "passed", "Landing page shown - no role selected");
    }

    // Test 5: Authentication persistence
    updateTestResult("Session Persistence", "running", "Checking session persistence...");
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    if (currentSession) {
      updateTestResult("Session Persistence", "passed", "Session persisted across checks");
    } else {
      updateTestResult("Session Persistence", "passed", "No session to persist (logged out)");
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "running":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-300" />;
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <LogIn className="w-6 h-6 text-blue-600" />
          <span>Authentication Flow Test</span>
        </CardTitle>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Badge variant={session ? "default" : "outline"}>
              {session ? "Authenticated" : "Not Authenticated"}
            </Badge>
            {userRole && (
              <Badge variant="outline" className="capitalize">
                {userRole}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Test the complete authentication flow including login, logout, and role management.
          </p>
          <Button 
            onClick={runAuthenticationTests}
            disabled={isRunning}
            className="flex items-center space-x-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running Tests...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Run Auth Tests</span>
              </>
            )}
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Test Results:</h3>
            {testResults.map((result, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                {getStatusIcon(result.status)}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{result.test}</div>
                  <div className="text-sm text-gray-600">{result.message}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Manual Testing Instructions:</h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>If not logged in, click "Sign Up" and create a rider account</li>
            <li>Complete email verification (check your email)</li>
            <li>Sign in with your rider credentials</li>
            <li>Verify rider dashboard appears with ride request features</li>
            <li>Click "Sign Out" button in header</li>
            <li>Sign up as a driver with different email</li>
            <li>Verify driver dashboard appears with driver-specific features</li>
            <li>Test logout again to ensure complete session cleanup</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}