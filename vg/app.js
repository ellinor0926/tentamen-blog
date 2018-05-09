// JavaScript för att implementera kraven A-E.

// Add post section of the page

//Validation of add post
const isToShort = (str) => {
    if (str.length < 5) {
        return 'Must be at least 5 characters!'
    } else {
        return false;
    }
};
const isCursing = (str) => {
    const curseArray = str.split(' ');
    for (let curse of curseArray) {
        if (curses.includes(curse)) {
            return `Can't contain ${curse}`
        }
    }
    return false;
};

FormValidator.registerValidator('notToShort', isToShort);
FormValidator.registerValidator('keepItClean', isCursing);

FormValidator.connectValidatorToField('notToShort', 'title');
FormValidator.connectValidatorToField('notToShort', 'content');
FormValidator.connectValidatorToField('keepItClean', 'content');

$("#myForm").submit(function (e) {
    $('#status-display').empty();

    const data = {
        title: $("#titleInput").val(),
        content: $("#contentInput").val()
    };
    const errors = FormValidator.validate(data);
    if (errors.length) {

        for (let error of errors) {
            $('#status-display').append(`
                <p class="error-msg">${error.fieldName}: ${error.errorMsg}</p>
            `)
        }
    } else {
        $('#status-display').append(`
            <p>New post successfully submitted!</p>
        `)
    }
    e.preventDefault();

});

//Handling received data

//Adding "likes" as a prop to the posts
const processData = (data) => {
    let postArray = [];

    for (let post of data) {
        let blogPost = {
            ...post,
            likes: Math.floor(Math.random() * 100)
        };
        postArray.push(blogPost)
    }
    return postArray;
};

//Fetching posts and sending them to renderPosts()
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => processData(posts))
    .then(array => renderPosts(array));

//Fetching comments and sending them to renderComments()
const getComments = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(res => res.json())
        .then(comments =>renderComments(comments))
};

//Adding "click" to all buttons on blog list
$('#blog-container').on('click', (e) => {
    getComments(Number(e.target.id))
});

//Render posts
renderPosts = (posts) => {
    for (let post of posts) {
        $('#blog-container').append(`
                <li data-id=${post.id}>
                    <p class="boldText">${post.title} (${post.likes} likes)</p>
                    <p>${post.body}</p>
                    <button id=${post.id}>Load comments</button>
                    <div id="comment-${post.id}" class="comments">
                        <!--getComments() and renderComments() is called when the button is pressed -->
                    </div>
                </li>
            `)
    }
};

//Render comments
const renderComments = (comments) => {
    for (let comment of comments) {
        $(`#comment-${comment.postId}`).append(`
            <p><span class="boldText">${comment.email}:</span> ${comment.body}</p>
         `)
    }
};

//Navigation
$('header').on('click', '#newPost, #posts' , (e) => {
    if (e.target.id === 'newPost') {
        $('#addPost').show();
        $('#blog-container').hide();
    }
    else {
        $('#addPost').hide();
        $('#blog-container').show();
    }
});

