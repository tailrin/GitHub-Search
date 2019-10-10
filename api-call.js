'use strict';

function getDogImage() {
  fetch(`https://dog.ceo/api/breeds/image/random/${$('#number-of-dogs').val()}`)
    .then(response => response.json())
    .then(responseJson => {
      const arr =[];
      responseJson.message.forEach(message => {
        arr.push(`<li><img src="${message}" class="images" alt="picture of a dog"></li>`);
        console.log(message);
      });
      $("#pictures").html(arr.join(""));
    });
    
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getDogImage();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
