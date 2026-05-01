Papa.parse("data.csv", {

  download: true,
  header: true,

  complete: function(results) {

    const data = results.data;

    // region列だけ取り出す
    const region = data.map(item => item.region);

    // 重複削除
    const uniqueRegion = [...new Set(region)];

    // select取得
    const select = document.getElementById("region");

    // option追加
    uniqueRegion.forEach(region => {

      if(region){

        const option = document.createElement("option");

        option.value = region;
        option.textContent = region;

        select.appendChild(option);

      }

    });

  }

});
