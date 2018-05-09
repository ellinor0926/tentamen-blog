// JavaScript för att implementera kraven A-D.

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

//Adding "click" to all buttons
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