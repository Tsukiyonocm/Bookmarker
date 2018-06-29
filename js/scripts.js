// Listen for Form Submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);


// Save Bookmark
function saveBookmark(e){
    //Get form Values
    let siteName = document.getElementById("siteName").value;
    let siteUrl = document.getElementById("siteUrl").value;
    
    if(!validateForm(siteName, siteUrl)){
        return false;
    };

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Test if bookmark is null
    if(localStorage.getItem("bookmarks") === null){
        // Init Array
        let bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } 
    else {
        // Get from localStorage
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        // Add bookmarks to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }


    // Re-fetch Bookmarks
    fetchBookmarks(siteName);

    //Clear Form Elements
    resetForm();

    //Prevent Form from Submitting
    e.preventDefault();
};


// Delete Bookmark
function deleteBookmark(url){
    // Get from localStorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // loop through bookmarks
    for(let i = 0; i < bookmarks.length; i++){
        if (bookmarks[i].url == url) {
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }

    // Re-set back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // Re-fetch Bookmarks
    fetchBookmarks();
}


// Fetch Bookmarks
function fetchBookmarks(siteName) {
    // Get from localStorage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // Get Output ID
    let bookmarksResults = document.getElementById("bookmarksResults");
   
    // Build Output
    bookmarksResults.innerHTML = "";
    
    for(let i = 0; i < bookmarks.length; i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += 
        '<div class="bookmark">' + 
            '<h3 class="bookmark-info">' + name +
                '<div class="buttons">' + 
                    '<a class="btn-primary" target="_blank" href="' + url + '"> Visit</a> ' +
                    '<a onclick="deleteBookmark(\''+ url +'\')" class="btn-primary" href="#"> Delete</a> ' +
                '</div>'
            '</h3>' +
        '</div>';
    };
}


//Reset form Inputs
function resetForm(){
    document.getElementById("myForm").reset();
}


// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl ){
        alert("Please fill in the form");
        return false;
    };

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert("Please use a valid url");
        return false;
    }

    return true;
}