console.log("script動いた");

Papa.parse("data.csv", {

  download: true,
  header: true,

  complete: function(results) {

    const data = results.data;

    const select = document.getElementById("region");

    data.forEach(item => {

      if(item.region){

        const option = document.createElement("option");

        option.value = item.page;
        option.textContent = item.region;

        select.appendChild(option);

      }

    });

    // 選択時イベント
    select.addEventListener("change", function() {

      if(this.value){

        window.location.href = this.value;

      }

    });

  }

});
