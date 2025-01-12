import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, using hardcoded credentials
    if (email === "admin@restaurant.com" && password === "admin123") {
      toast({
        title: "Login successful",
        description: "Welcome back to your dashboard",
      });
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-xl border-2 border-amber-100">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-3xl font-serif text-amber-900">Restaurant Admin</CardTitle>
          <CardDescription className="text-amber-700 font-medium">
            Please sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-amber-900">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@restaurant.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-amber-200 focus-visible:ring-amber-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-amber-900">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-amber-200 focus-visible:ring-amber-400"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-amber-700 hover:bg-amber-800 transition-colors duration-300"
            >
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;