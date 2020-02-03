const randomUsersURL = 'https://acme-users-api-rev.herokuapp.com/api/users/random'
const cards = document.querySelector('#cards')

Promise.all([fetch(randomUsersURL), fetch(randomUsersURL), fetch(randomUsersURL)])
    .then(response => Promise.all(response.map(result => result.json())))
    .then(renderUserCard)
    .catch(console.log)

function renderUserCard(userArr) {
    let newCards = userArr.map((user, idx) => {
        //Adjust email font size to fit card
        let fontSize = ''
        const emailLength = user.email.length
        if (emailLength > 39) {
            fontSize = 'reduce-at-39'
        } else if (emailLength > 32) {
            fontSize = 'reduce-at-32'
        } else if (emailLength > 24) {
            fontSize = 'reduce-at-24'
        }

        return `
        <div class="card" data-id="${idx}" style="order: 0">
            <div class='page'><a href="#${idx}">${idx + 1}</a></div>
            <div class='user'>
                <p>${user.fullName}</p>
                <p class = 'email ${fontSize}'>${user.email}</p>
                <div class='avatar' style="background-image: url(${user.avatar})"></div>
            </div>
        </div>
        `
    }).join('')

    cards.innerHTML = newCards
    window.location.hash = '#all' //forces hash refresh on reload
}

window.addEventListener('hashchange', () => {
    const idStr = window.location.hash.slice(1)
    const idNum = window.location.hash.slice(1) * 1
    const userCards = [...document.querySelectorAll('.card')]
    // const orderCode = [
    //     {0: 1, 1: 0, 2: 1},
    //     {0: 0, 1: 0, 2: 0},
    //     {0: 0, 1: 1, 2: 0}
    // ]

    if (Number.isNaN(idNum) || idNum >= userCards.length || idNum < 0) {
        userCards.forEach(card => {
            card.classList.remove('selected', 'hidden')
            card.style.order = '0'
        })
    } else {
        // const order = orderCode[idNum]

        userCards.forEach(card => {
            // card.style.order = order[card.getAttribute('data-id')]

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
