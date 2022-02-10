"use strict";

{
  // 各DOMの取得
  const post_code = document.getElementById("post_code");
  const post_code_button = document.getElementById("post_code_button");
  const prefecture = document.getElementById("prefecture");
  const prefectures = document
    .getElementById("prefecture")
    .getElementsByTagName("option");
  const municipalities = document.getElementById("municipalities");
  const address3 = document.getElementById("address3");
  const add1 = document.getElementById("add1");
  const add2 = document.getElementById("add2");
  const add3 = document.getElementById("add3");
  const conf = document.getElementById("conf");

  function fetchPostCodeApi(num) {
    return `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${num}`;
  }

  post_code_button.addEventListener("click", function (e) {
    e.preventDefault();
    let post_num = post_code.value;
    post_num = post_num.replace("-", "");
    async function fetchJson(num) {
      const result = await fetchPostCodeApi(num); //郵便番号apiの取得
      fetch(result)
        .then(function (data) {
          //json形式に変更してreturn
          return data.json();
        })
        .then(function (json) {
          // returnされたjsonを取得
          console.log(json.results[0].address1, json.results[0].prefcode);
          // プルダウンのvalueに一致するprefcodeを検索して選択する
          for (let i = 0; i < prefectures.length; i++) {
            if (prefectures[i].value == json.results[0].prefcode) {
              prefectures[i].selected = true;
            }
          }
          // 市区町村の部分にoptionを生成し、
          let municipality = document.createElement("option");
          municipality.textContent = json.results[0].address2;
          municipality.selected = true;
          municipalities.appendChild(municipality);

          // address3にapiから取得したaddress3の値を設定
          address3.value = json.results[0].address3;
        });
    }
    fetchJson(post_num);
  });

  conf.addEventListener("click", function (e) {
    e.preventDefault();
    let p = document.createElement("p");
    let span = document.createElement("span");
    p.appendChild(span);
  });
}
