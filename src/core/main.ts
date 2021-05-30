import GB from '../hardware/GB';

// 4.194304 MHz
export default function main(): void {
  // Controls
  const gameSelect = document.getElementById('game') as HTMLInputElement;
  const pauseButton = document.getElementById('pause') as HTMLButtonElement;

  // UI
  const canvas = document.getElementById('screen') as HTMLCanvasElement;

  // Emulator
  const gb = new GB(canvas);

  // Hookup events
  pauseButton.addEventListener('click', (evt) => {
    const isPaused = gb.togglePause();
    (evt.target as HTMLButtonElement).innerHTML = isPaused ? 'Resume' : 'Pause';
  });

  gameSelect.addEventListener('change', async (evt) => {
    console.log('Change');
    const files = (evt.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const arrayBuffer = await files[0].arrayBuffer();
      gb.loadCart(arrayBuffer);
    }
  });

  console.log('Starting...');
}
