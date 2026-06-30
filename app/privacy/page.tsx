import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Milanova Privacy Policy - Learn how we collect, use, and protect your personal data in compliance with GDPR.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      {/* Curved Green Background for Navbar */}
      <div className="bg-gradient-to-br from-[#082E23] via-[#1A3028] to-[#0D1F1A] h-16 sm:h-20 rounded-b-[2rem] sm:rounded-b-[3rem] md:rounded-b-[4rem]" />
      
      {/* Hero */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#082E23] via-[#1A3028] to-[#0D1F1A]">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#B5E12A]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1A6B55]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-left relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="text-white/90 text-sm font-medium tracking-wide">LEGAL</span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Privacy Policy
          </h1>
          <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            Learn how we collect, use, and protect your personal data in compliance with GDPR.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24">
        <p className="text-[#8FA89E] mb-8 sm:mb-12 text-sm sm:text-base">Last updated: June 28, 2026</p>

        <div className="prose prose-lg max-w-none prose-headings:text-[#0D1F1A] prose-headings:font-bold prose-p:text-[#3A4A44] prose-li:text-[#3A4A44]">
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">1. Introduction</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              Milanova (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website milanova.com and use our services.
            </p>
            <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              This policy is compliant with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">2. Information We Collect</h2>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0D1F1A] mb-2">2.1 Personal Data</h3>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">We may collect the following personal information:</p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>Name and contact information (email, phone)</li>
              <li>Project details and inquiries</li>
              <li>Authentication data (Google OAuth information)</li>
              <li>Usage data and preferences</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0D1F1A] mb-2">2.2 Technical Data</h3>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">We automatically collect:</p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Referring website</li>
              <li>Time and date of visit</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">3. How We Use Your Information</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">We use your information for:</p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>Providing and improving our services</li>
              <li>Responding to your inquiries and requests</li>
              <li>Sending you relevant communications (with your consent)</li>
              <li>Analyzing usage patterns to enhance user experience</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">4. Legal Basis for Processing</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">We process your data based on:</p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li><strong>Consent:</strong> When you voluntarily provide information</li>
              <li><strong>Contractual Necessity:</strong> To fulfill our services</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
              <li><strong>Legitimate Interest:</strong> For business operations and security</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">We may share your data with:</p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li><strong>Service Providers:</strong> Cloudinary (image storage), Resend (email services), Google (authentication)</li>
              <li><strong>Legal Authorities:</strong> When required by law</li>
              <li><strong>Business Transfers:</strong> In case of merger or acquisition</li>
            </ul>
            <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">We never sell your personal data to third parties.</p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">6. Data Retention</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              We retain your data only as long as necessary for the purposes outlined in this policy. Personal data is typically retained for:
            </p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>Contact submissions: 2 years</li>
              <li>User accounts: Until account deletion</li>
              <li>Analytics data: 26 months</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">7. Your GDPR Rights</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your data (&quot;Right to be Forgotten&quot;)</li>
              <li><strong>Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Objection:</strong> Object to processing of your data</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
            </ul>
            <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              To exercise these rights, contact us at privacy@milanova.com
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">8. Data Security</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              We implement appropriate technical and organizational measures to protect your data, including:
            </p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">9. International Data Transfers</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              Your data may be transferred to and processed in countries other than Nepal. We ensure adequate protection through:
            </p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>EU-US Data Privacy Framework (if applicable)</li>
              <li>Adequacy decisions by the European Commission</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">10. Cookies</h2>
            <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              We use cookies to enhance your experience. For detailed information, please refer to our Cookie Policy.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">11. Children's Privacy</h2>
            <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              Our services are not intended for children under 16. We do not knowingly collect personal data from children.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">12. Changes to This Policy</h2>
            <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              We may update this policy from time to time. We will notify you of significant changes by email or through our website.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">13. Contact Us</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              If you have questions about this Privacy Policy or your data rights, contact us:
            </p>
            <ul className="list-none text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              <li><strong>Email:</strong> privacy@milanova.com</li>
              <li><strong>Address:</strong> Kathmandu, Nepal</li>
              <li><strong>Phone:</strong> +977 9762415657</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
