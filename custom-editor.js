// Custom Rhythm Editor
// Interactive drum pattern editor with accent control

class CustomRhythmEditor {
    constructor() {
        this.customPattern = this.createEmptyPattern();
        this.currentBPM = 128;
        this.isPlaying = false;
        this.visualUpdateInterval = null;
        // Per-drum accent types
        this.drumAccentTypes = {
            0: 'velocity', // Kick
            1: 'velocity', // Snare
            2: 'velocity', // Closed HH
            3: 'velocity', // Open HH
            4: 'velocity', // Clap
            5: 'velocity'  // Perc
        };
    }

    init() {
        this.renderDrumGrid();
        this.setupEventListeners();
        this.setupAccentTypeSelector();
        this.setupPresets();
    }

    createEmptyPattern() {
        return {
            id: 'custom',
            name: 'Custom Pattern',
            category: 'custom',
            bpm: 128,
            origin: 'Created by you!',
            machine: 'Web Browser',
            description: 'Your custom rhythm pattern',
            pattern: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Kick
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Snare
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Closed HH
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Open HH
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Clap
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Perc
            ]
        };
    }

    renderDrumGrid() {
        const gridContainer = document.getElementById('customDrumGrid');
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
                cell.className = 'drum-cell editable';
                cell.dataset.row = rowIndex;
                cell.dataset.step = step;

                const hit = this.customPattern.pattern[rowIndex][step];
                if (hit === 1) {
                    cell.classList.add('active');
                } else if (hit === 2) {
                    cell.classList.add('active', 'accent');
                }

                // Click to toggle
                cell.addEventListener('click', () => {
                    this.toggleCell(rowIndex, step);
                });

                gridContainer.appendChild(cell);
            }
        });
    }

    toggleCell(row, step) {
        const currentValue = this.customPattern.pattern[row][step];
        // Cycle: 0 -> 1 -> 2 -> 0
        const newValue = currentValue === 0 ? 1 : (currentValue === 1 ? 2 : 0);
        this.customPattern.pattern[row][step] = newValue;

        // Update visual
        const cell = document.querySelector(`#customDrumGrid [data-row="${row}"][data-step="${step}"]`);
        cell.classList.remove('active', 'accent');

        if (newValue === 1) {
            cell.classList.add('active');
        } else if (newValue === 2) {
            cell.classList.add('active', 'accent');
        }
    }

    // Preset patterns
    loadPreset(presetName) {
        if (presetName === 'clear') {
            this.customPattern = this.createEmptyPattern();
        } else if (presetName === 'fourOnFloor') {
            this.customPattern.pattern = [
                [2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0], // Kick
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Closed HH
                [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0], // Open HH
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Clap
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Perc
            ];
        } else if (presetName === 'minimal') {
            this.customPattern.pattern = [
                [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Kick
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Snare
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // Closed HH
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // Open HH
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Clap
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]  // Perc
            ];
        } else if (presetName === 'breakbeat') {
            this.customPattern.pattern = [
                [2, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], // Kick
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0], // Snare
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Closed HH
                [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Open HH
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Clap
                [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0]  // Perc
            ];
        }

        this.renderDrumGrid();
    }

    setupPresets() {
        const presetBtns = document.querySelectorAll('.preset-btn');
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.dataset.preset;
                this.loadPreset(preset);
            });
        });
    }

    setupAccentTypeSelector() {
        const accentTypeBtns = document.querySelectorAll('.accent-type-btn-small');
        accentTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const drumIndex = parseInt(btn.dataset.drum);
                const accentType = btn.dataset.type;

                // Update active button for this drum only
                const drumButtons = document.querySelectorAll(`[data-drum="${drumIndex}"]`);
                drumButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Set accent type for this drum
                this.drumAccentTypes[drumIndex] = accentType;

                // Update audio engine
                drumSynth.drumAccentTypes = this.drumAccentTypes;

                // Restart playback if playing
                if (this.isPlaying) {
                    this.stop();
                    this.play();
                }
            });
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
            const hit = this.customPattern.pattern[rowIndex][currentStep];
            if (hit > 0) {
                const cell = document.querySelector(`#customDrumGrid [data-row="${rowIndex}"][data-step="${currentStep}"]`);
                if (cell) {
                    cell.classList.add('playing');
                }
            }
        });
    }

    play() {
        if (this.isPlaying) {
            this.stop();
        } else {
            // Set per-drum accent types on drum synth
            drumSynth.drumAccentTypes = this.drumAccentTypes;

            drumSynth.play(this.customPattern, this.currentBPM);
            this.isPlaying = true;

            // Update UI
            const playBtn = document.getElementById('playBtn');
            playBtn.classList.add('playing');
            playBtn.querySelector('.play-icon').style.display = 'none';
            playBtn.querySelector('.pause-icon').style.display = 'inline';

            // Start visual updates
            this.visualUpdateInterval = setInterval(() => {
                this.updateGridVisualization();
            }, 20);
        }
    }

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

    downloadMIDI(separateAccents = false) {
        const filename = `custom_pattern_${this.currentBPM}bpm${separateAccents ? '_accents' : ''}.mid`;
        midiGenerator.downloadMIDI(this.customPattern, filename, separateAccents);

        // Visual feedback
        const btnId = separateAccents ? 'downloadMidiAccentsBtn' : 'downloadMidiBtn';
        const btn = document.getElementById(btnId);
        const originalText = btn.textContent;
        btn.textContent = '✓ Downloaded!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }

    copyPattern() {
        const accentTypeLabels = {
            'velocity': '🔊 Velocity',
            'layer': '🎚️ Layer',
            'pitch': '🎵 Pitch'
        };

        const info = `
Custom Techno Pattern
---------------------

Created with Techno Rhythm Library
BPM: ${this.currentBPM}

Accent Types Per Drum:
  Kick:       ${accentTypeLabels[this.drumAccentTypes[0]]}
  Snare:      ${accentTypeLabels[this.drumAccentTypes[1]]}
  Closed HH:  ${accentTypeLabels[this.drumAccentTypes[2]]}
  Open HH:    ${accentTypeLabels[this.drumAccentTypes[3]]}
  Clap:       ${accentTypeLabels[this.drumAccentTypes[4]]}
  Perc:       ${accentTypeLabels[this.drumAccentTypes[5]]}

Pattern Grid:
${DRUM_INSTRUMENTS.map((inst, i) => {
    const pattern = this.customPattern.pattern[i].map(hit => {
        if (hit === 2) return '▓'; // Accent
        if (hit === 1) return '█'; // Normal hit
        return '·'; // Empty
    }).join(' ');
    return `${inst.name.padEnd(12)} | ${pattern}`;
}).join('\n')}

Legend: · = empty, █ = normal hit, ▓ = accented hit
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

            if (this.isPlaying) {
                this.stop();
                this.play();
            }
        });

        // Download buttons
        document.getElementById('downloadMidiBtn').addEventListener('click', () => {
            this.downloadMIDI(false);
        });

        document.getElementById('downloadMidiAccentsBtn').addEventListener('click', () => {
            this.downloadMIDI(true);
        });

        // Copy button
        document.getElementById('copyPatternBtn').addEventListener('click', () => {
            this.copyPattern();
        });
    }
}

// Initialize editor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const editor = new CustomRhythmEditor();
    editor.init();
});
