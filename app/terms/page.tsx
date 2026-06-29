import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Milanova Terms of Service - Legal terms and conditions for using our website and services.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 sm:py-24 md:py-32 bg-gradient-to-br from-[#082E23] via-[#1A3028] to-[#0D1F1A]">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#B5E12A]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1A6B55]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="text-white/90 text-sm font-medium tracking-wide">LEGAL</span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Terms of Service
          </h1>
          <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Legal terms and conditions for using our website and services.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24">
        <p className="text-[#8FA89E] mb-8 sm:mb-12 text-sm sm:text-base">Last updated: June 28, 2026</p>

        <div className="prose prose-lg max-w-none prose-headings:text-[#0D1F1A] prose-headings:font-bold prose-p:text-[#3A4A44] prose-li:text-[#3A4A44]">
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">1. Acceptance of Terms</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              By accessing and using Milanova's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">2. Services</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              Milanova provides web development, eCommerce solutions, SaaS development, UI/UX design, and related digital services. Specific service details are outlined in individual project agreements.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">3. User Responsibilities</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">As a user of our services, you agree to:</p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Not use our services for illegal purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not interfere with or disrupt our services</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">4. Intellectual Property</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              All content on our website, including text, graphics, logos, images, and software, is the property of Milanova or its content suppliers and is protected by intellectual property laws.
            </p>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              Upon completion of services, you will own the final deliverables as outlined in your project agreement. Milanova retains rights to pre-existing code, frameworks, and methodologies used in development.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">5. Payment Terms</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              Payment terms are specified in individual project agreements. Generally:
            </p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>50% deposit required to commence work</li>
              <li>50% payment upon project completion and delivery</li>
              <li>Payment methods: Bank transfer, digital payment platforms</li>
              <li>Late payments may incur interest charges</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">6. Project Deliverables and Timeline</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              Project timelines and deliverables are outlined in project agreements. Milanova strives to meet agreed deadlines but is not liable for delays caused by:
            </p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>Client delays in providing required materials or feedback</li>
              <li>Force majeure events</li>
              <li>Third-party service disruptions</li>
              <li>Changes to project scope requested by client</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">7. Revisions and Changes</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              Reasonable revisions are included in project scope. Additional revisions beyond the agreed scope may incur additional charges. Major changes to project scope require written agreement and may adjust timelines and costs.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">8. Client Responsibilities</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">Clients agree to:</p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>Provide necessary materials and information in a timely manner</li>
              <li>Review and provide feedback on deliverables promptly</li>
              <li>Ensure they have rights to any content they provide</li>
              <li>Test deliverables and report issues promptly</li>
              <li>Obtain necessary permissions and licenses for their projects</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">9. Warranty and Support</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              Milanova provides a 30-day warranty period from project delivery to fix bugs and issues. After this period, support and maintenance can be provided under separate agreement.
            </p>
            <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              We do not warrant that our services will be uninterrupted, error-free, or meet all your requirements.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">10. Limitation of Liability</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              To the maximum extent permitted by law, Milanova shall not be liable for:
            </p>
            <ul className="list-disc pl-6 text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages exceeding the total amount paid for services</li>
            </ul>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">11. Confidentiality</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              Both parties agree to maintain confidentiality of proprietary information shared during the project. This obligation continues after project completion.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">12. Termination</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              Either party may terminate the agreement with written notice. In case of termination by client, Milanova is entitled to payment for work completed and materials provided.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">13. Governing Law</h2>
            <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              These terms are governed by the laws of Nepal. Any disputes shall be resolved through negotiation or, if necessary, through the courts of Kathmandu, Nepal.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">14. Indemnification</h2>
            <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              You agree to indemnify Milanova from any claims arising from your use of our services or violation of these terms.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">15. Changes to Terms</h2>
            <p className="text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              Milanova reserves the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1F1A] mb-4">16. Contact Information</h2>
            <p className="text-[#3A4A44] mb-4 text-sm sm:text-base leading-relaxed">
              For questions about these Terms of Service, contact us:
            </p>
            <ul className="list-none text-[#3A4A44] text-sm sm:text-base leading-relaxed">
              <li><strong>Email:</strong> legal@milanova.com</li>
              <li><strong>Address:</strong> Kathmandu, Nepal</li>
              <li><strong>Phone:</strong> +977-9801816685</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
