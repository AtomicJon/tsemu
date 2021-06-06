import MemoryMap from '../memory/MemoryMap';

const BIT_MASK_ALL =         0x3F; // 00111111b - BIT 6/7 Low (unused bits)
const BIT_MASK_BUTTON =      0x1F; // 00011111b - BIT 5 Low
const BIT_MASK_DIRECTION =   0x2F; // 00101111b - BIT 4 Low
const BIT_MASK_DOWN_START =  0x37; // 00110111b - BIT 3 Low
const BIT_MASK_UP_SELECT =   0x3B; // 00111011b - BIT 2 Low
const BIT_MASK_LEFT_B =      0x3D; // 00111101b - BIT 1 Low
const BIT_MASK_RIGHT_A =     0x3E; // 00111110b - BIT 0 Low

const INPUT_START = 'START';
const INPUT_SELECT = 'SELECT';
const INPUT_A = 'A';
const INPUT_B = 'B';
const INPUT_DOWN = 'DOWN';
const INPUT_UP = 'UP';
const INPUT_LEFT = 'LEFT';
const INPUT_RIGHT = 'RIGHT';

const INPUT_BIT_MAP: Record<string, number> = {
  [INPUT_START]: BIT_MASK_BUTTON & BIT_MASK_DOWN_START,
  [INPUT_SELECT]: BIT_MASK_BUTTON & BIT_MASK_UP_SELECT,
  [INPUT_B]: BIT_MASK_BUTTON & BIT_MASK_LEFT_B,
  [INPUT_A]: BIT_MASK_BUTTON & BIT_MASK_RIGHT_A,
  [INPUT_DOWN]: BIT_MASK_DIRECTION & BIT_MASK_DOWN_START,
  [INPUT_UP]: BIT_MASK_DIRECTION & BIT_MASK_UP_SELECT,
  [INPUT_LEFT]: BIT_MASK_DIRECTION & BIT_MASK_LEFT_B,
  [INPUT_RIGHT]: BIT_MASK_DIRECTION & BIT_MASK_RIGHT_A,
};

// TODO: Make keys configurable
const INPUT_KEY_MAP: Record<string, string> = {
  'w': INPUT_UP,
  'a': INPUT_LEFT,
  's': INPUT_DOWN,
  'd': INPUT_RIGHT,
  'ArrowUp': INPUT_UP,
  'ArrowLeft': INPUT_LEFT,
  'ArrowDown': INPUT_DOWN,
  'ArrowRight': INPUT_RIGHT,

  'Enter': INPUT_START,
  'Shift': INPUT_SELECT,
  ' ': INPUT_A,
  'Control': INPUT_B,
};


export default class Joypad {
  private memoryMap: MemoryMap;
  private inputPressed: boolean = false;
  private pressedInputs: string[] = [];

  constructor(memoryMap: MemoryMap) {
    this.memoryMap = memoryMap;
  }

  public init() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  public tick() {
    if (this.inputPressed) {
      this.inputPressed = false;
      // TODO: Fire interrupt
    }

    let inputValue = BIT_MASK_ALL;
    this.pressedInputs.forEach((input) => {
      inputValue = inputValue & INPUT_BIT_MAP[input];
    });

    this.memoryMap.write8(0xFF00, inputValue);
  }

  public getPressedInputs(): string[] {
    return this.pressedInputs;
  }

  private onKeyDown = (evt: KeyboardEvent): void => {
    const input = INPUT_KEY_MAP[evt.key] ?? null;
    if (input !== null && !this.pressedInputs.includes(input)) {
      this.inputPressed = true;
      this.pressedInputs.push(input);
    }
  }

  private onKeyUp = (evt: KeyboardEvent): void => {
    const input = INPUT_KEY_MAP[evt.key] ?? null;
    if (input !== null && this.pressedInputs.includes(input)) {
      this.pressedInputs.splice(this.pressedInputs.indexOf(input), 1);
    }
  }
}

