# expecto-patronus-data
Dialogue, spells &amp; characters across 8 films of Harry Potter. From raw Kaggle data to executive dashboard.

**Tools:** SQL · Tableau · Power BI · Advanced Excel · DAX  
**Dataset:** [Kaggle — maricinnamon/harry-potter-movies-dataset](https://www.kaggle.com/datasets/maricinnamon/harry-potter-movies-dataset)

---

## 📌 Project Overview

This end-to-end data analytics project explores the Harry Potter movies dataset from Kaggle, covering all 8 films. The goal was to extract meaningful patterns from dialogue, character, spell, and location data — and communicate those findings through clean, executive-ready visualizations.

This project demonstrates the full analyst workflow:
**Raw Data → SQL Cleaning → Aggregation → Visualization**

---

## 📁 Repository Structure

```
hp-movies-analytics/
│
├── data/
│   ├── raw/                  ← Original CSVs downloaded from Kaggle
│   │   ├── Characters.csv
│   │   ├── Dialogues.csv
│   │   ├── Movies.csv
│   │   ├── Spells.csv
│   │   ├── Places.csv
│   │   ├── Chapters.csv
│   │   └── Data_Dictionary.csv
│   │
│   └── clean/                ← Cleaned & joined tables ready for Tableau / Power BI
│       ├── master_dialogues.csv
│       ├── summary_by_character.csv
│       └── house_summary.csv
│
├── sql/
│   └── queries.sql           ← All cleaning, transformation & aggregation queries
│
├── dashboard/
│   └── index.html            ← Interactive web dashboard (portfolio preview)
│
└── README.md
```

---

## 📊 Key Questions Answered

| # | Question | Answered In |
|---|----------|-------------|
| 1 | Which characters speak the most across all 8 films? | Bar chart — top 10 characters |
| 2 | How is dialogue distributed across Hogwarts houses? | Donut chart — house share |
| 3 | Which movie has the most / least dialogue? | Horizontal bar — lines per film |
| 4 | Which spells are referenced most often? | Spell table with type classification |
| 5 | How does Harry's screen presence compare to Ron & Hermione across films? | Line chart — 3-character trend |
| 6 | Which locations are mentioned most across the series? | Location bar chart |
| 7 | What types of magic dominate the wizarding world? | Spell type breakdown |

---

## 🧹 Data Cleaning Highlights

The raw Kaggle dataset uses **semicolon (;) delimiters** and required the following cleaning steps (see `sql/queries.sql` for full code):

- Trimmed leading/trailing whitespace from all character names and dialogue fields
- Standardized inconsistent casing (e.g., `GRYFFINDOR` → `Gryffindor`)
- Replaced NULL and blank house values with `'Unknown'`
- Removed duplicate dialogue rows using `MIN(id)` grouping
- Removed rows with missing character names
- Joined Characters → Dialogues → Movies using `LOWER(TRIM())` to handle case mismatches

---

## 📈 Dashboard Preview

> **Live Web Dashboard:** [`dashboard/index.html`](./dashboard/index.html)  

The dashboard includes:
- 5 KPI summary cards
- Top 10 characters by dialogue (animated bar chart)
- House dialogue share (donut chart)
- Dialogue lines per movie (horizontal bars)
- Harry vs Hermione vs Ron trend line (all 8 films)
- Top locations referenced in dialogue
- Most-used spells with type classification
- Spell types breakdown with insight callouts

---

## 🛠️ Tools & Skills Demonstrated

| Skill | Application |
|-------|-------------|
| **SQL** | Data cleaning, JOINs, GROUP BY aggregations, deduplication, LIKE pattern matching |
| **Advanced Excel** | Data validation, pivot tables, initial EDA |
| **Tableau** | Final interactive dashboard (Tableau Public) |
| **Power BI / DAX** | KPI measures, calculated columns |
| **Data Storytelling** | Insight callouts, audience-focused visual hierarchy |

---

## 🗂️ Dataset Source

- **Platform:** Kaggle
- **Dataset:** [Harry Potter Movies Dataset](https://www.kaggle.com/datasets/maricinnamon/harry-potter-movies-dataset)
- **Author:** maricinnamon
- **Files:** Chapters, Characters, Data_Dictionary, Dialogue, Movies, Places, Spells
- **Delimiter:** Semicolon (`;`)
- **Note:** All visualizations and metrics are derived directly from this dataset. No data was manually fabricated.

---

## 👤 About the Analyst

**Samuel Then** is a Miami-based Data Analyst with 10+ years of experience building executive dashboards, KPI reports, and BI systems across global hospitality and operations. Bilingual English/Spanish.

🔗 [Portfolio](https://your-portfolio-url.com) · [LinkedIn](https://www.linkedin.com/in/samuel-then/)
