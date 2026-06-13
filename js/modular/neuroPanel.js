const neuroState = {
  normal: false,
  exceptions: new Set()
};

const EXCEPTIONS = [
  ['pronatorDriftRight', 'Right pronator drift'],
  ['pronatorDriftLeft', 'Left pronator drift'],
  ['facialDroopRight', 'Right facial droop'],
  ['facialDroopLeft', 'Left facial droop'],
  ['dysarthria', 'Dysarthria'],
  ['ataxia', 'Ataxia'],
  ['sensoryLoss', 'Sensory loss'],
  ['abnormalGait', 'Abnormal gait']
];

export function getNeuroState() {
  return {
    normal: neuroState.normal,
    exceptions: Array.from(neuroState.exceptions)
  };
}

export function renderNeuroPanel(onChange) {
  const wrap = document.createElement('section');
  wrap.className = 'bg-white rounded-xl shadow-sm border border-slate-200 p-4';

  wrap.innerHTML = `
    <h2 class="text-xl font-semibold mb-3">Neurological examination</h2>

    <button id="normal-neuro"
      class="w-full mb-4 px-4 py-3 rounded-lg font-semibold border ${
        neuroState.normal
          ? 'bg-green-600 text-white border-green-700'
          : 'bg-slate-100 text-slate-800 border-slate-300'
      }">
      Normal neuro exam
    </button>

    <p class="text-sm text-slate-600 mb-3">
      Mark the exam normal, then add exceptions only if present.
    </p>

    <div id="exceptions" class="grid grid-cols-2 gap-2"></div>
  `;

  const normalButton = wrap.querySelector('#normal-neuro');
  normalButton.addEventListener('click', () => {
    neuroState.normal = !neuroState.normal;
    if (!neuroState.normal) neuroState.exceptions.clear();
    onChange();
  });

  const grid = wrap.querySelector('#exceptions');

  EXCEPTIONS.forEach(([key, label]) => {
    const btn = document.createElement('button');
    const active = neuroState.exceptions.has(key);

    btn.className = active
      ? 'px-3 py-2 rounded-lg bg-red-100 border border-red-400 text-red-800 text-sm'
      : 'px-3 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-700 text-sm';

    btn.textContent = label;

    btn.addEventListener('click', () => {
      neuroState.normal = true;
      if (neuroState.exceptions.has(key)) {
        neuroState.exceptions.delete(key);
      } else {
        neuroState.exceptions.add(key);
      }
      onChange();
    });

    grid.appendChild(btn);
  });

  return wrap;
}
