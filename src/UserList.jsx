import { useState, useEffect } from 'react';
import ButtonsPanel from './components/ButtonsPanel';
import './UserList.css';

const UserList = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        usertype: 'Admin',
        password: ''
    });
    const [users, setUsers] = useState([]);
    const [userOfType, setUserOfType] = useState([]);
    const [filter, setFilter] = useState("all");

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

    const updateFilter = (action) => {
        setFilter(action);
        if (action === "admin") {
            setUserOfType(users.filter(user => user.usertype === "Admin"));
        } else if (action === "user") {
            setUserOfType(users.filter(user => user.usertype === "User"));
        } else if (action === "guest") {
            setUserOfType(users.filter(user => user.usertype === "Guest"));
        }
        else {
            setUserOfType(users);
        };
    };

    useEffect(() => {
        if (filter === "all") {
            setUserOfType(users);
        } else if (filter === "admin") {
            setUserOfType(users.filter(user => user.usertype === "Admin"));
        } else if (filter === "user") {
            setUserOfType(users.filter(user => user.usertype === "User"));
        } else if (filter === "guest") {
            setUserOfType(users.filter(user => user.usertype === "Guest"));
        }
    }, [users, filter]);


    const setUser = (e) => {
        e.preventDefault();
        setUsers(prevUsers => [...prevUsers, { ...formData, id: Date.now() }]);
    };

    const removeUser = (id) => {
        const element = document.getElementById(`${id}`);
    if (element) {
        element.style.transition = "all 0.5s ease-out";
        element.style.opacity = "0";
        element.style.transform = "translateX(-10px)";
    }

    setTimeout(() => {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
    }, 500);
    };

    return (
        <div className="userList">
            <form onSubmit={setUser}>
                <label htmlFor="username">User Name</label>
                <input type="text" name="username" id="username" placeholder="User name" required onChange={handleInputChange} value={formData.username} />
                <label htmlFor="email"> User e-mail</label>
                <input type="email" name="email" id="email" placeholder="User e-mail" required onChange={handleInputChange} value={formData.email} />
                <label htmlFor="usertype">User Type</label>
                <select name="usertype" id="usertype" required onChange={handleInputChange}>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Guest">Guest</option>
                </select>
                <div className='password-container'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' placeholder='Wpisz hasło' required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={handleInputChange} />
                    <div className='info-box'>Hasło musi zawierać co najmniej 8 znaków, cyfrę, małą i wielką literę</div>
                </div>
                <button>Add User</button>
            </form>

            <div className='list'>
                <h2>Users list</h2>
                <div className='filter-options'>
                    <p>Filter options</p>
                    <ButtonsPanel updateFilter={updateFilter} /></div>
                {userOfType.map(user => {
                    return (
                        <div className='userItem' id={user.id} key={user.id} onClick={() => removeUser(user.id)}>
                            <p><strong>User Name:</strong> {user.username}</p>
                            <p><strong>User Email:</strong> {user.email}</p>
                            <p><strong>User Type:</strong> {user.usertype}</p>
                            <p><strong>User Password:</strong> {user.password}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
    
};

export default UserList;