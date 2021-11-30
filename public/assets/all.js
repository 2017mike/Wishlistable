document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
})

// M.AutoInit();
// document.addEventListener('DOMContentLoaded', function () {
//   var elems = document.querySelectorAll('select');
//   var instances = M.FormSelect.init(elems, {});
// })


function displaySignOut() {

  localStorage.getItem('token')
  if (localStorage.getItem("token") === null) {
    const signOut2 = document.createElement('li')
    signOut2.innerHTML = `
      <li  id="logInButtonMain"><a class="white-text" href="/login">Log In</a></li>
      `
    document.getElementById('signOutConditional').append(signOut2)
    document.getElementById('logInButtonMain').addEventListener('click', event => {
      window.location = '/login'
    })


  } else {

    const signOut1 = document.createElement('li')
    signOut1.innerHTML = `
      <li  id="signOutMain"><a class="white-text" href="/login">Sign Out</a></li>
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
      <li  id="logInButtonNav"><a class="white-text" href="/login">Log In</a></li>
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


