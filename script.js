let data = {};

Papa.parse("data.csv", {
  download: true,
  header: true,
  complete: function(results) {
    results.data.forEach(row => {
      data[row.region] = row;
    });

    const select = document.getElementById("region");

    Object.keys(data).forEach(region => {
      const option = document.createElement("option");
      option.value = region;
      option.textContent = region;
      select.appendChild(option);
    });
  }
});

function goPage() {
  const region = document.getElementById("region").value;
  const output = document.getElementById("output");

  if (!region) {
    output.innerHTML = "";
    return;
  }

  const item = data[region];

  if (!item) {
    output.innerHTML = "データが見つかりません";
    return;
  }

  output.innerHTML = `
    <h2>${item.region}</h2>
    <p>${item.tax}</p>
  `;
}
