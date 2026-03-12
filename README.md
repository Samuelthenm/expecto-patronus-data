# Overview
Analysis of the Harry Potter movies dataset from Kaggle — all 8 films, covering dialogue, characters, spells and locations. Built this one because I wanted to work with a real messy dataset on something I actually enjoy, and turns out wizard dialogue data is surprisingly interesting to dig into.

# The data
Kaggle dataset by maricinnamon — link here:
<a href="https://www.kaggle.com/datasets/maricinnamon/harry-potter-movies-dataset" target="_blank">https://www.kaggle.com/datasets/maricinnamon/harry-potter-movies-dataset</a>

Comes with 7 CSVs: Characters, Dialogues, Movies, Spells, Places, Chapters, Data Dictionary. Uses semicolon delimiters which tripped me up at first — worth knowing before you import.

Raw files are not pushed to this repo. Download directly from Kaggle and drop them into the dashboard to run the analysis yourself.


# What I observed
- which characters speak the most across all 8 films
- how dialogue is split across the four houses
- which movie has the most and least lines
- most referenced spells and what type they are
- how Harry, Hermione and Ron's screen presence shifts across the series
- which locations come up most in dialogue

# What I cleaned
The data needed some work before it was usable. Main things I did in SQL:
- trimmed whitespace from character names and dialogue fields (there were a lot of inconsistencies)
- standardized house name casing
- filled null house values with 'Unknown'
- removed duplicate dialogue rows
- used LOWER(TRIM()) on joins between tables because the character names didn't always match exactly

All of that is in sql/queries.sql if you want to see it.

# Tools Used
SQL, Tableau, Advanced Excel, DAX

## Tableau Preview
![Harry Potter Tableau](https://samuelthenm.github.io/expecto-patronus-data/assets/tableaupreview.gif)

## Live Demo
<a href="https://samuelthenm.github.io/expecto-patronus-data/" target="_blank">https://samuelthenm.github.io/expecto-patronus-data/</a>
