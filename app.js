const randomUsersURL = 'https://acme-users-api-rev.herokuapp.com/api/users/random'
const cards = document.querySelector('#cards')

Promise.all([fetch(randomUsersURL), fetch(randomUsersURL), fetch(randomUsersURL)])
    .then(response => Promise.all(response.map(result => result.json())))
    .then(renderUserCard)


function renderUserCard(userArr) {
    const user1 = userArr[0]
    const user2 = userArr[1]
    const user3 = userArr[2]

    console.log(user1)

    let newCards = userArr.map((user, idx) => {
        return `
        <div class="card">
            <div class='page'><a href="#${idx + 1}">${idx + 1}</a></div>
            <div class='user'>
                <p>${user.fullName}</p>
                <p>${user.email}</p>
                <div class='avatar' style="background-image: url(${user.avatar})"></div>
            </div>
        </div>
        `
    }).join('')
    cards.innerHTML = newCards
}
