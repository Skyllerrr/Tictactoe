import { useState } from 'react'
import './index.css'
import './App.css'
import Alert from './components/Alert'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'

const App = () => {
  const [charge, setCharge] = useState("")
  const [id, setId] = useState("")
  const [amount, setAmount] = useState(0)
  const [edit, setEdit] = useState(false)
  // 초기값을 useState(false)도 가능
  const [alert, setAlert] = useState({ show: false })

  const [expenses, setExpenses] = useState([
    { id: 1, charge: '렌트비', amount: 2000 },
    { id: 2, charge: '교통비', amount: 400 },
    { id: 3, charge: '식비', amount: 1200 }
  ])

  const clearItems = () => {
    setExpenses([])
  }

  // 지출 항목 부분을 적을 때 마다 state에 저장
  const handleCharge = (e) => {
    //console.log(e.target.value)
    setCharge(e.target.value)
  }

  // 비용 부분을 적을 때 마다 state에 저장
  const handleAmount = (e) => {
    //console.log(e.target.valueAsNumber)
    setAmount(e.target.valueAsNumber)
  }

  // state를 생성자로 생성하여 데이터를 가져다 쓰기 위해서는 
  // this.state.state이름 으로 쓸 수 있다.
  // 그리고, 지금의 예시는 배열을 통해 클릭했을 때 화면에서 직접적으로 삭제되는 것을 보기위해 사용하는 것인데 이는 setState라는 함수를 사용해서 {state이름: 새로운 변수} 처럼 쓸 수 있다.
  // "지금은 state가 아닌 props로 전달해서 사용중"
  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    console.log(newExpenses)
    setExpenses(newExpenses);
    handleAlert({type: "danger", text: "아이템이 삭제되었습니다."})
  }

  const handleAlert = ({ type, text }) => {
    setAlert({show: true, type, text})
    setTimeout(() => {
      setAlert({show: false})
    }, 5000)
  }

  const handleEdit = (id) => {
    const expense = expenses.find(item => item.id === id)
    const { charge, amount } = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  // *순서 설명*
  // submit 버튼을 눌렀을 때, 리프레쉬(새로고침)가 되는 현상을 막기위해 preventDefault()를 사용
  // 지출 항목인 charge가 빈 문자가 아니고, 비용인 amount가 0원 초과 일때, 새로운 배열을 만든다.
  // crypto.randomUUID() 함수로 랜덤한 값을 생성하게 만들고, newExpense라는 이름의 객체를 불변성을 지켜주기 위해서 새로운 expenses를 생성하여 newExpenses라는 객체에 기존에 있던 expenses와 새롭게 추가된 객체인 newExpense를 넣어준다.
  // 새로운 객체가 들어갔으면 즉, submit 버튼을 클릭 했을 때 charge부분은 빈 문자열이 나오고 amount부분은 0원이 나오도록 설정해준다.
  // 지출 항목이나 비용을 적지않으면, 에러가 생기도록 하여 error를 출력해준다.
  const handleSubmit = (e) => {
    e.preventDefault()
    if (charge !== "" & amount > 0) {
      if (edit) {
        const newExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({type: "success", text : "아이템이 수정되었습니다."})
      } else {
        const newExpense = {id: crypto.randomUUID(), charge, amount}
        // 불변성을 지켜주기 위해서 새로운 expenses를 생성
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        handleAlert({type: "success", text: "아이템이 생성되었습니다."})
      }
      setCharge("");
      setAmount(0);
    } else {
      console.log('error')
      handleAlert({type: "danger", text: "charge는 빈 값일 수 없으며, amount는 0보다 커야 합니다."})
    }
  }

    return (
      <main className='main-container'>
        {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}
        <h1>예산 계산기</h1>
        
        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
          {/* Expense Form */}
          <ExpenseForm
            handleCharge={handleCharge}
            charge={charge}
            handleAmount={handleAmount}
            amount={amount}
            handleSubmit={handleSubmit}
            edit={edit} />
        </div>

        <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
          {/* Expense List */}
          <ExpenseList
            expenses={expenses}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            clearItems={clearItems} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
          <p style={{ fontSize: '2rem' }}>
            총 지출 :
            <span>
              {expenses.reduce((acc, curr) => {
                return (acc += curr.amount);
              }, 0)}
              원
            </span>
          </p>
        </div>

      </main>
    )
  }

export default App
