// Listen for Form Submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);


// Save Bookmark
function saveBookmark(e){
    //Get form Values
    let siteName = document.getElementById("siteName").value;
    let siteUrl = document.getElementById("siteUrl").value;
    
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

    //Prevent Form from Submitting
    e.preventDefault();
};