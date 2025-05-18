window.onload = async () => {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    document.getElementById("quote-box").innerText = data.content;
  };
  
  if (annyang) {
    const commands = {
      'hello': () => alert('Hello World!'),
      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color;
      },
      'navigate to *page': (page) => {
        window.location.href = `${page.toLowerCase()}.html`;
      }
    };
    annyang.addCommands(commands);
  }
  