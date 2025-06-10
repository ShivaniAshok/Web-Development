let url = 'https://api.github.com/users';

const searchInputElem = document.getElementById('searchInput');
const searchBtnElem = document.getElementById('searchBtn');
const profileContainerElem = document.getElementById('profileContainer');
const loadingElem = document.getElementById('loading');

const generateProfile = (profile) => {
  return `
  <div class="profile-box">
        <div class="top-section">
          <div class="left">
            <div class="avatar">
              <img src="${profile.avatar_url}" alt="avatar" />
            </div>
            <div class="self">
              <h1>${profile.name}</h1>
              <h1>${profile.login}</h1>
            </div>
          </div>
          <a href="${profile.html_url}" target="_blank">
            <button class="primary-btn">Check profile</button>
          </a>
        </div>
        <div class="about">
          <h2>About</h2>
          <p>${profile.bio}</p>
        </div>
        <div class="status">
          <div class="status-item">
            <h3>Followers</h3>
            <p>${profile.followers}</p>
          </div>
          <div class="status-item">
            <h3>Following</h3>
            <p>${profile.following}</p>
          </div>
          <div class="status-item">
            <h3>Repos</h3>
            <p>${profile.public_repos}</p>
          </div>
        </div>
      </div>
      `;
};

const fetchProfile = async () => {
  //async bcoz we are calling network
  const username = searchInputElem.value;
  loadingElem.innerText = 'Loading.....';
  loadingElem.style.color = 'black';

  try {
    const response = await fetch(`${url}/${username}`);
    const data = await response.json();
    console.log('data: ', data);

    if (response.ok) {
      loadingElem.innerText = '';
      profileContainerElem.innerHTML = generateProfile(data);
    } else {
      loadingElem.innerHTML = data.message;
      loadingElem.style.color = 'red';
      profileContainerElem.innerText = '';
    }
  } catch (error) {
    console.log(error);
    loadingElem.innerText = '';
  }
};

searchBtnElem.addEventListener('click', fetchProfile);
