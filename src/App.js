import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const expenseHistory = [
    {
      isPlus:false,
      date:"2023. 2. 17. 오전 2:23:14",
      memo:"기념품 쇼핑",
      unit_1: 25,
      unit_2: null
    },
    {
      isPlus:false,
      date:"2023. 2. 17. 오전 2:23:14",
      memo:"기념품 쇼핑",
      unit_1: 25,
      unit_2: null
    },
    {
      isPlus:false,
      date:"2023. 2. 17. 오전 2:23:14",
      memo:"기념품 쇼핑",
      unit_1: 25,
      unit_2: null
    },
    {
      isPlus:false,
      date:"2023. 2. 17. 오전 2:23:14",
      memo:"기념품 쇼핑",
      unit_1: 25,
      unit_2: null
    },
  ]

  const [firstUnit, setFirstUnit] = useState(0)
  const [secondUnit, setSecondUnit] = useState(0)
  
  const [initExpenses1, setInitExpenses1] = useState(0)
  const [initExpenses2, setInitExpenses2] = useState(0)

  const [memo, setMemo] = useState('')
  const [expense1, setExpense1] = useState('')
  const [expense2, setExpense2] = useState('')

  const [restExpenses1, setRestExpenses1] = useState(0)
  const [restExpenses2, setRestExpenses2] = useState(0)
  let date;

  function exchange(first, second){
    let ratio;
    if (firstUnit >= secondUnit){
      ratio = firstUnit/secondUnit 
      //console.log(ratio)
      if (first == null)
        first = second * ratio
      else if (second == null)
        second = first / ratio
    } else {
      ratio = secondUnit/firstUnit
      //console.log(ratio)
      if (first == null)
        first = second / ratio
      else if (second == null)
        second = first * ratio
    }
     
  }

  function save(){
    localStorage.setItem('firstUnit',firstUnit)
    localStorage.setItem('secondUnit', secondUnit)
    localStorage.setItem('initExpenses1',initExpenses1)
    localStorage.setItem('initExpenses2',initExpenses2)
    localStorage.setItem('expenseHistory', JSON.stringify(expenseHistory));
  }

  // 1. 페이지에 접속하면
  useEffect(()=>{

    // 2. localStorage의 데이터를 꺼낸다.
    var expenseHistory = localStorage.getItem('expenseHistory');

    // 최초 접속시 localStorage에 데이터가 없을 경우 새로운 배열을 생성한다. 
    if(expenseHistory == null){
      expenseHistory = [];
    }else{
      expenseHistory = JSON.parse(expenseHistory);
    }

  },[]);

  function addExpense() {
    // 현재날짜 가져오기
    date = new Date()
    date = date.toLocaleString()
    // expenseHistory 배열에 추가
    expenseHistory.unshift({      
      isPlus:false,
      memo:memo,
      unit_1: expenseHistory,
      unit_2: null}) // 배열 시작부분에 항목 추가
    // 남은 경비 계산

    // 모든 값 초기화
    setMemo('')
    setExpense1('')
    setExpense2('')
    
  }

  useEffect(()=>{ // unit1, 2중에 하나가 변경되면 즉시 나머지 단위의 값을 계산해서 보여준다.
    exchange(expense1, expense2)
  },[expense1, expense2])
  useEffect(() => {
    exchange(initExpenses1, initExpenses2)
  }, [initExpenses1, initExpenses2])
  

  return (
    <div className="App">
      <header className="p-2 font-bold text-lg">여행경비 계산기</header>
      <div className="p-4">

        <p className="text-red-400 text-xs">환율은 이틀~하루전 환율값을 사용하며 현재 환율과 일치하지않을 수있습니다.</p>
        {/* 화폐단위선택 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option defaultValue>화폐단위 선택</option>
              <option value="US">직접입력</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <div>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option defaultValue>화폐단위 선택</option>
              <option value="US">직접입력</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div className="mb-6">
              <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
              <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <p className="text-gray-400">예: 1</p>
          <p className="text-gray-400">1200</p>
          <div>
            <label htmlFor="error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"></label>
            <input type="text" id="error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input"/>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">웁스!</span> 숫자만 입력 가능합니다.</p>
          </div>
          <div>
            <label htmlFor="error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"></label>
            <input type="text" id="error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input"/>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">웁스!</span> 숫자만 입력가능합니다.</p>
          </div>
          <div>
            <label>시작 총 경비</label>
          </div>
          <div></div>
          <div className="mb-6">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div className="mb-6">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
        </div>
      </div>
        {/* 추가-사용 금액 계산 */}
        <label>추가-사용 금액 계산</label>
        <div className="bg-gray-100 p-4">
          <div className="flex flex-cols-2">
            <div className="flex flex-col">
              <button>
                <img src='plus.png'/>
              </button>
              <button>
                <img src='minus.png'/>
              </button>
            </div>
            <div>
              <input value={memo} onChange={(e)=>setMemo(e.target.value)} type="text" placeholder="메모" aria-label="memo" className="border-b border-gray-500 bg-transparent text-gray-700 mr-3 py-1 px-2 focus:outline-none"/>
              <div className="flex flex-row">
                <input value={expense1} onChange={(e)=>setExpense1(e.target.value)} type="text" placeholder="단위 1" aria-label="unit1" className="border-b border-gray-500 bg-transparent text-gray-700 mr-2 py-1 px-2 w-36 focus:outline-none"/>
                <p className="pt-1">or</p>
                <input value={expense2} onChange={(e)=>setExpense2(e.target.value)} type="text" placeholder="단위 2" aria-label="unit2" className="border-b border-gray-500 bg-transparent text-gray-700 ml-2 py-1 px-2 w-36 focus:outline-none"/>
              </div>
            </div>
          </div>
          <button onClick={addExpense} className="bg-white shadow-lg p-2 mt-2 rounded-lg">추가하기</button>
        </div>
        {/* 추가-사용 내역 목록 */}
        {expenseHistory.map((history, index)=>(
          <div className="border-b border-gray-100 p-2" key={index}>
            <div className="flex flex-row">
              <p>{history.memo}</p>
              <p className="text-gray-300">{history.date}</p>
              <button className="delete"></button>
            </div>
          </div>
        ))}
        {/* 남은경비 */}
        <div className="static text-center">
          <div className="fixed bottom-0 shadow-t w-screen bg-white p-2">
            <label>남은 경비</label>
            <div className="flex flex-row p-2 text-lg font-bold">
              <p className="ml-4">{restExpenses1}12371289371</p>
              <p className="ml-20 mr-4">{restExpenses2}121</p>
            </div>
            <button className="rounded-lg bg-gray-800 text-white p-2 m-1 w-80 shadow-lg">저장하기</button>
          </div>
        </div>
      {/* footer */}
      <footer className="bg-gray-100 p-10 pb-40 text-center">
        @choi yerin&nbsp;
        <a href='https://github.com/Yerin00' target='_blank' rel="noreferrer" className="font-bold">Github</a>
      </footer>
    </div>
  );
}

export default App;
