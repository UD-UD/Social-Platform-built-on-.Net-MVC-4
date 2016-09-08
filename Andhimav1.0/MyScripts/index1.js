$(document).ready(function(){
var data = {items: [
    {name: "Mahendra", msg: "Hello everybody. Enjoy Your Flight",date:"12-Jun-2012"},
    {name: "Srendra", msg: "Congratulation on Your Success.",date:"12-Jun-2012"},
    {name: "Bhopendra", msg: "Stay Happy And Prosper.",date:"12-Jun-2012"}
]};
for(i=0;i<data.items.length;i++){
     
$("#comment-list").append('<li><img src="img/profile.png" id="userIDimag" alt="Smiley face" height="35" width="35"><div class="comment-content"><span><a href="www.google.com" id="commentorID">'+data.items[i].name+'</a><p class="comment-message">'+data.items[i].msg+'</p></span><div><span style="float:left;font-size: 12px;color: #D2D5D6;">Reply</span><span style="float:right;font-size: 12px;color: #D2D5D6;" id="DOP">'+data.items[i].date+'</span></div></div></li>');
  
}
    
     $(document).on('keypress', "#write-comment", function (e) {
         if (e.keyCode == 13) {
             var commentlatest = document.getElementById("write-comment").value;
             
             $("#comment-list").append('<li><img src="img/profile.png" id="userIDimag" alt="Smiley face" height="35" width="35"><div class="comment-content"><span><a href="www.google.com" id="commentorID">Nikhil</a><p class="comment-message">'+commentlatest+'</p></span><div><span style="float:left;font-size: 12px;color: #D2D5D6;">Reply</span><span style="float:right;font-size: 12px;color: #D2D5D6;" id="DOP">12-Jun-2012</span></div></div></li>');
              document.getElementById("write-comment").value="";  
            }
        });
    
    
    

});

