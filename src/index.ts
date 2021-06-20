import GB from './core/GB';

/**
 * Main entry point - hooks up UI, GB, and keyboard events
 */
export default function main(): void {
  // Controls
  const gameSelect = document.getElementById('game') as HTMLInputElement;
  const pauseButton = document.getElementById('pause') as HTMLButtonElement;
  const soundCheckBox = document.getElementById('sound') as HTMLInputElement;

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
    const files = (evt.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const arrayBuffer = await files[0].arrayBuffer();
      gb.loadCart(arrayBuffer);
    }
    gameSelect.blur();
  });

  soundCheckBox.addEventListener('change', (evt) => {
    if ((evt.target as HTMLInputElement).checked) {
      gb.enableAudio();
    } else {
      gb.disableAudio();
    }
  });

  console.log('Starting...');
}

main();
