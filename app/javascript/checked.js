function check() {
  const posts = document.querySelectorAll(".post");//querySelectorAllメソッドで、postをクラス名にもつ要素を取得できます。
  posts.forEach(function (post) {//このpostは単なる引数。ここをpost___とかにしてこの関数内の（const item = XHR.response.post;以外の）全てのpostをpost___にしても変わらない。
    if (post.getAttribute("data-load") != null) {//getAttributeは、要素.getAttribute('属性名')で、要素の属性を取得することができる。この場合はpostのid.
     return null;
    }
    post.setAttribute("data-load", "true");
    ///////////////////////////////////////////////////
    //1.既読にしたい要素をクリック                       //
    //２イベントハンドラーが動きコントローラーへデータを渡す。//
    //////////////////////////////////////////////////
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");//2-1 getAttributeで属性値を取得することができる。メモのidを取得。data-idはビューファイルで記述したカスタムデータ
      const XHR = new XMLHttpRequest();　         //2-2 XMLHttpRequestは、Ajaxを可能にするため
      XHR.open("GET", `/posts/${postId}`, true); //2-3どのようなリクエストをするのか。第一引数：HTTPメソッド、第二引数：パス これ URLパラメーター（？）今回はpathパラーメータとQueryパラメーターのうちpathパラメーター。　第三引数：非同期通信であるか。
      XHR.responseType = "json";                 //2-4レスポンスの形式。
      XHR.send();                                //2-5メソッドを記述することで、はじめてリクエストが行える。ここでコントローラに処理をパス。
      /////////////////////////////////////////////////////
      //4.返却されたデータを元に任意の値をHTMLへ反映             //
      ////////////////////////////////////////////////////
      XHR.onload = () => {//コントローラーからレスポンスの受信が成功したら呼び出されるイベントハンドラー
        if (XHR.status != 200) { //レスポンスがエラーなら何もしない
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;
        if (item.checked === true) {//===だとboolean同士で確認
          post.setAttribute("data-check", "true");//setAttributeを用いることで、指定した要素上に新しい属性を追加、または既存の属性の値を変更します。要素.setAttribute(name,value)  nameは属性の名前を文字列で指定します。valueは属性に設定したい値を指定します。
        } else if (item.checked === false) {
          post.removeAttribute("data-check");//removeAttributeで属性ごと削除
        }
      };
     });
   });
}
setInterval(check, 1000);//これは、1秒に一回呼ばれるというよりも、一秒に1回、設定を追加する感じ。
                          //つまり、対策を取らない限りは、引数が1000なら、1秒までは処理すらできなくて、1~2秒までは意図通り動いて、2~3秒までは一回のクリックで２回発動して...という感じになる。
//window.addEventListener("load", check);