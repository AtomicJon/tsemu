type FlagsType = {
  Z: string|null;
  N: string|null;
  H: string|null;
  C: string|null;
}

type OpCode = {
  mnemonic: string;
  bytes: number;
  cycles: number;
  flags: FlagsType;
  action: (cpu: Cpu) => void;
}
