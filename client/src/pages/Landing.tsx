import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Activity, Pill, BarChart3, Shield } from "lucide-react";
import heroImage from "@assets/generated_images/Health_tracking_hero_image_714f10ac.png";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-serif">HealthTrack</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" data-testid="link-login">Login</Button>
            </Link>
            <Link href="/register">
              <Button data-testid="link-register">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6 tracking-tight">
            Your Health, Simplified
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Track medications, monitor vital signs, and take control of your wellness journey with our comprehensive health management platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="backdrop-blur-md" data-testid="button-hero-start">
                Start Tracking Free
              </Button>
            </Link>
            <Link href="/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20"
                data-testid="button-hero-login"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-center mb-12">
            Everything You Need to Manage Your Health
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-xl bg-primary/10 p-6 w-fit mx-auto mb-4">
                <Pill className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Medication Tracking</h3>
              <p className="text-muted-foreground">
                Keep track of all your medications, dosages, and schedules in one secure place.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-xl bg-primary/10 p-6 w-fit mx-auto mb-4">
                <BarChart3 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Metrics</h3>
              <p className="text-muted-foreground">
                Monitor blood pressure, heart rate, and other vital signs with visual trends.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-xl bg-primary/10 p-6 w-fit mx-auto mb-4">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your health data is encrypted and protected with industry-standard security.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust HealthTrack to manage their wellness journey.
          </p>
          <Link href="/register">
            <Button size="lg" data-testid="button-cta-signup">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 HealthTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
