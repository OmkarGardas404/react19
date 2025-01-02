import { useState } from "react";
import { loginUser } from "../api/user";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIspending] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setIspending(true);
        setError(null);
        setUser(null);
        try {
            const response= await loginUser(username, password);
            setUser(response.data)
        } catch(error) {
            setError(error)
        }
    }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username: </label>
        <input type="text" placeholder="Enter name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
         />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
       <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...':'Login'}
       </button>
       {user && <p style={{ color: "green" }}>Logged in: {user.email}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};
export default Login;
