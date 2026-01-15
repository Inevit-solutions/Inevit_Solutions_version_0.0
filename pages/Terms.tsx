import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PageView } from '../types';

interface TermsProps {
  onNavigate: (page: PageView) => void;
}

const Terms: React.FC<TermsProps> = ({ onNavigate }) => {
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
          Terms of Service
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
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">1. Pre-Contractual Information</h2>
            <p className="mb-4">
              <strong className="text-white">Important:</strong> The information, service descriptions, case studies, and capabilities presented on this website are for demonstration and informational purposes only. They do not constitute a binding offer or contract.
            </p>
            <p className="mb-4">
              All final terms, scope, deliverables, timelines, and pricing for any engagement are determined through:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
              <li>A detailed Statement of Work (SOW) document</li>
              <li>A video consultation call to understand your specific requirements</li>
              <li>Mutual agreement and execution of a formal service agreement</li>
            </ul>
            <p className="mt-4">
              No services are provided, and no obligations are created, until a formal written agreement is executed by both parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">2. AI Output Disclaimer</h2>
            <p className="mb-4">
              Our services may involve the use of artificial intelligence (AI) systems, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
              <li>Large Language Models (LLMs) such as GPT, Claude, and similar systems</li>
              <li>Retrieval-Augmented Generation (RAG) systems</li>
              <li>Custom AI workflows and automation pipelines</li>
            </ul>
            <p className="mt-4 mb-4">
              <strong className="text-white">AI systems may produce inaccurate, incomplete, or hallucinated outputs.</strong> While we implement safeguards, validation mechanisms, and quality control processes, we cannot guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
              <li>100% accuracy of AI-generated content or responses</li>
              <li>Complete absence of factual errors or hallucinations</li>
              <li>Perfect reliability under all conditions or edge cases</li>
            </ul>
            <p className="mt-4">
              You acknowledge that AI outputs should be reviewed, validated, and verified by qualified personnel before being used in production environments or for critical business decisions. We recommend implementing human oversight and validation workflows for all AI-generated content.
            </p>
            <p className="mt-4">
              We are not liable for damages arising from reliance on unverified AI outputs or from the inherent limitations of AI technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">3. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.1. Our Intellectual Property</h3>
            <p className="mb-4">
              All content on this website, including but not limited to text, graphics, logos, designs, code, and documentation, is the property of Inevit Solutions and is protected by copyright, trademark, and other intellectual property laws. This website, its structure, and its content are our proprietary work.
            </p>
            <p className="mb-4">
              You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written permission.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.2. Client Data and Deliverables</h3>
            <p className="mb-4">
              <strong className="text-white">Your data belongs to you.</strong> Any proprietary data, business information, documents, or content you provide to us remains your exclusive property. We do not claim ownership of your data.
            </p>
            <p className="mb-4">
              Custom code, workflows, and systems developed specifically for you under a Statement of Work are delivered to you as work product. Ownership and licensing terms are specified in the individual service agreement or SOW.
            </p>
            <p className="mb-4">
              However, we retain the right to use general methodologies, techniques, and non-proprietary knowledge gained during engagements for other projects, provided we do not disclose your confidential information or proprietary business logic.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">4. Service Delivery and Warranties</h2>
            <p className="mb-4">
              We provide our services with professional diligence and in accordance with industry best practices. However:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
              <li>We do not guarantee that our services will be error-free, uninterrupted, or meet all possible use cases</li>
              <li>We are not responsible for third-party service outages, API changes, or platform modifications beyond our control</li>
              <li>We provide services "as-is" and "as-available" within the scope defined in the SOW</li>
            </ul>
            <p className="mt-4">
              Any warranties or guarantees are explicitly stated in the individual service agreement. No other warranties, express or implied, are provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">5. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, Inevit Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>Data loss or corruption</li>
              <li>Business interruption</li>
              <li>Damages arising from reliance on AI outputs</li>
            </ul>
            <p className="mt-4">
              Our total liability for any claims arising from our services shall not exceed the total fees paid by you for the specific service giving rise to the claim in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">6. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify and hold harmless Inevit Solutions from any claims, damages, losses, or expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-text-secondary">
              <li>Your use of our services in violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your failure to comply with applicable laws or regulations</li>
              <li>Your use of delivered work products in unauthorized or illegal ways</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">7. Modifications to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms of Service at any time. Material changes will be posted on this page with an updated "Last Updated" date. Your continued use of our website or services after such modifications constitutes acceptance of the updated terms.
            </p>
            <p className="mb-4">
              However, changes to these Terms do not affect the terms of any active service agreements or SOWs already in effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">8. Governing Law and Dispute Resolution</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts in Dhanbad, Jharkhand, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">9. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms of Service, please contact us:
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

export default Terms;
