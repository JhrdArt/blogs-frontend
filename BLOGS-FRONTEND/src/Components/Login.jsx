import PropTypes from "proptypes"

export const Login = ({ username, password, setPassword, setUsername, handleLogin, message }) => {
    return (
        <form className="flex flex-col gap-3 w-screen justify-center items-center mt-5" onSubmit={handleLogin}>
            <div className="flex gap-2">
                <span>Username</span>
                <input id="username" className="pl-1 outline outline-slate-900" type="text" placeholder="username" value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div className="flex gap-2">
                <span>Password</span>
                <input id="password" className="pl-1 outline outline-slate-900" type="password" placeholder="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button id="login-btn" className="bg-slate-600 text-white px-2">Login</button>
            <span className="text-red-600 underline underline-offset-2 decoration-red-950 p-1">
                {message}
            </span>
        </form>
    );
};

Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired
}