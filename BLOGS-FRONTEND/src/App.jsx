import { useEffect, useState, useRef } from "react";
import { Blog } from "./Components/Blog";
import { Login } from "./Components/Login";
import { Blogform } from "./Components/Blogform";
import loginServices from "./Services/login.services";
import blogsServices from "./Services/blogs.services";
import { Togglable } from "./Components/Togglable";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  console.log(username);
  console.log(password);
  console.log(user);
  console.log("blogs:", blogs);
  console.log(message)

  useEffect(() => {
    const fetchData = async () => {
      blogsServices.getAll().then(data => setBlogs(data));
    };

    fetchData();
  }, []);
  console.log(blogs);

  useEffect(() => {
    const time = setTimeout(() => {
      setMessage(null);
    }, 6000);
    return () => {
      clearTimeout(time);
    };
  }, [message]);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsServices.setToken(user.token);
    }

  }, []);

  const blogRef = useRef()


  const createBlog = async ({ author, title, url }) => {
    const existingTitle = await blogs.some(blog => blog.title === title)

    if (existingTitle) {
      setMessage("This title already exist")
    } else {
      try {
        const blog = await blogsServices.create({
          title,
          author,
          url
        });
        // blogFormRef.current.toggleVisibility();
        console.log(blog)
        setBlogs([...blogs, blog]);
        blogRef.current.togglevisibility()
        setMessage(`New blog ${title} was added by ${author}`);

      } catch (error) {
        setMessage(`error: ${error}`);
      }
    }


  };

  const updateLikes = async (id, blogUpdate) => {
    try {
      const updateBlog = await blogsServices.update(id, blogUpdate);
      const newBlog = blogs.map(blog => blog.id === id ? updateBlog : blog);
      setBlogs(newBlog);
    } catch (error) {
      setMessage(`error: ${error}`);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogsServices.remove(id);
      const updateBlogs = blogs.filter(blog => blog.id !== id);
      setBlogs(updateBlogs);
      setMessage("Blog remove");
    } catch (error) {
      setMessage(`error: ${error}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("loggedBlogsappUser", JSON.stringify(user));
      blogsServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  // const blogFormRef = useRef();
  const login = () => (
    <Login username={username} password={password} message={message} setPassword={setPassword} setUsername={setUsername} handleLogin={handleLogin} />
  );

  const blogForm = () => (
    <Togglable buttonLabel="Add new blog" ref={blogRef}>
      <Blogform createBlog={createBlog} />
    </Togglable>
  )


  return (
    <main className="w-full flex justify-center">
      {
        user === null ? login()
          :
          <div className="flex flex-col justify-center gap-2">
            <div className='text-blue-500 capitalize font-bold text-2xl flex items-center justify-center'>lista de blogs</div>
            <p className="text-center">{user.name} <span className="font-medium">is logged</span> </p>
            <button onClick={handleLogout} className="bg-red-500 px-2 text-white">Loggout</button>
            {<p className="bg-green-500">{message}</p>}
            {blogForm()}
            {
              blogs.sort((a, b) => b.likes - a.likes)
                .map(blog => (
                  <Blog
                    blog={blog}
                    username={user.name}
                    key={blog.id}
                    blogDelete={deleteBlog}
                    updateLikes={updateLikes}
                  />
                ))
            }
          </div>
      }
    </main>
  );
}

export default App;
