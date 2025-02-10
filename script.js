document.getElementById('search-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        fetchUserProfile(username);
    }
});

function fetchUserProfile(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(user => {
            if (user.message === "Not Found") {
                alert("User not found");
            } else {
                displayUserProfile(user);
                fetchUserRepos(username);
            }
        })
        .catch(error => console.error('Error fetching user:', error));
}

function displayUserProfile(user) {
    document.getElementById('name').innerText = user.name || 'No name provided';
    document.getElementById('avatar').src = user.avatar_url;
    document.getElementById('bio').innerText = user.bio || 'No bio provided';
    document.getElementById('profile').classList.remove('hidden');
}

function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => displayUserRepos(repos))
        .catch(error => console.error('Error fetching repos:', error));
}

function displayUserRepos(repos) {
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = '';

    repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        repoList.appendChild(repoItem);
    });

    document.getElementById('repos').classList.remove('hidden');
}
