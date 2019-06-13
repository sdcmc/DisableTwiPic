$(function (){

  // 初期処理
  (function(){
    Object.keys(localStorage).forEach(function(key){ 
      addRow(key);
    });
  }());

  // 追加ボタン押下処理
  $("#btn").on("click",function(){
    
    // スペースをトリムしてidを取得
    var userId = $("#userId").val().trim();
    
    // idが取得できない場合
    if(userId == ""){
      return false;
    }
    
    // エスケープが必要な場合
    if(existsEscape(userId)){
      return false;
    }
    
    // 登録されているidの場合
    if(localStorage[userId] == "1"){
      return false;
    }
    
    // localStorageの登録
    localStorage[userId] = "1";
    
    // 一覧にidを追加
    addRow(userId);

    // テキストをクリア
    $("#userId").val("");
  });

  // 削除ボタン押下処理
  // 動的に生成した要素にもイベントを付与
  $(document).on("click", ".btn-danger" ,function(){
    
    // id取得
    var id = $(this).attr("id");
    
    // localStorageからidを削除
    localStorage.removeItem(id);
    
    // 対象行を削除
    $(".tr_" + id).remove();
  });

  // 行追加処理
  function addRow(userId){
    // 要素の生成
    var tr = $("<tr />", {
      "class" : "tr_" + userId
    });
    
    var td = $("<td />", {
    });
    
    var divMain = $("<div />", {
      "class" : "row"
    });

    var divBlock1 = $("<div />", {
      "class" : "col-8"
    });
    
    var divBlock2 = $("<div />", {
      "class" : "col-4"
    });
    
    var delButton = $("<input />", {
      id : userId,
      type: "button",
      value: "Del",
      "class": "btn-danger"
    });

    // 生成した要素を構成
    divBlock1.append(userId);
    divBlock2.append(delButton);
    divMain.append(divBlock1).append(divBlock2);
    td.append(divMain);
    tr.append(td);
    
    // 構成した要素を最終行に追加
    $('#userList tbody > tr:last').after(tr);
  }

  // エスケープが必要か判定する処理
  function existsEscape(text){
    if(text.match(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/)){
      // 要エスケープ
      return true;
    }
  }

});