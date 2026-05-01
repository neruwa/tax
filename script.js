console.log("script動いた");

Papa.parse("data.csv", {

  download: true,
  header: true,

  complete: function(results) {

    console.log(results.data);

    const data = results.data;

    // region列だけ取得
    const regions = data.map(item => item.region);

    // 重複削除
    const uniqueRegions = [...new Set(regions)];

    // select取得
    const select = document.getElementById("region");

    // option追加
    uniqueRegions.forEach(region => {

      if(region){

        const option = document.createElement("option");

        option.value = region;
        option.textContent = region;

        select.appendChild(option);

      }

    });

  }

});
