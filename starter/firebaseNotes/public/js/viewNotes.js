let googleUser;
const colors = ["lightRed", "lightOrange","yellow","lightGreen","lightBlue","lightPink"];
let randColor = Math.floor((Math.random() * colors.length));
window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userId) => {
    console.log("logged in as user" + userId);
    // get access to all the current user's notes
    const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value', (snapshot) => {
       const data = snapshot.val();
       renderData(data);
    });
};

const renderData = (data) => {
      const destination = document.querySelector('#app');
      destination.innerHTML = "";
      for (let key in data) {
        const note = data[key];
        randColor = Math.floor((Math.random() * 5) + 1);
        destination.innerHTML += createCard(note);
}

};
//added style within html 
const createCard = (note) => {
    return `<div class="column is-one-quarter"> 
               <div class = "card" style = "background: ${colors[randColor]}">
               <div class = card-header><p>${note.title}</p></div>
               <div class = "card-content">${note.text} - ${googleUser.val}</div>
            </div>`;

}