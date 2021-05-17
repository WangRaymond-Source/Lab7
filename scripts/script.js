// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
var entryCount = 1;
// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        //id each entry 
        newPost.setAttribute('id', entryCount);
        newPost.className = entryCount;
        entryCount++;
       
        //add event listener to each entry
        newPost.addEventListener('click', () =>{
          //remove entry-page
          document.querySelector('body').removeChild(document.querySelector('entry-page'));
          //add the entry-page back
          let addEntryPage = document.createElement('entry-page');
          document.querySelector('body').appendChild(addEntryPage);
          
          //entry-Page element
          let entryPage = document.querySelector('entry-page');
          //append the entry details to entry page
          entryPage.entry = entry;
          //set entry id
          entry.id = newPost.getAttribute('id');
          //change the header name
          document.querySelector('h1').textContent = "Entry " + newPost.getAttribute('id');
          //append it to the class ----> single-entry
          document.body.className = "single-entry";
          //set state
          router.setState(entry);
        });
      });
    });
});
//when the header is clicked it should bring you back to the front page
var headerTag = document.getElementsByTagName('h1')[0];
headerTag.addEventListener('click' , () => {
  //change header tag
  document.querySelector('h1').textContent = "Journal Entries";
  document.body.removeAttribute('class');
  //set state
  router.setState("","");
});

//if settings button is being clicked
var settingButton = document.getElementsByTagName('img')[0];
settingButton.addEventListener('click',() =>{
  //change header tag
  document.querySelector('h1').textContent = "Settings";
  //append it to the class ---> settings in css
  document.body.className = "settings";
  //set state
  router.setState("","#settings");
});
//event when user click back or forward
window.addEventListener('popstate', (event) =>{
  router.getState(window.location.href, event.state);
});

//back/forward button for entry#








