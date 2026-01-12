// MIDI File Generator
// Converts drum patterns to downloadable MIDI files

class MIDIGenerator {
    constructor() {
        this.TICKS_PER_BEAT = 480; // Standard MIDI resolution
        this.STEPS_PER_BAR = 16; // 16th notes
    }

    // Convert pattern to MIDI file
    generateMIDI(pattern, bpm, separateAccents = false) {
        if (separateAccents) {
            return this.generateMIDIWithAccents(pattern, bpm);
        } else {
            const midiData = this.createMIDIData(pattern, bpm, false);
            return this.encodeMIDI(midiData, false);
        }
    }

    // Generate MIDI with separate accent track
    generateMIDIWithAccents(pattern, bpm) {
        const mainTrack = this.createMIDIData(pattern, bpm, false); // Clean (velocity 80)
        const accentTrack = this.createAccentTrackData(pattern, bpm);
        return this.encodeMIDI({ main: mainTrack, accents: accentTrack }, true);
    }

    createMIDIData(pattern, bpm, cleanVelocity = false) {
        const events = [];
        const ticksPerStep = this.TICKS_PER_BEAT / 4; // 16th note

        // Add each drum hit as MIDI note
        pattern.pattern.forEach((instrument, instrumentIndex) => {
            const note = DRUM_INSTRUMENTS[instrumentIndex].note;

            instrument.forEach((hit, stepIndex) => {
                if (hit > 0) {
                    const tick = stepIndex * ticksPerStep;
                    // Clean velocity = all hits at 80, or preserve accents
                    const velocity = cleanVelocity ? 80 : (hit === 2 ? 110 : 80);
                    const duration = ticksPerStep / 2; // Short notes for drums

                    // Note On
                    events.push({
                        tick: tick,
                        type: 'noteOn',
                        note: note,
                        velocity: velocity,
                        channel: 9 // MIDI channel 10 (index 9) for drums
                    });

                    // Note Off
                    events.push({
                        tick: tick + duration,
                        type: 'noteOff',
                        note: note,
                        velocity: 0,
                        channel: 9
                    });
                }
            });
        });

        // Sort events by tick
        events.sort((a, b) => a.tick - b.tick);

        return {
            events: events,
            bpm: bpm,
            timeSignature: [4, 4],
            ticksPerBeat: this.TICKS_PER_BEAT
        };
    }

    // Create separate track with ONLY accent hits (unique note per drum)
    createAccentTrackData(pattern, bpm) {
        const events = [];
        const ticksPerStep = this.TICKS_PER_BEAT / 4; // 16th note

        // Only add hits where pattern value is 2 (accented)
        pattern.pattern.forEach((instrument, instrumentIndex) => {
            const accentNote = DRUM_INSTRUMENTS[instrumentIndex].accentNote; // Unique per drum

            instrument.forEach((hit, stepIndex) => {
                if (hit === 2) { // Only accents
                    const tick = stepIndex * ticksPerStep;
                    const duration = ticksPerStep / 4; // Very short click

                    events.push({
                        tick: tick,
                        type: 'noteOn',
                        note: accentNote,
                        velocity: 100,
                        channel: 9
                    });

                    events.push({
                        tick: tick + duration,
                        type: 'noteOff',
                        note: accentNote,
                        velocity: 0,
                        channel: 9
                    });
                }
            });
        });

        events.sort((a, b) => a.tick - b.tick);

        return {
            events: events,
            bpm: bpm,
            timeSignature: [4, 4],
            ticksPerBeat: this.TICKS_PER_BEAT
        };
    }

    encodeMIDI(midiData, multiTrack = false) {
        if (multiTrack) {
            // Multiple tracks: drums + accents
            const header = this.createMIDIHeader(2);
            const drumsTrack = this.createMIDITrack(midiData.main, 'Drums');
            const accentsTrack = this.createMIDITrack(midiData.accents, 'Accents');
            const midiFile = this.combineChunks([header, drumsTrack, accentsTrack]);
            return new Blob([midiFile], { type: 'audio/midi' });
        } else {
            // Single track
            const header = this.createMIDIHeader(1);
            const track = this.createMIDITrack(midiData, 'Techno Drums');
            const midiFile = this.combineChunks([header, track]);
            return new Blob([midiFile], { type: 'audio/midi' });
        }
    }

    createMIDIHeader(numTracks = 1) {
        // MThd chunk
        const header = new Uint8Array(14);
        const view = new DataView(header.buffer);

        // "MThd"
        header[0] = 0x4D; // M
        header[1] = 0x54; // T
        header[2] = 0x68; // h
        header[3] = 0x64; // d

        // Header length (always 6)
        view.setUint32(4, 6);

        // Format type (1 = multiple tracks, synchronous)
        view.setUint16(8, 1);

        // Number of tracks
        view.setUint16(10, numTracks);

        // Ticks per quarter note
        view.setUint16(12, this.TICKS_PER_BEAT);

        return header;
    }

    createMIDITrack(midiData, trackName = 'Techno Drums') {
        const trackEvents = [];

        // Track name
        trackEvents.push(...this.metaEvent(0, 0x03, this.stringToBytes(trackName)));

        // Tempo
        const microsecondsPerBeat = Math.floor(60000000 / midiData.bpm);
        const tempoBytes = [
            (microsecondsPerBeat >> 16) & 0xFF,
            (microsecondsPerBeat >> 8) & 0xFF,
            microsecondsPerBeat & 0xFF
        ];
        trackEvents.push(...this.metaEvent(0, 0x51, tempoBytes));

        // Time signature
        trackEvents.push(...this.metaEvent(0, 0x58, [4, 2, 24, 8])); // 4/4 time

        // Convert events to MIDI format
        let lastTick = 0;
        midiData.events.forEach(event => {
            const delta = event.tick - lastTick;
            lastTick = event.tick;

            if (event.type === 'noteOn') {
                trackEvents.push(...this.variableLengthQuantity(delta));
                trackEvents.push(0x90 | event.channel); // Note On, channel 10
                trackEvents.push(event.note);
                trackEvents.push(event.velocity);
            } else if (event.type === 'noteOff') {
                trackEvents.push(...this.variableLengthQuantity(delta));
                trackEvents.push(0x80 | event.channel); // Note Off, channel 10
                trackEvents.push(event.note);
                trackEvents.push(0);
            }
        });

        // End of track
        trackEvents.push(...this.variableLengthQuantity(0));
        trackEvents.push(0xFF, 0x2F, 0x00);

        // Create MTrk chunk
        const track = new Uint8Array(8 + trackEvents.length);
        const view = new DataView(track.buffer);

        // "MTrk"
        track[0] = 0x4D; // M
        track[1] = 0x54; // T
        track[2] = 0x72; // r
        track[3] = 0x6B; // k

        // Track length
        view.setUint32(4, trackEvents.length);

        // Track data
        track.set(trackEvents, 8);

        return track;
    }

    metaEvent(delta, type, data) {
        const bytes = [...this.variableLengthQuantity(delta), 0xFF, type, data.length, ...data];
        return bytes;
    }

    variableLengthQuantity(value) {
        // Encode number as variable-length quantity (MIDI format)
        const bytes = [];
        bytes.push(value & 0x7F);
        value >>= 7;

        while (value > 0) {
            bytes.unshift((value & 0x7F) | 0x80);
            value >>= 7;
        }

        return bytes;
    }

    stringToBytes(str) {
        return Array.from(str).map(c => c.charCodeAt(0));
    }

    combineChunks(chunks) {
        const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
        const combined = new Uint8Array(totalLength);

        let offset = 0;
        chunks.forEach(chunk => {
            combined.set(chunk, offset);
            offset += chunk.length;
        });

        return combined;
    }

    downloadMIDI(pattern, filename, separateAccents = false) {
        const midiBlob = this.generateMIDI(pattern, pattern.bpm, separateAccents);
        const url = URL.createObjectURL(midiBlob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `${pattern.id}${separateAccents ? '_with_accents' : ''}.mid`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Create global instance
const midiGenerator = new MIDIGenerator();
