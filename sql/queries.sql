-- Harry Potter Movies Dataset - SQL Queries
-- dataset from kaggle (maricinnamon/harry-potter-movies-dataset)
-- note: delimiter is semicolon, make sure to set that on import


-- data cleanup
-- trim any extra spaces that snuck in
UPDATE characters
SET character_name = TRIM(character_name),
    house          = TRIM(house),
    species        = TRIM(species);

UPDATE dialogues
SET character_name = TRIM(character_name),
    dialogue       = TRIM(dialogue);

UPDATE spells
SET spell_name  = TRIM(spell_name),
    incantation  = TRIM(incantation),
    spell_type   = TRIM(spell_type);

UPDATE places
SET place_name = TRIM(place_name);

-- fix random capitalization issues in house names
UPDATE characters
SET house = UPPER(SUBSTRING(LOWER(house), 1, 1)) || LOWER(SUBSTRING(house, 2));

-- some characters don't have a house assigned, just label them unknown
UPDATE characters
SET house = 'Unknown'
WHERE house IS NULL OR TRIM(house) = '';

-- remove duplicate dialogue rows, keep the first one
DELETE FROM dialogues
WHERE id NOT IN (
    SELECT MIN(id)
    FROM dialogues
    GROUP BY character_name, dialogue, movie_id
);

-- drop any dialogue rows where character name is missing
DELETE FROM dialogues
WHERE character_name IS NULL OR TRIM(character_name) = '';


-- how many lines does each movie have?
SELECT
    m.movie_title,
    COUNT(d.id) AS total_lines
FROM dialogues d
JOIN movies m ON d.movie_id = m.movie_id
GROUP BY m.movie_title
ORDER BY m.movie_id;


-- who talks the most? top 15
SELECT
    character_name,
    COUNT(*) AS total_lines
FROM dialogues
GROUP BY character_name
ORDER BY total_lines DESC
LIMIT 15;


-- lines per character broken down by movie
SELECT
    m.movie_title,
    d.character_name,
    COUNT(*) AS lines
FROM dialogues d
JOIN movies m ON d.movie_id = m.movie_id
GROUP BY m.movie_title, d.character_name
ORDER BY m.movie_id, lines DESC;


-- joining characters with dialogues to get house info
SELECT
    c.house,
    d.character_name,
    COUNT(d.id) AS total_lines
FROM dialogues d
JOIN characters c ON LOWER(TRIM(d.character_name)) = LOWER(TRIM(c.character_name))
GROUP BY c.house, d.character_name
ORDER BY c.house, total_lines DESC;


-- total lines per house
SELECT
    c.house,
    COUNT(d.id) AS total_lines
FROM dialogues d
JOIN characters c ON LOWER(TRIM(d.character_name)) = LOWER(TRIM(c.character_name))
WHERE c.house != 'Unknown'
GROUP BY c.house
ORDER BY total_lines DESC;


-- how many spells per type
SELECT
    spell_type,
    COUNT(*) AS total_spells
FROM spells
GROUP BY spell_type
ORDER BY total_spells DESC;


-- spells in dialogue
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


-- spells mentioned per movie
SELECT
    m.movie_title,
    COUNT(DISTINCT s.spell_name) AS unique_spells_used
FROM dialogues d
JOIN movies m ON d.movie_id = m.movie_id
JOIN spells s ON LOWER(d.dialogue) LIKE '%' || LOWER(s.incantation) || '%'
GROUP BY m.movie_title
ORDER BY m.movie_id;


-- most mentioned places across all dialogue
SELECT
    p.place_name,
    COUNT(d.id) AS times_mentioned
FROM places p
JOIN dialogues d ON LOWER(d.dialogue) LIKE '%' || LOWER(p.place_name) || '%'
GROUP BY p.place_name
ORDER BY times_mentioned DESC
LIMIT 15;


-- places broken down by movie
SELECT
    m.movie_title,
    p.place_name,
    COUNT(d.id) AS mentions
FROM places p
JOIN dialogues d ON LOWER(d.dialogue) LIKE '%' || LOWER(p.place_name) || '%'
JOIN movies m ON d.movie_id = m.movie_id
GROUP BY m.movie_title, p.place_name
ORDER BY m.movie_id, mentions DESC;


-- main dialogue table with everything joined and cleaned up
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
LEFT JOIN movies     m ON d.movie_id = m.movie_id
LEFT JOIN characters c ON LOWER(TRIM(d.character_name)) = LOWER(TRIM(c.character_name))
ORDER BY m.movie_id, d.id;


-- summary by character and movie, good for the bar charts
SELECT
    m.movie_title,
    m.movie_id,
    d.character_name,
    COALESCE(c.house, 'Unknown') AS house,
    COUNT(d.id)                  AS total_lines,
    AVG(LENGTH(d.dialogue))      AS avg_dialogue_length
FROM dialogues d
LEFT JOIN movies     m ON d.movie_id = m.movie_id
LEFT JOIN characters c ON LOWER(TRIM(d.character_name)) = LOWER(TRIM(c.character_name))
GROUP BY m.movie_title, m.movie_id, d.character_name, c.house
ORDER BY m.movie_id, total_lines DESC;


-- house level summary
SELECT
    COALESCE(c.house, 'Unknown')     AS house,
    COUNT(DISTINCT d.character_name) AS unique_characters,
    COUNT(d.id)                      AS total_lines,
    AVG(LENGTH(d.dialogue))          AS avg_dialogue_length
FROM dialogues d
LEFT JOIN characters c ON LOWER(TRIM(d.character_name)) = LOWER(TRIM(c.character_name))
GROUP BY c.house
ORDER BY total_lines DESC;
