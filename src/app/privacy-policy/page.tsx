'use client';

import React from 'react';
import Head from 'next/head'; // Using Head for page title

const PrivacyPolicyPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - TrueNode</title>
        <meta name="description" content="TrueNode Privacy Policy" />
      </Head>
      <main className="bg-bg-dark text-white min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl prose prose-invert prose-lg lg:prose-xl">
          {/* 
            Using prose classes for Tailwind Typography plugin for nice default styling.
            Ensure Tailwind Typography plugin is installed: npm install -D @tailwindcss/typography
            And add it to tailwind.config.js: plugins: [require('@tailwindcss/typography')],
          */}
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-8 md:mb-12 text-center">Privacy Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">What We Collect</h2>
            <p>
              We collect name, email, and message content through our contact form to respond to your inquiries and provide our services.
            </p>
            <p>
              We also automatically collect certain technical information when you visit our website, such as IP address, browser type, referring/exit pages, and operating system. This data is collected through cookies and similar technologies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">Legal Basis for Processing</h2>
            <p>We process your personal data on the following legal grounds:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consent:</strong> Where you have given clear consent for us to process your personal data for a specific purpose.</li>
              <li><strong>Contractual necessity:</strong> Where processing is necessary for the performance of a contract with you or to take steps at your request before entering into a contract.</li>
              <li><strong>Legitimate interests:</strong> Where processing is necessary for our legitimate interests or the legitimate interests of a third party, provided your interests and fundamental rights do not override those interests.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">How We Use Your Data</h2>
            <p>Your information is used only to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries</li>
              <li>Communicate about our services</li>
              <li>Fulfil contractual obligations</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact form submissions: 2 years after your last interaction</li>
              <li>Account information: For as long as your account remains active and for 12 months thereafter</li>
              <li>Technical information and cookies: Up to 13 months</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">Third-Party Sharing</h2>
            <p>
              We do not sell your personal data to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who help us operate our website and services (e.g., hosting providers, email service providers)</li>
              <li>Professional advisers including lawyers, auditors, and insurers</li>
              <li>Regulatory authorities, when required by law</li>
            </ul>
            <p className="mt-2">
              All third-party service providers are required to take appropriate security measures to protect your personal data and are only permitted to process it for specified purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">Cookie Policy</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. Cookies are small text files that are placed on your device when you visit our website.
            </p>
            <p>We use the following types of cookies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential cookies:</strong> Necessary for the website to function properly.</li>
              <li><strong>Analytical/performance cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
              <li><strong>Functionality cookies:</strong> Enable the website to provide enhanced functionality and personalization.</li>
            </ul>
            <p className="mt-2">
              You can set your browser to refuse all or some browser cookies or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">Data Security</h2>
            <p>
              We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access limitations to personal data</li>
              <li>Security awareness training for staff</li>
            </ul>
            <p className="mt-2">
              We have procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">International Transfers</h2>
            <p>
              We primarily store and process your data within the United Kingdom and European Economic Area (EEA). However, in some cases, your data may be transferred to, and stored at, a destination outside the UK/EEA.
            </p>
            <p>
              Where we transfer your personal data outside the UK/EEA, we ensure a similar degree of protection is afforded to it by implementing appropriate safeguards, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Transferring to countries that have been deemed to provide an adequate level of protection</li>
              <li>Using specific contracts approved by the European Commission that give personal data the same protection it has in Europe</li>
              <li>Using providers based in the US that are part of approved certification mechanisms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">Your GDPR Rights</h2>
            <p>Under data protection law, you have rights including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right to access:</strong> You have the right to access your personal data.</li>
              <li><strong>Right to rectification:</strong> You have the right to request that we correct any inaccurate personal data.</li>
              <li><strong>Right to erasure:</strong> You have the right to request that we delete your personal data in certain circumstances.</li>
              <li><strong>Right to restriction of processing:</strong> You have the right to request that we restrict the processing of your personal data in certain circumstances.</li>
              <li><strong>Right to data portability:</strong> You have the right to request the transfer of your personal data to you or to a third party.</li>
              <li><strong>Right to object:</strong> You have the right to object to processing of your personal data where we are relying on a legitimate interest.</li>
              <li><strong>Right to withdraw consent:</strong> You have the right to withdraw consent at any time where we are relying on consent to process your personal data.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">Complaint Procedure</h2>
            <p>
              If you have any concerns about our use of your personal data, you can make a complaint to us at <a href="mailto:info@truenode.co.uk" className="text-accent hover:underline">info@truenode.co.uk</a>.
            </p>
            <p>
              You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO), the UK supervisory authority for data protection issues (<a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.ico.org.uk</a>). We would, however, appreciate the chance to deal with your concerns before you approach the ICO, so please contact us in the first instance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes we make to our privacy policy in the future will be posted on this page and, where appropriate, notified to you by email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-accent-light mb-4">Contact Us</h2>
            <p>
              For privacy inquiries, contact us at <a href="mailto:info@truenode.co.uk" className="text-accent hover:underline">info@truenode.co.uk</a>
            </p>
            <address className="not-italic mt-2">
              TrueNode Ltd<br />
              {/* [Your registered address] - Removed */}
              {/* [Company registration number] - Removed */}
            </address>
          </section>
          
          <p className="text-sm text-gray-400 mt-12">
            Last updated: May 14, 2025
          </p>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicyPage; 