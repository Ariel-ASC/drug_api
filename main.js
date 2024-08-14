document.getElementById('fetchButton').addEventListener('click', function() {
    const drugName = document.getElementById('drugNameInput').value;
    if (drugName) {
        fetchDrugLabel(drugName);
    } else {
        alert("Please enter a drug name.");
    }
});

function fetchDrugLabel(drugName) {
    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${encodeURIComponent(drugName)}&limit=1`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                displayDrugInfo(data.results[0]);
            } else {
                document.getElementById('drugInfo').innerHTML = '<p>No drug information found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching drug label:', error);
            document.getElementById('drugInfo').innerHTML = '<p>Error fetching drug information.</p>';
        });
}

function displayDrugInfo(drugInfo) {
    const drugInfoDiv = document.getElementById('drugInfo');
    const brandName = drugInfo.openfda.brand_name ? drugInfo.openfda.brand_name.join(', ') : 'N/A';
    const genericName = drugInfo.openfda.generic_name ? drugInfo.openfda.generic_name.join(', ') : 'N/A';
    const purpose = drugInfo.purpose ? drugInfo.purpose.join(' ') : 'N/A';
    const usage = drugInfo.indications_and_usage ? drugInfo.indications_and_usage.join(' ') : 'N/A';

    drugInfoDiv.innerHTML = `
        <h2>${brandName}</h2>
        <p><strong>Generic Name:</strong> ${genericName}</p>
        <p><strong>Purpose:</strong> ${purpose}</p>
        <p><strong>Indications and Usage:</strong> ${usage}</p>
    `;
}