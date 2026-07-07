// Animações de entrada e efeito de digitação elegante.
const typingLines = [
  {
    element: document.getElementById('typing-top'),
    text: 'O site está com essas cores pois lembro que são suas favoritas.'
  },
  {
    element: document.getElementById('typing-mini'),
    text: 'eu te amo'
  },
  {
    element: document.getElementById('typing-name'),
    text: 'Emanueli Xavier'
  }
];

function typeText(target, text, delay = 45) {
  return new Promise((resolve) => {
    let index = 0;

    const interval = window.setInterval(() => {
      target.textContent += text[index];
      index += 1;

      if (index === text.length) {
        window.clearInterval(interval);
        resolve();
      }
    }, delay);
  });
}

async function runTypingSequence() {
  for (const item of typingLines) {
    item.element.classList.add('is-visible');
    await typeText(item.element, item.text);
    await new Promise((resolve) => window.setTimeout(resolve, 220));
  }

  document.querySelector('.photo-frame').classList.add('is-visible');
  document.querySelector('.poem-card').classList.add('is-visible');
  document.querySelector('.footer').classList.add('is-visible');
}

function createParticles() {
  const container = document.getElementById('particles');
  const count = 26;

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${8 + Math.random() * 8}s`;
    container.appendChild(particle);
  }
}

function applyParallax() {
  const hero = document.getElementById('hero');
  const rect = hero.getBoundingClientRect();
  const offsetY = (window.innerHeight / 2 - rect.top) * 0.015;
  const offsetX = (window.innerWidth / 2 - rect.left) * 0.008;

  hero.style.transform = `translate3d(${offsetX * 0.3}px, ${offsetY * 0.2}px, 0)`;
}

window.addEventListener('load', () => {
  createParticles();
  runTypingSequence();
  applyParallax();
});

window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * 10;
  document.querySelector('.hero').style.transform = `translate3d(${x * 0.4}px, ${y * 0.35}px, 0)`;
});

window.addEventListener('scroll', applyParallax, { passive: true });
window.addEventListener('resize', applyParallax);