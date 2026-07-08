/* CryptoRankUK - app.js */
const BTC_API = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,gbp&include_24hr_change=true';

document.addEventListener('DOMContentLoaded', () => {
  fetchPrice();
  setInterval(fetchPrice, 60000);
});

async function fetchPrice() {
  try {
    const res = await fetch(BTC_API);
    const data = await res.json();
    const gbp = data.bitcoin.gbp;
    const usd = data.bitcoin.usd;
    const change = data.bitcoin.usd_24h_change;
    const sign = change >= 0 ? '+' : '';
    const cls = change >= 0 ? 'price-up' : 'price-down';
    const arrow = change >= 0 ? '\u25b2' : '\u25bc';

    const ticker = document.getElementById('btcTicker');
    if (ticker) { ticker.textContent = `BTC: \u00a3${gbp.toLocaleString()} ${arrow} ${sign}${change.toFixed(2)}%`; ticker.className = 'btc-ticker ' + cls; }

    const heroPrice = document.getElementById('btcPrice');
    if (heroPrice) heroPrice.textContent = '\u00a3' + gbp.toLocaleString();

    const sidePrice = document.getElementById('sidebarPrice');
    if (sidePrice) sidePrice.textContent = '\u00a3' + gbp.toLocaleString();

    const sideChange = document.getElementById('sidebarChange');
    if (sideChange) sideChange.innerHTML = `<span class="${cls}">${arrow} ${sign}${change.toFixed(2)}% (24h) &nbsp; $${usd.toLocaleString()}</span>`;
  } catch(e) {
    const ticker = document.getElementById('btcTicker');
    if (ticker) ticker.textContent = 'BTC: unavailable';
  }
}
