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
- [ ] Sprite flags
  - [ ] Proper palette implementation
  - [ ] Sprite flip
  - [ ] Sprite rendering priority
- [ ] Sound
- [ ] Clock adjustment based on FPS (clock is tied to framerate)
- [ ] Handle STOP/HALT
- [ ] Cartridge type parsing (0x0147)
- [ ] ROM bank switching
- [ ] Scanline based rendering
- [ ] VRAM DMA transfers

## Reference Material
The following are the main reference material used during development:
- Game Boy Development Community: https://gbdev.io/
  - Pan Docs: https://gbdev.io/pandocs/
  - Instructions: https://gbdev.io/gb-opcodes/optables/
- RGBDS Opcode references: https://rgbds.gbdev.io/docs/v0.4.2/gbz80.7
- Gameboy Development Wiki (gbdev.gg8.se): https://gbdev.gg8.se/wiki/articles/Main_Page
- Game Boy CPU Manual: https://realboyemulator.files.wordpress.com/2013/01/gbcpuman.pdf
