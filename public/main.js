var emailedContact = document.getElementsByClassName("fa-solid fa-envelope");
var coffeeChats = document.getElementsByClassName("fa-solid fa-mug-hot");
var trash = document.getElementsByClassName("fa-trash");
var editButtons = document.getElementsByClassName("fa-pen-to-square");
var submitButtons = document.querySelectorAll('li button')


Array.from(emailedContact).forEach(function(element) {
  element.addEventListener('click', function(){
    const id = this.parentNode.parentNode.getAttribute("data-contact-id")
    let parentElement = element.closest('li')
    console.log(parentElement);
    console.log(parentElement.querySelector(".name").innerText)
    console.log('Email button clicked');
    fetch('emailed', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': parentElement.querySelector(".name").innerText,
        'email': parentElement.querySelector(".email").innerText,
        'company': parentElement.querySelector(".company").innerText,
        'role': parentElement.querySelector(".role").innerText,
        'comments': parentElement.querySelector(".comments").innerText
      })
      
    })
    .then(response => {
      if (response.ok) return response.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload(true); 
    });
  });
});
  Array.from(coffeeChats).forEach(function(element) {
    element.addEventListener('click', function() {
      const id = this.parentNode.parentNode.getAttribute("data-contact-id")
      let parentElement = element.closest('li')
      console.log(parentElement);
      console.log(parentElement.querySelector(".name").innerText)
      console.log('Coffee chat button clicked');
      fetch('coffeechats', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'name': parentElement.querySelector(".name").innerText,
          'email': parentElement.querySelector(".email").innerText,
          'company': parentElement.querySelector(".company").innerText,
          'role': parentElement.querySelector(".role").innerText,
          'comments': parentElement.querySelector(".comments").innerText
        })
      })
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        console.log(data);
        window.location.reload(true);
      });
    });
  });




Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const id = this.parentNode.parentNode.getAttribute("data-contact-id")
      let parentElement = element.closest('li')
      console.log(parentElement);
      console.log(parentElement.querySelector(".name").innerText)
    console.log('Trash button clicked');
    fetch('contacts', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          'name': parentElement.querySelector(".name").innerText,
          'email': parentElement.querySelector(".email").innerText,
          'company': parentElement.querySelector(".company").innerText,
          'role': parentElement.querySelector(".role").innerText,
          'comments': parentElement.querySelector(".comments").innerText
      })
    })
    .then(response => {
      window.location.reload(true); 
    });
  });
});

Array.from(editButtons).forEach(function(editButton) {

  editButton.addEventListener('click', function(){
  console.log(editButton.closest('form').querySelectorAll('.nameInput'))
  Array.from(editButton.closest('form').querySelectorAll('.nameInput')).forEach(element => element.classList.toggle('showInput'))
  Array.from(editButton.closest('form').querySelectorAll('.newEmail')).forEach(element => element.classList.toggle('showInput'))
  Array.from(editButton.closest('form').querySelectorAll('.newCompany')).forEach(element => element.classList.toggle('showInput'))
  Array.from(editButton.closest('form').querySelectorAll('.newRole')).forEach(element => element.classList.toggle('showInput'))
  Array.from(editButton.closest('form').querySelectorAll('.newComments')).forEach(element => element.classList.toggle('showInput'))
})
})

Array.from(submitButtons).forEach((submitButton) => { 
  submitButton.addEventListener('click', function(event){
    event.preventDefault()
    let parentElement = submitButton.closest('li')
    fetch('contactsupdated', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': parentElement.querySelector(".name").innerText,
        'newName': parentElement.querySelector(".newName").value,
        'email': parentElement.querySelector(".email").innerText,
        'newEmail': parentElement.querySelector(".newEmail").value,
        'company': parentElement.querySelector(".company").innerText,
        'newCompany': parentElement.querySelector(".newCompany").value,
        'role': parentElement.querySelector(".role").innerText,
        'newRole': parentElement.querySelector(".newRole").value,
        'comments': parentElement.querySelector(".comments").innerText,
        'newComments': parentElement.querySelector(".newComments").value,
      })
      
    })
    .then(response => {
      if (response.ok) return response.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload(true); 
    });
})})