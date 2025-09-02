import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, ExternalLink, CheckCircle, Globe } from "lucide-react";

interface DeploymentHelperProps {
  onClose: () => void;
}

export default function DeploymentHelper({ onClose }: DeploymentHelperProps) {
  const [copied, setCopied] = useState(false);
  
  const currentUrl = "https://sg-5399e932-af1c-4e1a-b89c-bf8862c5.vercel.app";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-green-600" />
            <span>Production Configuration</span>
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Great News!</strong> Your Vercel deployment is working! Now let's configure Supabase to use your production URL.
            </AlertDescription>
          </Alert>

          {/* Quick Fix Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🚀 Final Configuration Steps</h3>
            
            {/* Step 1: Fix Supabase */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-green-800">1. Update Supabase Authentication URLs</h4>
                  <Badge className="bg-green-600">Production Ready</Badge>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-green-700">
                    Update your Supabase Site URL to use your working Vercel deployment URL.
                  </p>
                  
                  <div className="bg-white rounded p-3 border">
                    <p className="text-xs font-medium text-gray-600 mb-2">Go to Supabase Dashboard → Authentication → URL Configuration</p>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs font-medium text-gray-500">Site URL (update this):</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">{currentUrl}</code>
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(currentUrl)}>
                            {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500">Redirect URLs (add this):</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">{`${currentUrl}/**`}</code>
                          <Button size="sm" variant="outline" onClick={() => copyToClipboard(`${currentUrl}/**`)}>
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={() => window.open("https://supabase.com/dashboard", "_blank")}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Supabase Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Test Everything */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-blue-800">2. Test Your Production App</h4>
                  <Badge variant="secondary">Final Step</Badge>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-blue-700">
                    After updating Supabase, test your app to ensure everything works correctly.
                  </p>
                  
                  <div className="bg-white rounded p-3 border">
                    <h5 className="font-medium text-sm mb-2">Test Checklist:</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>✅ User registration and email confirmation</li>
                      <li>✅ Driver and rider login</li>
                      <li>✅ Ride request and tracking</li>
                      <li>✅ Payment processing</li>
                      <li>✅ Emergency features</li>
                    </ul>
                  </div>
                  
                  <Button className="w-full" onClick={() => window.open(currentUrl, "_blank")}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Your Production App
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current App Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3">🎉 Your Sankofa Ride App is Production Ready!</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-green-600">✅ Complete Features:</h5>
                <ul className="text-gray-600 space-y-1 mt-1">
                  <li>• Full authentication system (driver/rider)</li>
                  <li>• Real-time ride tracking & management</li>
                  <li>• Payment processing system</li>
                  <li>• Emergency safety features</li>
                  <li>• Minnesota-specific locations</li>
                  <li>• Driver dashboard with earnings</li>
                  <li>• Rider dashboard with trip history</li>
                  <li>• Ride scheduling system</li>
                  <li>• Notification center</li>
                  <li>• Complete user profiles</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-600">🔧 Production Details:</h5>
                <ul className="text-gray-600 space-y-1 mt-1">
                  <li>• Deployed on Vercel</li>
                  <li>• Connected to Supabase database</li>
                  <li>• Minnesota-focused ride sharing</li>
                  <li>• Full-stack Next.js application</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button className="flex-1" onClick={() => window.open("https://supabase.com/dashboard", "_blank")}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Configure Supabase
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => window.open(currentUrl, "_blank")}>
              <Globe className="w-4 h-4 mr-2" />
              Visit Production App
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
