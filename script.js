// const inputs = document.querySelectorAll('.controls input');

//     function handleUpdate() {
//       const suffix = this.dataset.sizing || '';
//       document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
//     }

//     inputs.forEach(input => input.addEventListener('change', handleUpdate));
//     inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));



// unknown 

document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.player__video');
  if (!video) return; // Don't run if video not loaded (prevents the error!)

  const toggle = document.querySelector('.toggle');
  const skipButtons = document.querySelectorAll('[data-skip]');
  const volumeSlider = document.querySelector('.volume');
  const playbackSlider = document.querySelector('.playbackSpeed');
  const progress = document.querySelector('.progress');
  const progressFilled = document.querySelector('.progress__filled');

  function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }

  function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);

  toggle.addEventListener('click', togglePlay);
  skipButtons.forEach(button => button.addEventListener('click', skip));
  volumeSlider.addEventListener('input', handleRangeUpdate);
  playbackSlider.addEventListener('input', handleRangeUpdate);
  progress.addEventListener('click', scrub);
});
