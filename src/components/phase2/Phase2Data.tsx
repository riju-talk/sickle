import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { COLORS, Card, Legend, Section, Stat, data, tableWrap, td, th, thead } from "./shared";

const SPLIT_LABEL: Record<string, string> = { train: "Train", val: "Validation", test: "Test" };

export function Phase2Overview() {
  const total = data.split.reduce((a: number, s: any) => a + s.fields, 0);
  return (
    <Section
      id="phase2"
      eyebrow="Phase 2 · Andhra Pradesh"
      title="Fine-tuning SICKLE fusion models on CIMMYT rice fields"
      lede={
        <p>
          Phase 2 takes the pretrained SICKLE fusion checkpoints (Sentinel-2 + Landsat-8 + Sentinel-1),
          measures them zero-shot on a rebuilt Andhra Pradesh dataset, then fine-tunes each one and
          measures again. Every model is also compared with the simplest possible reference: predicting
          the training-set average for every field.
        </p>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat value={total} label="model-ready CIMMYT fields" />
        <Stat value={data.totalLocations} label="locations, split with no overlap" />
        <Stat value="4" label="tasks: sowing, transplanting, harvesting, yield" />
        <Stat value="15" label="fine-tuning runs (3 architectures)" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card title="What Phase 2 does">
          <ul className="list-disc ml-5 text-gray-600 text-sm space-y-2">
            <li>Rebuilds the Andhra Pradesh cohort from the CIMMYT NUE survey with year-aware dates and agronomic quality control.</li>
            <li>Gives every field a plot outline from <code className="text-xs bg-sage-100 px-1 rounded">SSSE.kml</code> and a SICKLE-format time series and target maps.</li>
            <li>Splits fields by location (70 / 15 / 15) so neighbouring farms never sit on both sides.</li>
            <li>Scores each pretrained checkpoint (the new baseline), fine-tunes it, and scores it again.</li>
          </ul>
        </Card>
        <Card title="What changed from the earlier zero-shot run" className="bg-amber-50 border-amber-200">
          <ul className="list-disc ml-5 text-amber-900 text-sm space-y-2">
            <li>The earlier 730-plot cohort had crop-type labels from a random 50/50 split and masks that were almost empty (about 0.24% labelled pixels).</li>
            <li>Its phenology dates mixed unrelated years, because imagery came from one global 2016–2022 window rather than each field's own season.</li>
            <li>Its results are kept in the <a href="#archive" className="underline font-semibold">archive</a> for reference but should not be cited.</li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}

export function Phase2DataPipeline() {
  const max = data.funnel[0].n;
  const m = data.match;
  return (
    <Section
      id="phase2-data"
      tone="white"
      eyebrow="Phase 2 · Data"
      title="From farmer survey to model-ready fields"
      lede={<p>The biggest loss is plot matching: a survey record only becomes a training sample once it has a field outline to draw the target maps on.</p>}
    >
      <div className="grid lg:grid-cols-5 gap-6">
        <Card title="Sample funnel" className="lg:col-span-3">
          <div className="space-y-3">
            {data.funnel.map((f: any, i: number) => (
              <div key={f.stage} className="grid grid-cols-[minmax(0,10rem)_1fr] gap-3 items-center">
                <span className="text-sm text-gray-600">{f.stage}</span>
                <div className="relative h-8 bg-sage-50 rounded">
                  <div
                    className="h-full rounded"
                    style={{ width: `${(100 * f.n) / max}%`, background: i === 3 ? COLORS.before : i === 4 ? COLORS.after : COLORS.train }}
                  />
                  <span className="absolute inset-y-0 left-2 flex items-center text-xs font-semibold text-white tabular-nums">
                    {f.n.toLocaleString("en-US")}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Matching kept {Math.round(m.rate * 100)}% of quality-controlled fields. One more field was left out
            during preprocessing.
          </p>
        </Card>

        <Card title="How SSSE.kml gives each field an outline" className="lg:col-span-2">
          <ol className="space-y-3 text-sm text-gray-600">
            {[
              "Start from the survey GPS point. It is approximate and often lands on a house or bare ground.",
              `Search the 137 digitised plot polygons in SSSE.kml within ${m.maxDistKm} km.`,
              "Pick the polygon whose area is closest to the farmer-reported plot size.",
              "Move that shape onto the survey point and burn it into a 32 × 32 mask.",
            ].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-brand-greenDark text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
          <div className="grid grid-cols-3 gap-2 mt-5 text-center">
            <div className="bg-sage-50 rounded-lg p-2"><div className="font-bold text-navy-900">{m.medianKm} km</div><div className="text-[11px] text-gray-500">median distance to source polygon</div></div>
            <div className="bg-sage-50 rounded-lg p-2"><div className="font-bold text-navy-900">{m.distinctPolygons}</div><div className="text-[11px] text-gray-500">distinct shapes reused</div></div>
            <div className="bg-sage-50 rounded-lg p-2"><div className="font-bold text-navy-900">{(m.polyAreaMedianM2 / 1e4).toFixed(2)} ha</div><div className="text-[11px] text-gray-500">median plot area</div></div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Outlines are realistic borrowed shapes, not surveyed field boundaries. SSSE.kml's 91 grid cells and 159 points are not used.</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Card title="One sample = one field">
          <pre className="text-xs bg-sage-50 border border-gray-100 rounded-lg p-4 overflow-x-auto">{`data_cimmyt_ft/AP_101/
  S2.npz    T × 12 × 32 × 32  + day index per image
  L8.npz    T × 8  × 32 × 32  + day index per image
  S1.npz    T × 2  × 32 × 32  + day index per image
  mask.npy  6 × 32 × 32
  metadata.json`}</pre>
          <p className="text-sm text-gray-600 mt-3">
            32 × 32 pixels at 10 m (a 320 m tile). Mask bands: plot, crop type, sowing day, transplanting day,
            harvesting day, yield (kg/ha). Pixels outside the plot are −999 and ignored.
          </p>
        </Card>
        <Card title="Images per field after quality control">
          <div className="space-y-3">
            {Object.entries(data.dist.frames).map(([s, f]: any) => (
              <div key={s} className="grid grid-cols-[2.5rem_1fr_8rem] gap-3 items-center text-sm">
                <span className="font-semibold text-navy-900">{s}</span>
                <div className="relative h-6 bg-sage-50 rounded">
                  <div className="absolute h-full bg-sage-300 rounded" style={{ left: `${(f.min / 40) * 100}%`, width: `${((f.max - f.min) / 40) * 100}%` }} />
                  <div className="absolute top-0 h-full w-1 bg-navy-900" style={{ left: `${(f.mean / 40) * 100}%` }} />
                </div>
                <span className="text-gray-600 tabular-nums text-xs">mean {f.mean} ({f.min}–{f.max})</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">Bar = range, black tick = mean. At most 40 images per sensor; dropped if more than 25% of pixels are zero. Window: day −10 to 250 from the field's anchor; no normalisation (the checkpoints were trained on raw sensor units).</p>
        </Card>
      </div>
    </Section>
  );
}

export function Phase2Splits() {
  const total = data.split.reduce((a: number, s: any) => a + s.fields, 0);
  const years = Array.from(new Set(data.split.flatMap((s: any) => Object.keys(s.years)))).sort() as string[];
  const yearRows = years.map((y) => ({ year: y, ...Object.fromEntries(data.split.map((s: any) => [s.split, s.years[y] || 0])) }));
  return (
    <Section
      id="phase2-splits"
      eyebrow="Phase 2 · Split"
      title="A location-based split with no leakage"
      lede={
        <p>
          Fields are grouped by location (latitude and longitude rounded to about 110 m), and whole locations
          are assigned to train, validation or test with seed 0, stratified by region and season.
          Validation picks the checkpoint; test is scored once.
        </p>
      }
    >
      <Card>
        <div className="flex h-14 rounded-lg overflow-hidden">
          {data.split.map((s: any) => (
            <div key={s.split} className="flex flex-col items-center justify-center text-white text-xs font-semibold" style={{ width: `${(100 * s.fields) / total}%`, background: (COLORS as any)[s.split] }}>
              <span>{SPLIT_LABEL[s.split]}</span>
              <span className="tabular-nums">{s.fields} fields · {s.locations} loc.</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-3">
          {data.totalLocations} locations in total. Locations appearing in more than one split:{" "}
          <span className="font-semibold text-navy-900">{data.splitLeak}</span>.
        </p>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <Card title="The three splits look alike">
          <div className={tableWrap}>
            <table className="w-full text-left text-sm">
              <thead className={thead}>
                <tr><th className={th}>Split</th><th className={th}>Sowing</th><th className={th}>Transplanting (sd)</th><th className={th}>Harvest</th><th className={th}>Yield kg/ha</th></tr>
              </thead>
              <tbody>
                {data.split.map((s: any) => (
                  <tr key={s.split} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-navy-900">{SPLIT_LABEL[s.split]}</td>
                    <td className={td}>{s.sowing}</td>
                    <td className={td}>{s.transplanting} ({s.transplantingStd})</td>
                    <td className={td}>{s.harvesting}</td>
                    <td className={td}>{s.yield.toLocaleString("en-US")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Mean day index from each field's anchor (1st of the month before sowing).</p>
        </Card>
        <Card title="Fields per year in each split">
          <Legend items={data.split.map((s: any) => ({ color: (COLORS as any)[s.split], label: SPLIT_LABEL[s.split] }))} />
          <div className="h-56 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearRows} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={COLORS.grid} />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: COLORS.axis }} />
                <YAxis tick={{ fontSize: 12, fill: COLORS.axis }} />
                <Tooltip />
                {data.split.map((s: any) => (
                  <Bar isAnimationActive={false} key={s.split} dataKey={s.split} name={SPLIT_LABEL[s.split]} stackId="y" fill={(COLORS as any)[s.split]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </Section>
  );
}

const HISTS = [
  { key: "sowing", title: "Sowing day", unit: "day" },
  { key: "transplanting", title: "Transplanting day", unit: "day" },
  { key: "harvesting", title: "Harvesting day", unit: "day" },
  { key: "yield", title: "Yield", unit: "kg/ha" },
];

export function Phase2Distribution() {
  const st = data.dist.stats;
  const comp = [
    { title: "Season", entries: data.dist.seasons },
    { title: "Year", entries: data.dist.years },
    { title: "Variety", entries: data.dist.varieties },
  ];
  return (
    <Section
      id="phase2-distribution"
      tone="white"
      eyebrow="Phase 2 · Distribution"
      title="What the 509 fields look like"
      lede={<p>All 509 fields are transplanted rice. Dates are day indices from each field's anchor, the 1st of the month before sowing; bars are stacked by split.</p>}
    >
      <Legend items={["train", "val", "test"].map((s) => ({ color: (COLORS as any)[s], label: SPLIT_LABEL[s] }))} />
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        {HISTS.map((h) => (
          <Card key={h.key} title={h.title}>
            <p className="text-xs text-gray-500 -mt-2 mb-2 tabular-nums">
              {(() => {
                const n = (v: number) => (h.unit === "kg/ha" ? Math.round(v) : v).toLocaleString("en-US");
                const s = st[h.key];
                return `mean ${n(s.mean)} · sd ${n(s.std)} · range ${n(s.min)}–${n(s.max)} ${h.unit === "day" ? "days" : h.unit}`;
              })()}
            </p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.dist[h.key]} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke={COLORS.grid} />
                  <XAxis dataKey="bin" tick={{ fontSize: 10, fill: COLORS.axis }} interval={0} angle={-30} textAnchor="end" height={44} />
                  <YAxis tick={{ fontSize: 11, fill: COLORS.axis }} allowDecimals={false} />
                  <Tooltip />
                  {["train", "val", "test"].map((s) => (
                    <Bar isAnimationActive={false} key={s} dataKey={s} name={SPLIT_LABEL[s]} stackId="h" fill={(COLORS as any)[s]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {comp.map((c) => {
          const tot = Object.values(c.entries).reduce((a: number, b: any) => a + b, 0) as number;
          return (
            <Card key={c.title} title={c.title}>
              <div className="space-y-2">
                {Object.entries(c.entries).map(([k, v]: any) => (
                  <div key={k} className="grid grid-cols-[minmax(0,7rem)_1fr_2.5rem] gap-2 items-center text-sm">
                    <span className="text-gray-600 truncate" title={k}>{k === "Traditional_Local" ? "Local" : k}</span>
                    <div className="h-4 bg-sage-50 rounded"><div className="h-full rounded bg-brand-greenDark" style={{ width: `${(100 * v) / tot}%` }} /></div>
                    <span className="text-right tabular-nums text-gray-700">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
      <p className="text-sm text-gray-600 mt-6 max-w-3xl">
        Nursery duration (transplanting minus sowing) averages {st.nursery.mean} days (range {st.nursery.min}–{st.nursery.max}).
        For comparison, the SICKLE toy set's known transplanting days average 38.7, against {st.transplanting.mean} here:
        CIMMYT fields are transplanted about five weeks later relative to their anchor.
      </p>
    </Section>
  );
}
