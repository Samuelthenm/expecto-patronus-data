# Overview
Analysis of the Harry Potter movies dataset from Kaggle — all 8 films, covering dialogue, characters, spells and locations. Built this one because I wanted to work with a real messy dataset on something I actually enjoy, and turns out wizard dialogue data is surprisingly interesting to dig into.

# The data
Kaggle dataset by maricinnamon — link here:
<a href="https://www.kaggle.com/datasets/maricinnamon/harry-potter-movies-dataset" target="_blank">https://www.kaggle.com/datasets/maricinnamon/harry-potter-movies-dataset</a>

- Which characters speak the most across all 8 films
- How dialogue breaks down by Hogwarts house
- Which movie has the most and least lines
- Most referenced spells and their types
- How Harry, Hermione, and Ron's presence shifts across the series
- Which locations come up most in dialogue

# Data Cleaning (SQL)
The raw data had inconsistencies — mismatched casing, whitespace, nulls, and duplicate rows. I cleaned it in SQL before analysis:
trimmed whitespace, standardized house names, filled null houses with `Unknown`, removed duplicates, and used `LOWER(TRIM())` on joins to match character names reliably.

→ Full queries in the SQL folder [`sql/queries.sql`](sql/queries.sql)

# Tools Used
SQL, Tableau, Advanced Excel, DAX

## Tableau Preview
![Harry Potter Tableau](https://samuelthenm.github.io/expecto-patronus-data/assets/tableaupreview.gif)

## Live Demo
<a href="https://samuelthenm.github.io/expecto-patronus-data/" target="_blank">https://samuelthenm.github.io/expecto-patronus-data/</a>
