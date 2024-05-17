document.addEventListener("DOMContentLoaded", async function () {
  let seguidores = [];
  async function carregarPerfil(url) {
      try {
          const response = await fetch(url);
          const dadosUsuario = await response.json();
          exibirPerfil(dadosUsuario);
          await carregarSeguidores(dadosUsuario.followers_url);
      } catch (error) {
          console.error('Erro ao carregar perfil:', error);
      }
  }

  async function carregarSeguidores(url) {
      try {
          const response = await fetch(url);
          seguidores = await response.json();
          exibirSeguidores(seguidores);
      } catch (error) {
          console.error('Erro ao carregar seguidores:', error);
      }
  }

  function exibirPerfil(dados) {
      const perfilDiv = document.getElementById('perfil');
      perfilDiv.innerHTML = `
          <h2 class="nome">${dados.name}</h2>
          <img class="perfil-img" src="${dados.avatar_url}" alt="Avatar">
          <p class="bio">${dados.bio}</p>
      `;
  }

  function exibirSeguidores(listaSeguidores) {
      const seguidoresDiv = document.getElementById('seguidores-gh');
      seguidoresDiv.innerHTML = '';

      listaSeguidores.forEach(seguidor => {
          seguidoresDiv.innerHTML += `
              <div class="seguidor" data-username="${seguidor.login}">
                  <img src="${seguidor.avatar_url}" alt="avatar${seguidor.login}">
                  <p class="seguidor-nome">${seguidor.login}</p>
              </div>
          `;
      });
  }

  async function carregarPerfilSeguidor(username) {
      const url = `https://api.github.com/users/${username}`;
      await carregarPerfil(url);
      atualizarLinkHome('Voltar');
  }

  async function carregarPerfilPrincipal() {
      const url = 'https://api.github.com/users/Carlosalves18';
      await carregarPerfil(url);
      atualizarLinkHome('Home');
  }

  document.getElementById('seguidores-gh').addEventListener('click', function (event) {
      if (event.target.classList.contains('seguidor') || event.target.parentNode.classList.contains('seguidor')) {
          const seguidorDiv = event.target.closest('.seguidor');
          const username = seguidorDiv.getAttribute('data-username');
          carregarPerfilSeguidor(username);
      }
  });

  document.getElementById('link-home').addEventListener('click', function () {
      carregarPerfilPrincipal();
  });

  function atualizarLinkHome(texto) {
      const linkHome = document.getElementById('link-home');
      linkHome.textContent = texto;
  }

  await carregarPerfilPrincipal();
});
