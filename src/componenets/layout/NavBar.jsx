import React from 'react'
import useLocation from 'react-router-dom'

const NavBar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = React.useState(location.pathname);

  const handleItemClick = (path) => {
    setActiveItem(path);
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/chat-support', label: 'Chat' },
    { path: '/ticket', label: 'Tickets' }
  ]

  return (
    <nav className='nav-container'>
      <ul className='nav-list'>
        {
          navItems.map((item) => {
            <li key={item.path} className="nav-item" >

              <link to={item.path} className={activeItem == item.path ? "active" : ""} onClick={handleItemClick(item.path)}>
                {item.label}
              </link>

            </li>

          })
        }
      </ul>
    </nav> >
  )
}

export default NavBar