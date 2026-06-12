function fixedTable(headers, rows) {
  const widths = headers.map((h, i) =>
    Math.max(
      h.length,
      ...rows.map(row => String(row[i] ?? '').length)
    )
  );

  const formatRow = row =>
    row.map((cell, i) => String(cell ?? '').padEnd(widths[i], ' ')).join('  ');

  return [
    formatRow(headers),
    formatRow(headers.map(h => '-'.repeat(h.length))),
    ...rows.map(formatRow)
  ].join('\n');
}

export function generateNeuroReport(state) {
  if (!state.normal) {
    return 'NEURO:\n\nNo neurological examination documented.';
  }

  const exceptions = new Set(state.exceptions || []);

  const motorRows = [
    ['R', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5'],
    ['L', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5']
  ];

  const reflexRows = [
    ['R', '2', '2', '2', '2', '2', '-', '-', 'down'],
    ['L', '2', '2', '2', '2', '2', '-', '-', 'down']
  ];

  const motorTable = fixedTable(
    ['Side', 'Deltoid', 'Biceps', 'Triceps', 'Wrist ext', 'Finger abd', 'Hip flex', 'Hip ext', 'Knee flex', 'Knee ext', 'Ankle flex', 'Ankle ext'],
    motorRows
  );

  const reflexTable = fixedTable(
    ['Side', 'Biceps', 'Brachio', 'Triceps', 'Knee', 'Ankle', 'Hoffman', 'Crossed add', 'Plantar'],
    reflexRows
  );

  const exceptionLines = [];

  if (exceptions.has('pronatorDriftRight')) exceptionLines.push('Right pronator drift is present.');
  if (exceptions.has('pronatorDriftLeft')) exceptionLines.push('Left pronator drift is present.');
  if (exceptions.has('facialDroopRight')) exceptionLines.push('Right facial droop is present.');
  if (exceptions.has('facialDroopLeft')) exceptionLines.push('Left facial droop is present.');
  if (exceptions.has('dysarthria')) exceptionLines.push('Speech is dysarthric.');
  if (exceptions.has('ataxia')) exceptionLines.push('Ataxia is present.');
  if (exceptions.has('sensoryLoss')) exceptionLines.push('Sensory loss is present.');
  if (exceptions.has('abnormalGait')) exceptionLines.push('Gait is abnormal.');

  const exceptionText = exceptionLines.length
    ? `\n\nExceptions:\n${exceptionLines.map(x => `- ${x}`).join('\n')}`
    : '';

  return `NEURO:

Mental status: The patient is alert, attentive, and oriented.

Speech: Speech is clear and fluent with good repetition, comprehension, and naming. The patient recalls 3/3 objects at 5 minutes.

Cranial nerves:
CN II: Visual fields are full to confrontation. Fundoscopic exam is normal with sharp discs. Pupils are 4 mm and briskly reactive to light. Visual acuity is 20/20 bilaterally.
CN III, IV, VI: Extra-ocular movements are intact, with no nystagmus and no ptosis.
CN V: Facial sensation is intact to pinprick in all 3 divisions bilaterally.
CN VII: Face is symmetric with normal eye closure and smile.
CN VIII: Hearing is normal to rubbing fingers.
CN IX, X: Palate elevates symmetrically. Phonation is normal.
CN XI: Head turning and shoulder shrug are intact.
CN XII: Tongue is midline with normal movements and no atrophy.

Motor: There is no pronator drift of outstretched arms. Muscle bulk and tone are normal. Strength is full bilaterally.

${motorTable}

Reflexes: Reflexes are 2+ and symmetric at the biceps, triceps, knees, and ankles. Plantar responses are flexor.

${reflexTable}

Sensory: Light touch, pinprick, position sense, and vibration sense are intact in fingers and toes.

Coordination: Rapid alternating movements and fine finger movements are intact. There is no dysmetria on finger-to-nose and heel-knee-shin. There are no abnormal or extraneous movements. Romberg is absent.

Gait/Stance: Posture is normal. Gait is steady with normal steps, base, arm swing, and turning. Heel and toe walking are normal. Tandem gait is normal.${exceptionText}`;
}
