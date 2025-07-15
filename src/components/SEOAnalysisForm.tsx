'use client';

import { useState } from 'react';

const SEOAnalysisForm = () => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !email || !websiteUrl) {
      setError('Please fill in all required fields.');
      return;
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Normalize and validate URL
    let normalizedUrl = websiteUrl.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://` + normalizedUrl;
    }

    try {
      new URL(normalizedUrl);
    } catch (_) {
      setError('Please enter a valid website URL.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/seo-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          businessName,
          phone,
          email,
          websiteUrl: normalizedUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }
      
      setSuccess(data.message);
      setName('');
      setBusinessName('');
      setPhone('');
      setEmail('');
      setWebsiteUrl('');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] transition-all duration-300";

  return (
    <section className="py-20 px-6 bg-[#111111]">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Free{' '}
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
              SEO Analysis
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Enter your website URL to receive a free, personalized SEO report directly to your inbox.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Your Name*" 
              className={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Your Email*" 
              className={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="Business Name (Optional)" 
              className={inputStyle}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <input 
              type="tel" 
              placeholder="Phone Number (Optional)" 
              className={inputStyle}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Website URL* (e.g., https://example.com)" 
              className={inputStyle}
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button 
              type="submit"
              disabled={loading}
              className="inline-block px-10 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#8b5cf6]/80 hover:to-[#06b6d4]/80 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Get My SEO Analysis'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      </div>
    </section>
  );
};

export default SEOAnalysisForm; 