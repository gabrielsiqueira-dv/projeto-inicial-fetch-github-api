const screen = {
    userProfile: document.querySelector('.profile-data'),

    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">  
            <img src="${user.avatarUrl}" alt="foto do perfil do usuário">
            <div class="data">
                <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
            </div>
        </div>`;

        let repositoriesItems = '';
        user.repositories.forEach(repo => {
            repositoriesItems += `<li>
                <a href="${repo.html_url}" target="_blank">
                    ${repo.name} ${repo.html_url}<br>
                    <strong>🍴 ${repo.forks_count}</strong>
                    <strong>⭐ ${repo.stargazers_count}</strong>
                    <strong>👀 ${repo.watchers_count}</strong>
                    <strong>👩‍💻 ${repo.language ?? 'Não especificada'}</strong>
                </a>
            </li>`;
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItems}</ul>
            </div>`;
        }

        this.userProfile.innerHTML += `<div class="midia">
            <p style="display: inline;">Seguidores: ${user.seguidores}</p>
            <p style="display: inline;">Seguindo: ${user.seguindo}</p>
        </div>`;

        const filteredEvents = user.events.filter(event =>
            event.type === 'CreateEvent' || event.type === 'PushEvent'
        ).slice(0, 10);

        if (filteredEvents.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                <h2>Events</h2>
                <ul>
                    ${filteredEvents.map(event => `
                        <li>
                            <a href="${event.repo.url}" target="_blank">
                                <strong>Repositório:</strong> ${event.repo.name}<br>
                                <strong>Mensagem:</strong> ${event.payload.commits ? event.payload.commits[0].message : 'N/A'}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>`;
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
};

export { screen };