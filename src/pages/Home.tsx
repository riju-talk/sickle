import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Phase2Overview, Phase2DataPipeline, Phase2Splits, Phase2Distribution } from "@/components/phase2/Phase2Data";
import { Phase2Model } from "@/components/phase2/Phase2Model";
import { Phase2ResultsSummary, Phase2Transplanting, Phase2CropType, Phase2Findings } from "@/components/phase2/Phase2Results";
import ArchivedZeroShot from "@/components/phase2/ArchivedZeroShot";

const GITHUB_URL = "https://github.com/your-org/sickle-plus-plus";

const phase1TamilNaduRows = [
  {
    task: "Crop Type (SI)",
    metric: "IoU (%)",
    l8: "47.73% +/- 1.77%",
    s2: "54.87% +/- 3.08%",
    s1: "64.35% +/- 4.82%",
    fusion: "-",
  },
  {
    task: "Crop Type",
    metric: "IoU (%)",
    l8: "56.04% +/- 5.84%",
    s2: "78.12% +/- 3.48%",
    s1: "81.77% +/- 6.60%",
    fusion: "81.07% +/- 5.77%",
  },
  {
    task: "Sow Date",
    metric: "MAE (days)",
    l8: "2.66 +/- 0.961",
    s2: "2.30 +/- 0.611",
    s1: "3.61 +/- 0.898",
    fusion: "2.33 +/- 0.639",
  },
  {
    task: "Transplant Date",
    metric: "MAE (days)",
    l8: "6.20 +/- 1.030",
    s2: "6.36 +/- 2.164",
    s1: "7.23 +/- 0.779",
    fusion: "6.16 +/- 1.770",
  },
  {
    task: "Harvest Date",
    metric: "MAE (days)",
    l8: "9.86 +/- 0.736",
    s2: "8.83 +/- 1.520",
    s1: "10.08 +/- 0.561",
    fusion: "10.75 +/- 3.389",
  },
  {
    task: "Crop Yield (SI)",
    metric: "MAPE (%)",
    l8: "46.74% +/- 3.82%",
    s2: "60.44% +/- 14.50%",
    s1: "48.35% +/- 7.64%",
    fusion: "-",
  },
  {
    task: "Crop Yield (RS)",
    metric: "MAPE (%)",
    l8: "54.00% +/- 9.67%",
    s2: "72.38% +/- 8.74%",
    s1: "71.81% +/- 17.27%",
    fusion: "70.35% +/- 13.75%",
  },
  {
    task: "Crop Yield (AS)",
    metric: "MAPE (%)",
    l8: "59.38% +/- 14.75%",
    s2: "73.59% +/- 9.81%",
    s1: "65.66% +/- 16.24%",
    fusion: "64.56% +/- 13.77%",
  },
];

const phase1CropTypeRows = [
  {
    model: "U-TAE",
    overallF1: "0.7259",
    overallAcc: "0.8028",
    overallIoU: "0.5904",
    paddyF1: "0.5806",
    paddyAcc: "0.7670",
    paddyIoU: "0.4091",
  },
  {
    model: "UNet3D",
    overallF1: "0.9163",
    overallAcc: "0.9474",
    overallIoU: "0.8496",
    paddyF1: "0.8653",
    paddyAcc: "0.9489",
    paddyIoU: "0.7626",
  },
  {
    model: "ConvLSTM",
    overallF1: "0.9163",
    overallAcc: "0.9474",
    overallIoU: "0.8496",
    paddyF1: "0.8653",
    paddyAcc: "0.9489",
    paddyIoU: "0.7626",
  },
];

const phase1SowingRows = [
  { model: "U-TAE", rmse: "8.5669", mae: "5.8880", mape: "0.0322" },
  { model: "UNet3D", rmse: "3.2568", mae: "2.7558", mape: "0.0151" },
  { model: "ConvLSTM", rmse: "3.2568", mae: "2.7558", mape: "0.0151" },
];

const phase1TransplantRows = [
  { model: "U-TAE", rmse: "3.3659", mae: "2.5914", mape: "0.0142" },
  { model: "UNet3D", rmse: "3.3942", mae: "2.5186", mape: "0.0138" },
  { model: "ConvLSTM", rmse: "3.3942", mae: "2.5186", mape: "0.0138" },
];

const phase1HarvestRows = [
  { model: "U-TAE", rmse: "12.9196", mae: "11.6916", mape: "0.0639" },
  { model: "UNet3D", rmse: "13.7296", mae: "12.3700", mape: "0.0676" },
  { model: "ConvLSTM", rmse: "13.7296", mae: "12.3700", mape: "0.0676" },
];

const phase1YieldRows = [
  { model: "U-TAE", rmse: "720.7391", mae: "562.2070", mape: "0.3552" },
  { model: "UNet3D", rmse: "735.4064", mae: "561.4650", mape: "0.3741" },
  { model: "ConvLSTM", rmse: "735.4064", mae: "561.4650", mape: "0.3741" },
];


export default function Home() {
  return (
    <div className="min-h-screen bg-sage-50 text-navy-900">
      <Navbar />
      <main className="pt-14">
        <section
          id="hero"
          className="relative overflow-hidden text-white"
          style={{
            backgroundImage:
              "linear-gradient(160deg, rgba(10,15,26,0.78) 0%, rgba(15,32,24,0.78) 35%, rgba(26,56,40,0.72) 55%, rgba(200,217,200,0.55) 80%, rgba(241,245,242,0.45) 100%), url('/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,197,94,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.25) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-green/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-12 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 lg:py-32">
            <div className="max-w-3xl">
              <p className="text-brand-green text-xs font-semibold tracking-[0.3em] uppercase">
                SICKLE++
              </p>
              <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl mt-4">
                SICKLE++
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-200 mt-5 leading-relaxed">
                A Unified Multi-Task Evaluation Framework for Multi-Sensor Agricultural Remote Sensing
              </p>
              <p className="text-brand-greenLight text-xs sm:text-sm font-semibold mt-4 uppercase tracking-widest">
                From Tamil Nadu to Andhra Pradesh: zero-shot baselines and fine-tuning on paddy fields
              </p>
              <p className="text-gray-200 mt-6 text-sm sm:text-base leading-relaxed">
                Built on top of SICKLE (WACV 2024), SICKLE++ transforms static datasets into scalable
                evaluation pipelines. Phase 2 fine-tunes the SICKLE fusion models on 509 CIMMYT
                rice fields in Andhra Pradesh and measures what transfers.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-brand-green text-white font-semibold hover:bg-brand-greenDark transition-colors"
                >
                  View GitHub Repository <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="px-4 py-20 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5">
                The Missing Layer in Agricultural AI
              </h2>
              <p className="text-gray-600 text-base">
                Remote sensing has revolutionized our ability to observe agriculture at scale. Yet
                despite petabytes of satellite imagery, agricultural AI remains stuck in pilot mode.
              </p>
              <p className="text-gray-700 mt-4">
                The bottleneck is not data availability - it is
                <span className="font-semibold text-navy-900">
                  {" "}
                  usable, structured, learning-ready data systems that generalize across regions
                </span>
                .
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-sage-50 border border-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-navy-900 mb-2">Labeled Datasets Are Scarce</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  High-quality ground truth annotations remain expensive and labor-intensive. Field
                  surveys require physical interaction with farmers, complex manual annotation, and
                  significant financial resources.
                </p>
              </div>
              <div className="bg-sage-50 border border-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-navy-900 mb-2">Fragmented Across Tasks</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Current approaches treat crop classification, yield prediction, and phenology
                  detection as isolated problems. But agriculture is inherently multi-task.
                </p>
              </div>
              <div className="bg-sage-50 border border-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-navy-900 mb-2">No Geographic Generalization</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Models trained in one region fail elsewhere. A system built for Tamil Nadu cannot
                  automatically generalize to Andhra Pradesh's semi-arid regions.
                </p>
              </div>
              <div className="bg-sage-50 border border-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-navy-900 mb-2">Temporal Complexity Ignored</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Most datasets capture static snapshots. Real agriculture unfolds over months, with
                  critical phenological stages tracked across multiple satellite modalities.
                </p>
              </div>
            </div>

            <blockquote className="mt-10 border-l-4 border-brand-green pl-5 text-gray-700 italic text-lg">
              "Agriculture is not a single-task classification problem. It is a temporal,
              multi-variable, multi-sensor system that demands unified evaluation frameworks."
            </blockquote>
          </div>
        </section>

        <section id="existing" className="px-4 py-20 bg-sage-50">
          <div className="max-w-6xl mx-auto">
            <p className="text-brand-green text-xs font-semibold tracking-widest uppercase">
              Existing Work
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">
              SICKLE Foundation
            </h2>
            <p className="text-gray-600 max-w-3xl">
              SICKLE (WACV 2024) is the foundational multi-sensor dataset. Phase 1 is a separate
              inference-only benchmark on Andhra Pradesh using Sentinel-1 data.
            </p>

            <div className="grid lg:grid-cols-2 gap-6 mt-10">
              <div className="bg-white border border-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-navy-900 mb-3">SICKLE (WACV 2024)</h3>
                <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
                  <li>Region: Cauvery Delta, Tamil Nadu (Mayiladuthurai, Thiruvarur, Thanjavur, Nagapattinam).</li>
                  <li>Multi-sensor integration: Sentinel-1 (SAR), Sentinel-2 (optical), Landsat-8 (thermal).</li>
                  <li>2,370 samples across 388 plots with 2018-2021 coverage.</li>
                  <li>Five tasks: crop type, sowing, transplanting, harvesting, yield.</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-navy-900 mb-3">
                  Phase 1: Andhra Pradesh Benchmark (Inference-Only)
                </h3>
                <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
                  <li>Benchmarking on Andhra Pradesh using Sentinel-1 only.</li>
                  <li>Runs inference with the same SICKLE models (no retraining).</li>
                  <li>Zero-shot evaluation to measure geographic generalization.</li>
                  <li>Focused on SAR robustness under domain shift.</li>
                  <li>Produces task-level metrics for classification and phenology.</li>
                  <li>Time range: 2018 Rabi season.</li>
                </ul>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-10">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-navy-900 mb-2">Video Overview</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  YouTube walkthrough of the SICKLE pipeline, data sources, and workflow. with models, evlautions, all the initial ground on which sickle++ was developed.
                </p>
                <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/2p4BDVLrmdw"
                    title="SICKLE Dataset | WACV 2024 | Oral Presentation"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-navy-900 mb-2">Presentation PDF</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  View the SICKLE presentation deck directly below.
                </p>
                <div className="mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-200">
                  <iframe
                    className="w-full h-full"
                    src="/SICKLE_compressed.pdf#view=FitH"
                    title="SICKLE presentation PDF"
                    loading="lazy"
                  />
                </div>
                <a
                  href="/SICKLE_compressed.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex mt-3 text-xs font-semibold text-brand-green hover:text-brand-greenDark"
                >
                  Open PDF in new tab
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="phase1-results" className="px-4 py-20 bg-sage-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Baseline Performance: Tamil Nadu Benchmark
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Benchmarking three state-of-the-art temporal models - ConvLSTM, U-TAE, and UNet3D - on
              the original SICKLE dataset revealed clear performance patterns.
            </p>

            <div className="mt-8 overflow-x-auto border border-gray-200 rounded-xl bg-white">
              <table className="min-w-[900px] w-full text-left text-xs sm:text-sm">
                <thead className="bg-sage-100 text-gray-600 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Task</th>
                    <th className="px-4 py-3 font-semibold">Metric</th>
                    <th className="px-4 py-3 font-semibold">L8</th>
                    <th className="px-4 py-3 font-semibold">S2</th>
                    <th className="px-4 py-3 font-semibold">S1</th>
                    <th className="px-4 py-3 font-semibold">Fusion</th>
                  </tr>
                </thead>
                <tbody>
                  {phase1TamilNaduRows.map((row) => (
                    <tr key={`${row.task}-${row.metric}`} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-navy-900">{row.task}</td>
                      <td className="px-4 py-3 text-gray-600">{row.metric}</td>
                      <td className="px-4 py-3 text-gray-600">{row.l8}</td>
                      <td className="px-4 py-3 text-gray-600">{row.s2}</td>
                      <td className="px-4 py-3 text-gray-600">{row.s1}</td>
                      <td className="px-4 py-3 text-gray-600">{row.fusion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">Phase 1 Detailed Metrics</h3>
                <p className="text-gray-600 text-sm">
                  Per-model results from the Tamil Nadu benchmark.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-navy-900 mb-3">Crop Type Classification</h4>
                <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
                  <table className="min-w-[860px] w-full text-left text-xs sm:text-sm">
                    <thead className="bg-sage-100 text-gray-600 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-3 font-semibold" rowSpan={2}>Model</th>
                        <th className="px-4 py-3 font-semibold text-center" colSpan={3}>Overall</th>
                        <th className="px-4 py-3 font-semibold text-center" colSpan={3}>Paddy</th>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <th className="px-4 py-3 font-semibold">F1</th>
                        <th className="px-4 py-3 font-semibold">Acc</th>
                        <th className="px-4 py-3 font-semibold">IoU</th>
                        <th className="px-4 py-3 font-semibold">F1</th>
                        <th className="px-4 py-3 font-semibold">Acc</th>
                        <th className="px-4 py-3 font-semibold">IoU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phase1CropTypeRows.map((row) => (
                        <tr key={row.model} className="border-t border-gray-100">
                          <td className="px-4 py-3 font-medium text-navy-900">{row.model}</td>
                          <td className="px-4 py-3 text-gray-600">{row.overallF1}</td>
                          <td className="px-4 py-3 text-gray-600">{row.overallAcc}</td>
                          <td className="px-4 py-3 text-gray-600">{row.overallIoU}</td>
                          <td className="px-4 py-3 text-gray-600">{row.paddyF1}</td>
                          <td className="px-4 py-3 text-gray-600">{row.paddyAcc}</td>
                          <td className="px-4 py-3 text-gray-600">{row.paddyIoU}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-navy-900 mb-3">Sowing Date Prediction</h4>
                <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
                  <table className="min-w-[520px] w-full text-left text-xs sm:text-sm">
                    <thead className="bg-sage-100 text-gray-600 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Model</th>
                        <th className="px-4 py-3 font-semibold">RMSE</th>
                        <th className="px-4 py-3 font-semibold">MAE</th>
                        <th className="px-4 py-3 font-semibold">MAPE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phase1SowingRows.map((row) => (
                        <tr key={row.model} className="border-t border-gray-100">
                          <td className="px-4 py-3 font-medium text-navy-900">{row.model}</td>
                          <td className="px-4 py-3 text-gray-600">{row.rmse}</td>
                          <td className="px-4 py-3 text-gray-600">{row.mae}</td>
                          <td className="px-4 py-3 text-gray-600">{row.mape}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-navy-900 mb-3">Transplanting Date Prediction</h4>
                <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
                  <table className="min-w-[520px] w-full text-left text-xs sm:text-sm">
                    <thead className="bg-sage-100 text-gray-600 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Model</th>
                        <th className="px-4 py-3 font-semibold">RMSE</th>
                        <th className="px-4 py-3 font-semibold">MAE</th>
                        <th className="px-4 py-3 font-semibold">MAPE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phase1TransplantRows.map((row) => (
                        <tr key={row.model} className="border-t border-gray-100">
                          <td className="px-4 py-3 font-medium text-navy-900">{row.model}</td>
                          <td className="px-4 py-3 text-gray-600">{row.rmse}</td>
                          <td className="px-4 py-3 text-gray-600">{row.mae}</td>
                          <td className="px-4 py-3 text-gray-600">{row.mape}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-navy-900 mb-3">Harvesting Date Prediction</h4>
                <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
                  <table className="min-w-[520px] w-full text-left text-xs sm:text-sm">
                    <thead className="bg-sage-100 text-gray-600 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Model</th>
                        <th className="px-4 py-3 font-semibold">RMSE</th>
                        <th className="px-4 py-3 font-semibold">MAE</th>
                        <th className="px-4 py-3 font-semibold">MAPE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phase1HarvestRows.map((row) => (
                        <tr key={row.model} className="border-t border-gray-100">
                          <td className="px-4 py-3 font-medium text-navy-900">{row.model}</td>
                          <td className="px-4 py-3 text-gray-600">{row.rmse}</td>
                          <td className="px-4 py-3 text-gray-600">{row.mae}</td>
                          <td className="px-4 py-3 text-gray-600">{row.mape}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-navy-900 mb-3">Crop Yield Prediction</h4>
                <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
                  <table className="min-w-[520px] w-full text-left text-xs sm:text-sm">
                    <thead className="bg-sage-100 text-gray-600 text-xs uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Model</th>
                        <th className="px-4 py-3 font-semibold">RMSE</th>
                        <th className="px-4 py-3 font-semibold">MAE</th>
                        <th className="px-4 py-3 font-semibold">MAPE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phase1YieldRows.map((row) => (
                        <tr key={row.model} className="border-t border-gray-100">
                          <td className="px-4 py-3 font-medium text-navy-900">{row.model}</td>
                          <td className="px-4 py-3 text-gray-600">{row.rmse}</td>
                          <td className="px-4 py-3 text-gray-600">{row.mae}</td>
                          <td className="px-4 py-3 text-gray-600">{row.mape}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-8">
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">Crop Type Classification: Strong Performance</h3>
                <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                  <li>UNet3D and ConvLSTM tie at 0.9163 F1 and 0.8496 IoU (overall).</li>
                  <li>Paddy-specific IoU reaches 0.7626 with UNet3D/ConvLSTM.</li>
                  <li>U-TAE trails with 0.5904 IoU overall.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">Early Phenology (Sowing): Excellent Accuracy</h3>
                <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                  <li>Best MAE is 2.7558 days (UNet3D/ConvLSTM) with MAPE 0.0151.</li>
                  <li>U-TAE is higher at 5.8880 days MAE.</li>
                  <li>Temporal patterns for sowing are consistent and learnable.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">
                  Late Phenology (Transplanting/Harvest): Moderate Challenge
                </h3>
                <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                  <li>Transplanting: best MAE is 2.5186 days (UNet3D/ConvLSTM) with MAPE 0.0138.</li>
                  <li>Harvesting: best MAE is 11.6916 days with U-TAE (MAPE 0.0639).</li>
                  <li>Late-season predictions are more sensitive to regional variations.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">Crop Yield: Open Research Problem</h3>
                <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                  <li>Best MAPE is 0.3552 with U-TAE (RMSE 720.7391).</li>
                  <li>UNet3D/ConvLSTM are slightly higher at MAPE 0.3741.</li>
                  <li>Yield depends on factors beyond satellite imagery.</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 bg-white border border-gray-100 rounded-xl p-6">
              <p className="text-gray-700 font-medium">
                Critical insight: Model performance is task-dependent, not universal. UNet3D and
                ConvLSTM lead on classification and early phenology, while U-TAE is strongest on
                harvesting and yield. Yield estimation remains challenging across all architectures.
              </p>
            </div>
          </div>
        </section>

        <section id="gap" className="px-4 py-20 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Testing Geographic Generalization
            </h2>
            <p className="text-gray-600 max-w-3xl">
              SICKLE established strong baselines in Tamil Nadu, but critical questions remained
              unanswered.
            </p>
            <blockquote className="mt-6 border-l-4 border-brand-green pl-5 text-gray-700 italic text-lg">
              "Can models trained on Tamil Nadu's humid delta generalize to Andhra Pradesh, and how
              much does a short fine-tune on local fields help?"
            </blockquote>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-sage-50 border border-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-navy-900 mb-2">Why This Matters</h3>
                <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
                  <li>Tamil Nadu: high rainfall, intensive irrigation, standardized rice practices.</li>
                  <li>Andhra Pradesh: variable rainfall, diverse cropping patterns, different soils.</li>
                  <li>Real-world deployment requires models that work across boundaries.</li>
                </ul>
              </div>
              <div className="bg-sage-50 border border-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-navy-900 mb-2">Our Approach</h3>
                <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
                  <li>Pretraining: SICKLE (Tamil Nadu, 2018-2021), the published fusion checkpoints</li>
                  <li>Baseline: those checkpoints scored zero-shot on 76 held-out Andhra Pradesh test fields</li>
                  <li>Fine-tuning: 357 Andhra Pradesh training fields (mostly Kharif 2018), then the same test</li>
                  <li>Reference: predicting the training-set average for every field</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Phase2Overview />
        <Phase2DataPipeline />
        <Phase2Splits />
        <Phase2Distribution />
        <Phase2Model />
        <Phase2ResultsSummary />
        <Phase2Transplanting />
        <Phase2CropType />
        <Phase2Findings />

        <section id="pipeline" className="px-4 py-20 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-brand-green text-xs font-semibold tracking-widest uppercase">
                Pipeline
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">
                SICKLE++ Pipeline Overview
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                The SICKLE++ system transforms raw satellite data into task-ready benchmarks through
                automated ingestion, preprocessing, and evaluation. This end-to-end pipeline is built
                for multi-sensor fusion and scalable regional expansion.
              </p>
              <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2 mt-5">
                <li>Automated data retrieval across Sentinel-1, Sentinel-2, and Landsat-8.</li>
                <li>Mask generation and grid alignment for consistent plot-level samples.</li>
                <li>Multi-task model inference for classification, phenology, and yield.</li>
                <li>Standardized evaluation with reproducible metrics and summaries.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                <span className="bg-sage-50 border border-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  Data Ingestion
                </span>
                <span className="bg-sage-50 border border-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  Preprocessing
                </span>
                <span className="bg-sage-50 border border-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  Masking
                </span>
                <span className="bg-sage-50 border border-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  Modeling
                </span>
                <span className="bg-sage-50 border border-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  Evaluation
                </span>
              </div>
            </div>

            <figure className="bg-sage-50 border border-gray-100 rounded-2xl p-4 shadow-sm">
              <img
                src="/pipeline.png"
                alt="SICKLE++ pipeline and system overview"
                className="w-full rounded-xl border border-gray-200"
              />
              <figcaption className="text-xs text-gray-500 mt-3">
                Pipeline and system overview for multi-sensor agricultural benchmarking.
              </figcaption>
            </figure>
          </div>
        </section>

        <ArchivedZeroShot />
      </main>
      <Footer />
    </div>
  );
}
