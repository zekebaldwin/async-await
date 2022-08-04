const favNumber = 44
const baseURL = "http://numbersapi.com/"
const ol = document.getElementById('p2')
const button = document.getElementById('button')
const div = document.querySelector('.container')

async function p1(){
    await axios.get(`${baseURL}${favNumber}?json`).then(res => {
        console.log(res)})
}

async function p2(){
    await axios.get(`${baseURL}42..48?json`).then(res => {
        for (facts in res.data){
            let li = document.createElement('li')
            li.innerText = res.data[facts]
            ol.append(li)
        }
        console.log(res.data)
    })
}

async function p3(){
    for (let i = 0; i < 4; i++){
        await axios.get(`${baseURL}${favNumber}`).then(res => {
            let li = document.createElement('li')
            li.innerText = res.data
            ol.append(li)
        })
    }
}

async function p4() {
    await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1').then(res => {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    })
}

async function p5() {
    await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1').then(res => {
        let deckID = res.data.deck_id
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
        return axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    })
    .then(res => {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    })
}

let deckID = null
async function getDeckID() {
    await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(res => {
        deckID = res.data.deck_id
    })
}

async function p6() {
    await axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`).then(res => {
        let image = document.createElement('img')
        image.src = res.data.cards[0].image
        div.append(image)
    }).catch(error => {
        button.removeEventListener('click', p6)
        console.log(error)
    })
}

window.onload = function(){
    getDeckID()
}

button.addEventListener('click', p6)




