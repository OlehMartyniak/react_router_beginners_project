const NewPost = ({
     handleSubmit,
     postTitle,
     setPostTitle,
     postBody,
     setPostBody,
}) => {
     return (
          <main className="NewPost">
               <h2>New Post</h2>
               <form className="newPostForm" onSubmit={handleSubmit}>
                   <label htmlFor="postTitle">Title:</label>
                   <input type="text" value={postTitle} id="postTitle" required onChange={(e) => setPostTitle(e.target.value)} />
                   <label htmlFor="postBody">Post:</label>
                   <textarea id="postBody" required value={postBody} onChange={(e) => setPostBody(e.target.value)}/>
                   <button type="submit">Sumbit</button>
               </form>
          </main>
     );
};

export default NewPost;
