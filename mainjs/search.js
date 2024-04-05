function search() {
	const searchInput = document.getElementById('searchInput').value.toLowerCase();
	const resultsContainer = document.getElementById('results');
	resultsContainer.innerHTML = '';

	if (searchInput.trim() === '') {
		return; // If the input is empty, do not display any results
	}

	fetch('./mainjs/search.json') // Replace 'your_external_data.json' with the actual path to your JSON file
		.then(response => response.json())
		.then(data => {
			for (const key in data) {
				const name = data[key].name.toLowerCase();

				if (name.includes(searchInput)) {
					const listItem = document.createElement('li');
					listItem.className = 'result-item';
					listItem.textContent = name;
					listItem.setAttribute('data-url', data[key].url);
					listItem.addEventListener('click', redirectToURL);
					resultsContainer.appendChild(listItem);
				}
			}
		})
		.catch(error => console.error('Error fetching data:', error));


}

function redirectToURL(event) {
	const selectedUrl = event.currentTarget.getAttribute('data-url');
	window.location.href = selectedUrl;
}



window.addEventListener('DOMContentLoaded', function() {
	var searchInput = document.getElementById('searchInput');
	var searchBa = document.querySelector('.search-ba');

	// 监听文本框输入事件
	searchInput.addEventListener('input', function() {
		if (searchInput.value.trim() === '') {
			// 文本框为空时，将search-ba的高度设置为100%
			searchBa.style.height = '0';
		} else {
			// 文本框不为空时，将search-ba的高度设置为200px
			searchBa.style.height = '430px';
		}
	});
});