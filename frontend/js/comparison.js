async function updateComparison(selectedState) {
  const comparisonDisplay = document.getElementById('comparisonDisplay');
  const states = ['Delhi', 'Maharashtra', 'Tamil Nadu', 'West Bengal', 'Karnataka'];
  const comparisons = [];
  for (const state of states) {
    const prices = await fetchCurrentPrices(state);
    const price24K = prices.find(p => p.karat === '24K');
    if (price24K) {
      comparisons.push({ state, price: price24K.price });
    }
  }
  comparisonDisplay.innerHTML = `
    <table class="w-full border">
      <thead>
        <tr class="bg-gray-200 dark:bg-gray-700">
          <th class="p-2">State</th>
          <th class="p-2">24K Price (INR/g)</th>
        </tr>
      </thead>
      <tbody>
        ${comparisons.map(c => `
          <tr>
            <td class="p-2 ${c.state === selectedState ? 'font-bold' : ''}">${c.state}</td>
            <td class="p-2">₹${c.price}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
