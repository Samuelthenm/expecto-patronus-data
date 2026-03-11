# expecto-patronus-data

Analysis of the Harry Potter movies dataset from Kaggle — all 8 films, covering dialogue, characters, spells and locations. Built this one because I wanted to work with a real messy dataset on something I actually enjoy, and turns out wizard dialogue data is surprisingly interesting to dig into.

---

## what's in here

```
expecto-patronus-data/
│
├── sql/
│   └── queries.sql    # cleaning, joins, aggregations
│
├── index.html         # interactive web dashboard
├── style.css          # dashboard styles
├── main.js            # dashboard logic and chart rendering
│
└── README.md
```

---

## the data

Kaggle dataset by maricinnamon — link here:
https://www.kaggle.com/datasets/maricinnamon/harry-potter-movies-dataset

Comes with 7 CSVs: Characters, Dialogues, Movies, Spells, Places, Chapters, Data Dictionary. Uses semicolon delimiters which tripped me up at first — worth knowing before you import.

Raw files are not pushed to this repo. Download directly from Kaggle and drop them into the dashboard to run the analysis yourself.

---

## what I looked at

- which characters speak the most across all 8 films
- how dialogue is split across the four houses
- which movie has the most and least lines
- most referenced spells and what type they are
- how Harry, Hermione and Ron's screen presence shifts across the series
- which locations come up most in dialogue

---

## cleaning notes

The data needed some work before it was usable. Main things I did in SQL:

- trimmed whitespace from character names and dialogue fields (there were a lot of inconsistencies)
- standardized house name casing
- filled null house values with 'Unknown'
- removed duplicate dialogue rows
- used LOWER(TRIM()) on joins between tables because the character names didn't always match exactly

All of that is in sql/queries.sql if you want to see it.

---

## tools used

SQL, Tableau, Advanced Excel, Power BI, DAX

Tableau dashboard coming soon — will link here once published to Tableau Public.

---

## dashboard

Open index.html in any browser. You can upload the Kaggle CSVs directly or use the demo data to preview the dashboard without downloading anything.

---

built by Samuel Then
linkedin.com/in/samuel-then
