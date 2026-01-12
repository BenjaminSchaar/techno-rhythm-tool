// Main Application Logic

class TechnoRhythmApp {
    constructor() {
        this.currentPattern = null;
        this.currentBPM = 128;
        this.isPlaying = false;
        this.currentCategory = 'all';
        this.visualUpdateInterval = null;
    }

    init() {
        this.renderPatternList();
        this.setupEventListeners();
        this.setupCategoryFilters();
    }

    // Render pattern list
    renderPatternList(category = 'all') {
        const patternList = document.getElementById('patternList');
        patternList.innerHTML = '';

        const filteredPatterns = category === 'all'
            ? TECHNO_PATTERNS
            : TECHNO_PATTERNS.filter(p => p.category === category);

        filteredPatterns.forEach(pattern => {
            const card = document.createElement('div');
            card.className = 'pattern-card';
            card.dataset.patternId = pattern.id;

            card.innerHTML = `
                <h4>${pattern.name}</h4>
                <span class="category-tag">${pattern.category}</span>
            `;

            card.addEventListener('click', () => this.selectPattern(pattern));
            patternList.appendChild(card);
        });

        // Select first pattern by default if none selected
        if (!this.currentPattern && filteredPatterns.length > 0) {
            this.selectPattern(filteredPatterns[0]);
        }
    }

    // Select a pattern
    selectPattern(pattern) {
        this.currentPattern = pattern;
        this.currentBPM = pattern.bpm;

        // Update selected card
        document.querySelectorAll('.pattern-card').forEach(card => {
            card.classList.remove('selected');
        });
        const selectedCard = document.querySelector(`[data-pattern-id="${pattern.id}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        // Update pattern info
        document.getElementById('patternName').textContent = pattern.name;
        document.getElementById('patternDescription').textContent = pattern.description;
        document.getElementById('patternBPM').textContent = `BPM: ${pattern.bpm}`;
        document.getElementById('patternOrigin').textContent = `Origin: ${pattern.origin}`;
        document.getElementById('patternMachine').textContent = `Machine: ${pattern.machine}`;

        // Update BPM slider
        document.getElementById('bpmSlider').value = pattern.bpm;
        document.getElementById('bpmValue').textContent = pattern.bpm;

        // Stop playback if playing
        if (this.isPlaying) {
            this.stop();
        }

        // Render drum grid
        this.renderDrumGrid();
    }

    // Render drum grid visualization
    renderDrumGrid() {
        const gridContainer = document.getElementById('drumGrid');
        gridContainer.innerHTML = '';

        DRUM_INSTRUMENTS.forEach((instrument, rowIndex) => {
            // Drum label
            const label = document.createElement('div');
            label.className = 'drum-label';
            label.textContent = instrument.name;
            gridContainer.appendChild(label);

            // Drum cells (16 steps)
            for (let step = 0; step < 16; step++) {
                const cell = document.createElement('div');
                cell.className = 'drum-cell';
                cell.dataset.row = rowIndex;
                cell.dataset.step = step;

                const hit = this.currentPattern.pattern[rowIndex][step];
                if (hit === 1) {
                    cell.classList.add('active');
                } else if (hit === 2) {
                    cell.classList.add('active', 'accent');
                }

                gridContainer.appendChild(cell);
            }
        });
    }

    // Update grid visualization during playback
    updateGridVisualization() {
        if (!this.isPlaying) return;

        const currentStep = drumSynth.getCurrentStep();

        // Remove previous highlights
        document.querySelectorAll('.drum-cell').forEach(cell => {
            cell.classList.remove('current-beat', 'playing');
        });

        // Highlight current beat column
        document.querySelectorAll(`[data-step="${currentStep}"]`).forEach(cell => {
            cell.classList.add('current-beat');
        });

        // Highlight playing cells
        DRUM_INSTRUMENTS.forEach((instrument, rowIndex) => {
            const hit = this.currentPattern.pattern[rowIndex][currentStep];
            if (hit > 0) {
                const cell = document.querySelector(`[data-row="${rowIndex}"][data-step="${currentStep}"]`);
                if (cell) {
                    cell.classList.add('playing');
                }
            }
        });
    }

    // Play/Pause
    play() {
        if (!this.currentPattern) return;

        if (this.isPlaying) {
            this.stop();
        } else {
            drumSynth.play(this.currentPattern, this.currentBPM);
            this.isPlaying = true;

            // Update UI
            const playBtn = document.getElementById('playBtn');
            playBtn.classList.add('playing');
            playBtn.querySelector('.play-icon').style.display = 'none';
            playBtn.querySelector('.pause-icon').style.display = 'inline';

            // Start visual updates
            this.visualUpdateInterval = setInterval(() => {
                this.updateGridVisualization();
            }, 20); // Update 50 times per second
        }
    }

    // Stop playback
    stop() {
        drumSynth.stop();
        this.isPlaying = false;

        // Update UI
        const playBtn = document.getElementById('playBtn');
        playBtn.classList.remove('playing');
        playBtn.querySelector('.play-icon').style.display = 'inline';
        playBtn.querySelector('.pause-icon').style.display = 'none';

        // Stop visual updates
        if (this.visualUpdateInterval) {
            clearInterval(this.visualUpdateInterval);
            this.visualUpdateInterval = null;
        }

        // Clear visual highlights
        document.querySelectorAll('.drum-cell').forEach(cell => {
            cell.classList.remove('current-beat', 'playing');
        });
    }

    // Download MIDI file (clean)
    downloadMIDI() {
        if (!this.currentPattern) return;

        const filename = `${this.currentPattern.id}_${this.currentBPM}bpm.mid`;
        midiGenerator.downloadMIDI(this.currentPattern, filename, false);

        // Visual feedback
        const btn = document.getElementById('downloadMidiBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Downloaded!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }

    // Download MIDI file with separate accent track
    downloadMIDIWithAccents() {
        if (!this.currentPattern) return;

        const filename = `${this.currentPattern.id}_${this.currentBPM}bpm_accents.mid`;
        midiGenerator.downloadMIDI(this.currentPattern, filename, true);

        // Visual feedback
        const btn = document.getElementById('downloadMidiAccentsBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Downloaded!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }

    // Copy pattern info to clipboard
    copyPatternInfo() {
        if (!this.currentPattern) return;

        const info = `
${this.currentPattern.name}
${'-'.repeat(this.currentPattern.name.length)}

Category: ${this.currentPattern.category}
BPM: ${this.currentBPM}
Origin: ${this.currentPattern.origin}
Machine: ${this.currentPattern.machine}

Description:
${this.currentPattern.description}

Pattern Grid:
${DRUM_INSTRUMENTS.map((inst, i) => {
    const pattern = this.currentPattern.pattern[i].map(hit => {
        if (hit === 2) return '▓'; // Accent
        if (hit === 1) return '█'; // Normal hit
        return '·'; // Empty
    }).join(' ');
    return `${inst.name.padEnd(12)} | ${pattern}`;
}).join('\n')}

Generated from: Techno Rhythm Library
        `.trim();

        navigator.clipboard.writeText(info).then(() => {
            const btn = document.getElementById('copyPatternBtn');
            const originalText = btn.textContent;
            btn.textContent = '✓ Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Play button
        document.getElementById('playBtn').addEventListener('click', () => {
            this.play();
        });

        // Stop button
        document.getElementById('stopBtn').addEventListener('click', () => {
            this.stop();
        });

        // BPM slider
        const bpmSlider = document.getElementById('bpmSlider');
        const bpmValue = document.getElementById('bpmValue');
        bpmSlider.addEventListener('input', (e) => {
            this.currentBPM = parseInt(e.target.value);
            bpmValue.textContent = this.currentBPM;

            // Restart playback if playing
            if (this.isPlaying) {
                this.stop();
                this.play();
            }
        });

        // Download MIDI button (clean)
        document.getElementById('downloadMidiBtn').addEventListener('click', () => {
            this.downloadMIDI();
        });

        // Download MIDI with accents button
        document.getElementById('downloadMidiAccentsBtn').addEventListener('click', () => {
            this.downloadMIDIWithAccents();
        });

        // Copy pattern button
        document.getElementById('copyPatternBtn').addEventListener('click', () => {
            this.copyPatternInfo();
        });
    }

    // Setup category filters
    setupCategoryFilters() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter patterns
                const category = btn.dataset.category;
                this.currentCategory = category;
                this.renderPatternList(category);
            });
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new TechnoRhythmApp();
    app.init();
});
