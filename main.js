// ── DATABASE ──────────────────────────────────────────────────
const DB = { dialogues:[], characters:[], movies:[], spells:[], places:[] };
let charHouseMap = {};   // "harry potter" -> "Gryffindor"
let movieMap = {};       // "1" -> "Philosopher's Stone"
let currentFilter = 'all';
const filesLoaded = { dialogue:false, characters:false, movies:false, spells:false, places:false };

// ── CSV PARSER ────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const first = lines[0];
  const delim = (first.split(';').length >= first.split(',').length) ? ';' : ',';
  const headers = first.split(delim).map(h => h.trim().replace(/^"|"$/g,'').toLowerCase().replace(/\s+/g,'_'));
  return lines.slice(1).filter(l => l.trim()).map(line => {
    const cols = line.split(delim).map(v => v.trim().replace(/^"|"$/g,''));
    const obj = {};
    headers.forEach((h,i) => { obj[h] = cols[i] !== undefined ? cols[i] : ''; });
    return obj;
  });
}

// ── FILE UPLOAD ───────────────────────────────────────────────
document.getElementById('fileInput').addEventListener('change', e => Array.from(e.target.files).forEach(loadFile));
const uploadBox = document.getElementById('uploadBox');
uploadBox.addEventListener('dragover', e => { e.preventDefault(); uploadBox.classList.add('dragover'); });
uploadBox.addEventListener('dragleave', () => uploadBox.classList.remove('dragover'));
uploadBox.addEventListener('drop', e => { e.preventDefault(); uploadBox.classList.remove('dragover'); Array.from(e.dataTransfer.files).forEach(loadFile); });

function loadFile(file) {
  const name = file.name.toLowerCase();
  let key = null;
  if (name.includes('dialogue') || name.includes('dialog')) key = 'dialogue';
  else if (name.includes('character')) key = 'characters';
  else if (name.includes('movie')) key = 'movies';
  else if (name.includes('spell')) key = 'spells';
  else if (name.includes('place') || name.includes('location')) key = 'places';
  if (!key) return;

  const reader = new FileReader();
  reader.onload = e => {
    const parsed = parseCSV(e.target.result);
    if (key === 'dialogue') DB.dialogues = parsed;
    else if (key === 'characters') DB.characters = parsed;
    else if (key === 'movies') DB.movies = parsed;
    else if (key === 'spells') DB.spells = parsed;
    else if (key === 'places') DB.places = parsed;

    filesLoaded[key] = true;
    const el = document.getElementById('fi-' + key);
    if (el) { el.classList.add('loaded'); el.querySelector('.file-status').textContent = '✓ ' + parsed.length + ' rows'; }
    if (Object.values(filesLoaded).filter(Boolean).length >= 2) document.getElementById('btnAnalyze').classList.add('ready');
  };
  reader.readAsText(file);
}

// ── DEMO DATA ─────────────────────────────────────────────────
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
    {character_name:"Harry Potter",      house:"Gryffindor"},
    {character_name:"Hermione Granger",  house:"Gryffindor"},
    {character_name:"Ron Weasley",       house:"Gryffindor"},
    {character_name:"Albus Dumbledore",  house:"Gryffindor"},
    {character_name:"Rubeus Hagrid",     house:"Gryffindor"},
    {character_name:"Neville Longbottom",house:"Gryffindor"},
    {character_name:"Ginny Weasley",     house:"Gryffindor"},
    {character_name:"Sirius Black",      house:"Gryffindor"},
    {character_name:"Minerva McGonagall",house:"Gryffindor"},
    {character_name:"Severus Snape",     house:"Slytherin"},
    {character_name:"Draco Malfoy",      house:"Slytherin"},
    {character_name:"Lord Voldemort",    house:"Slytherin"},
    {character_name:"Lucius Malfoy",     house:"Slytherin"},
    {character_name:"Dolores Umbridge",  house:"Slytherin"},
    {character_name:"Bellatrix Lestrange",house:"Slytherin"},
    {character_name:"Luna Lovegood",     house:"Ravenclaw"},
    {character_name:"Cho Chang",         house:"Ravenclaw"},
    {character_name:"Filius Flitwick",   house:"Ravenclaw"},
    {character_name:"Cedric Diggory",    house:"Hufflepuff"},
    {character_name:"Nymphadora Tonks",  house:"Hufflepuff"},
  ];

  // Generate dialogue rows per character per movie
  const script = {
    "Harry Potter":       [130,120,115,140,165,125,110,102],
    "Hermione Granger":   [92,88,80,95,110,90,80,76],
    "Ron Weasley":        [85,80,75,88,100,78,70,65],
    "Albus Dumbledore":   [60,58,55,70,75,80,45,40],
    "Rubeus Hagrid":      [40,38,35,30,25,20,15,12],
    "Neville Longbottom": [18,16,20,22,35,28,22,30],
    "Ginny Weasley":      [10,12,8,15,20,25,18,22],
    "Sirius Black":       [0,0,55,30,58,0,0,0],
    "Minerva McGonagall": [30,28,25,22,35,30,18,20],
    "Severus Snape":      [45,42,50,38,55,70,35,30],
    "Draco Malfoy":       [38,40,35,42,45,48,30,28],
    "Lord Voldemort":     [15,20,0,25,0,10,30,45],
    "Lucius Malfoy":      [10,15,0,20,8,12,5,0],
    "Dolores Umbridge":   [0,0,0,0,55,0,0,0],
    "Bellatrix Lestrange":[0,0,0,0,15,10,25,30],
    "Luna Lovegood":      [0,0,0,0,38,30,25,20],
    "Cho Chang":          [0,0,0,10,20,5,0,0],
    "Filius Flitwick":    [8,6,5,4,8,6,3,4],
    "Cedric Diggory":     [0,0,0,35,0,0,0,0],
    "Nymphadora Tonks":   [0,0,0,0,20,15,18,8],
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

  DB.spells = [
    {spell_name:"Disarming Charm",    incantation:"Expelliarmus",       spell_type:"Charm"},
    {spell_name:"Stunning Spell",     incantation:"Stupefy",            spell_type:"Charm"},
    {spell_name:"Killing Curse",      incantation:"Avada Kedavra",      spell_type:"Curse"},
    {spell_name:"Cruciatus Curse",    incantation:"Crucio",             spell_type:"Curse"},
    {spell_name:"Imperius Curse",     incantation:"Imperio",            spell_type:"Curse"},
    {spell_name:"Impediment Jinx",    incantation:"Impedimenta",        spell_type:"Jinx"},
    {spell_name:"Leg-Locker Curse",   incantation:"Locomotor Mortis",   spell_type:"Jinx"},
    {spell_name:"Bat-Bogey Hex",      incantation:"Bat-Bogey",          spell_type:"Hex"},
    {spell_name:"Full Body-Bind",     incantation:"Petrificus Totalus", spell_type:"Hex"},
    {spell_name:"Shield Charm",       incantation:"Protego",            spell_type:"Charm"},
    {spell_name:"Levitation Charm",   incantation:"Wingardium Leviosa", spell_type:"Charm"},
    {spell_name:"Light Charm",        incantation:"Lumos",              spell_type:"Charm"},
    {spell_name:"Unlocking Charm",    incantation:"Alohomora",          spell_type:"Charm"},
    {spell_name:"Finite",             incantation:"Finite Incantatem",  spell_type:"Transfiguration"},
    {spell_name:"Engorgio",           incantation:"Engorgio",           spell_type:"Transfiguration"},
  ];

  DB.places = [
    {place_name:"Hogwarts"},{place_name:"Ministry of Magic"},{place_name:"Diagon Alley"},
    {place_name:"Azkaban"},{place_name:"Hogsmeade"},{place_name:"Forbidden Forest"},
    {place_name:"Grimmauld Place"},{place_name:"Malfoy Manor"},{place_name:"Godric's Hollow"},
    {place_name:"Dumbledore"},{place_name:"Voldemort"},
  ];

  buildDashboard();
}

// ── BUILD ─────────────────────────────────────────────────────
function buildDashboard() {
  // Build charHouseMap — normalize keys to lowercase trimmed
  charHouseMap = {};
  DB.characters.forEach(c => {
    // handle both column name variants from Kaggle
    const name = (c.character_name || c.name || c['character name'] || '').toLowerCase().trim();
    const house = (c.house || c['house'] || 'Unknown').trim();
    if (name) charHouseMap[name] = house;
  });

  // Build movieMap
  movieMap = {};
  DB.movies.forEach(m => {
    const id = String(m.movie_id || m.id || '').trim();
    const title = (m.movie_title || m.title || m['movie title'] || ('Movie ' + id)).trim();
    if (id) movieMap[id] = title;
  });

  document.getElementById('kpi-spells').textContent = DB.spells.length || '—';
  document.getElementById('kpi-places').textContent = DB.places.length || '—';

  document.getElementById('uploadScreen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';

  // Render with default filter
  applyFilter('all');
}

// ── FILTER ────────────────────────────────────────────────────
function applyFilter(house) {
  currentFilter = house;

  // Update pill active states
  document.querySelectorAll('.pill').forEach(p => {
    p.classList.remove('active');
    if (p.dataset.house === house) p.classList.add('active');
  });

  // Filter dialogues
  const filtered = house === 'all'
    ? DB.dialogues
    : DB.dialogues.filter(d => {
        const key = (d.character_name || '').toLowerCase().trim();
        const h = charHouseMap[key] || 'Unknown';
        return h === house;
      });

  // Render every chart with filtered data
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

function getHouse(characterName) {
  return charHouseMap[(characterName||'').toLowerCase().trim()] || 'Unknown';
}

function getMovieTitle(movieId) {
  return movieMap[String(movieId).trim()] || ('Movie ' + movieId);
}

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

// ── RENDER KPIs ───────────────────────────────────────────────
function renderKPIs(filtered) {
  document.getElementById('kpi-lines').textContent = fmt(filtered.length);
  document.getElementById('kpi-chars').textContent = new Set(filtered.map(d => d.character_name)).size;
}

// ── RENDER CHARACTER BARS ─────────────────────────────────────
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
    const h = getHouse(name);
    const bg = houseBarColor[h] || houseBarColor['Unknown'];
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

// ── RENDER DONUT ──────────────────────────────────────────────
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
    const color = houseColors[h] || '#888';
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx','75'); circle.setAttribute('cy','75'); circle.setAttribute('r','55');
    circle.setAttribute('fill','none'); circle.setAttribute('stroke',color);
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

// ── RENDER MOVIE BARS ─────────────────────────────────────────
function renderMovieBars(filtered, house) {
  const movieCounts = {};
  filtered.forEach(d => {
    const t = getMovieTitle(d.movie_id);
    movieCounts[t] = (movieCounts[t]||0)+1;
  });

  const orderedMovies = DB.movies.length
    ? DB.movies.map(m => getMovieTitle(m.movie_id || m.id))
    : Object.keys(movieCounts);

  const max = Math.max(...Object.values(movieCounts), 1);
  document.getElementById('movieTag').textContent = house==='all' ? 'All Houses' : house;
  const container = document.getElementById('movieBars');
  container.innerHTML = '';

  const colors = ['#4a0080','#003580','#004d00','#7a2000','#003050','#401500','#2a0040','#600000'];

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

// ── RENDER SPELL TABLE ────────────────────────────────────────
function renderSpellTable() {
  const tbody = document.getElementById('spellTable');
  tbody.innerHTML = '';
  if (!DB.spells.length) { tbody.innerHTML = '<tr><td colspan="4" class="no-data">Load Spells.csv to see data</td></tr>'; return; }

  const typeClass = { Charm:'type-charm', Curse:'type-curse', Jinx:'type-jinx', Hex:'type-hex', Transfiguration:'type-trans' };
  // Count refs in ALL dialogues (spells don't filter by house)
  const allText = DB.dialogues.map(d=>(d.dialogue||'').toLowerCase()).join(' ');

  DB.spells.map(s => ({
    ...s,
    refs: s.incantation ? (allText.split(s.incantation.toLowerCase()).length-1) : 0
  })).sort((a,b)=>b.refs-a.refs).slice(0,10).forEach(s => {
    const tc = typeClass[s.spell_type] || 'type-other';
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.spell_name||'—'}</td><td style="font-style:italic;opacity:0.7">${s.incantation||'—'}</td><td><span class="spell-type ${tc}">${s.spell_type||'Other'}</span></td><td>${s.refs||0}</td>`;
    tbody.appendChild(tr);
  });
}

// ── RENDER LINE CHART ─────────────────────────────────────────
function renderLineChart() {
  const movies = DB.movies.length ? DB.movies : Array.from({length:8},(_,i)=>({movie_id:String(i+1)}));
  const targets = ['harry potter','hermione granger','ron weasley'];
  const colors  = ['#FFC500','#48cae4','#eb5757'];
  const labels  = ["P.S.","C.S.","P.A.","G.F.","O.P.","H.P.","DH1","DH2"];

  // Count lines per target per movie — uses ALL dialogues (line chart always shows full series)
  const data = targets.map(name =>
    movies.map(m => DB.dialogues.filter(d =>
      (d.character_name||'').toLowerCase().trim() === name && String(d.movie_id).trim() === String(m.movie_id||m.id).trim()
    ).length)
  );

  const allVals = data.flat();
  const maxVal = Math.max(...allVals, 1);
  const W = 290, H = 120, padT = 8, padB = 18;
  const svg = document.getElementById('lineSvg');
  svg.innerHTML = '';

  // Grid
  [0.33,0.66,1].forEach(f => {
    const y = padT + (1-f)*(H-padT-padB);
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1','0'); line.setAttribute('x2',String(W));
    line.setAttribute('y1',String(y)); line.setAttribute('y2',String(y));
    line.setAttribute('stroke','rgba(255,255,255,0.04)'); line.setAttribute('stroke-width','1');
    svg.appendChild(line);
  });

  // Lines
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

  // X labels
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

// ── RENDER LOCATIONS ──────────────────────────────────────────
function renderLocations(filtered, house) {
  document.getElementById('locTag').textContent = house==='all' ? 'All Houses' : house;
  if (!DB.places.length) { document.getElementById('locBars').innerHTML='<div class="no-data">Load Places.csv to see data</div>'; return; }

  const allText = filtered.map(d=>(d.dialogue||'').toLowerCase()).join(' ');
  const counts = DB.places.map(p => {
    const name = (p.place_name || p.location || p.name || '').trim();
    const refs = name ? (allText.split(name.toLowerCase()).length-1) : 0;
    return { name, refs };
  }).filter(p=>p.name && p.refs>0).sort((a,b)=>b.refs-a.refs).slice(0,7);

  const max = counts[0]?.refs || 1;
  const container = document.getElementById('locBars');
  container.innerHTML = counts.length ? '' : '<div class="no-data">No location references found in filtered dialogue</div>';

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

// ── RENDER SPELL TYPES ────────────────────────────────────────
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
  document.getElementById('spellInsight').textContent = DB.spells.length
    ? `Charms make up ${Math.round(charms/total*100)}% of all spells. The three Unforgivable Curses appear across most films despite being a small fraction of total spell count.`
    : 'Load Spells.csv to see spell type analysis.';
}
