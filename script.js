let data = [];

//taxSelect（税の種類を選択）
Papa.parse("data.csv", {
  download: true,
  header: true,
  complete: function(results) {
    data = results.data;

    const taxSelect = document.getElementById("taxSelect");

    // tax一覧を重複なしで作る
    const taxes = [...new Set(data.map(d => d.tax))];

    taxes.forEach(tax => {
      const option = document.createElement("option");
      option.value = tax;
      option.textContent = tax;
      taxSelect.appendChild(option);
    });
  }
});

//regionSelect（自治体を選択）
function updateRegion() {
  const tax = document.getElementById("taxSelect").value;
  const regionSelect = document.getElementById("regionSelect");

  regionSelect.innerHTML = `<option value="">自治体を選択</option>`;

  const filtered = data.filter(d => d.tax === tax);

  filtered.forEach(d => {
    const option = document.createElement("option");
    option.value = d.region;
    option.textContent = d.region;
    regionSelect.appendChild(option);
  });
}

//output（表示）
async function showData() {
  const region = document.getElementById("regionSelect").value;
  const output = document.getElementById("output");

  output.innerHTML = "";

  // 一覧なら全部表示
if (region === "一覧") {

  const tax = document.getElementById("taxSelect").value;

  const filtered = data.filter(
    d => d.tax === tax && d.region !== "一覧"
  );

  for (const d of filtered) {
    const response = await fetch("./" + d.page.trim());
    const text = await response.text();

    output.innerHTML += `
      <div class="box">
        <h2>${d.region}</h2>
        ${text}
      </div>
    `;
  }

  return;
}
  // 通常表示
  const item = data.find(d => d.region === region);

  if (!item) return;

  const response = await fetch(item.page);
  const text = await response.text();

  output.innerHTML = `
    <div class="box">
      <h2>${item.region}</h2>
      ${text}
    </div>
  `;
}
