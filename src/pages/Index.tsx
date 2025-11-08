import Hero from "@/components/Hero";
import Header from "@/components/Header";
import MetricsCards from "@/components/MetricsCards";
import InvoiceList from "@/components/InvoiceList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Dashboard Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor your invoice processing performance in real-time
          </p>
        </div>
        
        <MetricsCards />
        <InvoiceList />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 InvoiceFlow AI. Intelligent invoice processing powered by AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
