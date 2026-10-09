import { tableWrap, td, th, thead } from "./shared";

// Superseded zero-shot run on the deprecated 730-plot cohort (data_cimmyt_clean).
// Kept verbatim for reference only; see the note rendered above the tables.

const phase2BestRows = [
  {
    task: "Crop Type",
    sensor: "S1",
    model: "ConvLSTM",
    metric: "Accuracy",
    score: "94.01%",
    delta: "similar",
  },
  {
    task: "Crop Type",
    sensor: "S1",
    model: "ConvLSTM",
    metric: "F1 (Paddy)",
    score: "96.91%",
    delta: "similar",
  },
  {
    task: "Crop Type",
    sensor: "S1",
    model: "ConvLSTM",
    metric: "IoU",
    score: "94.01%",
    delta: "up 13 pts",
  },
  {
    task: "Sowing Date",
    sensor: "S2",
    model: "UNet3D",
    metric: "MAE (days)",
    score: "159.62",
    delta: "down 157 days",
  },
  {
    task: "Sowing Date",
    sensor: "S2",
    model: "UNet3D",
    metric: "MAPE (%)",
    score: "87.22%",
    delta: "down 85 pts",
  },
  {
    task: "Transplanting",
    sensor: "Fusion",
    model: "ConvLSTM",
    metric: "MAE (days)",
    score: "34.72",
    delta: "down 29 days",
  },
  {
    task: "Transplanting",
    sensor: "Fusion",
    model: "ConvLSTM",
    metric: "MAPE (%)",
    score: "18.97%",
    delta: "down 69 pts",
  },
  {
    task: "Harvesting",
    sensor: "S1",
    model: "ConvLSTM",
    metric: "MAE (days)",
    score: "81.97",
    delta: "down 73 days",
  },
  {
    task: "Harvesting",
    sensor: "S1",
    model: "ConvLSTM",
    metric: "MAPE (%)",
    score: "44.79%",
    delta: "down 46 pts",
  },
  {
    task: "Crop Yield",
    sensor: "L8",
    model: "ConvLSTM",
    metric: "MAPE (%)",
    score: "89.13%",
    delta: "down 25 pts",
  },
];

const appendixCropRows = [
  { sensor: "S1", model: "ConvLSTM", accuracy: "94.01%", f1Overall: "48.46%", f1Paddy: "96.91%", iou: "94.01%" },
  { sensor: "S1", model: "UNet3D", accuracy: "68.61%", f1Overall: "40.71%", f1Paddy: "81.38%", iou: "68.60%" },
  { sensor: "S1", model: "U-TAE", accuracy: "51.95%", f1Overall: "34.20%", f1Paddy: "68.38%", iou: "51.95%" },
  { sensor: "S2", model: "ConvLSTM", accuracy: "53.97%", f1Overall: "35.08%", f1Paddy: "70.10%", iou: "53.96%" },
  { sensor: "S2", model: "UNet3D", accuracy: "9.46%", f1Overall: "8.65%", f1Paddy: "17.26%", iou: "9.44%" },
  { sensor: "S2", model: "U-TAE", accuracy: "0.02%", f1Overall: "0.02%", f1Paddy: "0.00%", iou: "0.00%" },
  { sensor: "L8", model: "ConvLSTM", accuracy: "66.82%", f1Overall: "40.07%", f1Paddy: "80.11%", iou: "66.82%" },
  { sensor: "L8", model: "UNet3D", accuracy: "25.89%", f1Overall: "20.58%", f1Paddy: "41.12%", iou: "25.88%" },
  { sensor: "L8", model: "U-TAE", accuracy: "0.02%", f1Overall: "0.02%", f1Paddy: "0.00%", iou: "0.00%" },
  { sensor: "Fusion", model: "ConvLSTM", accuracy: "16.58%", f1Overall: "14.23%", f1Paddy: "28.43%", iou: "16.57%" },
  { sensor: "Fusion", model: "UNet3D", accuracy: "46.05%", f1Overall: "31.55%", f1Paddy: "63.05%", iou: "46.04%" },
  { sensor: "Fusion", model: "U-TAE", accuracy: "74.15%", f1Overall: "42.60%", f1Paddy: "85.16%", iou: "74.15%" },
];

const appendixPhenologyRows = [
  { task: "Sowing", sensor: "S2", model: "UNet3D", rmse: "162.38", mae: "159.62", mape: "87.22%" },
  { task: "Transplanting", sensor: "Fusion", model: "ConvLSTM", rmse: "41.64", mae: "34.72", mape: "18.97%" },
  { task: "Harvesting", sensor: "S1", model: "ConvLSTM", rmse: "144.06", mae: "81.97", mape: "44.79%" },
];

const appendixYieldRows = [
  { sensor: "L8", model: "ConvLSTM", rmse: "5,250.83", mae: "5,133.43", mape: "89.13%" },
  { sensor: "L8", model: "UNet3D", rmse: "5,740.86", mae: "5,633.67", mape: "98.33%" },
  { sensor: "L8", model: "U-TAE", rmse: "5,751.41", mae: "5,644.06", mape: "98.51%" },
  { sensor: "S1", model: "ConvLSTM", rmse: "5,624.44", mae: "5,515.03", mape: "96.15%" },
  { sensor: "S1", model: "UNet3D", rmse: "5,743.89", mae: "5,636.75", mape: "98.39%" },
  { sensor: "S1", model: "U-TAE", rmse: "5,718.89", mae: "5,611.71", mape: "97.94%" },
  { sensor: "S2", model: "ConvLSTM", rmse: "5,721.36", mae: "5,615.19", mape: "98.01%" },
  { sensor: "S2", model: "UNet3D", rmse: "5,677.57", mae: "5,570.30", mape: "97.19%" },
  { sensor: "S2", model: "U-TAE", rmse: "5,692.92", mae: "5,584.98", mape: "97.44%" },
  { sensor: "Fusion", model: "ConvLSTM", rmse: "5,637.09", mae: "5,528.32", mape: "96.40%" },
  { sensor: "Fusion", model: "UNet3D", rmse: "5,705.04", mae: "5,595.02", mape: "97.55%" },
  { sensor: "Fusion", model: "U-TAE", rmse: "5,730.26", mae: "5,622.47", mape: "98.11%" },
];

function Table({ cols, rows, keys }: { cols: string[]; rows: any[]; keys: string[] }) {
  return (
    <div className={tableWrap}>
      <table className="min-w-[720px] w-full text-left text-xs sm:text-sm">
        <thead className={thead}><tr>{cols.map((c) => <th key={c} className={th}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-gray-100">
              {keys.map((k, j) => <td key={k} className={j === 0 ? "px-4 py-3 font-medium text-navy-900" : td}>{r[k]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ArchivedZeroShot() {
  return (
    <section id="archive" className="px-4 py-20 bg-sage-50 scroll-mt-14">
      <div className="max-w-6xl mx-auto">
        <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase">Archive</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">Earlier zero-shot run (superseded)</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900 max-w-4xl">
          <p className="font-semibold mb-2">Do not cite these numbers</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>They come from the earlier 730-plot cohort (data_cimmyt_clean), which is deprecated.</li>
            <li>Its crop-type labels were a random 50/50 split, and its masks held almost no labelled pixels (12 paddy pixels out of 76,800 in the crop-type evaluation), so the crop-type scores are not meaningful.</li>
            <li>Imagery came from one 2016–2022 window rather than each field's own season, so date errors mix unrelated years.</li>
            <li>The Phase 2 sections above replace this run with a rebuilt 509-field cohort, a location-based split, and before/after fine-tuning results.</li>
          </ul>
        </div>
        <details className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
          <summary className="cursor-pointer font-semibold text-navy-900">Show the archived tables</summary>
          <div className="space-y-8 mt-6">
            <div>
              <h3 className="font-semibold text-navy-900 mb-3">Best configuration per task</h3>
              <Table cols={["Task", "Sensor", "Model", "Metric", "Score", "vs. Phase 1"]} rows={phase2BestRows} keys={["task", "sensor", "model", "metric", "score", "delta"]} />
            </div>
            <div>
              <h3 className="font-semibold text-navy-900 mb-3">Crop type, all configurations</h3>
              <Table cols={["Sensor", "Model", "Accuracy", "F1 (overall)", "F1 (paddy)", "IoU"]} rows={appendixCropRows} keys={["sensor", "model", "accuracy", "f1Overall", "f1Paddy", "iou"]} />
            </div>
            <div>
              <h3 className="font-semibold text-navy-900 mb-3">Phenology, best configuration per task</h3>
              <Table cols={["Task", "Sensor", "Model", "RMSE (days)", "MAE (days)", "MAPE"]} rows={appendixPhenologyRows} keys={["task", "sensor", "model", "rmse", "mae", "mape"]} />
            </div>
            <div>
              <h3 className="font-semibold text-navy-900 mb-3">Yield, all configurations (n = 75 plots)</h3>
              <Table cols={["Sensor", "Model", "RMSE (kg/ha)", "MAE (kg/ha)", "MAPE"]} rows={appendixYieldRows} keys={["sensor", "model", "rmse", "mae", "mape"]} />
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
