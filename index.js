document.addEventListener("DOMContentLoaded", function() 
{
    const booksURL = `http://localhost:3000/books`
    const userURL = `http://localhost:3000/users`
    let bookList = document.getElementById('list-panel')
    let displayTab = document.getElementById('show-panel')
    let user;

    function fetchBooks()
    {
        fetch(booksURL)
        .then(res => res.json())
        .then(data => 
            {
                console.log(data)
                data.forEach(book => renderBooks(book))
            })
    }

    function renderBooks(book)
    {
        let ul = document.getElementById('list')
        let li = document.createElement('li')
         li.innerText = book.title
        li.addEventListener('click', (e) => 
        {
            e.preventDefault()
            displayUsers(book)
        })
        ul.append(li)
    }

    function displayUsers(book)
    {
        displayTab.innerHTML = ''
        let h1 = document.createElement('h1')
         h1.innerText = book.title
        let img = document.createElement('img')
         img.src = book.img_url
        let pTag = document.createElement('p')
         pTag.innerText = book.description
        let users = document.createElement('li')
         users.innerText = book.users.map(user => user.username)
        let btn = document.createElement('button')
         btn.innerText = "Read Book"
         btn.addEventListener('click', (e) => 
         {
             e.preventDefault()
             addUser1(book)
         })
         displayTab.append(h1,img,pTag,users,btn)
    }

    function addUser1(book)
    {
        fetch(userURL)
        .then(res => res.json())
        .then(data => 
            {
                user = data[0]
            })
        .then(() => 
        {
            book.users.push(user)
            fetch(`http://localhost:3000/books/${book.id}`, 
            {
                method: 'PATCH',
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "users": book.users
                    })
            })
            .then(res => res.json())
            .then(data => 
                {
                    data.users.map(user => user.username)
                    displayUsers(book)
                })
        })
    }
fetchBooks()
});
