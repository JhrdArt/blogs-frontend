import { useState, useRef } from "react";

export const Blog = ({ blog, username, updateLikes, blogDelete }) => {
    const [visible, setVisible] = useState(false);
    console.log("Name", blog.user?.name)
    console.log("username", username)

    const toggleVisibility = () => {
        setVisible(!visible);

    }

    const handleDeleteBlog = () => {
        if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
            return blogDelete(blog.id)
        }

    }

    const handleLike = () => {
        const blogToUpdate = {
            title: blog.title,
            url: blog.url,
            author: blog.author,
            likes: blog.likes + 1,
            user: blog.user.id
        };
        updateLikes(blog.id, blogToUpdate);
    }

    return (
        <>

            <>
                <div className="blog flex flex-col ">
                    <div className="flex gap-2 mb-2">
                        <h1 className="title underline decoration-wavy decoration-red-700">{blog.title}</h1>
                        <button id="view-btn" className="bg-slate-400 px-2 rounded shadow-lg" onClick={toggleVisibility}>{visible ? "Hide" : "Show"}</button>
                        {
                            blog.user?.name === username && <button id="delete-btn" onClick={handleDeleteBlog} className="bg-red-400 px-2 rounded shadow-lg">Delete</button>
                        }
                    </div>
                    {
                        visible && (
                            <div className="blog-details flex border-[1px] border-gray-500 gap-4 p-2">
                                <div>
                                    <h2 className="author">Author: {blog.author}</h2>
                                </div>
                                <div>
                                    <p className="url">URL: {blog.url}</p>
                                </div>
                                <div className="likes flex gap-2">
                                    <p>Likes: {blog.likes}</p>
                                    <button id="like-btn" onClick={handleLike} className="bg-blue-400 px-2 rounded shadow-lg">Like</button>
                                </div>
                            </div>
                        )
                    }

                </div>
            </>
        </>
    );
};
