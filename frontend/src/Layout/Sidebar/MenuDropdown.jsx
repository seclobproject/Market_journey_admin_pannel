import React from 'react'
import { Link } from 'react-router-dom'

function MenuDropdown({ menu }) {
  return (
    <>
      <li className="sidebar-item" >
        <Link className="sidebar-link has-arrow" to={`javascript:void(0)`} aria-expanded="false">
          <div style={{width:'20px'}}>
          <span className="d-flex">
            <i className={menu?.icon} />
          </span>
          </div>

          <span className="hide-menu">{menu?.title}</span>
        </Link>
        <ul aria-expanded="false" className="collapse first-level">
          {menu?.sub?.map((submenu) => (
            <li className="sidebar-item">
              <Link to={`/${submenu.route}`} className="sidebar-link" >
                <div className="round-16 d-flex align-items-center justify-content-center">
                  <i className={submenu?.icon} />
                </div>
                <span className="hide-menu">{submenu.title}</span>
              </Link>
            </li>
          ))}


        </ul>
      </li>
    </>
  )
}

export default MenuDropdown