(function(){

  setInterval(function(){
    var tweetList = $("#timeline li[data-item-type='tweet']");
    $(tweetList).each(function(){
      // 画像が存在
      if($(this).find("div.AdaptiveMediaOuterContainer").length != 0){
        var userId = $(this).find(".stream-item-header > a.js-user-profile-link").attr("href").replace("/", "");
        // ストレージを検索し、一致した場合は画像を非表示
        hidePicture($(this), userId);
      }
    });
  },1000); // 更新間隔

})();

// 画像非表示処理
function hidePicture(obj, userId){
  // idで検索
  chrome.runtime.sendMessage({method: "getLocalStorage", key: userId}, function(response){
    if(response.data != undefined){
      // 対象を非表示
      obj.find("div.AdaptiveMediaOuterContainer").remove();
    }
  });
}

// コンソールログ出力
function print(str){
  console.log(str);
}