import React from 'react'

export default function Item(props) {
  return (
    <div className="task">
        <div className="task bg-dark text-light list-group-item list-group-item-action list-group-item-dark icons">
          {props.task}
          <div className="icons">
            <button className='edit btn btn-dark'><i className="ri-pencil-fill"></i></button>
            <button className='delete btn btn-dark'><i className="ri-delete-bin-7-fill"></i></button>
          </div>
        </div>
    </div>
  )
}
