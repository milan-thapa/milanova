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
    <main className="min-h-screen bg-gradient-to-b from-cream to-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-8">Terms of Service</h1>
        <p className="text-text-muted mb-8">Last updated: June 28, 2026</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-body mb-4">
              By accessing and using Milanova's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">2. Services</h2>
            <p className="text-text-body mb-4">
              Milanova provides web development, eCommerce solutions, SaaS development, UI/UX design, and related digital services. Specific service details are outlined in individual project agreements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">3. User Responsibilities</h2>
            <p className="text-text-body mb-4">As a user of our services, you agree to:</p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Not use our services for illegal purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not interfere with or disrupt our services</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">4. Intellectual Property</h2>
            <p className="text-text-body mb-4">
              All content on our website, including text, graphics, logos, images, and software, is the property of Milanova or its content suppliers and is protected by intellectual property laws.
            </p>
            <p className="text-text-body mb-4">
              Upon completion of services, you will own the final deliverables as outlined in your project agreement. Milanova retains rights to pre-existing code, frameworks, and methodologies used in development.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">5. Payment Terms</h2>
            <p className="text-text-body mb-4">
              Payment terms are specified in individual project agreements. Generally:
            </p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li>50% deposit required to commence work</li>
              <li>50% payment upon project completion and delivery</li>
              <li>Payment methods: Bank transfer, digital payment platforms</li>
              <li>Late payments may incur interest charges</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">6. Project Deliverables and Timeline</h2>
            <p className="text-text-body mb-4">
              Project timelines and deliverables are outlined in project agreements. Milanova strives to meet agreed deadlines but is not liable for delays caused by:
            </p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li>Client delays in providing required materials or feedback</li>
              <li>Force majeure events</li>
              <li>Third-party service disruptions</li>
              <li>Changes to project scope requested by client</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">7. Revisions and Changes</h2>
            <p className="text-text-body mb-4">
              Reasonable revisions are included in project scope. Additional revisions beyond the agreed scope may incur additional charges. Major changes to project scope require written agreement and may adjust timelines and costs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">8. Client Responsibilities</h2>
            <p className="text-text-body mb-4">Clients agree to:</p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li>Provide necessary materials and information in a timely manner</li>
              <li>Review and provide feedback on deliverables promptly</li>
              <li>Ensure they have rights to any content they provide</li>
              <li>Test deliverables and report issues promptly</li>
              <li>Obtain necessary permissions and licenses for their projects</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">9. Warranty and Support</h2>
            <p className="text-text-body mb-4">
              Milanova provides a 30-day warranty period from project delivery to fix bugs and issues. After this period, support and maintenance can be provided under separate agreement.
            </p>
            <p className="text-text-body">
              We do not warrant that our services will be uninterrupted, error-free, or meet all your requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">10. Limitation of Liability</h2>
            <p className="text-text-body mb-4">
              To the maximum extent permitted by law, Milanova shall not be liable for:
            </p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages exceeding the total amount paid for services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">11. Confidentiality</h2>
            <p className="text-text-body mb-4">
              Both parties agree to maintain confidentiality of proprietary information shared during the project. This obligation continues after project completion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">12. Termination</h2>
            <p className="text-text-body mb-4">
              Either party may terminate the agreement with written notice. In case of termination by client, Milanova is entitled to payment for work completed and materials provided.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">13. Governing Law</h2>
            <p className="text-text-body">
              These terms are governed by the laws of Nepal. Any disputes shall be resolved through negotiation or, if necessary, through the courts of Kathmandu, Nepal.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">14. Indemnification</h2>
            <p className="text-text-body">
              You agree to indemnify Milanova from any claims arising from your use of our services or violation of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">15. Changes to Terms</h2>
            <p className="text-text-body">
              Milanova reserves the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">16. Contact Information</h2>
            <p className="text-text-body mb-4">
              For questions about these Terms of Service, contact us:
            </p>
            <ul className="list-none text-text-body">
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
