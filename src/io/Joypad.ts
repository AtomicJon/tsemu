import MemoryMap from '../memory/MemoryMap';

const BIT_INPUTS_HIGH =      0x0F; // 00001111b - Input bits all high
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

enum INPUT_TYPE {
  INPUT_TYPE_BUTTON = 'BUTTON',
  INPUT_TYPE_DIRECTION = 'DIRECTION',
}


type InputMask = {
  type: INPUT_TYPE;
  mask: number,
}

const INPUT_BIT_MAP: Record<string, InputMask> = {
  [INPUT_START]: {
    type: INPUT_TYPE.INPUT_TYPE_BUTTON,
    mask: BIT_MASK_DOWN_START,
  },
  [INPUT_SELECT]: {
    type: INPUT_TYPE.INPUT_TYPE_BUTTON,
    mask: BIT_MASK_UP_SELECT,
  },
  [INPUT_B]: {
    type: INPUT_TYPE.INPUT_TYPE_BUTTON,
    mask: BIT_MASK_LEFT_B,
  },
  [INPUT_A]: {
    type: INPUT_TYPE.INPUT_TYPE_BUTTON,
    mask: BIT_MASK_RIGHT_A,
  },
  [INPUT_DOWN]: {
    type: INPUT_TYPE.INPUT_TYPE_DIRECTION,
    mask: BIT_MASK_DOWN_START,
  },
  [INPUT_UP]: {
    type: INPUT_TYPE.INPUT_TYPE_DIRECTION,
    mask: BIT_MASK_UP_SELECT,
  },
  [INPUT_LEFT]: {
    type: INPUT_TYPE.INPUT_TYPE_DIRECTION,
    mask: BIT_MASK_LEFT_B,
  },
  [INPUT_RIGHT]: {
    type: INPUT_TYPE.INPUT_TYPE_DIRECTION,
    mask: BIT_MASK_RIGHT_A,
  },
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

    let buttonBits = BIT_INPUTS_HIGH;
    let directionBits = BIT_INPUTS_HIGH;

    // Pull down the respective bits for each input type
    this.pressedInputs.forEach((input) => {
      const inputDetails = INPUT_BIT_MAP[input];
      if (inputDetails.type === INPUT_TYPE.INPUT_TYPE_BUTTON) {
        buttonBits &= inputDetails.mask;
      } else {
        directionBits &= inputDetails.mask;
      }
    });

    // Update the selected input state (bit 4/5 are 0 to select)
    let joypadState = this.memoryMap.read8(0xFF00);
    // Directions
    if ((joypadState & 0x10) !== 0x10) {
      joypadState |= directionBits;
    } else if ((joypadState & 0x20) !== 0x20) {
      joypadState |= buttonBits;
    } else {
      joypadState |= BIT_INPUTS_HIGH;
    }

    this.memoryMap.write8(0xFF00, joypadState);
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

