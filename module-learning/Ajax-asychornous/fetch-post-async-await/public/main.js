// information to reach API
const apiKey = '470d78440f7d418c869ffd7bf3ae5681';
const url = 'https://api.rebrandly.com/v1/links';

// Some page elements
const inputField = document.querySelector('#input');
const shortenButton = document.querySelector('#shorten');
const responseField = document.querySelector('#responseField');

// AJAX functions
// Code goes here
// const shortenUrl = async () => {
//   const urlToShorten = inputField.value;
//   const data = JSON.stringify({
//     destination: urlToShorten
//   })

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       body: data,
//       headers: {
//         'Content-type': 'application/json',
//         'apikey': apiKey
//         }
//     })
//     if(response.ok){
//       const jsonResponse = await response.json();
//       renderRawResponse(jsonResponse);
//     }

//   } catch(error){
//     console.log(error);
//   }
// }

// https://developers.rebrandly.com/docs

async function shortenUrl() {
  let linkRequest = JSON.stringify({
    destination: inputField.value,
    domain: { fullName: 'rebrand.ly' }
    //, slashtag: "A_NEW_SLASHTAG"
    //, title: "Rebrandly YouTube channel"
  });

  let requestHeaders = {
    'Content-Type': 'application/json',
    apikey: apiKey
    // "workspace": "YOUR_WORKSPACE_ID"
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: linkRequest,
      headers: requestHeaders
    });
    if (res.ok) {
      const jsonRes = await res.json();
      renderResponse(jsonRes);
    }
    throw new Error('Reques failed!');
  } catch (e) {
    console.log(e);
  }
}

// Clear page and call AJAX functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while (responseField.firstChild) {
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
};

shortenButton.addEventListener('click', displayShortUrl);
