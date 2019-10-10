'use strict';

const searchURL = 'https://api.github.com/users/';

function generateListItem(repo){
  return `<li><a href="${repo.html_url}"><h3>${repo.name}</h3><br>${repo.html_url}</a>`
}


function displayResults(responseJson) {
  const arr = [];
  responseJson.forEach(repo => {
    arr.push(generateListItem(repo));
  });
  $('#results-list').html(arr.join(""))
  $('#results').removeClass('hidden');
}



function getNews(query) {
  const url = searchURL + `${query}/repos`;

  console.log(url);


  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getNews(searchTerm);
  });
}

$(watchForm);