document.addEventListener("DOMContentLoaded", function () 
{
    const addPostForm = document.getElementById("add-post-form");
    addPostForm.addEventListener("submit", function (event){
        event.preventDefault();
        const user_name = addPostForm.user_name.value;
        const match = addPostForm.match.value;
        const result = addPostForm.result.value;
        const match_result = addPostForm.match_result.value;
        const post = {
            user_name,
            match,
            result,
            match_result
        };
    })
})