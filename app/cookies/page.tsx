import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Milanova Cookie Policy - Learn about the cookies we use and how you can manage your preferences.',
  alternates: {
    canonical: '/cookies',
  },
}

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-8">Cookie Policy</h1>
        <p className="text-text-muted mb-8">Last updated: June 28, 2026</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">1. What Are Cookies</h2>
            <p className="text-text-body mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">2. How We Use Cookies</h2>
            <p className="text-text-body mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-text-dark mb-2">3.1 Essential Cookies</h3>
            <p className="text-text-body mb-4">These cookies are necessary for the website to function. They enable basic functions like page navigation and access to secure areas.</p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li>Authentication cookies (NextAuth.js session)</li>
              <li>Security tokens</li>
              <li>Preference cookies</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-dark mb-2">3.2 Analytics Cookies</h3>
            <p className="text-text-body mb-4">These cookies help us analyze how visitors use our website.</p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li>Google Analytics cookies</li>
              <li>Performance monitoring cookies</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-dark mb-2">3.3 Functional Cookies</h3>
            <p className="text-text-body mb-4">These cookies remember your choices to provide enhanced functionality.</p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li>Language preferences</li>
              <li>Theme preferences</li>
              <li>Cookie consent preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">4. Third-Party Cookies</h2>
            <p className="text-text-body mb-4">We may use third-party services that set cookies on your device:</p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li><strong>Google:</strong> For authentication and analytics</li>
              <li><strong>Cloudinary:</strong> For image management</li>
              <li><strong>Resend:</strong> For email services</li>
            </ul>
            <p className="text-text-body">
              These third parties have their own privacy policies and cookie policies. We encourage you to review these policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">5. Managing Cookies</h2>
            <p className="text-text-body mb-4">You can control and manage cookies in various ways:</p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies</li>
              <li><strong>Cookie Consent Banner:</strong> Use our cookie consent banner to manage preferences</li>
              <li><strong>Opt-Out Links:</strong> Use opt-out links provided by third-party services</li>
            </ul>
            <p className="text-text-body">
              Please note that blocking essential cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">6. Browser-Specific Instructions</h2>
            
            <h3 className="text-xl font-semibold text-text-dark mb-2">Google Chrome</h3>
            <p className="text-text-body mb-4">Settings → Privacy and security → Cookies and other site data</p>
            
            <h3 className="text-xl font-semibold text-text-dark mb-2">Mozilla Firefox</h3>
            <p className="text-text-body mb-4">Options → Privacy & Security → Cookies and Site Data</p>
            
            <h3 className="text-xl font-semibold text-text-dark mb-2">Safari</h3>
            <p className="text-text-body mb-4">Preferences → Privacy → Manage Website Data</p>
            
            <h3 className="text-xl font-semibold text-text-dark mb-2">Microsoft Edge</h3>
            <p className="text-text-body mb-4">Settings → Cookies and site permissions → Manage cookies</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">7. Cookie Lifespan</h2>
            <p className="text-text-body mb-4">Cookies have different lifespans:</p>
            <ul className="list-disc pl-6 text-text-body mb-4">
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until deleted</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">8. Updates to This Policy</h2>
            <p className="text-text-body">
              We may update this Cookie Policy from time to time. We will notify you of significant changes by updating the &quot;Last updated&quot; date and, if necessary, through our cookie consent banner.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">9. Contact Us</h2>
            <p className="text-text-body mb-4">
              If you have questions about our use of cookies, contact us:
            </p>
            <ul className="list-none text-text-body">
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
