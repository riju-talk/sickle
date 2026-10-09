# SICKLE++: Sentinel-1 Imagery for Crop Knowledge and Land Evaluation

![SICKLE++ Benchmark](public/hero.jpg)

A comprehensive research website and benchmark platform for crop phenology and yield prediction using satellite imagery. SICKLE++ extends the original SICKLE dataset to a new region, measuring both zero-shot transfer and fine-tuning of multi-sensor fusion models.

## Overview

SICKLE++ benchmarks ground-level Andhra Pradesh crop data against models trained on the original SICKLE dataset, first zero-shot and then after fine-tuning on local fields.

- **Phase 1 (Foundation):** Original Tamil Nadu dataset (WACV 2024) establishing baseline performance with multi-sensor fusion (Sentinel-1, Sentinel-2, Landsat-8) across 5 crop phenology and yield prediction tasks.

- **Phase 2 (Andhra Pradesh, fine-tuning):** 509 CIMMYT NUE survey rice fields in Andhra Pradesh (mostly Kharif 2018), with plot outlines matched from `SSSE.kml` and a location-based 70/15/15 split (357 / 76 / 76 fields, 191 locations, no overlap). The pretrained SICKLE fusion checkpoints (ConvLSTM, U-TAE, UNet3D) are scored zero-shot as the baseline, fine-tuned (Adam, lr 1e-5, batch 8, up to 40 epochs, early stopping after 10), and scored again for sowing, transplanting and harvesting dates and yield. Every model is also compared with predicting the training-set mean. Crop type is out of scope because every surveyed field is rice.

- **Archived:** an earlier zero-shot run on a 730-plot cohort is kept on the site for reference only; that cohort's crop labels and masks were invalid.

All Phase 2 numbers on the site are generated into `src/data/phase2Data.json` from the experiment repository's run outputs.

**Main Experimentation Repository:** [github.com/riju-talk/sickle-plus-plus](https://github.com/riju-talk/sickle-plus-plus)

**Research Tasks:**
1. Crop Type Classification
2. Sowing Date Regression (MAE in days)
3. Transplanting Date Regression (MAE in days)
4. Harvesting Date Regression (MAE in days)
5. Yield Prediction (MAPE in percentage)

## Data Sources

- **Phase 1 Dataset:** Original SICKLE collection from Tamil Nadu, India (WACV 2024)
- **Phase 2 Dataset:** CIMMYT NUE farmer survey, Andhra Pradesh, India (2016–2019, mostly Kharif 2018); plot outlines from `SSSE.kml`
- **Satellite Imagery:**
  - Sentinel-1 SAR (C-band, VV/VH polarization) via ESA Copernicus
  - Sentinel-2 MSI (10/20m optical bands) via ESA Copernicus
  - Landsat-8 OLI (30m multispectral) via USGS
  - Data access via SentinelHub API and Google Earth Engine

## Acknowledgments

This research builds upon datasets and infrastructure provided by:
- **CIMMYT** – CSISA program and Andhra Pradesh field site coordination
- **ESA Copernicus Programme** – Sentinel-1 and Sentinel-2 satellite data
- **USGS Earth Explorer** – Landsat-8 satellite imagery
- **Google Earth Engine** – Cloud computing for large-scale analysis
- **ICAR (Indian Council of Agricultural Research)** – Agricultural domain expertise

## Citation

For research using SICKLE or SICKLE++, please cite:
```
@inproceedings{sickle2024,
  title={SICKLE: Sentinel-1 Imagery for Crop Knowledge and Land Evaluation},
  booktitle={Proceedings of the IEEE/CVF Winter Conference on Computer Vision and Applications (WACV)},
  year={2024}
}
```

## Support

For questions or issues related to the SICKLE++ research, please refer to the embedded presentation PDF in the "Existing Work" section or contact the research team.

---

**Last Updated:** May 2026
