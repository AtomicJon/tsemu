import Cpu from '../Cpu';

/**
 * Restart at a given address
 * @param cpu Cpu to operate on
 * @param address The address to restart at
 */
export default function rst(cpu: Cpu, address: number): void {
  cpu.SP -= 2;
  cpu.write16(cpu.SP, cpu.PC);
  cpu.PC = address;
}
