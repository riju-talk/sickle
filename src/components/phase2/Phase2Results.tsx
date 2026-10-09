import { useState } from "react";
import {
  Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Scatter,
  ScatterChart, Tooltip, XAxis, YAxis, ZAxis,
} from "recharts";
import {
  COLORS, Card, Legend, MODEL_COLORS, Section, TASKS, data, fmt, pctChange, tableWrap, td, th, thead,
} from "./shared";

type Row = Record<string, any>;

function bestRow(rows: Row[]) {
  return rows.reduce((a, b) => (b.test_rmse_ft < a.test_rmse_ft ? b : a));
}

export function Phase2ResultsSummary() {
  return (
    <Section
      id="phase2-results"
      tone="white"
      eyebrow="Phase 2 · Results"
      title="New baselines and errors after fine-tuning"
      lede={
        <p>
          The baseline is the pretrained SICKLE checkpoint scored zero-shot on the new test split. The
          reference is the training-set mean predicted for every field. Test set: 76 fields from 31 held-out
          locations. Lower is better throughout.
        </p>
      }
    >
      <div className={tableWrap}>
        <table className="min-w-[860px] w-full text-left text-sm">
          <thead className={thead}>
            <tr>
              <th className={th}>Task</th><th className={th}>Best model</th><th className={th}>Test RMSE baseline</th>
              <th className={th}>Test RMSE fine-tuned</th><th className={th}>Change</th><th className={th}>Predict the mean</th><th className={th}>Beats the mean?</th>
            </tr>
          </thead>
          <tbody>
            {TASKS.map((t) => {
              const b = bestRow(data.results[t.key]);
              const ref = data.reference[t.ref].test.rmse;
              const beats = b.test_rmse_ft < ref;
              return (
                <tr key={t.key} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-navy-900">{t.label}</td>
                  <td className={td}>{b.model}</td>
                  <td className={td} style={{ color: COLORS.before }}>{fmt(b.test_rmse_base, t.unit)}</td>
                  <td className={`${td} font-semibold`} style={{ color: COLORS.after }}>{fmt(b.test_rmse_ft, t.unit)}</td>
                  <td className={td}>{pctChange(b.test_rmse_base, b.test_rmse_ft)}</td>
                  <td className={`${td} italic`}>{fmt(ref, t.unit)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${beats ? "bg-green-100 text-green-800" : "bg-red-50 text-red-700"}`}>
                      {beats ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-2">Dates in days, scored on every plot pixel (SICKLE convention). Yield in kg/ha, scored once per field.</p>
      <TaskExplorer />
    </Section>
  );
}

function TaskExplorer() {
  const [key, setKey] = useState<string>(TASKS[1].key);
  const t = TASKS.find((x) => x.key === key)!;
  const rows: Row[] = data.results[t.key];
  const ref = data.reference[t.ref];
  const chartRows = rows.map((r) => ({ model: r.model, Baseline: r.test_rmse_base, "Fine-tuned": r.test_rmse_ft }));
  const curves = data.curves[t.key];
  const maxEp = Math.max(...Object.values(curves).map((c: any) => c.length));
  const curveRows = Array.from({ length: maxEp }, (_, i) => {
    const o: Row = { epoch: i + 1 };
    Object.entries(curves).forEach(([m, c]: any) => { if (c[i]) o[m] = c[i].val; });
    return o;
  });
  const isYield = t.unit === "kg/ha";

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Task">
        {TASKS.map((x) => (
          <button
            key={x.key}
            role="tab"
            aria-selected={x.key === key}
            onClick={() => setKey(x.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green ${
              x.key === key ? "bg-navy-900 text-white border-navy-900" : "bg-white text-gray-600 border-gray-200 hover:border-navy-900"
            }`}
          >
            {x.short}
          </button>
        ))}
      </div>

      {isYield && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 max-w-4xl">
          Read with care: the fine-tuned yield models still predict close to zero (test MAPE{" "}
          {Math.min(...rows.map((r) => r.test_mape_ft * 100)).toFixed(0)}–{Math.max(...rows.map((r) => r.test_mape_ft * 100)).toFixed(0)}%).
          SICKLE's yield target is a plot total spread over its pixels (small numbers); CIMMYT's is about
          5,900 kg/ha on every pixel. The small RMSE changes reflect that unit gap, not learning.
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <Card title={`Test RMSE (${t.unit})`}>
          <Legend items={[{ color: COLORS.before, label: "Pretrained baseline" }, { color: COLORS.after, label: "Fine-tuned" }, { color: COLORS.ref, label: `Predict the mean: ${fmt(ref.test.rmse, t.unit)}`, dashed: true }]} />
          <div className="h-64 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartRows} margin={{ top: 16, right: 8, left: isYield ? 8 : -8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={COLORS.grid} />
                <XAxis dataKey="model" tick={{ fontSize: 12, fill: COLORS.axis }} />
                <YAxis tick={{ fontSize: 11, fill: COLORS.axis }} />
                <Tooltip formatter={(v: number) => fmt(v, t.unit)} />
                <Bar isAnimationActive={false} dataKey="Baseline" fill={COLORS.before} radius={[3, 3, 0, 0]} label={{ position: "top", fontSize: 10, fill: COLORS.axis, formatter: (v: number) => fmt(v, t.unit) }} />
                <Bar isAnimationActive={false} dataKey="Fine-tuned" fill={COLORS.after} radius={[3, 3, 0, 0]} label={{ position: "top", fontSize: 10, fill: COLORS.axis, formatter: (v: number) => fmt(v, t.unit) }} />
                <ReferenceLine y={ref.test.rmse} stroke={COLORS.ref} strokeDasharray="5 4" strokeWidth={1.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Validation RMSE per epoch">
          <Legend items={[...rows.map((r) => ({ color: MODEL_COLORS[r.model], label: r.model })), { color: COLORS.ref, label: `Predict the mean: ${fmt(ref.val.rmse, t.unit)}`, dashed: true }]} />
          <div className="h-64 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curveRows} margin={{ top: 8, right: 8, left: isYield ? 8 : -8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={COLORS.grid} />
                <XAxis dataKey="epoch" type="number" domain={[1, 40]} ticks={[1, 10, 20, 30, 40]} tick={{ fontSize: 11, fill: COLORS.axis }} />
                <YAxis tick={{ fontSize: 11, fill: COLORS.axis }} domain={[0, "auto"]} />
                <Tooltip formatter={(v: number) => fmt(v, t.unit)} labelFormatter={(l) => `Epoch ${l}`} />
                {rows.map((r) => (
                  <Line isAnimationActive={false} key={r.model} type="monotone" dataKey={r.model} stroke={MODEL_COLORS[r.model]} strokeWidth={2} dot={false} connectNulls={false} />
                ))}
                <ReferenceLine y={ref.val.rmse} stroke={COLORS.ref} strokeDasharray="5 4" strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className={`${tableWrap} mt-6`}>
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead className={thead}>
            <tr>
              <th className={th}>Model</th><th className={th}>Val RMSE</th><th className={th}>Val MAE</th><th className={th}>Test RMSE</th>
              <th className={th}>Test MAE</th>{isYield && <th className={th}>Test MAPE</th>}<th className={th}>Best epoch / run</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.model} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-navy-900">{r.model}</td>
                {["val_rmse", "val_mae", "test_rmse", "test_mae"].map((k) => (
                  <td key={k} className={td}>
                    <span style={{ color: COLORS.before }}>{fmt(r[`${k}_base`], t.unit)}</span> →{" "}
                    <span className="font-semibold" style={{ color: COLORS.after }}>{fmt(r[`${k}_ft`], t.unit)}</span>
                  </td>
                ))}
                {isYield && <td className={td}>{(r.test_mape_base * 100).toFixed(0)}% → {(r.test_mape_ft * 100).toFixed(0)}%</td>}
                <td className={td}>{r.bestEpoch} / {r.epochsRun}</td>
              </tr>
            ))}
            <tr className="border-t border-gray-100 italic text-gray-500">
              <td className="px-4 py-3">Predict the mean ({fmt(ref.trainMean, t.unit)})</td>
              <td className={td}>{fmt(ref.val.rmse, t.unit)}</td><td className={td}>{fmt(ref.val.mae, t.unit)}</td>
              <td className={td}>{fmt(ref.test.rmse, t.unit)}</td><td className={td}>{fmt(ref.test.mae, t.unit)}</td>
              {isYield && <td className={td}>19%</td>}<td className={td}>—</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-2">Values read baseline → fine-tuned. Best epoch / run: the epoch kept and how many ran before early stopping (cap 40).</p>
    </div>
  );
}

export function Phase2Transplanting() {
  const pts = data.transplantScatter;
  const pre = pts.filter((p: Row) => p.checkpoint === "pretrained").map((p: Row) => ({ x: p.true_day, y: p.pred_day }));
  const ft = pts.filter((p: Row) => p.checkpoint === "fine-tuned").map((p: Row) => ({ x: p.true_day, y: p.pred_day }));
  return (
    <Section
      id="phase2-transplant"
      eyebrow="Phase 2 · Deep dive"
      title="Transplanting, field by field"
      lede={<p>Averaging each field's predicted map over its plot pixels shows what the pixel scores hide: whether the models get the offset right, and whether they rank fields correctly.</p>}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="ConvLSTM: true vs predicted transplanting day (76 test fields)">
          <Legend items={[{ color: COLORS.before, label: "Pretrained" }, { color: COLORS.after, label: "Fine-tuned" }, { color: COLORS.ref, label: "Perfect prediction", dashed: true }]} />
          <div className="h-72 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 8, right: 12, left: -8, bottom: 16 }}>
                <CartesianGrid stroke={COLORS.grid} />
                <XAxis type="number" dataKey="x" name="True day" domain={[0, 130]} tick={{ fontSize: 11, fill: COLORS.axis }} label={{ value: "True day", position: "insideBottom", offset: -8, fontSize: 11, fill: COLORS.axis }} />
                <YAxis type="number" dataKey="y" name="Predicted day" domain={[0, 130]} tick={{ fontSize: 11, fill: COLORS.axis }} />
                <ZAxis range={[28, 28]} />
                <Tooltip formatter={(v: number) => v.toFixed(1)} />
                <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 130, y: 130 }]} stroke={COLORS.ref} strokeDasharray="5 4" />
                <Scatter isAnimationActive={false} name="Pretrained" data={pre} fill={COLORS.before} fillOpacity={0.75} />
                <Scatter isAnimationActive={false} name="Fine-tuned" data={ft} fill={COLORS.after} fillOpacity={0.75} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="min-w-0">
          <div className={tableWrap}>
            <table className="min-w-[560px] w-full text-left text-sm">
              <thead className={thead}>
                <tr><th className={th}>Model</th><th className={th}>Checkpoint</th><th className={th}>Mean pred.</th><th className={th}>Bias</th><th className={th}>Field RMSE</th><th className={th}>Corr.</th></tr>
              </thead>
              <tbody>
                {data.fieldAnalysis.map((r: Row) => (
                  <tr key={r.model + r.checkpoint} className={`border-t border-gray-100 ${r.checkpoint === "fine-tuned" ? "bg-sage-50" : ""}`}>
                    <td className="px-4 py-2.5 font-medium text-navy-900">{r.model}</td>
                    <td className="px-4 py-2.5 text-gray-600">{r.checkpoint}</td>
                    <td className={td}>{r.meanPred}</td>
                    <td className={td}>{r.bias > 0 ? "+" : ""}{r.bias}</td>
                    <td className={td}>{r.rmse}</td>
                    <td className={td}>{r.corr.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">True test mean: day 74.4 (sd 7.8). Bias = mean of predicted − true, in days.</p>
          <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2 mt-4">
            <li>Pretrained models predict about day 33–36 for every field, roughly 40 days early. That matches SICKLE's own transplanting days (mean 38.7), not CIMMYT's.</li>
            <li>Fine-tuning fixes ConvLSTM's offset (bias −1.7 days) but its predictions barely track the true dates (correlation 0.07); the remaining 18-day error is scatter.</li>
            <li>U-TAE and UNet3D moved about 9 days and stay about 32 days early on every field.</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function Phase2CropType() {
  const reasons = [
    ["No negative class", "All 509 CIMMYT fields are rice. There is no surveyed non-rice field to learn from or test on."],
    ["Label equals the plot outline", "Inside every plot the crop-type map is identical to the plot mask (AP_101: 60 plot pixels, 60 rice pixels). \"Non-rice\" outside the plot is an assumption; neighbours are likely rice too."],
    ["Borrowed shapes", "Outlines are SSSE.kml shapes moved onto approximate GPS points, so a crop-type score would measure how well a model redraws a borrowed shape, not crop identification."],
    ["Old labels were invalid", "The earlier 730-plot cohort had crop labels from a random 50/50 split, which is why its 94% accuracy is not meaningful."],
  ];
  return (
    <Section id="phase2-croptype" tone="white" eyebrow="Phase 2 · Scope" title="Why crop type is left out of Phase 2">
      <div className="grid md:grid-cols-2 gap-6">
        {reasons.map(([h, b], i) => (
          <div key={h} className="bg-navy-900 text-white rounded-xl p-6 flex gap-4">
            <span className="flex-none w-8 h-8 rounded-full bg-amber-500 text-navy-900 font-bold flex items-center justify-center">{i + 1}</span>
            <div><h3 className="font-semibold mb-1">{h}</h3><p className="text-sm text-gray-300">{b}</p></div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-6 max-w-3xl">
        To bring crop type back: survey non-rice fields in the same districts, and record true field
        boundaries (digitised or GPS-walked) for the surveyed fields themselves.
      </p>
    </Section>
  );
}

export function Phase2Findings() {
  return (
    <Section id="phase2-findings" eyebrow="Phase 2 · Conclusions" title="What Phase 2 shows">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Findings">
          <ol className="list-decimal ml-5 text-gray-600 text-sm space-y-2">
            <li>Fine-tuning lowers error for every date task and every architecture.</li>
            <li>ConvLSTM adapts best: test RMSE −61% for sowing (35.0 → 13.6 days) and −57% for transplanting (42.2 → 18.3 days).</li>
            <li>U-TAE and UNet3D improve only 9–30% and were often still improving at the 40-epoch cap.</li>
            <li>No fine-tuned model yet beats predicting the training mean (sowing 8.6, transplanting 8.2, harvesting 18.0 days).</li>
            <li>Harvesting generalises worst: ConvLSTM reaches 33.0 days on validation but 57.2 on test.</li>
            <li>Yield is not learned yet, because the pretrained heads output a different unit from CIMMYT's kg/ha.</li>
          </ol>
        </Card>
        <Card title="Limitations">
          <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
            <li>One seed per run; a few days' difference between models may not be meaningful.</li>
            <li>Date scores are per pixel, so larger plots count more.</li>
            <li>76 test fields from 31 locations; confidence intervals would be wide.</li>
            <li>Field outlines are borrowed SSSE.kml shapes on approximate GPS points.</li>
            <li>Date checkpoints exist only for the fixed season window.</li>
          </ul>
        </Card>
      </div>
      <Card title="Next steps" className="mt-6">
        <ol className="list-decimal ml-5 text-gray-600 text-sm space-y-2">
          <li>Rescale the yield target (t/ha or standardised) and re-run yield.</li>
          <li>Correct the date offset at the start: set the output bias to the CIMMYT mean, or predict each field's difference from the mean.</li>
          <li>Raise the learning rate (for example 1e-4) or train longer, especially for U-TAE and UNet3D.</li>
          <li>Report per-field errors and correlation alongside per-pixel RMSE, over 3–5 seeds.</li>
        </ol>
      </Card>
    </Section>
  );
}
