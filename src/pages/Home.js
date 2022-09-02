import Post from "../components/Post";

const Home = ({ posts }) => {
    return (
        <main className="Home">
            {posts.length ? (
                posts.map((post) => <Post key={post.id} post={post} />)
            ) : (
                <p style={{ marginTop: "2rem" }}>No posts to display</p>
            )}
        </main>
    );
};

export default Home;
