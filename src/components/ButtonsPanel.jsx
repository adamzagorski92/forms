import './ButtonsPanel.css';

const ButtonsPanel = (props) => {
    return (
        <div className="buttonsPanel">
            <button onClick={()=>props.updateFilter("admin")}>Display Admins</button>
            <button onClick={()=>props.updateFilter("user")}>Display Users</button>
            <button onClick={()=>props.updateFilter("all")}>Display All</button>
            <button onClick={()=>props.updateFilter("guest")}>Display Guest</button>
        </div>
    );
};

export default ButtonsPanel;