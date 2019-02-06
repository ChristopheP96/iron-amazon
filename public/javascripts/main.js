function handleButton(e) {
  e.preventDefault();
  axios.get('https://pokeapi.co/api/v2/pokemon/ditto/')
    .then((response) => {
      const { data } = response;
      console.log('my pokemons are', data);
    })
    .catch((error) => {
      console.log(error);
    });
}

window.addEventListener('load', () => {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', handleButton);
});
