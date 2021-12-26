
document.addEventListener('click', event => {
  if (event.target.classList.contains('modal-trigger')) {
    // console.log('ping')
    let nextSibling = event.target.nextElementSibling
    console.log(nextSibling.textContent)
    nextSibling.classList.remove('hidden')
    document.addEventListener('click', event => {
      window.location.reload()
    })
  }
})


document.addEventListener('click', event => {
  if (event.target.classList.contains('cancel')) {
    window.location.reload()
  }
})




document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
})

M.AutoInit();
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
})

let listId = window.location.pathname.substr(window.location.pathname.length - 10);

let newListData
let newID
let usersSavedLists

axios.get(`/api/list/${listId}`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data }) => {

    newListData = data
    // console.log(newListData.id)
    newID = newListData.id
    // console.log(newListData, 'lists')
    document.getElementById('title').innerHTML =
      `<h2> ${data.title} </h2>
        by <h4> ${data.User.username} </h4>
        <i id="mySaveButton" data-id="${newID}" class="material-icons blue-text mySave">stars</i>
        `
    document.title = `${data.User.username}'s wishlist`

    axios.get(`/api/items`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data }) => {


        data.forEach(item => {

          // console.log(newID)
          if (item.lid == newID) {

            if (item.isDone) {
              document.getElementById('boughtItemsDiv').innerHTML += `
                <li data-description='${item.description}' class="collection-item black white-text"> ${item.description}
                <a class="truncate" data-link="${item.link}" target="_blank" href="${item.link}">${item.link}</a> 
                </li>
                `
            } else {

              document.getElementById('myItemsDiv').innerHTML += `
                <li data-description='${item.description}' class="collection-item black white-text"> ${item.description}
                <a class="truncate" data-link="${item.link}" target="_blank" href="${item.link}">${item.link}</a> 
                <br>
                <i  class="material-icons green-text modal-trigger">check</i>
                <div class="myModal hidden">
                  <div class="modal-content black white-text">
                  Clicking this means that you have bought the item. Please click the checkmark below if you have bought this item! If not, press cancel or anywhere else on the page. 
                  <br>
                  <br>
                  <br>
                  <div class="center">
                  <i class="material-icons checkBtn green-text center" data-id='${item.id}'>check</i>
                  <br>
                  <br>
                  <i class="material-icons red-text center cancel">cancel</i>
                  </div>
                  </div>
                </div>
                </li>
                `

            }

          }
        }
        )
        axios.get('/api/savedLists/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(ress => {
            console.log(ress.data, 'this is savedLists')
            usersSavedLists = ress.data
            ress.data.forEach(list => {
              if (list.listId == newListData.id) {
                console.log(list.listId, newListData.id)
                document.getElementById('mySaveButton').classList.remove('blue-text')
                document.getElementById('mySaveButton').classList.add('yellow-text')
              }
            })
          })
      })
  })

  .catch(err => console.log(err))


document.addEventListener('click', event => {

  if (event.target.classList.contains('checkBtn')) {

    let upDatedItem = {
      description: event.target.dataset.description,
      link: event.target.dataset.link,
      isDone: true
    }
    axios.put(`/api/items/${event.target.dataset.id}`, upDatedItem, {

    })
      .then(res => {
        // console.log('updated')
        window.location.reload()

      })

  }
})

function displaySignOut() {

  localStorage.getItem('token')
  if (localStorage.getItem("token") === null) {
    const signOut2 = document.createElement('li')
    signOut2.innerHTML = `
      <li class="white-text" id="logInButtonMain"><a class="white-text" href="/login">Log In</a></li>
      `
    document.getElementById('signOutConditional').append(signOut2)
    document.getElementById('logInButtonMain').addEventListener('click', event => {
      window.location = '/login'
    })


  } else {

    const signOut1 = document.createElement('li')
    signOut1.innerHTML = `
      <li class="white-text" id="signOutMain"><a class="white-text" href="/login">Sign Out</a></li>
      `
    document.getElementById('signOutConditional').append(signOut1)
    document.getElementById('signOutMain').addEventListener('click', event => {
      localStorage.removeItem('token')
      window.location = '/login'
    })

  }
}

function displaySignOutNav() {

  localStorage.getItem('token')
  if (localStorage.getItem("token") === null) {
    const signOut2 = document.createElement('li')
    signOut2.innerHTML = `
      <li class="white-text" id="logInButtonNav"><a class="white-text" href="/login">Log In</a></li>
      `
    document.getElementById('signOutNav').append(signOut2)
    document.getElementById('logInButtonNav').addEventListener('click', event => {
      window.location = '/login'
    })
  } else {

    const signOut1 = document.createElement('li')
    signOut1.innerHTML = `
      <li  id="signOutButtonNav"><a class="white-text" href="/login">Sign Out</a></li>
      `
    document.getElementById('signOutNav').append(signOut1)
    document.getElementById('signOutButtonNav').addEventListener('click', event => {
      localStorage.removeItem('token')
      window.location = '/login'
    })
  }
}


displaySignOut()
displaySignOutNav()


document.getElementById('makeYourOwnBtn').addEventListener('click', event => {
  if (localStorage.getItem('token')) {
    window.location = '/home'
  } else {
    window.location = '/register'
  }
})


//save button event listener
document.addEventListener('click', event => {
  if (event.target.classList.contains('mySave')) {
    let isSaved = false
    console.log(usersSavedLists)

    let newSavedList = {
      listId: event.target.dataset.id
    }

    console.log(event.target.dataset.id)
    console.log(newListData.id)

    usersSavedLists.forEach(list => {
      console.log(list.listId, 'savedList id')
      console.log(newListData.id, 'list id')

      if (newListData.id == list.listId) {
        console.log(newListData.id, list.listId)
        isSaved = true
      }
    })
    if (isSaved == false) {
      axios.post('/api/savedLists', newSavedList, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          console.log(res, 'list saved!')
          alert('list saved!')
          // window.location.reload()
          document.getElementById('mySaveButton').classList.remove('blue-text')
          document.getElementById('mySaveButton').classList.add('yellow-text')

        })
    } else {
      console.log('you already have dis list saved yo')
      axios.delete(`/api/savedList/${newListData.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          console.log('list unsaved!')
          alert('list unsaved!')
          document.getElementById('mySaveButton').classList.add('blue-text')
          document.getElementById('mySaveButton').classList.remove('yellow-text')
        })
        .catch(err => console.log(err))
    }
  }
})


  //save button coloration (saved or unsaved)

