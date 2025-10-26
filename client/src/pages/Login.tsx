import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api, ApiError } from "@/lib/api";
import { setAuthToken, setAuthUser } from "@/lib/auth";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.login(formData);
      
      if (response.token && response.user) {
        setAuthToken(response.token);
        setAuthUser(response.user);
        
        toast({
          title: "Login successful",
          description: "Welcome back to HealthTrack!",
        });
        
        setLocation("/dashboard");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error instanceof ApiError ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted/30">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Activity className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-serif">HealthTrack</span>
        </div>
        
        <h1 className="text-3xl font-bold font-serif mb-2 text-center">Welcome Back</h1>
        <p className="text-muted-foreground text-center mb-8">
          Sign in to continue managing your health
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isLoading}
              data-testid="input-email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={isLoading}
              data-testid="input-password"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-login">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <button 
            onClick={() => setLocation("/register")} 
            className="text-primary font-medium hover:underline"
            data-testid="link-register"
          >
            Sign up
          </button>
        </div>
      </Card>
    </div>
  );
}
