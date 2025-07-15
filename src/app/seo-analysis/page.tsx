'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOAnalysisForm from '@/components/SEOAnalysisForm';

const SEOAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="pt-24 pb-12">
        <SEOAnalysisForm />
      </main>
      <Footer />
    </div>
  );
};

export default SEOAnalysisPage; 