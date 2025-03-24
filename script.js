document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submitButton").addEventListener("click", handleForm);
});

PLAYER_SERVICE_URL = "http://localhost:5001";
CHARACTER_SERVICE_URL = "http://localhost:5002";
TAX_SERVICE_URL = "http://localhost:5003";


function handleForm() {
  // Get values from the form inputs
  const characterName = document.getElementById('c_name').value;
  const gold = parseInt(document.getElementById('gold').value);
  const silver = parseInt(document.getElementById('silver').value);
  const copper = parseInt(document.getElementById('copper').value);
  const player_id = parseInt(document.getElementById('player_id').value);
  const maritalStatus = document.getElementById('married').value;

  // Create an object with the data
  const characterData = {
      name: characterName,
      p_id: player_id,
      gold: gold,
      silver: silver,
      copper: copper,
      maritalStatus: maritalStatus
  };
console.log(CHARACTER_SERVICE_URL+'/api/characters');
  // Send a POST request using fetch
  fetch(CHARACTER_SERVICE_URL + '/api/characters', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(characterData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
  })
  .then(data => {
      console.log('Success:', data);
      alert('Character created successfully!');
  })
  .catch(error => {
      console.error('Error:', error);
      alert('There was a problem creating the character.');
  });
}

// Use the environment variable for the backend URL
const characterServiceUrl = "${CHARACTER_SERVICE_URL}";  // This is replaced by NGINX

// Function to fetch character data from the backend and display it
function fetchCharacters() {
    // Perform the GET request
    fetch(`${CHARACTER_SERVICE_URL}/api/characters`, { 
      method: 'GET',
      headers: {
          'Content-Type': 'application/json; charset=UTF-8'
      }})
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log('Fetched characters:', data);
            displayCharacters(data);  // Call the function to display characters
        })
        .catch(error => {
            console.error('Error fetching characters:', error);
            alert('There was a problem fetching the characters.');
        });
}

// Function to dynamically generate HTML for the character list
function displayCharacters(characters) {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = ''; // Clear any previous content

    // Loop through the fetched characters and display each one
    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character-item');

        // Populate with character details (this will depend on the structure of your objects)
        characterDiv.innerHTML = `
            <h3>${character.c_name}</h3>
            <p>Gold: ${character.gold}</p>
            <p>Silver: ${character.silver}</p>
            <p>Copper: ${character.copper}</p>
            <p>Marital Status: ${character.married}</p>
        `;
        
        // Append the character div to the list
        characterList.appendChild(characterDiv);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submitTaxButton").addEventListener("click", handleTaxForm);
  });


function handleTaxForm() {
    // Get values from the form inputs
    const taxLocation = document.getElementById('tax_location').value;
    const tax_location_id = parseInt(document.getElementById('tax_id').value);
    const amount = parseInt(document.getElementById('tax_amount').value);

  
    // Create an object with the data
    const locationData = {
        tax_id: tax_location_id,
        tax_amount: amount,
        tax_location: taxLocation
    };
  console.log(TAX_SERVICE_URL+'/api/tax');
    // Send a POST request using fetch
    fetch(TAX_SERVICE_URL + '/api/tax', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(locationData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Tax location created successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem creating the tax location.');
    });
  }
  
  // Use the environment variable for the backend URL
  const taxServiceUrl = "${TAX_SERVICE_URL}";  // This is replaced by NGINX
  
  // Function to fetch character data from the backend and display it
  function fetchTaxAmount() {
      // Perform the GET request
      fetch(`${TAX_SERVICE_URL}/api/tax`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }})
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json(); // Parse JSON response
          })
          .then(data => {
              console.log('Fetched tax location:', data);
              displayTaxAmount(data);  // Call the function to display characters
          })
          .catch(error => {
              console.error('Error fetching characters:', error);
              alert('There was a problem fetching the amount.');
          });
  }
  
  // Function to dynamically generate HTML for the character list
  function displayTaxAmount(tax) {
      const taxAmount = document.getElementById('taxAmount');
      taxAmount.innerHTML = ''; // Clear any previous content

      tax.forEach(tax => {
          const taxDiv = document.createElement('div');
          taxDiv.classList.add('tax-item');
  
          // Populate with character details (this will depend on the structure of your objects)
          taxDiv.innerHTML = `
              <h3>Tax based on ${tax.tax_location}: ${(tax.tax_amount) * 35}</h3>
          `;

          // Append the character div to the list
          taxAmount.appendChild(taxDiv);
        });
  }
  
