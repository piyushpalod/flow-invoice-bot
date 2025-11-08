import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp } from "lucide-react";
import logo from "@/assets/logo.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* Logo/Brand */}
          <div className="inline-flex items-center justify-center">
            <img src={logo} alt="InvoiceFlow AI" className="h-16" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
            Your AI-Powered Finance Assistant
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            From Inbox to Books in Seconds. Save 80% of time on invoice processing with intelligent automation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg group">
              Start Free Trial
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">80%</div>
              <div className="text-sm text-white/80">Time Saved</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">95%</div>
              <div className="text-sm text-white/80">Error Reduction</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-cyan" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">&lt;60s</div>
              <div className="text-sm text-white/80">Processing Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
