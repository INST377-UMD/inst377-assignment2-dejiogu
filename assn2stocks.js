const API_KEY = "YOUR_POLYGON_API_KEY";

async function handleStockSearch() {
  const ticker = document.getElementById("stock-input").value;
  const days = document.getElementById("range-select").value;
  fetchStock(ticker, days);
}

async function fetchStock(ticker, days) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - parseInt(days));

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${start.toISOString().split('T')[0]}/${end.toISOString().split('T')[0]}?adjusted=true&sort=asc&apiKey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  const labels = data.results.map(d => new Date(d.t).toLocaleDateString());
  const prices = data.results.map(d => d.c);

  const ctx = document.getElementById('stockChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: `${ticker} Stock Price`, data: prices }]
    }
  });
}

async function loadRedditStocks() {
  const res = await fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03");
  const data = await res.json();
  const top5 = data.slice(0, 5);
  const container = document.getElementById("reddit-stocks");
  container.innerHTML = "";
  top5.forEach(stock => {
    const icon = stock.sentiment === 'Bullish' ? "🐂" : "🐻";
    container.innerHTML += `
      <div>
        <a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a> - 
        Comments: ${stock.no_of_comments} - Sentiment: ${stock.sentiment} ${icon}
      </div>`;
  });
}

window.onload = () => {
  loadRedditStocks();
  if (annyang) {
    const commands = {
      'hello': () => alert('Hello World!'),
      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color;
      },
      'navigate to *page': (page) => {
        window.location.href = `${page.toLowerCase()}.html`;
      },
      'lookup *stock': (stock) => {
        document.getElementById("stock-input").value = stock.toUpperCase();
        fetchStock(stock.toUpperCase(), 30);
      }
    };
    annyang.addCommands(commands);
  }
};
