function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));//ここは既読機能と異なるところ. FormDataとは、フォームに入力された値を取得できるオブジェクトのことです。new FormData(フォームの要素);のように、オブジェクトを生成し、引数にフォームの要素を渡すことで、そのフォームに入力された値を取得できます。
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {//200以外のHTTPステータスが返却された場合の処理を書いておきましょう。
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post; //itemは、レスポンスとして返却されたメモのレコードデータを取得しています。
      const list = document.getElementById("list"); //listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得しています。
      const formText = document.getElementById("content");//次にformTextを取得する理由は、メモの入力フォームをリセットするためです。この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、リセットする必要があります。ここではリセット対象の要素であるcontentという要素を取得しています。
                                                           //contentは、htmlにidとして設定したもの
      //このコードは、「メモとして描画する部分のHTML」を定義しています。HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画されるわけです。
      const HTML = `                                        
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
      //ここまで
      list.insertAdjacentHTML("afterend", HTML); //listという要素に対して、insertAdjacentHTMLでHTMLを追加します。
      formText.value = ""; //このコードにより、「メモの入力フォームに入力されたままの文字」はリセットされます。正確には、空の文字列に上書きされるような仕組みです。
    };
    e.preventDefault();//memo.jsの処理が重複しないようにしましょう
  });
}
window.addEventListener("load", memo);