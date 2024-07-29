import { useState } from "react"

export const Blogform = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ author: "", title: "", url: "" });
    console.log(newBlog)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    const handleCreate = (e) => {
        e.preventDefault();
        createBlog(newBlog);
        setNewBlog({ title: "", author: "", url: "" });
    };


    return (
        <>
            <h2 className="text-xl font-semibold pt-2">Create a new blog</h2>
            <form className="flex flex-col gap-2 pt-2" action="" type="submit" onSubmit={handleCreate}  >
                <div className="flex gap-2 justify-between">
                    <label htmlFor="author">Author</label>
                    <input className="bg-gray-200 pl-2 border border-x-indigo-800 w-full" type="text" placeholder="author" name="author" value={newBlog.author} onChange={handleInputChange} />
                </div>
                <div className="flex gap-2 justify-between">
                    <label htmlFor="title">Title</label>
                    <input className="bg-gray-200 pl-2 border border-x-indigo-800 w-full" type="text" placeholder="title" name="title" value={newBlog.title} onChange={handleInputChange} />
                </div>
                <div className="flex gap-2 justify-between">
                    <label htmlFor="url">URL</label>
                    <input className="bg-gray-200 pl-2 border border-x-indigo-800 w-full" type="text" placeholder="url" name="url" value={newBlog.url} onChange={handleInputChange} />
                </div>
                <button className="bg-blue-500 text-zinc-50 font-medium" type="submit">Create</button>
            </form>
        </>
    )
}
