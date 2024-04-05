// Function to fetch JSON data
function fetchJSON() {
    fetch('./js/PhigrosHS.json')
        .then(response => response.json())
        .then(data => {
            displayJSON(data);
        })
        .catch(error => {
            console.error('Error fetching JSON: ', error);
        });
}

// Function to display JSON data
function displayJSON(data) {
    const container = document.getElementById('json-display');

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key];
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <h5>${item.name}</h5>
				<p>${item.brief}</p>
                <a href="${item.url}" target="_blank">下载</a>
            `;
            container.appendChild(itemDiv);
        }
    }
}

// Call fetchJSON function when the page loads
document.addEventListener('DOMContentLoaded', fetchJSON);




