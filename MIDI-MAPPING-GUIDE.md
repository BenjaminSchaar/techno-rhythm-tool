# 🎹 MIDI Note Mapping Guide

## Complete MIDI Note Reference for Accent Track

When you download **"MIDI with Accent Track"**, you get TWO tracks with specific MIDI note assignments:

---

## 📊 **MIDI Note Table**

| Drum | Main Track Note | Accent Track Note | GM Drum Name |
|------|----------------|-------------------|--------------|
| **Kick** | 36 | 35 | Acoustic Bass Drum |
| **Snare** | 38 | 40 | Electric Snare |
| **Closed Hi-Hat** | 42 | 44 | Pedal Hi-Hat |
| **Open Hi-Hat** | 46 | 49 | Crash Cymbal 1 |
| **Clap** | 39 | 82 | Shaker |
| **Perc/Shaker** | 60 | 54 | Tambourine |

---

## 🎛️ **How This Works in Your DAW**

### **Track 1: Main Drums**
Contains ALL drum hits (normal + accented) at **equal velocity (80)**

**MIDI Notes used:**
- 36 = Kick (every kick hit, accented or not)
- 38 = Snare
- 42 = Closed Hi-Hat
- 46 = Open Hi-Hat
- 39 = Clap
- 60 = Perc/Shaker

**Route to:** Your standard drum samples (909, 808, acoustic, etc.)

---

### **Track 2: Accent Track**
Contains ONLY accented hits using **different MIDI notes**

**MIDI Notes used:**
- 35 = Kick accents only
- 40 = Snare accents only
- 44 = Closed Hi-Hat accents only
- 49 = Open Hi-Hat accents only
- 82 = Clap accents only
- 54 = Perc accents only

**Route to:** Custom accent samples or effects

---

## 💡 **Why Different Notes?**

Each drum's accents get unique MIDI notes so you can:

1. **Map to different samples**
   - Main kick (36) → Deep 909 kick
   - Kick accent (35) → Tight, punchy kick sample

2. **Apply different effects**
   - Main drums → Clean
   - Accent track → Compression, distortion, saturation

3. **Create polyrhythmic layers**
   - Main track → Steady groove
   - Accent track → Percussion elements (cowbells, shakers, crashes)

4. **Automate parameters**
   - Use accent hits to trigger filter sweeps
   - Control reverb sends
   - Modulate synth parameters

---

## 🎹 **DAW Setup Examples**

### **Ableton Live Example:**

```
1. Drag both MIDI files into arrangement

Track 1 - "Main Drums":
   - Instrument: Drum Rack with 909 samples
   - MIDI notes 36, 38, 42, 46, 39, 60 mapped to standard sounds

Track 2 - "Accent Track":
   - Instrument: Drum Rack with accent samples
   - Note 35 → Compressed tight kick
   - Note 40 → Rimshot or electric snare
   - Note 44 → Ride cymbal (adds energy)
   - Note 49 → Crash cymbal
   - Note 82 → Shaker or maraca
   - Note 54 → Tambourine or cowbell
```

### **FL Studio Example:**

```
Track 1 - "Main Drums":
   - Send to FPC or Battery
   - Load standard 909 kit
   - Notes map automatically

Track 2 - "Accents":
   - Send to separate FPC
   - Pad 1 (Note 35) → Punchy kick layer
   - Pad 2 (Note 40) → Clap or snap
   - Pad 3 (Note 44) → Hi-hat variation
   - Pad 4 (Note 49) → Crash
   - Add compression/saturation on mixer channel
```

### **Logic Pro Example:**

```
Track 1 - "Main Drums":
   - Ultrabeat or Drum Kit Designer
   - Standard 909 mapping

Track 2 - "Accent Layers":
   - Separate Drum Machine Designer
   - Customize each accent note
   - Route through Compressor → Distortion
```

---

## 🔥 **Creative Routing Ideas**

### **1. Parallel Compression on Accents**
```
Main Track → Clean
Accent Track → Heavy compression + drive
Result: Punchy accents, clean groove
```

### **2. Different Reverb**
```
Main Track → Short room reverb
Accent Track → Long plate reverb
Result: Accents create space and depth
```

### **3. Sidechain from Accents**
```
Accent Track (Kick note 35) → Sidechain to bass
Result: Bass ducks only on accented kicks, not all kicks
```

### **4. Polyrhythmic Percussion**
```
Main Track → Drums
Accent Track → Map to:
  - Note 35 → Cowbell
  - Note 40 → Tambourine
  - Note 44 → Wood block
Result: Percussion layer that plays polyrhythmic pattern
```

### **5. Filter Automation**
```
Accent Track → Trigger automation
Each accent hit modulates:
  - Synth filter cutoff
  - Effect send amount
  - Delay feedback
Result: Dynamic movement synced to accents
```

---

## 📖 **General MIDI Drum Map Reference**

For context, here's where our notes fit in the GM standard:

| MIDI Note | GM Drum Name | Our Usage |
|-----------|--------------|-----------|
| 35 | Acoustic Bass Drum | **Kick Accent** ✨ |
| 36 | Bass Drum 1 | **Main Kick** |
| 38 | Acoustic Snare | **Main Snare** |
| 39 | Hand Clap | **Main Clap** |
| 40 | Electric Snare | **Snare Accent** ✨ |
| 42 | Closed Hi-Hat | **Main Closed HH** |
| 44 | Pedal Hi-Hat | **Closed HH Accent** ✨ |
| 46 | Open Hi-Hat | **Main Open HH** |
| 49 | Crash Cymbal 1 | **Open HH Accent** ✨ |
| 54 | Tambourine | **Perc Accent** ✨ |
| 60 | Hi Bongo | **Main Perc** |
| 82 | Shaker | **Clap Accent** ✨ |

✨ = Accent track notes (only play on accented beats)

---

## 🎯 **Quick Workflow Tips**

### **Beginner Workflow:**
1. Import both MIDI files
2. Main track → Load your drum kit
3. Accent track → Same drum kit, different samples
4. Done!

### **Intermediate Workflow:**
1. Import both tracks
2. Main → Standard 909 samples
3. Accents → Compressed/distorted versions
4. Add sidechain compression
5. Experiment with reverb sends

### **Advanced Workflow:**
1. Import both tracks
2. Main → Your drum samples
3. Accents → Creative mapping:
   - Kicks → Synth stabs
   - Snares → Vocal chops
   - Hats → FX hits
4. Route to effects chains
5. Automate based on accent hits
6. Create movement and evolution

---

## 🔊 **Audio Layer Accents**

When you use **"Layer" accent type** in the Custom Rhythm Editor:

Each drum plays **TWO sounds simultaneously on accents:**

1. **Original drum sound** (normal)
2. **Highpass-filtered version** (adds attack/presence)

**Technical details:**

| Drum | Main Sound | Layer Accent |
|------|------------|--------------|
| **Kick** | Full kick (20-150 Hz) | Highpass @ 800 Hz (click/attack) |
| **Snare** | Full snare | Highpass @ 3000 Hz (snap/crack) |
| **Hi-Hats** | Full hat | Highpass @ 10000 Hz (extra sizzle) |
| **Clap** | Full clap | Highpass @ 4000 Hz (crispy attack) |
| **Perc** | Full shaker | Highpass @ 12000 Hz (bright accent) |

This is how **real producers layer accents** - adding presence without changing the tone too much!

---

## 🎓 **Why This System?**

### **Traditional TR-909:**
- One accent button for ALL drums
- All accents = same MIDI note
- Limited control in DAW

### **Our System:**
- Unique note per drum type
- Full control in DAW
- Map to any sample
- Creative routing possible
- Professional workflow

---

## 💾 **File Naming Convention**

When you download, you'll get:

```
Clean MIDI:
pattern-name_128bpm.mid

With Accent Track:
pattern-name_128bpm_accents.mid
```

The accent version contains both tracks in one MIDI file.

---

## 🚀 **Next Steps**

1. **Download** a pattern with accent track
2. **Import** into your DAW
3. **Experiment** with different samples on accent notes
4. **Share** your creations!

---

## ❓ **FAQ**

**Q: Can I change the MIDI notes?**
A: Yes! In your DAW, use MIDI transpose or remap notes to whatever you want.

**Q: Why these specific notes?**
A: They align with General MIDI drum map and are intuitive (35 is near 36, 40 near 38, etc.)

**Q: Can I use only the accent track?**
A: Yes! Use it as a percussion layer, trigger track, or automation source.

**Q: What if I want all accents on the same note?**
A: In your DAW, transpose all accent notes to a single note (like 37).

**Q: Can I layer more than 2 sounds?**
A: Absolutely! Duplicate the accent track and map to different samples for 3+ layers.

---

**Made with ❤️ for the techno community**

*Now go make some bangers!* 🎛️🔥
