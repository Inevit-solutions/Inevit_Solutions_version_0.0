import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PageView } from '../types';

interface PrivacyProps {
  onNavigate: (page: PageView) => void;
}

const Privacy: React.FC<PrivacyProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-24 pb-24 relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-text-muted hover:text-white transition-colors text-sm font-mono"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-white"
        >
          Privacy Policy
        </motion.h1>

        {/* Last Updated */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-text-muted text-sm font-mono mb-12"
        >
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed"
        >
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">1. Data Collection</h2>
            <p className="mb-4">
              Inevit Solutions ("we," "our," or "us") collects information that you provide directly to us through our website contact forms and email communications. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
              <li>Name and contact information (email address, phone number)</li>
              <li>Organization or company name</li>
              <li>Project details and business requirements shared during consultations</li>
              <li>Any other information you voluntarily provide in communications with us</li>
            </ul>
            <p className="mt-4">
              We use this information solely to respond to your inquiries, provide our services, and communicate about potential engagements. We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">2. Third-Party AI Services</h2>
            <p className="mb-4">
              In the course of providing our services, we may utilize third-party AI platforms and APIs, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
              <li>OpenAI (GPT models, embeddings, fine-tuning services)</li>
              <li>Anthropic (Claude models and API services)</li>
              <li>Other AI service providers as required for project delivery</li>
            </ul>
            <p className="mt-4">
              When we use these services, your data may be transmitted to these third-party providers in accordance with their respective privacy policies. We select providers that maintain industry-standard security practices and data protection measures. However, we are not responsible for the privacy practices of these third-party services.
            </p>
            <p className="mt-4">
              <strong className="text-white">Important:</strong> These third-party AI services may use submitted data for model training and improvement purposes as outlined in their terms of service. We recommend reviewing their privacy policies directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">3. Data Sovereignty</h2>
            <p className="mb-4">
              <strong className="text-white">We do not use your data for model training.</strong> Any client data, proprietary information, or business-specific content shared with us during the course of our engagement remains your property and is used exclusively for the purpose of delivering the contracted services.
            </p>
            <p className="mb-4">
              We implement technical and organizational measures to protect your data, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
              <li>Encryption of data in transit and at rest</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Regular security audits and monitoring</li>
              <li>Secure data storage and backup procedures</li>
            </ul>
            <p className="mt-4">
              Client data is retained only for the duration necessary to fulfill our contractual obligations, unless a longer retention period is required by law or explicitly agreed upon.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">4. Cookies and Tracking</h2>
            <p className="mb-4">
              Our website uses minimal tracking technologies. We do not employ third-party advertising cookies or extensive analytics tracking. Any cookies used are essential for website functionality and are not used for marketing or profiling purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">5. Your Rights</h2>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete data</li>
              <li>Request deletion of your personal information (subject to legal and contractual obligations)</li>
              <li>Object to processing of your personal information</li>
              <li>Request data portability where applicable</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at <a href="mailto:inevitsolutions.co@gmail.com" className="text-gold hover:text-white transition-colors">inevitsolutions.co@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">6. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after such modifications constitutes acknowledgment and acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">7. Contact Us</h2>
            <p className="mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-surface/30 border border-white/5 rounded-lg p-6 mt-4">
              <p className="text-text-secondary mb-2">
                <strong className="text-white">Inevit Solutions</strong>
              </p>
              <p className="text-text-secondary mb-2">
                Email: <a href="mailto:inevitsolutions.co@gmail.com" className="text-gold hover:text-white transition-colors">inevitsolutions.co@gmail.com</a>
              </p>
              <p className="text-text-secondary">
                Location: Dhanbad, JH / Remote Global
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
