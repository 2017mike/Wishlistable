$(document).ready(function () {
  $('.modal').modal()
})

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {});
});

let listId = window.location.pathname.substr(window.location.pathname.length - 10);


let newListData
let newID

let newestID



//we make an axios get for all of the user's lists and find the one with the matching URL. We then make an axios request for all of the items within that list to be added to the page. The trash can icon contains the dataset-id of the item, and once it's clicked it is deleted according to that id. 
axios.get(`/api/lists/users`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data }) => {
    // console.log(data)

    if (data.length == 0) {
      // console.log('nothing')
    }


    data.forEach(list => {
      if (listId == list.randomURL) {
        newID = list.id
        newListTitle = list.title
        // console.log(newID)
        newListData = list
      }
    })

    // console.log(newID)
    document.getElementById('title').innerHTML = `<h2> ${newListTitle} </h2>`
    // console.log(newListTitle)


    axios.get(`/api/items`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(({ data }) => {
        // console.log(data), 'items'

        data.forEach(item => {

          // console.log(newID)
          if (item.lid == newID) {
            // console.log('da same')
            document.getElementById('myItemsDiv').innerHTML += `
                <li  class = "collection-item black white-text"> ${item.description} <a class="truncate" target="_blank" href="${item.link}">${item.link}</a> 
                <i data-id='${item.id}' class="material-icons deleteBtn red-text">delete</i>
                </li>
                `
          }
        }
        )
      })

  })

  .catch(err => console.log(err))


document.getElementById('addItem').addEventListener('click', event => {
  event.preventDefault()
  if (document.getElementById('myDescription').value == '' && document.getElementById('myLink').value == '') {
    alert('you must have either a description or a link')
    return
  }
  let linkArea = document.getElementById('myLink').value
  // console.log(linkArea)
  let subStringedLink = linkArea.substring(0, 3)

  if (subStringedLink === '') {
    linkArea = linkArea
  }
  else if (subStringedLink === 'www') {
    linkArea = 'https://' + linkArea
    // console.log(subStringedLink)
  }
  else if (subStringedLink != 'htt') {
    linkArea = 'https://www.' + linkArea
  }


  let item = {
    description: document.getElementById('myDescription').value,
    link: linkArea,
    isDone: false,
    lid: newListData.id
  }
  //create comment call
  axios.post('/api/items', item, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data }) => {
      // console.log(data)
      document.getElementById('myDescription').value = ''
      document.getElementById('myLink').value = ''
      document.getElementById('myItemsDiv').innerHTML += `
          <li class ="collection-item black white-text"> ${data.description} <a class="truncate" target="_blank" href="${data.link}">${data.link}
            
            </a> 
          <i data-id='${data.id}' class="material-icons deleteBtn red-text">delete</i>
          </li>
          `
    })
    .catch(err => console.log(err))
})


document.addEventListener('click', event => {

  if (event.target.classList.contains('deleteBtn')) {

    axios.delete(`/api/items/${event.target.dataset.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {

        window.location.reload()

      })
  }
})


document.getElementById('shareList').addEventListener('click', event => {
  document.getElementById('shareLink').innerHTML = `
      <h5> Shareable Link: </h5>
  <input class="black white-text" value="https://www.wishlistable.com/list/${listId}" id="copyableLink"></input>
  <button class="btn-small" id="copyLink"> copy link </button>

  `
  function Copy() {

    let newUrl = document.getElementById('copyableLink')
    // console.log(newUrl)
    newUrl.select();
    document.execCommand("copy")
    alert('link copied! :)')
  }
  document.getElementById('copyLink').addEventListener('click', event => {
    Copy()
  })
})


