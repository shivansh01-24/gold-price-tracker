async function updateComparison(selectedState) {
  const comparisonDisplay = document.getElementById('comparisonDisplay');
  const states = ['Delhi', 'Punjab', 'Bihar', 'Maharashtra', 'Uttar Pradesh'];
  const comparisons = [];
  for (const state of states) {
    const prices = await fetchCurrentPrices(state);
    const price18K = prices.find(p => p.karat === '18K');
    const price22K = prices.find(p => p.karat === '22K');
    const price24K = prices.find(p => p.karat === '24K');
    comparisons.push({
      state,
      price18K: price18K ? price18K.price : 'N/A',
      price22K: price22K ? price22K.price : 'N/A',
      price24K: price24K ? price24K.price : 'N/A'
    });
  }
  let html = '<table class="w-full border">';
  html += '<thead><tr class="bg-gray-200 dark:bg-gray-700"><th class="p-2">State</th><th class="p-2">18K Price (INR/g)</th><th class="p-2">22K Price (INR/g)</th><th class="p-2">24K Price (INR/g)</th></tr></thead>';
  html += '<tbody>';
  for (const c of comparisons) {
    html += '<tr>';
    html += '<td class="p-2 ' + (c.state === selectedState ? 'font-bold' : '') + '">' + c.state + '</td>';
    html += '<td class="p-2">' + (c.price18K !== 'N/A' ? '₹' + c.price18K : 'N/A') + '</td>';
    html += '<td class="p-2">' + (c.price22K !== 'N/A' ? '₹' + c.price22K : 'N/A') + '</td>';
    html += '<td class="p-2">' + (c.price24K !== 'N/A' ? '₹' + c.price24K : 'N/A') + '</td>';
    html += '</tr>';
  }
  html += '</tbody></table>';
  comparisonDisplay.innerHTML = html;
}
