const DB = { dialogues:[], characters:[], movies:[], spells:[], places:[] };
let charHouseMap = {};
let movieMap = {};
let currentFilter = 'all';

window.addEventListener('DOMContentLoaded', () => loadDemo());

function loadDemo() {
  DB.movies = [
    {movie_id:'1',movie_title:"Philosopher's Stone"},
    {movie_id:'2',movie_title:"Chamber of Secrets"},
    {movie_id:'3',movie_title:"Prisoner of Azkaban"},
    {movie_id:'4',movie_title:"Goblet of Fire"},
    {movie_id:'5',movie_title:"Order of the Phoenix"},
    {movie_id:'6',movie_title:"Half-Blood Prince"},
    {movie_id:'7',movie_title:"Deathly Hallows Pt.1"},
    {movie_id:'8',movie_title:"Deathly Hallows Pt.2"},
  ];

  DB.characters = [
    {character_name:"Aberforth Dumbledore",          house:"Unknown"},
    {character_name:"Alastor Moody",                 house:"Unknown"},
    {character_name:"Albus Dumbledore",              house:"Gryffindor"},
    {character_name:"Albus Potter",                  house:"Slytherin"},
    {character_name:"Alecto Carrow",                 house:"Slytherin"},
    {character_name:"All",                           house:"Unknown"},
    {character_name:"Amos Diggory",                  house:"Unknown"},
    {character_name:"Angelina Johnson",              house:"Gryffindor"},
    {character_name:"Arabella Figg",                 house:"Unknown"},
    {character_name:"Aragog",                        house:"Unknown"},
    {character_name:"Argus Filch",                   house:"Unknown"},
    {character_name:"Arthur Weasley",                house:"Gryffindor"},
    {character_name:"Bane",                          house:"Unknown"},
    {character_name:"Barty Crouch Jr.",              house:"Unknown"},
    {character_name:"Barty Crouch Sr.",              house:"Unknown"},
    {character_name:"Bathilda Bagshot",              house:"Unknown"},
    {character_name:"Bellatrix Lestrange",           house:"Slytherin"},
    {character_name:"Bill Weasley",                  house:"Gryffindor"},
    {character_name:"Blaise Zabini",                 house:"Slytherin"},
    {character_name:"Bloody Baron",                  house:"Slytherin"},
    {character_name:"Bogrod",                        house:"Unknown"},
    {character_name:"Boy",                           house:"Unknown"},
    {character_name:"Boy 2",                         house:"Unknown"},
    {character_name:"Cedric Diggory",                house:"Hufflepuff"},
    {character_name:"Centaur",                       house:"Unknown"},
    {character_name:"Charity Burbage",               house:"Unknown"},
    {character_name:"Cho Chang",                     house:"Ravenclaw"},
    {character_name:"Class",                         house:"Unknown"},
    {character_name:"Colin Creevey",                 house:"Gryffindor"},
    {character_name:"Corban Yaxley",                 house:"Slytherin"},
    {character_name:"Cormac McLaggen",               house:"Gryffindor"},
    {character_name:"Cornelius Fudge",               house:"Unknown"},
    {character_name:"Crowd",                         house:"Unknown"},
    {character_name:"Dean Thomas",                   house:"Gryffindor"},
    {character_name:"Death Eater",                   house:"Unknown"},
    {character_name:"Diary",                         house:"Unknown"},
    {character_name:"Dilys Derwent",                 house:"Unknown"},
    {character_name:"Dobby",                         house:"Unknown"},
    {character_name:"Dolores Umbridge",              house:"Slytherin"},
    {character_name:"Draco Malfoy",                  house:"Slytherin"},
    {character_name:"Dudley Dursley",                house:"Unknown"},
    {character_name:"Eldred Worple",                 house:"Unknown"},
    {character_name:"Elphias Doge",                  house:"Unknown"},
    {character_name:"Ernest Macmillan",              house:"Hufflepuff"},
    {character_name:"Everard",                       house:"Unknown"},
    {character_name:"Fenrir Greyback",               house:"Unknown"},
    {character_name:"Filius Flitwick",               house:"Ravenclaw"},
    {character_name:"Firenze",                       house:"Unknown"},
    {character_name:"Fleur Delacour",                house:"Beauxbatons academy of magic"},
    {character_name:"Fred Weasley",                  house:"Gryffindor"},
    {character_name:"Gang thug",                     house:"Unknown"},
    {character_name:"Garrick Ollivander",            house:"Ravenclaw"},
    {character_name:"Gellert Grindelwald",           house:"Durmstrang institute"},
    {character_name:"George Weasley",                house:"Gryffindor"},
    {character_name:"Ghost",                         house:"Unknown"},
    {character_name:"Ghosts",                        house:"Unknown"},
    {character_name:"Gilderoy Lockhart",             house:"Ravenclaw"},
    {character_name:"Ginny Weasley",                 house:"Gryffindor"},
    {character_name:"Girl",                          house:"Unknown"},
    {character_name:"Goblin",                        house:"Unknown"},
    {character_name:"Grawp",                         house:"Unknown"},
    {character_name:"Gregory Goyle",                 house:"Slytherin"},
    {character_name:"Griphook",                      house:"Unknown"},
    {character_name:"Griselda Marchbanks",           house:"Unknown"},
    {character_name:"Gryffindors",                   house:"Unknown"},
    {character_name:"Guard",                         house:"Unknown"},
    {character_name:"Harry Potter",                  house:"Gryffindor"},
    {character_name:"Helena Ravenclaw",              house:"Ravenclaw"},
    {character_name:"Hermione Granger",              house:"Gryffindor"},
    {character_name:"Horace Slughorn",               house:"Slytherin"},
    {character_name:"Howler",                        house:"Unknown"},
    {character_name:"Igor Karkaroff",                house:"Unknown"},
    {character_name:"James Potter",                  house:"Gryffindor"},
    {character_name:"Justin Finch-Fletchley",        house:"Hufflepuff"},
    {character_name:"Katie Bell",                    house:"Gryffindor"},
    {character_name:"Kingsley Shacklebolt",          house:"Unknown"},
    {character_name:"Kreacher",                      house:"Unknown"},
    {character_name:"Lavender Brown",                house:"Gryffindor"},
    {character_name:"Leanne",                        house:"Hufflepuff"},
    {character_name:"Lee Jordan",                    house:"Gryffindor"},
    {character_name:"Lily Potter",                   house:"Gryffindor"},
    {character_name:"Lucius Malfoy",                 house:"Slytherin"},
    {character_name:"Luna Lovegood",                 house:"Ravenclaw"},
    {character_name:"Magorian",                      house:"Unknown"},
    {character_name:"Maid",                          house:"Unknown"},
    {character_name:"Man",                           house:"Unknown"},
    {character_name:"Man in a painting",             house:"Unknown"},
    {character_name:"Marcus Belby",                  house:"Ravenclaw"},
    {character_name:"Marcus Flint",                  house:"Slytherin"},
    {character_name:"Marge Dursley",                 house:"Unknown"},
    {character_name:"Mary Cattermole",               house:"Unknown"},
    {character_name:"Merpeople",                     house:"Unknown"},
    {character_name:"Michael Corner",                house:"Ravenclaw"},
    {character_name:"Minerva McGonagall",            house:"Gryffindor"},
    {character_name:"Moaning Myrtle",                house:"Ravenclaw"},
    {character_name:"Molly Weasley",                 house:"Gryffindor"},
    {character_name:"Mr. Granger",                   house:"Unknown"},
    {character_name:"Mrs. Cole",                     house:"Unknown"},
    {character_name:"Mrs. Granger",                  house:"Unknown"},
    {character_name:"Mundungus Fletcher",            house:"Unknown"},
    {character_name:"Muriel",                        house:"Unknown"},
    {character_name:"Mykew Gregorovitch",            house:"Unknown"},
    {character_name:"Narcissa Malfoy",               house:"Slytherin"},
    {character_name:"Nearly Headless Nick",          house:"Gryffindor"},
    {character_name:"Neville Longbottom",            house:"Gryffindor"},
    {character_name:"Nigel Wolpert",                 house:"Gryffindor"},
    {character_name:"Nymphadora Tonks",              house:"Hufflepuff"},
    {character_name:"Old man",                       house:"Unknown"},
    {character_name:"Oliver Wood",                   house:"Gryffindor"},
    {character_name:"Olympe Maxime",                 house:"Beauxbatons academy of magic"},
    {character_name:"Other",                         house:"Unknown"},
    {character_name:"Padma Patil",                   house:"Ravenclaw"},
    {character_name:"Pansy Parkinson",               house:"Slytherin"},
    {character_name:"Parvati Patil",                 house:"Gryffindor"},
    {character_name:"Percy Weasley",                 house:"Gryffindor"},
    {character_name:"Perkins",                       house:"Unknown"},
    {character_name:"Peter Pettigrew",               house:"Gryffindor"},
    {character_name:"Petunia Dursley",               house:"Unknown"},
    {character_name:"Phineas",                       house:"Unknown"},
    {character_name:"Photographer",                  house:"Unknown"},
    {character_name:"Pius Thicknesse",               house:"Unknown"},
    {character_name:"Pixie",                         house:"Unknown"},
    {character_name:"Pomona Sprout",                 house:"Hufflepuff"},
    {character_name:"Poppy Pomfrey",                 house:"Unknown"},
    {character_name:"Professors",                    house:"Unknown"},
    {character_name:"Quirinus Quirrell",             house:"Ravenclaw"},
    {character_name:"Remus Lupin",                   house:"Gryffindor"},
    {character_name:"Rita Skeeter",                  house:"Unknown"},
    {character_name:"Rolanda Hooch",                 house:"Unknown"},
    {character_name:"Ron Weasley",                   house:"Gryffindor"},
    {character_name:"Rosmerta",                      house:"Unknown"},
    {character_name:"Rubeus Hagrid",                 house:"Gryffindor"},
    {character_name:"Rufus Scrimgeour",              house:"Unknown"},
    {character_name:"Scabior",                       house:"Slytherin"},
    {character_name:"Seamus Finnigan",               house:"Gryffindor"},
    {character_name:"Serpent of Slitherin",          house:"Unknown"},
    {character_name:"Severus Snape",                 house:"Slytherin"},
    {character_name:"Shrunken head",                 house:"Unknown"},
    {character_name:"Sirius Black",                  house:"Gryffindor"},
    {character_name:"Skinny kid",                    house:"Unknown"},
    {character_name:"Snake",                         house:"Unknown"},
    {character_name:"Snatcher",                      house:"Unknown"},
    {character_name:"Sorting Hat",                   house:"Unknown"},
    {character_name:"Stanley Shunpike",              house:"Unknown"},
    {character_name:"Station guard",                 house:"Unknown"},
    {character_name:"Student",                       house:"Unknown"},
    {character_name:"Students",                      house:"Unknown"},
    {character_name:"Susan Bones",                   house:"Hufflepuff"},
    {character_name:"Sybill Trelawney",              house:"Ravenclaw"},
    {character_name:"The Fat Lady",                  house:"Unknown"},
    {character_name:"Tom",                           house:"Unknown"},
    {character_name:"Tom Riddle",                    house:"Slytherin"},
    {character_name:"Trolley witch",                 house:"Unknown"},
    {character_name:"Vernon Dursley",                house:"Unknown"},
    {character_name:"Viktor Krum",                   house:"Durmstrang institute"},
    {character_name:"Vincent Crabbe",                house:"Slytherin"},
    {character_name:"Voldemort",                     house:"Slytherin"},
    {character_name:"Waiter",                        house:"Unknown"},
    {character_name:"Waitress",                      house:"Unknown"},
    {character_name:"Walburga Black",                house:"Slytherin"},
    {character_name:"Whomping Willow",               house:"Unknown"},
    {character_name:"Witch",                         house:"Unknown"},
    {character_name:"Wizard",                        house:"Unknown"},
    {character_name:"Woman",                         house:"Unknown"},
    {character_name:"Xenophilius Lovegood",          house:"Unknown"},
    {character_name:"Zacharias Smith",               house:"Hufflepuff"},
  ];

  const script = {
    "Harry Potter":        [233,262,194,156,292,259,273,185],
    "Ron Weasley":         [137,143,101, 74, 53,100,167, 78],
    "Hermione Granger":    [ 95, 69,125, 62, 93,108,215, 64],
    "Albus Dumbledore":    [ 24, 44, 36, 71, 99,142,  0, 53],
    "Rubeus Hagrid":       [ 85, 37, 31, 16, 24, 22, 11,  0],
    "Severus Snape":       [ 10, 12, 28,  6, 29, 36,  4, 40],
    "Minerva McGonagall":  [ 31, 24, 11, 21, 23, 19,  0,  0],
    "Horace Slughorn":     [  0,  0,  0,  0,  0,125,  0,  0],
    "Voldemort":           [ 10,  0,  0, 23, 11,  0, 28, 46],
    "Remus Lupin":         [  0,  0, 65,  0, 21,  6, 12,  6],
    "Neville Longbottom":  [ 17,  7, 10, 13, 19,  4,  1, 33],
    "Draco Malfoy":        [ 13, 25, 19,  3,  8, 27,  2,  6],
    "Alastor Moody":       [  0,  0,  0, 55, 20,  0, 18,  0],
    "Fred Weasley":        [  5,  7, 21, 19, 15, 13, 10,  1],
    "Dolores Umbridge":    [  0,  0,  0,  0, 80,  0,  8,  0],
    "Arthur Weasley":      [  0, 14, 10, 19, 22,  9, 12,  1],
    "Sirius Black":        [  0,  0, 32, 11, 41,  0,  0,  2],
    "Cornelius Fudge":     [  0,  5, 36,  6, 38,  0,  0,  0],
    "George Weasley":      [  5,  5, 21, 18, 11,  8,  9,  0],
    "Vernon Dursley":      [ 25, 23, 11,  0,  8,  0,  6,  0],
  };

  DB.dialogues = [];
  let id = 1;
  Object.entries(script).forEach(([char, counts]) => {
    counts.forEach((n, mi) => {
      for (let i = 0; i < n; i++) {
        DB.dialogues.push({ id:String(id++), movie_id:String(mi+1), character_name:char, dialogue:'Demo line.' });
      }
    });
  });

  // Full spell list from dataset (61 spells) with type classification
  DB.spells = [
    {spell_name:"Summoning Charm",                   incantation:"Accio",                  spell_type:"Charm"},
    {spell_name:"Water-Making Spell",                incantation:"Aguamenti",              spell_type:"Charm"},
    {spell_name:"Launch an object up into the air",  incantation:"Alarte Ascendare",       spell_type:"Charm"},
    {spell_name:"Unlocking Charm",                   incantation:"Alohomora",              spell_type:"Charm"},
    {spell_name:"Spider repelling spell",            incantation:"Arania Exumai",          spell_type:"Jinx"},
    {spell_name:"Slowing Charm",                     incantation:"Arresto Momentum",       spell_type:"Charm"},
    {spell_name:"Killing Curse",                     incantation:"Avada Kedavra",          spell_type:"Curse"},
    {spell_name:"Exploding Charm",                   incantation:"Bombarda",               spell_type:"Charm"},
    {spell_name:"Brackium Emendo",                   incantation:"Brackium Emendo",        spell_type:"Charm"},
    {spell_name:"Cistem Aperio",                     incantation:"Cistem Aperio",          spell_type:"Charm"},
    {spell_name:"Locking Spell",                     incantation:"Colloportus",            spell_type:"Hex"},
    {spell_name:"Blasting Curse",                    incantation:"Confringo",              spell_type:"Curse"},
    {spell_name:"Cruciatus Curse",                   incantation:"Crucio",                 spell_type:"Curse"},
    {spell_name:"Severing Charm",                    incantation:"Diffindo",               spell_type:"Charm"},
    {spell_name:"Dissendium",                        incantation:"Dissendium",             spell_type:"Charm"},
    {spell_name:"Engorgement Charm",                 incantation:"Engorgio",               spell_type:"Charm"},
    {spell_name:"Episkey",                           incantation:"Episkey",                spell_type:"Charm"},
    {spell_name:"Patronus Charm",                    incantation:"Expecto Patronum",       spell_type:"Charm"},
    {spell_name:"Disarming Charm",                   incantation:"Expelliarmus",           spell_type:"Charm"},
    {spell_name:"Expulso Curse",                     incantation:"Expulso",                spell_type:"Curse"},
    {spell_name:"General Counter-Spell",             incantation:"Finite",                 spell_type:"Charm"},
    {spell_name:"Human Presence Revealing Spell",    incantation:"Homenum Revelio",        spell_type:"Charm"},
    {spell_name:"Freezing Charm",                    incantation:"Immobulus",              spell_type:"Charm"},
    {spell_name:"Impediment Jinx",                   incantation:"Impedimenta",            spell_type:"Jinx"},
    {spell_name:"Imperius Curse",                    incantation:"Imperio",                spell_type:"Curse"},
    {spell_name:"Incarcerous Spell",                 incantation:"Incarcerous",            spell_type:"Jinx"},
    {spell_name:"Fire-Making Spell",                 incantation:"Incendio",               spell_type:"Charm"},
    {spell_name:"Levicorpus",                        incantation:"Levicorpus",             spell_type:"Jinx"},
    {spell_name:"Locomotion Charm",                  incantation:"Locomotor",              spell_type:"Charm"},
    {spell_name:"Leg-Locker Curse",                  incantation:"Locomotor Mortis",       spell_type:"Jinx"},
    {spell_name:"Wand-Lighting Charm",               incantation:"Lumos",                  spell_type:"Charm"},
    {spell_name:"Lumos Maxima",                      incantation:"Lumos Maxima",           spell_type:"Charm"},
    {spell_name:"Lumos Solem Spell",                 incantation:"Lumos Solem",            spell_type:"Charm"},
    {spell_name:"Muffliato Charm",                   incantation:"Muffliato",              spell_type:"Charm"},
    {spell_name:"Wand-Extinguishing Charm",          incantation:"Nox",                    spell_type:"Charm"},
    {spell_name:"Memory Charm",                      incantation:"Obliviate",              spell_type:"Charm"},
    {spell_name:"Oculus Reparo",                     incantation:"Oculus Reparo",          spell_type:"Charm"},
    {spell_name:"Oppugno Jinx",                      incantation:"Oppugno",                spell_type:"Jinx"},
    {spell_name:"Peskipiksi Pesternomi",             incantation:"Peskipiksi Pesternomi",  spell_type:"Charm"},
    {spell_name:"Full Body-Bind Curse",              incantation:"Petrificus Totalus",     spell_type:"Hex"},
    {spell_name:"Piertotum Locomotor",               incantation:"Piertotum Locomotor",    spell_type:"Charm"},
    {spell_name:"Portus",                            incantation:"Portus",                 spell_type:"Charm"},
    {spell_name:"Reverse Spell",                     incantation:"Priori Incantatem",      spell_type:"Charm"},
    {spell_name:"Shield Charm",                      incantation:"Protego",                spell_type:"Charm"},
    {spell_name:"Protego Maxima",                    incantation:"Protego Maxima",         spell_type:"Charm"},
    {spell_name:"Protego totalum",                   incantation:"Protego totalum",        spell_type:"Charm"},
    {spell_name:"Shrinking Charm",                   incantation:"Reducio",                spell_type:"Charm"},
    {spell_name:"Revulsion Jinx",                    incantation:"Relashio",               spell_type:"Jinx"},
    {spell_name:"Mending Charm",                     incantation:"Reparo",                 spell_type:"Charm"},
    {spell_name:"Repello Inimicum",                  incantation:"Repello Inimicum",       spell_type:"Charm"},
    {spell_name:"Muggle-Repelling Charm",            incantation:"Repello Muggletum",      spell_type:"Charm"},
    {spell_name:"Revelio Charm",                     incantation:"Revelio",                spell_type:"Charm"},
    {spell_name:"Tickling Charm",                    incantation:"Rictusempra",            spell_type:"Hex"},
    {spell_name:"Boggart-Banishing Spell",           incantation:"Riddikulus",             spell_type:"Charm"},
    {spell_name:"Salvio hexia",                      incantation:"Salvio hexia",           spell_type:"Hex"},
    {spell_name:"Sectumsempra",                      incantation:"Sectumsempra",           spell_type:"Curse"},
    {spell_name:"Snake Summons Spell",               incantation:"Serpensortia",           spell_type:"Jinx"},
    {spell_name:"Stunning Spell",                    incantation:"Stupefy",                spell_type:"Charm"},
    {spell_name:"Vera Verto",                        incantation:"Vera Verto",             spell_type:"Charm"},
    {spell_name:"Snake-Vanishing Spell",             incantation:"Vipera Evanesca",        spell_type:"Charm"},
    {spell_name:"Levitation Charm",                  incantation:"Wingardium Leviosa",     spell_type:"Charm"},
  ];

  // Full places list from dataset (74 locations)
  DB.places = [
    {place_name:"Flourish & Blotts"},{place_name:"Gringotts Wizarding Bank"},
    {place_name:"Knockturn Alley"},{place_name:"Ollivanders"},{place_name:"The Leaky Cauldron"},
    {place_name:"Weasleys' Wizard Wheezes"},{place_name:"12 Grimmauld Place"},
    {place_name:"4 Privet Drive"},{place_name:"Godric's Hollow"},{place_name:"Hut-on-the-Rock"},
    {place_name:"Little Whinging"},{place_name:"Lovegood House"},{place_name:"Malfoy Manor"},
    {place_name:"Riddle House"},{place_name:"Shell Cottage"},{place_name:"Spinner's End"},
    {place_name:"The Burrow"},{place_name:"Budleigh Babberton"},{place_name:"Honeydukes"},
    {place_name:"Shrieking Shack"},{place_name:"The Hog's Head"},{place_name:"The Three Broomsticks"},
    {place_name:"Astronomy Tower"},{place_name:"Boathouse"},{place_name:"Chamber of Secrets"},
    {place_name:"Charms Classroom"},{place_name:"Clocktower Courtyard"},{place_name:"Corridors"},
    {place_name:"Covered Bridge"},{place_name:"Defense Against the Dark Arts Classroom"},
    {place_name:"Detention Room"},{place_name:"Divination Classroom"},{place_name:"Entrance Hall"},
    {place_name:"First-Floor Girls' Toilets"},{place_name:"Forbidden Forest"},{place_name:"Great Hall"},
    {place_name:"Great Lake"},{place_name:"Greenhouse"},{place_name:"Griffindor Common Room"},
    {place_name:"Hagrid's Hut"},{place_name:"Headmaster's Office"},{place_name:"Hogwarts Express"},
    {place_name:"Hospital Wing"},{place_name:"Library"},{place_name:"Middle Courtyard"},
    {place_name:"Moaning Myrtle's Bathroom"},{place_name:"Owlery"},{place_name:"Pensieve"},
    {place_name:"Potions Classroom"},{place_name:"Prefect's Bathroom"},{place_name:"Quidditch Pitch"},
    {place_name:"Quidditch Training Pitch"},{place_name:"Ravenclaw Tower"},{place_name:"Restricted Section"},
    {place_name:"Room of Requirement"},{place_name:"Sixth-floor boys' bathroom"},
    {place_name:"Slytherin Common Room"},{place_name:"The Quad"},{place_name:"Third-floor Corridor"},
    {place_name:"Tom Riddle's Diary"},{place_name:"Transfiguration Classroom"},{place_name:"Triwizard Maze"},
    {place_name:"Trophy Room"},{place_name:"Underground Chambers"},{place_name:"Unknown Classroom"},
    {place_name:"Viaduct Courtyard"},{place_name:"Whomping Willow"},{place_name:"Forest of Dean"},
    {place_name:"Knight Bus"},{place_name:"Ministry of Magic"},
    {place_name:"Platform Nine and Three-Quarters"},{place_name:"Quidditch World Cup"},
    {place_name:"The Cave"},{place_name:"Unknown"},
  ];

  buildDashboard();
}

// ── BUILD ─────────────────────────────────────────────────────
function buildDashboard() {
  charHouseMap = {};
  DB.characters.forEach(c => {
    const name = (c.character_name || c.name || '').toLowerCase().trim();
    const house = (c.house || 'Unknown').trim();
    if (name) charHouseMap[name] = house;
  });

  movieMap = {};
  DB.movies.forEach(m => {
    const id = String(m.movie_id || m.id || '').trim();
    const title = (m.movie_title || m.title || ('Movie ' + id)).trim();
    if (id) movieMap[id] = title;
  });

  document.getElementById('kpi-spells').textContent = DB.spells.length || '—';
  document.getElementById('kpi-places').textContent = DB.places.length || '—';

  applyFilter('all');
}

// ── FILTER ────────────────────────────────────────────────────
function applyFilter(house) {
  currentFilter = house;

  document.querySelectorAll('.pill').forEach(p => {
    p.classList.remove('active');
    if (p.dataset.house === house) p.classList.add('active');
  });

  const filtered = house === 'all'
    ? DB.dialogues
    : DB.dialogues.filter(d => {
        const key = (d.character_name || '').toLowerCase().trim();
        return (charHouseMap[key] || 'Unknown') === house;
      });

  renderKPIs(filtered);
  renderCharBars(filtered, house);
  renderDonut(filtered);
  renderMovieBars(filtered, house);
  renderSpellTable();
  renderLineChart();
  renderLocations(filtered, house);
  renderSpellTypes();
}

// ── HELPERS ───────────────────────────────────────────────────
function fmt(n) { return n >= 1000 ? (n/1000).toFixed(1)+'k' : String(n); }
function getHouse(name) { return charHouseMap[(name||'').toLowerCase().trim()] || 'Unknown'; }
function getMovieTitle(id) { return movieMap[String(id).trim()] || ('Movie ' + id); }
function animateBars(container) {
  setTimeout(() => {
    container.querySelectorAll('[data-w]').forEach(el => { el.style.width = el.dataset.w + '%'; });
  }, 60);
}

const houseBarColor = {
  'Gryffindor': 'linear-gradient(90deg,rgba(174,0,1,0.75),rgba(174,0,1,0.4))',
  'Slytherin':  'linear-gradient(90deg,rgba(42,98,61,0.75),rgba(42,98,61,0.4))',
  'Ravenclaw':  'linear-gradient(90deg,rgba(34,47,91,0.85),rgba(74,111,165,0.5))',
  'Hufflepuff': 'linear-gradient(90deg,rgba(201,168,76,0.55),rgba(240,199,94,0.3))',
  'Unknown':    'linear-gradient(90deg,rgba(201,168,76,0.4),rgba(232,201,122,0.2))',
};

// ── KPIs ──────────────────────────────────────────────────────
function renderKPIs(filtered) {
  document.getElementById('kpi-lines').textContent = fmt(filtered.length);
  document.getElementById('kpi-chars').textContent = new Set(filtered.map(d => d.character_name)).size;
}

// ── CHARACTER BARS ────────────────────────────────────────────
function renderCharBars(filtered, house) {
  const counts = {};
  filtered.forEach(d => { if (d.character_name) counts[d.character_name] = (counts[d.character_name]||0)+1; });
  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const max = sorted[0]?.[1] || 1;

  document.getElementById('charTag').textContent = house==='all' ? 'All Houses' : house;
  const container = document.getElementById('charBars');
  container.innerHTML = '';

  if (!sorted.length) { container.innerHTML = '<div class="no-data">No data for this selection</div>'; return; }

  sorted.forEach(([name, count]) => {
    const bg = houseBarColor[getHouse(name)] || houseBarColor['Unknown'];
    const pct = Math.round((count/max)*100);
    const div = document.createElement('div');
    div.className = 'hbar-item';
    div.innerHTML = `
      <div class="hbar-name" title="${name}">${name}</div>
      <div class="hbar-track"><div class="hbar-fill" data-w="${pct}" style="width:0%;background:${bg}">${count}</div></div>
      <div class="hbar-num">${count}</div>`;
    container.appendChild(div);
  });
  animateBars(container);

  const top = sorted[0];
  const pct = filtered.length ? Math.round((top[1]/filtered.length)*100) : 0;
  document.getElementById('charInsight').textContent =
    `${top[0]} leads with ${top[1]} lines — ${pct}% of all ${house==='all'?'':'filtered '}dialogue.`;
}

// ── DONUT ─────────────────────────────────────────────────────
function renderDonut(filtered) {
  const houseCounts = {};
  filtered.forEach(d => {
    const h = getHouse(d.character_name);
    houseCounts[h] = (houseCounts[h]||0)+1;
  });

  const total = filtered.length;
  document.getElementById('donutTotal').textContent = fmt(total);

  const houseColors = { 'Gryffindor':'#ae0001','Slytherin':'#2a623d','Ravenclaw':'#222f5b','Hufflepuff':'#f0c75e','Unknown':'#555' };
  const sorted = Object.entries(houseCounts).sort((a,b)=>b[1]-a[1]);
  const C = 2 * Math.PI * 55;
  let offset = 0;
  const svg = document.getElementById('donutSvg');
  svg.innerHTML = '';

  sorted.forEach(([h, count]) => {
    const arc = (count/total) * C;
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx','75'); circle.setAttribute('cy','75'); circle.setAttribute('r','55');
    circle.setAttribute('fill','none');
    circle.setAttribute('stroke', houseColors[h]||'#888');
    circle.setAttribute('stroke-width','22');
    circle.setAttribute('stroke-dasharray',`${arc} ${C-arc}`);
    circle.setAttribute('stroke-dashoffset',String(-offset));
    circle.setAttribute('opacity','0.88');
    svg.appendChild(circle);
    offset += arc;
  });

  const legend = document.getElementById('donutLegend');
  legend.innerHTML = '';
  sorted.slice(0,5).forEach(([h, count]) => {
    const pct = total ? Math.round((count/total)*100) : 0;
    legend.innerHTML += `<div class="dl-item">
      <div class="dl-dot" style="background:${houseColors[h]||'#888'}"></div>
      <span class="dl-name">${h}</span>
      <span class="dl-val">${pct}% · ${count}</span></div>`;
  });
}

// ── MOVIE BARS ────────────────────────────────────────────────
function renderMovieBars(filtered, house) {
  const movieCounts = {};
  filtered.forEach(d => {
    const t = getMovieTitle(d.movie_id);
    movieCounts[t] = (movieCounts[t]||0)+1;
  });

  const orderedMovies = DB.movies.map(m => getMovieTitle(m.movie_id || m.id));
  const max = Math.max(...Object.values(movieCounts), 1);
  document.getElementById('movieTag').textContent = house==='all' ? 'All Houses' : house;

  const colors = ['#4a0080','#003580','#004d00','#7a2000','#003050','#401500','#2a0040','#600000'];
  const container = document.getElementById('movieBars');
  container.innerHTML = '';

  orderedMovies.forEach((title, i) => {
    const count = movieCounts[title] || 0;
    const pct = Math.round((count/max)*100);
    const color = colors[i % colors.length];
    const div = document.createElement('div');
    div.className = 'movie-row';
    div.innerHTML = `
      <div class="movie-num">${i+1}</div>
      <div class="movie-name" title="${title}">${title}</div>
      <div class="movie-track"><div class="movie-fill" data-w="${pct}" style="width:0%;background:linear-gradient(90deg,${color},${color}aa)">${count||''}</div></div>`;
    container.appendChild(div);
  });
  animateBars(container);

  const entries = Object.entries(movieCounts).filter(([,v])=>v>0);
  if (entries.length) {
    const top = entries.reduce((a,b)=>b[1]>a[1]?b:a);
    const bot = entries.reduce((a,b)=>b[1]<a[1]?b:a);
    document.getElementById('movieInsight').textContent =
      `${top[0]} has the most dialogue (${top[1]} lines). ${bot[0]} has the fewest (${bot[1]}).`;
  } else {
    document.getElementById('movieInsight').textContent = 'No dialogue data for this selection.';
  }
}

// ── SPELL TABLE ───────────────────────────────────────────────
function renderSpellTable() {
  const tbody = document.getElementById('spellTable');
  tbody.innerHTML = '';
  if (!DB.spells.length) { tbody.innerHTML = '<tr><td colspan="4" class="no-data">No spell data</td></tr>'; return; }

  const typeClass = { Charm:'type-charm', Curse:'type-curse', Jinx:'type-jinx', Hex:'type-hex', Transfiguration:'type-trans' };
  const allText = DB.dialogues.map(d=>(d.dialogue||'').toLowerCase()).join(' ');

  DB.spells.map(s => ({
    ...s, refs: s.incantation ? (allText.split(s.incantation.toLowerCase()).length-1) : 0
  })).sort((a,b)=>b.refs-a.refs).slice(0,10).forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.spell_name||'—'}</td><td style="font-style:italic;opacity:0.7">${s.incantation||'—'}</td><td><span class="spell-type ${typeClass[s.spell_type]||'type-other'}">${s.spell_type||'Other'}</span></td><td>${s.refs||0}</td>`;
    tbody.appendChild(tr);
  });
}

// ── LINE CHART ────────────────────────────────────────────────
function renderLineChart() {
  const movies = DB.movies;
  const targets = ['harry potter','hermione granger','ron weasley'];
  const colors  = ['#FFC500','#48cae4','#eb5757'];
  const labels  = ["P.S.","C.S.","P.A.","G.F.","O.P.","H.P.","DH1","DH2"];

  const data = targets.map(name =>
    movies.map(m => DB.dialogues.filter(d =>
      (d.character_name||'').toLowerCase().trim() === name &&
      String(d.movie_id).trim() === String(m.movie_id||m.id).trim()
    ).length)
  );

  const maxVal = Math.max(...data.flat(), 1);
  const W=290, H=120, padT=8, padB=18;
  const svg = document.getElementById('lineSvg');
  svg.innerHTML = '';

  [0.33,0.66,1].forEach(f => {
    const y = padT+(1-f)*(H-padT-padB);
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1','0'); line.setAttribute('x2',String(W));
    line.setAttribute('y1',String(y)); line.setAttribute('y2',String(y));
    line.setAttribute('stroke','rgba(255,255,255,0.04)'); line.setAttribute('stroke-width','1');
    svg.appendChild(line);
  });

  data.forEach((series, si) => {
    const step = movies.length > 1 ? W/(movies.length-1) : W;
    const pts = series.map((v,i) => `${i*step},${padT+(1-v/maxVal)*(H-padT-padB)}`).join(' ');
    const poly = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    poly.setAttribute('points',pts);
    poly.setAttribute('fill','none');
    poly.setAttribute('stroke',colors[si]);
    poly.setAttribute('stroke-width', si===0?'2.5':'2');
    poly.setAttribute('stroke-linecap','round');
    poly.setAttribute('stroke-linejoin','round');
    svg.appendChild(poly);
  });

  movies.forEach((m,i) => {
    const x = movies.length>1 ? i*(W/(movies.length-1)) : 0;
    const t = document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('x',String(x)); t.setAttribute('y',String(H));
    t.setAttribute('fill','rgba(232,220,200,0.35)'); t.setAttribute('font-size','7.5');
    t.setAttribute('font-family','Cinzel'); t.setAttribute('text-anchor','middle');
    t.textContent = labels[i] || ('M'+(i+1));
    svg.appendChild(t);
  });
}

// ── LOCATIONS ─────────────────────────────────────────────────
function renderLocations(filtered, house) {
  document.getElementById('locTag').textContent = house==='all' ? 'All Houses' : house;
  const container = document.getElementById('locBars');

  if (!DB.places.length) { container.innerHTML='<div class="no-data">No location data</div>'; return; }

  const allText = filtered.map(d=>(d.dialogue||'').toLowerCase()).join(' ');
  const counts = DB.places.map(p => {
    const name = (p.place_name||'').trim();
    const refs = name ? (allText.split(name.toLowerCase()).length-1) : 0;
    return { name, refs };
  }).filter(p=>p.refs>0).sort((a,b)=>b.refs-a.refs).slice(0,7);

  const max = counts[0]?.refs || 1;
  container.innerHTML = counts.length ? '' : '<div class="no-data">No location references in filtered dialogue</div>';

  const locColors = [
    'linear-gradient(90deg,rgba(34,47,91,0.8),rgba(74,111,165,0.45))',
    'linear-gradient(90deg,rgba(34,47,91,0.7),rgba(74,111,165,0.35))',
    'linear-gradient(90deg,rgba(201,168,76,0.5),rgba(232,201,122,0.25))',
    'linear-gradient(90deg,rgba(174,0,1,0.65),rgba(174,0,1,0.3))',
    'linear-gradient(90deg,rgba(42,98,61,0.65),rgba(42,98,61,0.3))',
    'linear-gradient(90deg,rgba(42,98,61,0.5),rgba(42,98,61,0.25))',
    'linear-gradient(90deg,rgba(72,202,228,0.45),rgba(72,202,228,0.2))',
  ];

  counts.forEach((loc, i) => {
    const pct = Math.round((loc.refs/max)*100);
    const div = document.createElement('div');
    div.className = 'hbar-item';
    div.innerHTML = `
      <div class="hbar-name">${loc.name}</div>
      <div class="hbar-track"><div class="hbar-fill" data-w="${pct}" style="width:0%;background:${locColors[i]||locColors[0]}">${loc.refs}</div></div>
      <div class="hbar-num">${loc.refs}</div>`;
    container.appendChild(div);
  });
  animateBars(container);
}

// ── SPELL TYPES ───────────────────────────────────────────────
function renderSpellTypes() {
  const typeCounts = {};
  DB.spells.forEach(s => { const t=s.spell_type||'Other'; typeCounts[t]=(typeCounts[t]||0)+1; });
  const total = DB.spells.length || 1;

  const typeConfig = {
    'Charm':           { cls:'type-charm', bar:'linear-gradient(90deg,#48cae4,#90e0ef)' },
    'Curse':           { cls:'type-curse', bar:'linear-gradient(90deg,#ae0001,#e63946)' },
    'Jinx':            { cls:'type-jinx',  bar:'linear-gradient(90deg,#7b68ee,#b8aaff)' },
    'Hex':             { cls:'type-hex',   bar:'linear-gradient(90deg,#ff8c00,#ffab40)' },
    'Transfiguration': { cls:'type-trans', bar:'linear-gradient(90deg,#2a623d,#6fcf97)' },
  };

  const container = document.getElementById('spellTypes');
  container.innerHTML = '';
  Object.entries(typeCounts).sort((a,b)=>b[1]-a[1]).forEach(([type, count]) => {
    const pct = Math.round((count/total)*100);
    const cfg = typeConfig[type] || { cls:'type-other', bar:'rgba(255,255,255,0.15)' };
    const div = document.createElement('div');
    div.className = 'prog-item';
    div.innerHTML = `
      <div class="prog-header">
        <span class="prog-label">${type}</span>
        <span class="spell-type ${cfg.cls}" style="font-size:0.54rem;padding:1px 6px">${pct}% · ${count}</span>
      </div>
      <div class="prog-track"><div class="prog-fill" data-w="${pct}" style="width:0%;background:${cfg.bar}"></div></div>`;
    container.appendChild(div);
  });
  animateBars(container);

  const charms = typeCounts['Charm']||0;
  document.getElementById('spellInsight').textContent =
    `Charms make up ${Math.round(charms/total*100)}% of all spells. The three Unforgivable Curses appear across most films despite being a small fraction of total spell count.`;
}
