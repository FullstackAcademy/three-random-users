const randomUsersURL = 'https://acme-users-api-rev.herokuapp.com/api/users/random'
const cards = document.querySelector('#cards')


window.addEventListener('hashchange', () => {
    const idStr = window.location.hash.slice(1)
    const idNum = window.location.hash.slice(1) * 1
    const userCards = [...document.querySelectorAll('.card')]

    if (Number.isNaN(idNum) || idNum >= userCards.length || idNum < 0) {
        userCards.forEach(card => {
            card.classList.remove('selected', 'hidden')
            card.setAttribute('order', '0')
        })
    } else {
        userCards.forEach(card => {
            if (card.getAttribute('data-id') === idStr) {
                card.classList.add('selected')
                card.classList.remove('hidden')
            } else {
                card.classList.remove('selected')
                card.classList.add('hidden')
            }
        })
    }
})


Promise.all([fetch(randomUsersURL), fetch(randomUsersURL), fetch(randomUsersURL)])
    .then(response => Promise.all(response.map(result => result.json())))
    .then(renderUserCard)


function renderUserCard(userArr) {
    let newCards = userArr.map((user, idx) => {
        return `
        <div class="card" data-id="${idx}" style="order: 0">
            <div class='page'><a href="#${idx}">${idx + 1}</a></div>
            <div class='user'>
                <p>${user.fullName}</p>
                <p>${user.email}</p>
                <div class='avatar' style="background-image: url(${user.avatar})"></div>
            </div>
        </div>
        `
    }).join('')
    cards.innerHTML = newCards
    window.location.hash = '#all'
}
