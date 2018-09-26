$(function(){
    function parameter(){
        var url=decodeURIComponent(document.location.href);
        var obj={};
        var tem=[];
        var ary=url.split("?")[1].split("&");
        for(var i=0;i<ary.length;i++){
            var cur=ary[i];
            tem= cur.split("=");
            obj[tem[0]]=tem[1];
        }
        return obj;
      }
    
    var pre=window.location.origin;
    //埋点的接口
    function burialPoint (){
        var uid=parameter().uid||"";
        var token=parameter().token||"";
        var activityId=parameter().activityId||"";
        var source=parameter().source||"";
        //活动埋点
        $ajax({
            type:"get",
            url:pre+"/xcbb_web/mobile/api/headlines/clickCount?uid="+uid+"&token="+token+"&activityId="+activityId+"&source="+source,
            success:function(data){
                
            }
            
        })
      }
    burialPoint();
    
})