import { Link, Outlet} from 'react-router-dom';
import React,{useState} from 'react'
import './Home.css'






function Home() {
    
  const [collapsed1, setcollapsed1] = useState(false);
  

  const toggleSidebar = () => {
    setcollapsed1(!collapsed1);
  };
  
  return (
    <div className="main-layout">
    
    <div className={`sidebar ${collapsed1 ? 'collapsed1' : ''}`}>
        

        <div className="profile-section">
          <div className="profile-left">
            <div className="profile-circle"><img  /></div>
            <span className="username">User</span>
          </div>
          <div className="profile-right text-white">
            <button><i className="fas fa-bell"></i></button>
            <button  onClick={toggleSidebar}><i className="fas fa-bars"></i></button>
          </div>
        </div>

        <div className="nav-links">
          <Link to="/addTask"><i className="fas fa-plus"></i> Add task</Link>
          <Link to="#"><i className="fas fa-search"></i> Search</Link>
          <Link to="/inbox"><i className="fas fa-inbox"></i> Inbox</Link>
          <Link to="#"><i className="fas fa-calendar-day"></i> Today</Link>
          <Link to="#"><i className="fas fa-calendar-alt"></i> Upcoming</Link>
          <Link to="/completed"><i className="fas fa-check-circle"></i> Completed</Link>
          <Link to="/Quote"><i className="fas fa-check-circle"></i> Quotes</Link>
          <Link to="/joke"><i className="fas fa-ellipsis-h"></i> 😂 Joke Generator</Link>
        </div>

        <div className="bottom-links">
          <Link to="#"><i className="fas fa-plus-circle"></i> Add a team</Link>
          <Link to="#"><i className="fas fa-question-circle"></i> Help & resources</Link>
        </div>

        
        
      </div>
      <div className="main-on-home bg-gradient-to-r from-yellow-100 to-pink-100 p-4">
            <Outlet/>
        </div>
      </div>
  )
}

export default Home
