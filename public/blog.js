function raj(){
    var main=document.getElementById("h4")
    if(main.style.visibility=='hidden'){
        main.style.visibility="visible"
    }
    else{
        main.style.visibility='hidden'
    }
}
function raj1(){
    var main1=document.getElementById("h4_a")
    if(main1.style.visibility=='hidden'){
        main1.style.visibility="visible"
    }
    else{
        main1.style.visibility='hidden'
    }
}
function raj2(){
    var main2=document.getElementById("h4_b")
    if(main2.style.visibility=='hidden'){
        main.style.visibility="visible"
    }
    else{
        main2.style.visibility='hidden'
    }
}
function raj3(){
    var main3=document.getElementById("h4_c")
    if(main3.style.visibility=='hidden'){
        main3.style.visibility="visible"
    }
    else{
        main3.style.visibility='hidden'
    }
}
function raj4(){
    var main4=document.getElementById("h4_d")
    if(main4.style.visibility=='hidden'){
        main4.style.visibility="visible"
    }
    else{
        main4.style.visibility='hidden'
    }
}
function raj5(){
    var main5=document.getElementById("h4_e")
    if(main5.style.visibility=='hidden'){
        main5.style.visibility="visible"
    }
    else{
        main5.style.visibility='hidden'
    }
}
(function() {
  

    var serverUrl = "/",
        comments = [],
        pusher = new Pusher('47cc8cb8a7dc948dc9ac', {
          cluster: 'ap2',
          encrypted: true
        }),
        // Subscribing to the 'flash-comments' Channel
        channel = pusher.subscribe('flash-comments'),
        commentForm = document.getElementById('comment-form'),
        commentsList = document.getElementById('comments-list'),
        commentTemplate = document.getElementById('comment-template');

    // Binding to Pusher Event on our 'flash-comments' Channel
    channel.bind('new_comment',newCommentReceived);

    // Adding to Comment Form Submit Event
    commentForm.addEventListener("submit", addNewComment);

    // New Comment Receive Event Handler
    // We will take the Comment Template, replace placeholders & append to commentsList
    function newCommentReceived(data){
      var newCommentHtml = commentTemplate.innerHTML.replace('{{name}}',data.name);
      newCommentHtml = newCommentHtml.replace('{{email}}',data.email);
      newCommentHtml = newCommentHtml.replace('{{comment}}',data.comment);
      var newCommentNode = document.createElement('div');
      newCommentNode.classList.add('comment');
      newCommentNode.innerHTML = newCommentHtml;
      commentsList.appendChild(newCommentNode);
    }

    function addNewComment(event){
      event.preventDefault();
      var newComment = {
        "name": document.getElementById('new_comment_name').value,
        "email": document.getElementById('new_comment_email').value,
        "comment": document.getElementById('new_comment_text').value
      }

      var xhr = new XMLHttpRequest();
      xhr.open("POST", serverUrl+"comment", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = function () {
        if (xhr.readyState != 4 || xhr.status != 200) return;

        // On Success of creating a new Comment
        console.log("Success: " + xhr.responseText);
        commentForm.reset();
      };
      xhr.send(JSON.stringify(newComment));
    }

})();