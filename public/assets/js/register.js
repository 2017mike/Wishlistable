
document.getElementById('register').addEventListener('click', event => {
  event.preventDefault()
  let goBack = false
  axios.get(`/api/users`, {

  })
    .then(({ data }) => {
      // console.log(data)
      data.forEach(user => {
        // console.log(user.username)
        if (user.username == document.getElementById('username').value) {
          alert('that username is not available')
          goBack = true
          return
        }
      })
      axios.post('/api/users/register', {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      })
        .then(() => {
          if (!goBack) {
            window.location = '/login'
          }
        }
        )
        .catch(err => console.error(err))

    })

})