Video sourse:
    https://www.youtube.com/watch?v=Cv_JhlKUpto&list=PL0Zuz27SZ-6PrE9srvEn8nbhOOyxnWXfp&index=16&ab_channel=DaveGray

Встановити:
    npm i react-router-dom

В index.js:

import { BrowserRouter as Router, Route } from 'react-router-dom';

root.render(
<React.StrictMode>
    <Router>
    <Route path='/' component={App}/>
    </Router>
</React.StrictMode>
);

На сторінці постійно будуть залишатись такі елементи: Header,Nav,Footer (але вони викликатимуться на сторінці Layout).
В самому ж Арр пропишемо роути:

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="post">
                    <Route index element={<NewPost />} />
                    <Route path=":id" element={<PostPage />} />
                </Route>
            </Route>
            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing />} />
        </Routes>
    );
};

Заповнимо Header (в якості title передаватиму те що буде в шапці додатку):

const Header = ({title}) => {
  return (
    <header className="Header">
        <h1>{title}</h1>
    </header>
  )
};

Заповнимо Nav, де у нас буде форма, яка прийматиме результат пошуку і записуватиме її в змінну search i <ul>, який
міститиме посилання на інші сторінки - Home,Post,About:

const Nav = ({ search, setSearch }) => {
    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Form</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
              <li to="/">Home</li>
              <li to="post">Post</li>
              <li to="about">About</li>
            </ul>
        </nav>
    );
};

Так як немає АРІ, створимо data.js, де зберігатиметься масив з постами (postsData)
В Арр створимо кілька змінних:

  const [posts,setPosts] = useState(postsData); - приймає (і доповнюватиме) масив з постами
  const [search, setSearch] = useState(""); - передається в Nav
  const [searchResults,setSearchResults] = useState([]);

Створимо Layout сторінку, де власне буде Header,Nav,Outlet(висвітоює сторінки з роутів),Footer:

const Layout = ({ search, setSearch }) => {
    return (
        <div className="App">
            <Header title="React JS Blog" />
            <Nav search={search} setSearch={setSearch} />
            <Outlet />
            <Footer />
        </div>
    );
};

(!Не забути в Арр в Layout роуті передати search і setSearch, які надалі передадуться в Nav!)

Пропишемо Home сторінку, де повинні мапатись і виводитись пости:

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

Опишемо помпонент Post для кожного поста:

const Post = ({ post }) => {
    return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
            </Link>
            <p className="postBody">
                {post.body.length <= 25
                    ? post.body
                    : `${post.body.slice(0, 25)}...`}
            </p>
        </article>
    );
};

Також при кліку на пост ми повинні отримувати повну інформацію про поточний пост з можливістю видалити його. Для цього 
створимо PostPage, куди передаватимемо всі наші пости, далі з допомогою хука useParams відхоплюватимемо з URL необхідний нам id і виводитимемо інформацію про пост, який відповідає цьому id; також створимо кнопку, яка повинна видаляти відповідний пост:

const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);

    return (
        <main className="postPage">
            <article className="post">
                {post && (
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                )}
            </article>
        </main>
    );
};

Також доповнимо сторынку PostPage на випадок, якщо у нас не буде поста, але ми на неъ потрапимо:

{!post &&
     <>
        <h2>Post Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p>
            <Link to='/'>Visit Our Homepage</Link>
        </p>
    </>
}

Пропишемо функцію handleDelete для видалення поста і також додамо хук useNavigate, щоб при видаленні нас направило на сторінку зі списком постів:

const navigate = useNavigate();

const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate("/")
};

Тепер пропишемо сторінку NewPost, де ми повинні додавати нові пости. Перш за все створимо змінні для post.title i post.body і handleSubmit для форми, яка створюватиме новий пост (в Арр); також для того щоб выдображати дату поста встановимо залежність: 

npm i date-fns

import { format } from "date-fns";

const [postTitle,setPostTitle] = useState("");
const [postBody,setPostBody] = useState("");

const handleSubmit = (e) => {
  e.preventDefaul();
  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  const datetime = format(new Date(), "MMMM dd, yyyy pp");
  const newPost = { id, title: postTitle, datetime, body: postBody};
  const allPosts = [...posts, newPost];
  setPosts(allPosts);
  setPostTitle("");
  setPostBody("");
  navigate("/") 
};










