# 🎛️ Techno Rhythm Library

An interactive, educational web tool for learning and downloading professional techno drum patterns. Features 12+ rhythm patterns across classic techno, minimal, hard techno, hypnotic, and groove styles.

## ✨ Features

- **12+ Professional Patterns**: Classic 909, Detroit Techno, Hard Berlin, Minimal, Hypnotic, Groove, and more
- **Visual Drum Grid**: See exactly which drums hit on which beats
- **Accent Highlighting**: Accented beats are clearly marked in yellow
- **Interactive Playback**: Hear patterns with synthesized TR-909 style drums
- **Adjustable BPM**: Change tempo from 80-160 BPM
- **MIDI Download**: Export patterns as MIDI files for your DAW
- **Educational**: Each pattern includes history, origin, and production tips
- **100% Free**: No login, no subscription, no BS

## 🚀 How to Use

### Local Testing

1. Simply open `index.html` in a web browser
2. No server needed - it's all client-side!
3. Select a pattern, hit play, adjust BPM, download MIDI

### Deployment Options

#### Option 1: GitHub Pages (FREE - Recommended)

1. Create a GitHub repository
2. Upload all files to the repo
3. Go to Settings → Pages
4. Select "Deploy from main branch"
5. Your site will be live at `https://yourusername.github.io/repo-name/`

#### Option 2: Netlify (FREE)

1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop the `techno-rhythm-tool` folder
3. Site is live instantly with a free URL
4. Optional: Add custom domain

#### Option 3: Vercel (FREE)

1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repo or upload files
3. Auto-deploys on every update
4. Fast CDN, great performance

## 💰 Monetization Setup

### Google AdSense

1. Apply for [Google AdSense](https://www.google.com/adsense/)
2. Get approved (requires some traffic)
3. Replace the ad placeholder in `index.html` (line ~168) with your AdSense code:

```html
<div class="ad-container">
    <!-- Replace this with your AdSense ad unit -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"
         crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXX"
         data-ad-slot="XXXXXXXXXX"
         data-ad-format="auto"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
```

### Donation Buttons

Update the Ko-fi and PayPal links in `index.html` (lines ~154-161):

```html
<a href="https://ko-fi.com/YOURUSERNAME" target="_blank" class="support-btn kofi">
    ☕ Buy Me a Coffee
</a>
<a href="https://paypal.me/YOURUSERNAME" target="_blank" class="support-btn paypal">
    💝 Donate via PayPal
</a>
```

## 📊 Expected Revenue

**Realistic projections:**

- **Month 1-3**: $0-50 (building traffic)
- **Month 4-6**: $50-200 (if you get 5k-10k visitors/month)
- **Month 6-12**: $200-1000 (with good SEO and sharing)

**Revenue sources:**
- AdSense: ~$2-5 per 1000 visitors
- Donations: ~1-2% of users might donate $3-10

## 🎯 Marketing Tips

### Free Traffic Sources

1. **Reddit**
   - r/TechnoProduction
   - r/edmproduction
   - r/WeAreTheMusicMakers
   - Share as "free educational tool I made"

2. **Facebook Groups**
   - Techno Production groups
   - Ableton/FL Studio groups
   - Music producer communities

3. **Discord**
   - Music production servers
   - Techno/electronic music servers

4. **YouTube Comments**
   - Comment on techno production tutorials
   - Link to your tool when relevant

5. **Twitter/X**
   - Tweet with hashtags: #TechnoProduction #MusicProduction #909
   - Tag techno producers and educators

6. **Instagram**
   - Post screenshots of patterns
   - Use music production hashtags

### SEO Optimization

Add this to `<head>` in `index.html`:

```html
<meta name="keywords" content="techno drum patterns, TR-909 patterns, free MIDI drums, techno production, electronic music, drum programming, Roland 909, techno tutorial">
<meta property="og:title" content="Free Techno Drum Pattern Library - Download MIDI Patterns">
<meta property="og:description" content="Learn and download professional techno drum patterns. Classic 909, minimal, hard techno, and more. Free MIDI export.">
<meta property="og:image" content="https://yoursite.com/preview-image.png">
```

## 🛠️ Customization

### Add More Patterns

Edit `patterns.js` and add new patterns following this format:

```javascript
{
    id: 'your-pattern-id',
    name: 'Pattern Name',
    category: 'classic', // or minimal, hard, hypnotic, groove
    bpm: 128,
    origin: 'Where it comes from',
    machine: 'Drum machine name',
    description: 'Educational description...',
    pattern: [
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Kick
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare
        // ... more instruments
    ]
}
```

**Pattern values:**
- `0` = no hit
- `1` = normal hit
- `2` = accented hit (louder, highlighted in yellow)

### Change Colors

Edit `style.css` variables at the top:

```css
:root {
    --primary-color: #00ff88;     /* Main accent color */
    --secondary-color: #ff0066;   /* Secondary accent */
    --accent-color: #ffcc00;      /* Accent highlight color */
    /* ... */
}
```

## 📁 File Structure

```
techno-rhythm-tool/
├── index.html          # Main HTML file
├── style.css           # Styling
├── patterns.js         # Rhythm pattern library
├── midi-generator.js   # MIDI file creation
├── audio-engine.js     # Web Audio synthesis
├── app.js              # Main application logic
└── README.md           # This file
```

## 🎵 Pattern Details

### Current Patterns

1. **Classic 909 Four-on-the-Floor** - The foundation of techno
2. **Detroit Techno Classic** - Juan Atkins, Derrick May style
3. **Classic with Clap** - Berlin techno energy
4. **Minimal Techno Foundation** - Stripped down essentials
5. **Minimal Groove Pattern** - Richie Hawtin influence
6. **Hard Techno Berlin Style** - Berghain intensity
7. **Industrial Hard Techno** - Modern hard techno
8. **Hypnotic Loop Pattern** - Ricardo Villalobos style
9. **Deep Hypnotic Techno** - Dub techno meditation
10. **Groove Techno with Shuffle** - House influence
11. **Funky Groove Techno** - French Touch meets techno
12. **Acid Techno Pattern** - Built for TB-303
13. **Broken Beat Techno** - UK techno breakbeat

## 🔧 Technical Details

- **No Dependencies**: Pure vanilla JavaScript, HTML, CSS
- **Web Audio API**: All drum sounds synthesized in browser
- **MIDI Generation**: Custom MIDI file encoder
- **Mobile Responsive**: Works on phones and tablets
- **Browser Support**: Chrome, Firefox, Safari, Edge (modern versions)

## 📈 Analytics Setup

Add Google Analytics to track visitors:

1. Create account at [Google Analytics](https://analytics.google.com/)
2. Add this before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🤝 Contributing

Want to add more patterns or improve the tool?

1. Fork the repo
2. Add your patterns/features
3. Submit a pull request

## 📝 License

Free to use, modify, and distribute. Credit appreciated but not required.

## 🎓 Educational Resources

### Learn More About Techno Production

- [Attack Magazine - Beat Dissected](https://www.attackmagazine.com/technique/beat-dissected/)
- [EDMProd - Drums Guide](https://www.edmprod.com/drums-guide/)
- [Studio Brootle - Techno Patterns](https://www.studiobrootle.com/techno-drum-patterns-and-drum-programming-tips/)

### Recommended DAWs

- Ableton Live (most popular for techno)
- FL Studio
- Bitwig Studio
- Logic Pro
- Reaper (free/affordable)

## 💬 Support

Found a bug? Have a feature request?

- Open an issue on GitHub
- Or contact: [your email]

---

**Made with ❤️ for the techno community**

*Drum patterns inspired by Roland TR-909, TR-808 & legendary producers*
