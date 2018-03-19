
$(document).ready(function() {
    // given values to make API call
    var APIKey = "a5e95177da353f58113fd60296e1d250";
    var userId = "24662369@N07";
    var url = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos"+"&api_key="+APIKey+
        "&user_id="+userId+"&format=json&nojsoncallback=1&per_page=500&page=2";
    // function that can load images
    function loadPage(group){
        $.getJSON(url,function(data){
            // check if we need to filter all images by public , family, friend
            if (group!='all'){
                var public = ('public' == group);
                var friend = ('friend' == group);
                var family = ('family' == group);
            } else {
                var public = true;
                var friend = true;
                var family = true;
            }
            // empty the container , make sure this will not append to the container/
            $(".container").empty();
            // check if the correct data is responded.
            if(data.stat == "ok"){
                // get the photos
                var photos = data.photos.photo;
                // iterate the json format photo array
                for(var i = 0; i<photos.length; i++){
                    var item = $(document.createElement('div'));
                    item.addClass("item-container");
                    var photoObj = photos[i];
                    var urlDefault = 'https://farm' + photoObj.farm + '.staticflickr.com/' + photoObj.server + '/' + photoObj.id + '_' + photoObj.secret + '.jpg';
                    var img = $(document.createElement('img'));
                    img.attr('src', urlDefault);
                    img.addClass("photo");
                    
                    // create introduction part for photo, including title and tags
                    var introPane = $(document.createElement('div'));
                    introPane.addClass("intro");
                    
                    // create title
                    var title = $("<b></b>").text(photos[i].title);
                    // create tags
                    var tagContent = '';
                    // check if the item is about family
                    if(photoObj.isfamily == 1) {
                        tagContent+='#family ';
                        // for filter use.
                        item.toggle(family);
                    }
                    // check if the item is about friend                    
                    if(photoObj.isfriend == 1) {
                        tagContent+='#friend ';
                        // for filter use.
                        item.toggle(friend);
                    }
                    // check if the item is about public
                    if(photoObj.ispublic == 1) {
                        tagContent+='#public ';
                        // for filter use.
                        item.toggle(public);
                    }
                    // create tag
                    var tags = $("<p></p>").text(tagContent);
                    tags.css("color", "gray");
                    // insert all to the correct parent
                    introPane.append(title,tags);
                    item.append(img, introPane);
                    item.appendTo(".container");
                }
            } else {
                // provide an alert once the API response is wrong.
                alert('Error: API Url is incorrect.');
            }
        });
    }
    // initialize the page 
    loadPage('all');

    // toggle button click events
    $('#family').click(function(){
        loadPage('family')
    });
    $('#public').click(function(){
        loadPage('public')
    });
    $('#friend').click(function(){
        loadPage('friend')
    });

    // sidebar tabs categories
    $('#family-tab').click(function(){
        loadPage('family')
    });
    $('#public-tab').click(function(){
        loadPage('public')
    });
    $('#friend-tab').click(function(){
        loadPage('friend')
    });
});