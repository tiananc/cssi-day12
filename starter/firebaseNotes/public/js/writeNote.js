let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
    console.log("note submission function called");
   const noteTitle = document.querySelector("#noteTitle");
   const noteText = document.querySelector("#noteText");
    
   let theTitle = noteTitle.value;
   let theText = noteText.value;
   
    const note = {
        title: noteTitle.value,
        text: noteText.value
    };
    
    
    const dbRef = firebase.database().ref(`users/${googleUser.uid}`);
    dbRef.push(note);

    noteTitle.value = "";
    noteText.value = "";
}
