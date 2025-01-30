import { useState } from 'react';
import './UserList.css';

const UserList = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        usertype: 'Admin',
        password: ''
    });

    const [users, setUsers] = useState([]);
    

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        setFormData((prevDataForm) => {
            return {
                ...prevDataForm,
                [name]: target.value
            };
        }
        );
    };

    const setUser = (e) => {
        e.preventDefault();
        setUsers(users.concat({ ...formData, id: Date.now() }))
    };

    const removeUser = (id) => {
        const filterdUsers = users.filter(user => user.id !== id);
        setUsers(filterdUsers);
    };


    console.log(users);

    return (<div className="userList">
        <form onSubmit={setUser}>
            <label htmlFor="username">User Name</label>
            <input type="text" name="username" id="username" placeholder="User name" onChange={handleInputChange} value={formData.username} />
            <label htmlFor="email"> User e-mail</label>
            <input type="email" name="email" id="email" placeholder="User e-mail" onChange={handleInputChange} value={formData.email} />
            <label htmlFor="usertype">User Type</label>
            <select name="usertype" id="usertype" onChange={handleInputChange}>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
            </select>
            <div className='password-container'>
            <label htmlFor="password"></label>
            <input type="password" name='password' id='password' placeholder='Wpisz hasło' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={handleInputChange} />
            <div className='info-box'>{/* {error && <p style={{ color: "red" }}>{error}</p>} */}</div>
            </div>
            <button>Save</button>
        </form>

        <div className='list'>

            {users.map(user => {
                return (
                    <div className='userItem' key={user.id} onClick={()=>removeUser(user.id)}>
                        <p><strong>User Name:</strong> {user.username}</p>
                        <p><strong>User Email:</strong> {user.email}</p>
                        <p><strong>User Type:</strong> {user.usertype}</p>
                        <p><strong>User Password:</strong> {user.password}</p>
                    </div>
                );
            })}


        </div>
    </div>)
};

export default UserList;