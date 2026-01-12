// Techno Rhythm Pattern Library
// Format: 0 = off, 1 = on, 2 = accent (louder/emphasized)
// Grid: 16 steps (one bar of 16th notes)

const DRUM_INSTRUMENTS = [
    { name: 'Kick', note: 36, accentNote: 35 },        // Accent: Acoustic Bass Drum
    { name: 'Snare', note: 38, accentNote: 40 },       // Accent: Electric Snare
    { name: 'Closed HH', note: 42, accentNote: 44 },   // Accent: Pedal Hi-Hat
    { name: 'Open HH', note: 46, accentNote: 49 },     // Accent: Crash Cymbal 1
    { name: 'Clap', note: 39, accentNote: 82 },        // Accent: Shaker
    { name: 'Perc/Shaker', note: 60, accentNote: 54 }  // Accent: Tambourine
];

const TECHNO_PATTERNS = [
    // ========== CLASSIC TECHNO ==========
    {
        id: 'classic-909',
        name: 'Classic 909 Four-on-the-Floor',
        category: 'classic',
        bpm: 128,
        origin: 'Detroit/Berlin, Late 80s',
        machine: 'Roland TR-909',
        description: 'The quintessential techno pattern. Four-to-the-floor kick drum with off-beat closed hi-hats and accented open hi-hats on the "&" of beats 2 and 4. This is the foundation of techno - simple, driving, hypnotic.',
        pattern: [
            [2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0], // Kick (accented on 1 & 3)
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare (2 & 4)
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Closed HH (off-beats)
            [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0], // Open HH (accented)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Clap
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Perc
        ]
    },
    {
        id: 'detroit-classic',
        name: 'Detroit Techno Classic',
        category: 'classic',
        bpm: 120,
        origin: 'Detroit, 1985-1990',
        machine: 'Roland TR-909',
        description: 'Inspired by Juan Atkins, Derrick May, and Kevin Saunderson. Four-on-the-floor with syncopated hi-hats and subtle percussion. The slightly slower tempo (120 BPM) gives it a deeper, more hypnotic feel than modern techno.',
        pattern: [
            [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Kick
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare
            [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0], // Closed HH (syncopated)
            [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0], // Open HH
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Clap
            [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0]  // Perc (subtle shaker)
        ]
    },
    {
        id: 'classic-clap',
        name: 'Classic with Clap',
        category: 'classic',
        bpm: 132,
        origin: 'Berlin, Early 90s',
        machine: 'Roland TR-909',
        description: 'The classic pattern enhanced with a clap on beats 2 and 4, adding extra punch and groove. Common in early Berlin techno and still widely used today for its energy and clarity.',
        pattern: [
            [2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0], // Kick
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Snare
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Closed HH
            [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0], // Open HH
            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], // Clap (accented)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Perc
        ]
    },

    // ========== MINIMAL TECHNO ==========
    {
        id: 'minimal-basic',
        name: 'Minimal Techno Foundation',
        category: 'minimal',
        bpm: 125,
        origin: 'Berlin, Late 90s',
        machine: 'Various',
        description: 'Stripped down to the essentials. Just kick and sparse hi-hats create maximum space for other elements. The beauty of minimal is in what you DON\'T play - every hit counts. Notice the gaps in the hi-hat pattern.',
        pattern: [
            [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Kick
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Snare
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // Closed HH (sparse)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // Open HH (very sparse)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Clap
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]  // Perc (minimal)
        ]
    },
    {
        id: 'minimal-groove',
        name: 'Minimal Groove Pattern',
        category: 'minimal',
        bpm: 128,
        origin: 'Germany/Romania, 2000s',
        machine: 'Digital/Software',
        description: 'Influenced by Richie Hawtin and minimal house. The groove comes from subtle variations in kick placement and micro-timed percussion. In your DAW, slightly shift the timing of the percussion hits for that "off-grid" minimal feel.',
        pattern: [
            [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], // Kick (variation on beat 4)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Snare
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], // Closed HH
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Open HH
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Clap
            [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0]  // Perc (micro groove)
        ]
    },

    // ========== HARD TECHNO ==========
    {
        id: 'hard-berlin',
        name: 'Hard Techno Berlin Style',
        category: 'hard',
        bpm: 140,
        origin: 'Berlin, 2010s',
        machine: 'Roland TR-909',
        description: 'Aggressive and relentless. Fast tempo (140 BPM), heavy kicks on every beat, driving closed hi-hats, and powerful claps. This is Berghain, this is industrial techno. The accented kicks create a pounding, almost violent energy.',
        pattern: [
            [2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], // Kick (all beats accented)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Snare
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Closed HH (relentless)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Open HH
            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], // Clap (heavy)
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]  // Perc (industrial feel)
        ]
    },
    {
        id: 'hard-industrial',
        name: 'Industrial Hard Techno',
        category: 'hard',
        bpm: 145,
        origin: 'Amsterdam/Berlin, 2015+',
        machine: 'Roland TR-909 + Distortion',
        description: 'Modern industrial techno with extra kicks between beats for double-time energy. Influenced by Kobosil, Rebekah, and the current hard techno scene. The extra kick hits create an almost breakbeat-like intensity.',
        pattern: [
            [2, 0, 1, 0, 2, 0, 0, 0, 2, 0, 1, 0, 2, 0, 0, 0], // Kick (extra hits)
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Closed HH
            [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0], // Open HH
            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0], // Clap
            [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0]  // Perc (chaotic)
        ]
    },

    // ========== HYPNOTIC TECHNO ==========
    {
        id: 'hypnotic-loop',
        name: 'Hypnotic Loop Pattern',
        category: 'hypnotic',
        bpm: 126,
        origin: 'Influenced by Ricardo Villalobos',
        machine: 'Roland TR-909',
        description: 'Creates a trance-like state through repetition and subtle variation. The hi-hat pattern uses a 3-step rhythm over 4 beats (polyrhythm) which creates a hypnotic, never-quite-resolving feeling. This is for long DJ sets and deep listening.',
        pattern: [
            [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Kick
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Snare
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], // Closed HH (3-step poly)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0], // Open HH (sparse accent)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Clap
            [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]  // Perc (triplet feel)
        ]
    },
    {
        id: 'hypnotic-deep',
        name: 'Deep Hypnotic Techno',
        category: 'hypnotic',
        bpm: 122,
        origin: 'Dub Techno / Deep House influence',
        machine: 'Roland TR-808',
        description: 'Slower, deeper, more meditative. Inspired by dub techno pioneers like Basic Channel. The sparse pattern leaves massive space for reverb, delay, and atmospheric elements. The off-beat kicks create a floating, weightless feeling.',
        pattern: [
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0], // Kick (sparse, varied)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Snare
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], // Closed HH (minimal)
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // Open HH
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Clap
            [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]  // Perc (subtle)
        ]
    },

    // ========== GROOVE TECHNO ==========
    {
        id: 'groove-shuffle',
        name: 'Groove Techno with Shuffle',
        category: 'groove',
        bpm: 124,
        origin: 'Influenced by house & UK techno',
        machine: 'Roland TR-909',
        description: 'Adds swing and groove to techno. The secret is in velocity and timing - in your DAW, apply swing (54-58%) and vary hi-hat velocities to make it dance. This pattern works great for peak-time sets when you want people to move, not just nod.',
        pattern: [
            [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1], // Kick (extra on "&" of 4)
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare
            [0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1], // Closed HH (accented)
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0], // Open HH
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Clap
            [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]  // Perc (groove)
        ]
    },
    {
        id: 'groove-funk',
        name: 'Funky Groove Techno',
        category: 'groove',
        bpm: 126,
        origin: 'French Touch / Jackin House influence',
        machine: 'Roland TR-909',
        description: 'Techno meets funk. Syncopated kicks, ghost notes on snare (low velocity), and a rolling hi-hat pattern. Influenced by French Touch and jackin\' house. This is for making dancers smile - it\'s playful but still driving.',
        pattern: [
            [2, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0], // Kick (syncopated)
            [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0], // Snare (ghost notes - low vel)
            [0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1], // Closed HH (rolling)
            [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Open HH
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1], // Clap (funky)
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0]  // Perc (shaker groove)
        ]
    },

    // ========== BONUS PATTERNS ==========
    {
        id: 'acid-techno',
        name: 'Acid Techno Pattern',
        category: 'classic',
        bpm: 135,
        origin: 'UK/Europe, Early 90s',
        machine: 'Roland TR-909 + TB-303',
        description: 'Built for acid basslines (TB-303). The drums are straightforward and powerful to let the 303 bassline shine. Notice the open hi-hat on the off-beat creates space for the acid line to breathe.',
        pattern: [
            [2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0], // Kick
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Closed HH
            [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0], // Open HH (off-beat)
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Clap
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Perc
        ]
    },
    {
        id: 'broken-techno',
        name: 'Broken Beat Techno',
        category: 'groove',
        bpm: 130,
        origin: 'UK Techno / Breakbeat influence',
        machine: 'Hybrid',
        description: 'Breaks the four-on-the-floor rule. Kicks are syncopated and unexpected, creating tension and release. This is for adventurous DJs and producers who want to keep dancers guessing. Works great as a breakdown or transition.',
        pattern: [
            [2, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], // Kick (broken)
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0], // Snare (breakbeat style)
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Closed HH
            [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Open HH
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Clap
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0]  // Perc
        ]
    }
];
