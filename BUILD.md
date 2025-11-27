# Desktop Application Build Guide

This portfolio can be packaged as a desktop application for Windows and Linux using Electron.

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Development

Run the portfolio as a desktop app in development mode:

```bash
npm run electron:dev
```

This will:
1. Start the Vite dev server
2. Wait for the server to be ready
3. Launch the Electron app

## Building for Production

### Build for All Platforms
```bash
npm run electron:build
```

### Build for Specific Platforms

**Windows only:**
```bash
npm run electron:build:win
```

**Linux only:**
```bash
npm run electron:build:linux
```

## Output

Built applications will be in the `release/` directory:

- **Windows**: `release/*.exe` (NSIS installer)
- **Linux**: `release/*.AppImage` and `release/*.deb`

## Automated Releases

This project uses GitHub Actions to automatically build and release desktop apps.

### Creating a Release

1. Update version in `package.json`
2. Commit your changes
3. Create and push a tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

4. GitHub Actions will automatically:
   - Build for Windows and Linux
   - Create a GitHub Release
   - Upload installers as release assets

### Downloading Releases

Go to the [Releases](https://github.com/Xavi-003/portfolio/releases) page to download the latest installers.

## Configuration

### App Icon
Replace `build/icon.png` with your own 512x512 PNG icon.

### Build Settings
Edit `electron-builder.yml` to customize:
- App ID and product name
- Installer options
- File compression
- Platform-specific settings

### Electron Settings
Edit `electron/main.js` to customize:
- Window size and behavior
- Development tools
- App lifecycle

## Troubleshooting

**Build fails on Linux:**
- Install required dependencies: `sudo apt-get install icnsutils graphicsmagick`

**Build fails on Windows:**
- Ensure you have the latest Visual Studio Build Tools installed

**Development server doesn't start:**
- Check that port 3000 is available
- Try running `npm run dev` separately first
