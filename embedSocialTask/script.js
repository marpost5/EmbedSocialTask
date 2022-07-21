let loadStep=4;
let itemsLoad=4;
let items;

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        items=data;
        renderItems();
    })
    .catch(error => console.log(error));

function renderItems()
{
    const contentElement=document.getElementById('content');
    console.log(contentElement);
    const list=items.slice(0,itemsLoad).map(item => (
        `  <div class="container">
            <div class="box-container" style="width: 90%">
            <div class="box" style="width: 25%">
              <a href="${item.source_link}">
         <img class="profilePic" src="${item.profile_image}"
         width=60" height="60">
      </a>
           <p id="name">${item.name}</p>
           <p>${item.date}</p>
          <p class="source">${item.source_type}</p>
          <div class="image">
            <img src="${item.image}" width="500" height="400">
            </div>
            <div class="content">
             <p>${item.caption}</p><hr>
             <div class="heart">
             <div class="input">
              <input  type="image" src="img/heart%20(1).svg" style="height: 17px"/>
              </div>
              <p class="likesNum">${item.likes}</p>
              </div>
                </div>
                    </div>
                        </div>
                            </div>`
    ))
    contentElement.innerHTML=list.join('');
    checkLoadMoreButton();
    checkSource();
    pictureLiked();
    dateConverter();


}
function checkLoadMoreButton()
{

        const contentElement=document.getElementById('content');
        contentElement.innerHTML+=`<button onclick="onLoadMoreButtonClicked()" id="load-more">Load more</button>`;
}
function onLoadMoreButtonClicked()
{
    itemsLoad+=loadStep;
    renderItems();
    if(itemsLoad===items.length)
    {
        const button=document.getElementById('load-more');
        button.style.display='none';
    }

}

function pictureLiked()
{
    var dd = document.getElementsByClassName('heart');
    var numLikes=document.getElementsByClassName('likesNum');
    Array.prototype.forEach.call(dd, function(element) {
        element.addEventListener('click', function() {
            if(element.getElementsByTagName('input')[0].style.backgroundColor==="red") {
                element.getElementsByTagName('input')[0].style.backgroundColor="";
                likes(element);
            }
            else
            {
                element.getElementsByTagName('input')[0].style.backgroundColor="red";
                likes(element)
            }

        });
    });

}
function likes(element)
{
       var num=0;
        var required=element.getElementsByTagName('p')[0];
        if(element.getElementsByTagName('input')[0].style.backgroundColor==="red") {
            num = num + parseInt(required.innerHTML) + 1;
            required.innerHTML = num;
        }
        else
        {
            num = num + parseInt(required.innerHTML) - 1;
            required.innerHTML = num;
        }

}



function  checkSource()
{

        let s = document.getElementsByClassName('source');
        for(var i=0;i<s.length;i++) {
            if (s[i].innerHTML === "facebook") {
                s[i].innerHTML = "<img src='/img/facebook%20(1).svg'>"
            } else {
                s[i].innerHTML = "<img src='/img/instagram-logo.svg'>"
            }
        }
}

