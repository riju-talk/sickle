export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="font-heading font-bold text-brand-green text-base">SICKLE++</p>
        <p className="text-xs text-gray-400 mt-2">Multi-Task Agricultural AI Benchmark: Zero-Shot and Fine-Tuned</p>
        <p className="text-xs text-gray-400">
          Extending SICKLE (WACV 2024) to Real-World Deployment
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-10 border-t border-white/10 pt-8">
        <h5 className="font-semibold text-sm text-gray-200 mb-3">Acknowledgments</h5>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>CIMMYT Cereal Systems Initiative for South Asia (CSISA)</li>
          <li>Sentinel Hub API (Sinergise)</li>
          <li>Google Earth Engine</li>
          <li>Indian Council of Agricultural Research (ICAR)</li>
        </ul>
        <p className="text-xs text-gray-400 mt-6">
          © 2026 SICKLE++ Project. All rights reserved. Last Updated: October 2026.
        </p>
      </div>
    </footer>
  );
}
