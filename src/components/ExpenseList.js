import React from 'react'
import { MdDelete } from 'react-icons/md'
import ExpenseItem from './ExpenseItem'
import './ExpenseList.css'

const ExpenseList = ({handleDelete, initialExpenses}) => {
    return (
      <>
        <ul className="list">
          {/* Expense Item */}
          {initialExpenses.map(expense => {
            return (
              <ExpenseItem
                expense={expense}
                key={expense.id}
                handleDelete={handleDelete} />
            )
          })}
        </ul>
        <button className="btn">
          목록 지우기
          <MdDelete className='btn-icon'/>
        </button>
      </>
    )
  }

export default ExpenseList