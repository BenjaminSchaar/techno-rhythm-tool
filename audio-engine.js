// Web Audio API Drum Synth Engine
// Synthesizes 909-style drum sounds in the browser

class DrumSynth {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.currentStep = 0;
        this.intervalId = null;
        this.bpm = 128;
        this.currentPattern = null;
        this.accentType = 'velocity'; // Global accent type (for main page)
        // Per-drum accent types (for custom editor)
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
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // Synthesize TR-909 style Kick Drum
    playKick(time, velocity = 1, isAccent = false, drumIndex = 0) {
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gainenv = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        const accentType = this.drumAccentTypes[drumIndex] || 'velocity';

        osc.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, time);
        filter.Q.setValueAtTime(1, time);

        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.05);

        gainenv.gain.setValueAtTime(velocity, time);
        gainenv.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

        osc.connect(filter);
        filter.connect(gainenv);
        gainenv.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.5);

        // Add accent layer if enabled and is accent
        if (isAccent && accentType === 'layer') {
            this.playKickAccentLayer(time, velocity * 0.7);
        }
    }

    // Kick accent layer - actual kick sound through highpass
    playKickAccentLayer(time, velocity) {
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gainenv = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';

        // Highpass filter for "click" attack
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(800, time);  // Cut low end
        filter.Q.setValueAtTime(2, time);

        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.05);

        gainenv.gain.setValueAtTime(velocity, time);
        gainenv.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

        osc.connect(filter);
        filter.connect(gainenv);
        gainenv.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.3);
    }

    // Synthesize TR-909 style Snare
    playSnare(time, velocity = 1, isAccent = false, drumIndex = 1) {
        const ctx = this.audioContext;

        const accentType = this.drumAccentTypes[drumIndex] || 'velocity';

        // Pitch shift for accents if enabled
        const pitchMultiplier = (isAccent && accentType === 'pitch') ? 1.05 : 1.0;

        // Tone component
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180 * pitchMultiplier, time);

        oscGain.gain.setValueAtTime(velocity * 0.5, time);
        oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);

        // Noise component
        const noise = ctx.createBufferSource();
        const noiseFilter = ctx.createBiquadFilter();
        const noiseGain = ctx.createGain();

        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = buffer;

        noiseFilter.type = 'highpass';
        noiseFilter.frequency.setValueAtTime(1000, time);

        noiseGain.gain.setValueAtTime(velocity, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.2);
        noise.start(time);
        noise.stop(time + 0.2);

        // Add accent layer if enabled
        if (isAccent && accentType === 'layer') {
            this.playSnareAccentLayer(time, velocity * 0.6);
        }
    }

    // Snare accent layer - actual snare sound through highpass
    playSnareAccentLayer(time, velocity) {
        const ctx = this.audioContext;

        // Highpass filtered noise for snap/crack
        const noise = ctx.createBufferSource();
        const noiseFilter = ctx.createBiquadFilter();
        const noiseGain = ctx.createGain();

        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = buffer;

        // Highpass for crispy top end
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.setValueAtTime(3000, time);
        noiseFilter.Q.setValueAtTime(2, time);

        noiseGain.gain.setValueAtTime(velocity, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(time);
        noise.stop(time + 0.15);
    }

    // Synthesize TR-909 style Closed Hi-Hat
    playClosedHH(time, velocity = 1, isAccent = false, drumIndex = 2) {
        const ctx = this.audioContext;
        const fundamental = 40;
        const ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

        const accentType = this.drumAccentTypes[drumIndex] || 'velocity';

        // Pitch shift for accents
        const pitchMultiplier = (isAccent && accentType === 'pitch') ? 1.05 : 1.0;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(velocity * 0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

        ratios.forEach(ratio => {
            const osc = ctx.createOscillator();
            osc.type = 'square';
            osc.frequency.setValueAtTime(fundamental * ratio * pitchMultiplier, time);
            osc.connect(gain);
            osc.start(time);
            osc.stop(time + 0.05);
        });

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(7000, time);

        gain.connect(filter);
        filter.connect(ctx.destination);

        // Add layer accent
        if (isAccent && accentType === 'layer') {
            this.playHiHatAccentLayer(time, velocity * 0.5, true); // true = closed
        }
    }

    // Synthesize TR-909 style Open Hi-Hat
    playOpenHH(time, velocity = 1, isAccent = false, drumIndex = 3) {
        const ctx = this.audioContext;
        const fundamental = 40;
        const ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

        const accentType = this.drumAccentTypes[drumIndex] || 'velocity';

        // Pitch shift for accents
        const pitchMultiplier = (isAccent && accentType === 'pitch') ? 1.05 : 1.0;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(velocity * 0.4, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

        ratios.forEach(ratio => {
            const osc = ctx.createOscillator();
            osc.type = 'square';
            osc.frequency.setValueAtTime(fundamental * ratio * pitchMultiplier, time);
            osc.connect(gain);
            osc.start(time);
            osc.stop(time + 0.3);
        });

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(7000, time);

        gain.connect(filter);
        filter.connect(ctx.destination);

        // Add layer accent
        if (isAccent && accentType === 'layer') {
            this.playHiHatAccentLayer(time, velocity * 0.6, false); // false = open
        }
    }

    // Hi-Hat accent layer - actual hi-hat sound through highpass
    playHiHatAccentLayer(time, velocity, isClosed) {
        const ctx = this.audioContext;
        const fundamental = 40;
        const ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

        const gain = ctx.createGain();
        const duration = isClosed ? 0.04 : 0.15;

        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

        ratios.forEach(ratio => {
            const osc = ctx.createOscillator();
            osc.type = 'square';
            osc.frequency.setValueAtTime(fundamental * ratio, time);
            osc.connect(gain);
            osc.start(time);
            osc.stop(time + duration);
        });

        // Even higher highpass for extra sizzle
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(10000, time);
        filter.Q.setValueAtTime(2, time);

        gain.connect(filter);
        filter.connect(ctx.destination);
    }

    // Synthesize Clap
    playClap(time, velocity = 1, isAccent = false, drumIndex = 4) {
        const ctx = this.audioContext;

        const accentType = this.drumAccentTypes[drumIndex] || 'velocity';

        // Pitch shift for accents (works great on claps!)
        const pitchMultiplier = (isAccent && accentType === 'pitch') ? 1.05 : 1.0;

        // Multiple short bursts of noise
        for (let i = 0; i < 3; i++) {
            const noise = ctx.createBufferSource();
            const noiseFilter = ctx.createBiquadFilter();
            const noiseGain = ctx.createGain();

            const bufferSize = ctx.sampleRate * 0.03;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let j = 0; j < bufferSize; j++) {
                data[j] = Math.random() * 2 - 1;
            }
            noise.buffer = buffer;

            noiseFilter.type = 'bandpass';
            noiseFilter.frequency.setValueAtTime(1200 * pitchMultiplier, time);
            noiseFilter.Q.setValueAtTime(1, time);

            noiseGain.gain.setValueAtTime(velocity * 0.6, time + i * 0.015);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, time + i * 0.015 + 0.05);

            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(ctx.destination);

            noise.start(time + i * 0.015);
            noise.stop(time + i * 0.015 + 0.05);
        }

        // Add layer accent
        if (isAccent && accentType === 'layer') {
            this.playClapAccentLayer(time, velocity * 0.7);
        }
    }

    // Clap accent layer - highpass filtered clap sound
    playClapAccentLayer(time, velocity) {
        const ctx = this.audioContext;

        // Single sharp burst for accent
        const noise = ctx.createBufferSource();
        const noiseFilter = ctx.createBiquadFilter();
        const noiseGain = ctx.createGain();

        const bufferSize = ctx.sampleRate * 0.02;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = buffer;

        // Highpass for crispy clap attack
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.setValueAtTime(4000, time);
        noiseFilter.Q.setValueAtTime(3, time);

        noiseGain.gain.setValueAtTime(velocity, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.04);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(time);
        noise.stop(time + 0.04);
    }

    // Synthesize Percussion/Shaker
    playPerc(time, velocity = 1, isAccent = false, drumIndex = 5) {
        const ctx = this.audioContext;
        const noise = ctx.createBufferSource();
        const noiseFilter = ctx.createBiquadFilter();
        const noiseGain = ctx.createGain();

        const accentType = this.drumAccentTypes[drumIndex] || 'velocity';

        // Pitch shift for accents
        const pitchMultiplier = (isAccent && accentType === 'pitch') ? 1.05 : 1.0;

        const bufferSize = ctx.sampleRate * 0.04;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = buffer;

        noiseFilter.type = 'highpass';
        noiseFilter.frequency.setValueAtTime(9000 * pitchMultiplier, time);

        noiseGain.gain.setValueAtTime(velocity * 0.3, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.04);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(time);
        noise.stop(time + 0.04);

        // Add layer accent
        if (isAccent && accentType === 'layer') {
            this.playPercAccentLayer(time, velocity * 0.4);
        }
    }

    // Percussion accent layer - extra bright shaker sound
    playPercAccentLayer(time, velocity) {
        const ctx = this.audioContext;
        const noise = ctx.createBufferSource();
        const noiseFilter = ctx.createBiquadFilter();
        const noiseGain = ctx.createGain();

        const bufferSize = ctx.sampleRate * 0.03;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = buffer;

        // Very high highpass for bright accent
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.setValueAtTime(12000, time);
        noiseFilter.Q.setValueAtTime(1.5, time);

        noiseGain.gain.setValueAtTime(velocity, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.03);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noise.start(time);
        noise.stop(time + 0.03);
    }

    // Helper: Accent layer (highpass filtered noise/click)
    playAccentLayer(time, velocity) {
        const ctx = this.audioContext;
        const noise = ctx.createBufferSource();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Short burst of noise
        const bufferSize = ctx.sampleRate * 0.01;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = buffer;

        // Highpass filter for "crack" sound
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(3000, time);
        filter.Q.setValueAtTime(2, time);

        gain.gain.setValueAtTime(velocity, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(time);
        noise.stop(time + 0.05);
    }

    // Play a single step of the pattern
    playStep(step) {
        if (!this.currentPattern) return;

        const time = this.audioContext.currentTime;
        const instruments = [
            this.playKick.bind(this),
            this.playSnare.bind(this),
            this.playClosedHH.bind(this),
            this.playOpenHH.bind(this),
            this.playClap.bind(this),
            this.playPerc.bind(this)
        ];

        this.currentPattern.pattern.forEach((instrument, index) => {
            const hit = instrument[step];
            if (hit > 0) {
                const isAccent = hit === 2;
                let velocity = isAccent ? 1.0 : 0.7;

                // Get accent type for this specific drum
                const drumAccentType = this.drumAccentTypes[index] || 'velocity';

                // Adjust velocity based on accent type
                if (drumAccentType === 'velocity' && isAccent) {
                    velocity = 1.0; // Louder
                } else if (drumAccentType === 'layer' || drumAccentType === 'pitch') {
                    velocity = 0.75; // Same base velocity, layer/pitch adds the accent
                }

                instruments[index](time, velocity, isAccent, index);
            }
        });
    }

    // Start/Stop playback
    play(pattern, bpm) {
        this.init();

        if (this.isPlaying) {
            this.stop();
            return;
        }

        this.currentPattern = pattern;
        this.bpm = bpm;
        this.currentStep = 0;
        this.isPlaying = true;

        const stepDuration = (60 / this.bpm) / 4 * 1000; // 16th note in ms

        this.intervalId = setInterval(() => {
            this.playStep(this.currentStep);
            this.currentStep = (this.currentStep + 1) % 16;
        }, stepDuration);
    }

    stop() {
        this.isPlaying = false;
        this.currentStep = 0;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    getCurrentStep() {
        return this.currentStep;
    }
}

// Create global instance
const drumSynth = new DrumSynth();
