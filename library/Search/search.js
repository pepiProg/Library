async function addToMain() {
    const ul = document.querySelector('main')
    ul.innerHTML = ''
    const books = await getData()
    const keyword = document.getElementById('c').value
    const criteria = document.getElementById('cr').value
    const values = Object.values(books)
    let filtered = [];
    if (keyword == '' || criteria == '') {
        return alert('Keyword and criteria are required!')
    }
    if (criteria == 'Title' || criteria == 'Заглавие') {
        filtered = values.filter(x => x.name.includes(keyword))
    }
    if (criteria == 'Author' || criteria == 'Автор') {
        filtered = values.filter(x => x.author.includes(keyword))
    }
    if (criteria == 'Publisher' || criteria == 'Издател') {
        filtered = values.filter(x => x.publisher.includes(keyword))
    }
    if (criteria == 'Year of publishing' || criteria == 'Година на издаване') {
        filtered = values.filter(x => x.year == keyword)
    }
    if (criteria == 'Genre' || criteria == 'Жанр') {
        filtered = values.filter(x => x.genre == keyword)
    }
    if (filtered.length == 0) {
        ul.textContent = 'No books'
        return
    }
    view(filtered, ul)
}
async function getData() {
    const response = await fetch('https://books-76270-default-rtdb.firebaseio.com/books/.json')
    const data = await response.json()
    return data
}
document.querySelector('button').addEventListener('click', addToMain)
function view(filtered, ul) {
    filtered.forEach(x => {
        const a = document.createElement('button')
        a.innerText = x.name
        const divInfo = document.createElement('div')
        const title = document.createElement('p')
        title.textContent = `Title: ${x.name}`
        const author = document.createElement('p')
        author.textContent = `Author: ${x.author}`
        const genre = document.createElement('p')
        genre.textContent = `Genre: ${x.genre}`
        const description = document.createElement('p')
        description.textContent = `Description: \n${x.description}`
        const publisher = document.createElement('p')
        publisher.textContent = `Publisher: ${x.publisher}`
        const yearOfpublishing = document.createElement('p')
        yearOfpublishing.textContent = `Year of publishing: ${x.year}`
        const img = document.createElement('img')
        img.src = x.img
        divInfo.appendChild(title)
        divInfo.appendChild(author)
        divInfo.appendChild(genre)
        divInfo.appendChild(description)
        divInfo.appendChild(publisher)
        divInfo.appendChild(yearOfpublishing)
        divInfo.appendChild(img)
        divInfo.style.display = 'none'
        a.addEventListener('click', () => {
            if (divInfo.style.display == 'none') {
                divInfo.style.display = 'block'
            } else {
                divInfo.style.display = 'none'
            }
        })
        ul.appendChild(a)
        ul.appendChild(divInfo)
        ul.appendChild(document.createElement('br'))
    })
}