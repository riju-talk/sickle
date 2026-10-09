import type { ReactNode } from "react";
import { Card, Section, tableWrap, td, th, thead } from "./shared";

const SENSORS = [
  { name: "Sentinel-2", short: "S2", bands: "12 optical bands", tensor: "T × 12 × 32 × 32", color: "bg-emerald-50 border-emerald-200" },
  { name: "Landsat-8", short: "L8", bands: "7 reflectance + 1 thermal", tensor: "T × 8 × 32 × 32", color: "bg-amber-50 border-amber-200" },
  { name: "Sentinel-1", short: "S1", bands: "VV, VH radar", tensor: "T × 2 × 32 × 32", color: "bg-slate-50 border-slate-200" },
];

const BACKBONES = [
  { model: "ConvLSTM", detail: "Convolutional LSTM over time, hidden size 160, 3 × 3 kernels", perSensor: "0.96–1.01 M", used: "2.96 M", total: "3.98 M" },
  { model: "U-TAE", detail: "U-Net encoder 64→128, decoder 32→128, L-TAE temporal attention (16 heads, d_model 256, d_k 4), group norm", perSensor: "0.53–0.54 M", used: "1.60 M", total: "2.14 M" },
  { model: "UNet3D", detail: "3-D U-Net convolving space and time together", perSensor: "1.55 M", used: "4.65 M", total: "6.20 M" },
];

const HYPER: [string, string, string][] = [
  ["Training data", "Full SICKLE, Tamil Nadu", "357 CIMMYT training fields"],
  ["Initial weights", "Random", "Pretrained checkpoint, all tensors (strict load)"],
  ["Trainable layers", "All", "All (no freezing)"],
  ["Optimiser", "Adam", "Adam"],
  ["Learning rate", "0.1", "1e-5"],
  ["Schedule", "Cosine annealing over the first 75% of epochs", "Cosine 1e-5 → 1e-6 over 30 epochs, then held"],
  ["Weight decay", "None", "1e-4"],
  ["Epochs", "100", "Up to 40, with early stopping"],
  ["Batch size", "32", "8"],
  ["Augmentation", "On", "Off"],
  ["Image window", "Fixed, day 0–183", "All kept images, day −10 to 250"],
  ["Loss", "RMSE (dates per plot pixel; yield per plot)", "Same"],
  ["Checkpoint kept", "Best validation", "Lowest validation RMSE"],
  ["Seed", "0", "0"],
];

const STOPPING: [string, string][] = [
  ["Watched metric", "Validation RMSE, checked after every epoch"],
  ["Improvement", "Any decrease below the best so far (no minimum step)"],
  ["Patience", "Stop after 10 epochs without improvement"],
  ["Hard cap", "40 epochs"],
  ["Warm-up", "None; earliest possible stop is epoch 11"],
  ["Saved", "Only the best epoch (checkpoint_best.pth.tar)"],
  ["After stopping", "Best checkpoint reloaded and scored on validation and test"],
];

function Box({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`border rounded-lg px-3 py-2 text-center text-xs ${className}`}>{children}</div>;
}

function Arrow() {
  return <div className="text-gray-400 text-lg leading-none flex items-center justify-center" aria-hidden="true">→</div>;
}

export function Phase2Model() {
  return (
    <Section
      id="phase2-model"
      eyebrow="Phase 2 · Model"
      title="Fusion model structure and hyperparameters"
      lede={
        <p>
          All three architectures use the same late-fusion design: one backbone per sensor, each producing a
          16-channel map, joined by a single 3 × 3 convolution. Only the backbone changes between ConvLSTM,
          U-TAE and UNet3D.
        </p>
      }
    >
      <Card title="Late fusion, per field">
        <div className="overflow-x-auto">
          <div className="min-w-[760px] grid grid-cols-[1.2fr_auto_1.3fr_auto_1fr_auto_1fr_auto_1fr] gap-2 items-center" role="img" aria-label="Three sensor time series each pass through their own backbone, the three 16-channel maps are concatenated into 48 channels, a 3 by 3 convolution produces one 32 by 32 output map, which is averaged over the plot pixels.">
            <div className="space-y-2">
              {SENSORS.map((s) => (
                <Box key={s.name} className={s.color}>
                  <div className="font-semibold text-navy-900">{s.name}</div>
                  <div className="text-gray-600">{s.tensor}</div>
                  <div className="text-gray-500">{s.bands}</div>
                </Box>
              ))}
            </div>
            <Arrow />
            <div className="space-y-2">
              {SENSORS.map((s) => (
                <Box key={s.name} className="bg-navy-900 border-navy-900 text-white">
                  <div className="font-semibold">{s.short} backbone</div>
                  <div className="text-gray-300">ConvLSTM / U-TAE / UNet3D</div>
                  <div className="text-brand-greenLight">→ 16 × 32 × 32</div>
                </Box>
              ))}
            </div>
            <Arrow />
            <Box className="bg-sage-100 border-sage-300">
              <div className="font-semibold text-navy-900">Concatenate</div>
              <div className="text-gray-600">48 × 32 × 32</div>
            </Box>
            <Arrow />
            <Box className="bg-sage-100 border-sage-300">
              <div className="font-semibold text-navy-900">Conv 3 × 3</div>
              <div className="text-gray-600">48 → 1 channel</div>
              <div className="text-gray-500">433 parameters</div>
            </Box>
            <Arrow />
            <Box className="bg-brand-greenDark border-brand-greenDark text-white">
              <div className="font-semibold">Output map</div>
              <div>1 × 32 × 32</div>
              <div className="text-green-100">day or kg/ha per pixel; field value = mean over plot</div>
            </Box>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Each backbone receives its sensor's images with their day indices. Image sequences of different
          length are zero-padded to the longest in the batch.
        </p>
      </Card>

      <div className={`${tableWrap} mt-6`}>
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className={thead}>
            <tr><th className={th}>Backbone</th><th className={th}>Structure</th><th className={th}>Per sensor</th><th className={th}>Used in forward pass</th><th className={th}>Reported total</th></tr>
          </thead>
          <tbody>
            {BACKBONES.map((b) => (
              <tr key={b.model} className="border-t border-gray-100 align-top">
                <td className="px-4 py-3 font-medium text-navy-900">{b.model}</td>
                <td className="px-4 py-3 text-gray-600">{b.detail}</td>
                <td className={td}>{b.perSensor}</td>
                <td className={td}>{b.used}</td>
                <td className={td}>{b.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-2 max-w-4xl">
        The reported total includes one extra Sentinel-2-sized backbone that <code>Fusion_model</code> inherits from{" "}
        <code>Build_model</code> but never calls. It is saved in every checkpoint and does not affect predictions.
      </p>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 min-w-0">
          <h3 className="font-semibold text-navy-900 mb-3">Hyperparameters</h3>
          <div className={tableWrap}>
            <table className="min-w-[600px] w-full text-left text-sm">
              <thead className={thead}>
                <tr><th className={th}>Setting</th><th className={th}>SICKLE pretraining</th><th className={th}>Phase 2 fine-tuning</th></tr>
              </thead>
              <tbody>
                {HYPER.map(([k, a, b]) => (
                  <tr key={k} className="border-t border-gray-100">
                    <td className="px-4 py-2.5 font-medium text-navy-900">{k}</td>
                    <td className="px-4 py-2.5 text-gray-600">{a}</td>
                    <td className="px-4 py-2.5 text-brand-greenDark font-medium">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Pretraining values come from each checkpoint's conf.json. The recipe is identical for every task and architecture.</p>
        </div>
        <Card title="Early stopping">
          <dl className="space-y-3 text-sm">
            {STOPPING.map(([k, v]) => (
              <div key={k}>
                <dt className="text-gray-500 text-xs uppercase tracking-wider">{k}</dt>
                <dd className="text-navy-900">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-gray-500 mt-4">Run on an RTX 5050 Laptop GPU (8 GB): 16–43 minutes per model.</p>
        </Card>
      </div>
    </Section>
  );
}
