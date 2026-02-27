# Audio Assets for Interactive Portfolio

This document outlines the audio requirements and structure for the interactive portfolio game.

## Audio Files Required

The portfolio requires the following audio files to be placed in an `audio/` directory:

### Background Music
- **File**: `music.mp3`
- **Description**: 8-bit style background music for the game
- **Duration**: Looping, approximately 30-60 seconds
- **Volume**: Low background level (0.3)

### Sound Effects
- **File**: `jump.mp3`
- **Description**: Jump sound effect when player jumps
- **Duration**: Short (0.2-0.5 seconds)
- **Volume**: Medium (0.5)

- **File**: `coin.mp3`
- **Description**: Coin collection sound effect
- **Duration**: Short chime (0.3-0.5 seconds)
- **Volume**: Medium-high (0.7)

- **File**: `block.mp3`
- **Description**: Block hit sound effect when question blocks are activated
- **Duration**: Short impact sound (0.2-0.4 seconds)
- **Volume**: Medium (0.5)

## Audio Implementation

The audio is implemented in `game.js` with the following features:

### Audio Controls
- Music toggle switch in the start screen
- Volume controls for all audio elements
- Audio preloading for immediate playback
- Error handling for browsers that block autoplay

### Audio Elements
```javascript
const elements = {
    bgMusic: document.getElementById('bg-music'),
    jumpSound: document.getElementById('jump-sound'),
    coinSound: document.getElementById('coin-sound'),
    blockSound: document.getElementById('block-sound')
};
```

### Audio Functions
- `playSound(sound)` - Plays a sound effect with proper timing
- `toggleMusic()` - Toggles background music on/off
- Volume controls and audio element setup

## Audio File Recommendations

### Free Audio Resources
1. **Freesound.org** - Free sound effects and music
2. **ZapSplat.com** - Free sound effects with attribution
3. **Incompetech.com** - Free royalty-free music by Kevin MacLeod
4. **Bensound.com** - Free music with attribution required

### Audio Specifications
- **Format**: MP3 (for broad browser compatibility)
- **Sample Rate**: 44.1kHz
- **Bitrate**: 128kbps minimum
- **File Size**: Keep under 1MB per file for fast loading

### Creating Your Own Audio
If you want to create custom audio:

1. **Background Music**: Use a simple 8-bit/chiptune style
2. **Jump Sound**: Short "boing" or "whoosh" sound
3. **Coin Sound**: High-pitched "ding" or "chime"
4. **Block Sound**: Low "thud" or "impact" sound

## Audio Directory Structure

```
assets/
└── audio/
    ├── music.mp3      # Background music
    ├── jump.mp3       # Jump sound effect
    ├── coin.mp3       # Coin collection sound
    └── block.mp3      # Block hit sound effect
```

## Audio Fallbacks

If audio files are not available:

1. The game will still function without sound
2. Audio elements will fail silently
3. Music toggle will be disabled
4. Sound effects will not play

## Browser Audio Policies

Modern browsers have strict autoplay policies:

1. **User Interaction Required**: Audio must be triggered by user action
2. **Muted Autoplay**: Video/audio can autoplay if muted
3. **Permission-Based**: Some browsers require explicit permission

Our implementation handles these by:
- Only playing audio after user interaction (start button)
- Using proper error handling for autoplay failures
- Providing fallback behavior when audio is blocked

## Testing Audio

To test audio functionality:

1. Open the portfolio in a browser
2. Click "Press Start" to begin the game
3. Toggle music on/off to test controls
4. Jump, collect coins, and hit blocks to test sound effects
5. Test on different browsers and devices

## Accessibility Considerations

1. **Volume Controls**: Users can adjust or mute audio
2. **Visual Feedback**: All audio has corresponding visual effects
3. **Reduced Motion**: Audio respects user preferences
4. **Screen Readers**: Audio doesn't interfere with accessibility tools