-- ============================================================
-- HARRY POTTER MOVIES DATASET — SQL QUERIES
-- Author: Samuel Then | Data Analyst
-- Dataset: kaggle.com/datasets/maricinnamon/harry-potter-movies-dataset
-- Delimiter: semicolon (;) — import accordingly
-- ============================================================


-- ============================================================
-- SECTION 1: DATA CLEANING
-- ============================================================

-- 1.1 Trim whitespace from all key text fields (run after import)
UPDATE characters
SET character_name = TRIM(character_name),
    house          = TRIM(house),
    species        = TRIM(species);

UPDATE dialogues
SET character_name = TRIM(character_name),
    dialogue       = TRIM(dialogue);

UPDATE spells
SET spell_name = TRIM(spell_name),
    incantation = TRIM(incantation),
    spell_type  = TRIM(spell_type);

UPDATE places
SET place_name = TRIM(place_name);

-- 1.2 Standardize case inconsistencies
UPDATE characters
SET house = UPPER(SUBSTRING(LOWER(house), 1, 1)) || LOWER(SUBSTRING(house, 2));

-- 1.3 Replace NULL or blank house values with 'Unknown'
UPDATE characters
SET house = 'Unknown'
WHERE house IS NULL OR TRIM(house) = '';

-- 1.4 Remove duplicate dialogue rows
DELETE FROM dialogues
WHERE id NOT IN (
    SELECT MIN(id)
    FROM dialogues
    GROUP BY character_name, dialogue, movie_id
);

-- 1.5 Remove rows with no character name in dialogues
DELETE FROM dialogues
WHERE character_name IS NULL OR TRIM(character_name) = '';


-- ============================================================
-- SECTION 2: EXPLORATORY ANALYSIS
-- ============================================================

-- 2.1 Total dialogue lines per movie
SELECT
    m.movie_title,
    COUNT(d.id) AS total_lines
FROM dialogues d
JOIN movies m ON d.movie_id = m.movie_id
GROUP BY m.movie_title
ORDER BY m.movie_id;


-- 2.2 Top 15 most talkative characters across all movies
SELECT
    character_name,
    COUNT(*) AS total_lines
FROM dialogues
GROUP BY character_name
ORDER BY total_lines DESC
LIMIT 15;


-- 2.3 Dialogue lines per character per movie (for trend analysis)
SELECT
    m.movie_title,
    d.character_name,
    COUNT(*) AS lines
FROM dialogues d
JOIN movies m ON d.movie_id = m.movie_id
GROUP BY m.movie_title, d.character_name
ORDER BY m.movie_id, lines DESC;


-- 2.4 Top characters by house (join characters + dialogues)
SELECT
    c.house,
    d.character_name,
    COUNT(d.id) AS total_lines
FROM dialogues d
JOIN characters c ON LOWER(TRIM(d.character_name)) = LOWER(TRIM(c.character_name))
GROUP BY c.house, d.character_name
ORDER BY c.house, total_lines DESC;


-- 2.5 Total lines per house across all movies
SELECT
    c.house,
    COUNT(d.id) AS total_lines
FROM dialogues d
JOIN characters c ON LOWER(TRIM(d.character_name)) = LOWER(TRIM(c.character_name))
WHERE c.house != 'Unknown'
GROUP BY c.house
ORDER BY total_lines DESC;


-- ============================================================
-- SECTION 3: SPELL ANALYSIS
-- ============================================================

-- 3.1 Total number of spells by type
SELECT
    spell_type,
    COUNT(*) AS total_spells
FROM spells
GROUP BY spell_type
ORDER BY total_spells DESC;


-- 3.2 Most mentioned spells in dialogue (spell name appears in dialogue text)
SELECT
    s.spell_name,
    s.incantation,
    s.spell_type,
    COUNT(d.id) AS times_mentioned
FROM spells s
JOIN dialogues d ON LOWER(d.dialogue) LIKE '%' || LOWER(s.incantation) || '%'
GROUP BY s.spell_name, s.incantation, s.spell_type
ORDER BY times_mentioned DESC
LIMIT 20;


-- 3.3 Spells per movie (incantation mentioned in dialogue)
SELECT
    m.movie_title,
    COUNT(DISTINCT s.spell_name) AS unique_spells_used
FROM dialogues d
JOIN movies m ON d.movie_id = m.movie_id
JOIN spells s ON LOWER(d.dialogue) LIKE '%' || LOWER(s.incantation) || '%'
GROUP BY m.movie_title
ORDER BY m.movie_id;


-- ============================================================
-- SECTION 4: LOCATION ANALYSIS
-- ============================================================

-- 4.1 Most frequently mentioned places in dialogue
SELECT
    p.place_name,
    COUNT(d.id) AS times_mentioned
FROM places p
JOIN dialogues d ON LOWER(d.dialogue) LIKE '%' || LOWER(p.place_name) || '%'
GROUP BY p.place_name
ORDER BY times_mentioned DESC
LIMIT 15;


-- 4.2 Places mentioned per movie
SELECT
    m.movie_title,
    p.place_name,
    COUNT(d.id) AS mentions
FROM places p
JOIN dialogues d ON LOWER(d.dialogue) LIKE '%' || LOWER(p.place_name) || '%'
JOIN movies m ON d.movie_id = m.movie_id
GROUP BY m.movie_title, p.place_name
ORDER BY m.movie_id, mentions DESC;


-- ============================================================
-- SECTION 5: FINAL CLEAN TABLES FOR TABLEAU/POWER BI
-- ============================================================

-- 5.1 Master dialogue table — clean, joined, ready for viz
SELECT
    d.id                          AS dialogue_id,
    m.movie_title,
    m.movie_id,
    d.character_name,
    COALESCE(c.house, 'Unknown')  AS house,
    COALESCE(c.species, 'Human')  AS species,
    d.dialogue,
    LENGTH(d.dialogue)            AS dialogue_length
FROM dialogues d
LEFT JOIN movies    m ON d.movie_id       = m.movie_id
LEFT JOIN characters c ON LOWER(TRIM(d.character_name)) = LOWER(TRIM(c.character_name))
ORDER BY m.movie_id, d.id;


-- 5.2 Summary table — lines per character per movie (Tableau-ready)
SELECT
    m.movie_title,
    m.movie_id,
    d.character_name,
    COALESCE(c.house, 'Unknown') AS house,
    COUNT(d.id)                  AS total_lines,
    AVG(LENGTH(d.dialogue))      AS avg_dialogue_length
FROM dialogues d
LEFT JOIN movies     m ON d.movie_id       = m.movie_id
LEFT JOIN characters c ON LOWER(TRIM(d.character_name)) = LOWER(TRIM(c.character_name))
GROUP BY m.movie_title, m.movie_id, d.character_name, c.house
ORDER BY m.movie_id, total_lines DESC;


-- 5.3 House summary table (Tableau-ready)
SELECT
    COALESCE(c.house, 'Unknown') AS house,
    COUNT(DISTINCT d.character_name) AS unique_characters,
    COUNT(d.id)                      AS total_lines,
    AVG(LENGTH(d.dialogue))          AS avg_dialogue_length
FROM dialogues d
LEFT JOIN characters c ON LOWER(TRIM(d.character_name)) = LOWER(TRIM(c.character_name))
GROUP BY c.house
ORDER BY total_lines DESC;
