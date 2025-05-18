async function loadCarousel() {
    const res = await fetch("https://dog.ceo/api/breeds/image/random/10");
    const data = await res.json();
    const container = document.getElementById("dog-carousel");
    container.innerHTML = data.message.map(img => `<img src="${img}" width="200">`).join('');
  }
  
  async function loadBreeds() {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();
    const container = document.getElementById("breed-buttons");
    for (const breed in data.message) {
      const btn = document.createElement("button");
      btn.textContent = breed;
      btn.className = "custom-btn";
      btn.onclick = () => loadBreedInfo(breed);
      container.appendChild(btn);
    }
  }
  
  async function loadBreedInfo(breed) {
    const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`);
    const data = await res.json();
    const dog = data[0];
    const container = document.getElementById("breed-info");
    container.innerHTML = `
      <h3>${dog.name}</h3>
      <p>${dog.temperament}</p>
      <p>Life Span: ${dog.life_span}</p>
    `;
  }
  
  window.onload = () => {
    loadCarousel();
    loadBreeds();
  
    if (annyang) {
      const commands = {
        'hello': () => alert('Hello World!'),
        'change the color to *color': (color) => {
          document.body.style.backgroundColor = color;
        },
        'navigate to *page': (page) => {
          window.location.href = `${page.toLowerCase()}.html`;
        },
        'load dog breed *breed': (breed) => {
          loadBreedInfo(breed.toLowerCase());
        }
      };
      annyang.addCommands(commands);
    }
  };  