# TSEmu

An experiment writing a Game Boy emulator in TypeScript


## Getting Started

### Dev
Parcel is used for building, in development simply run:
```bash
yarn start
```
This will start the dev server at http://localhost:1234

### Build
To build a production build run:
```bash
yarn build
```

## TODO
- [x] Basic instruction processing
- [x] Basic rendering
- [x] OAM DMA transfers
- [x] Interrupt handling
- [x] Joypad input
- [x] Timer clock
- [x] Divider clock
- [ ] Sound
- [ ] Clock adjustment based on FPS (clock is tied to framerate)
- [ ] Handle STOP/HALT
- [ ] Cartridge type parsing (0x0147)
- [ ] ROM bank switching
- [ ] Scanline based rendering
- [ ] VRAM DMA transfers
