localStorage.getItem('token')
if (localStorage.getItem("token") === null) {
  window.location = '/register'
}


function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

document.getElementById("addList").addEventListener('click', event => {
  document.getElementById('myListRow').classList.remove('hidden')
})

document.getElementById('createList').addEventListener('click', event => {
  event.preventDefault()
  let randomURL = makeid(10)
  // console.log(randomURL)


  // console.log(tabField.value)
  let newList = {
    title: document.getElementById('listTitle').value,
    randomURL: randomURL
  }
  axios.post('/api/lists', newList, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => {
      // console.log(res)
      // alert('your list has been created :)')
      window.location = `./makeList/${randomURL}`
    })

})

axios.get(`/api/lists/users`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data }) => {
    // console.log(data)

    data.forEach(list => {
      document.getElementById('myLists').innerHTML += `
          
          <h5><a data-link="${list.randomURL}" href="/makeList/${list.randomURL}">${list.title}</a></h5>
          
          
          `
    })
  })
