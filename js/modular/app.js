import { renderNeuroPanel, getNeuroState } from './neuroPanel.js';
import { generateNeuroReport } from './reportGenerator.js';

const app = document.getElementById('app');
const report = document.getElementById('report');

function refreshReport() {
  report.textContent = generateNeuroReport(getNeuroState());
}

function render() {
  app.innerHTML = '';
  app.appendChild(
    renderNeuroPanel(() => {
      refreshReport();
    })
  );

  refreshReport();
}

document.addEventListener('DOMContentLoaded', () => {
  render();

  const copyBtn = document.getElementById('copy-report');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      await navigator.clipboard.writeText(report.textContent);
      copyBtn.textContent = 'Copied';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 1500);
    });
  }
});
