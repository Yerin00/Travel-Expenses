import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import{ NumericFormat } from 'react-number-format'; // 1,000 : , 찍는 format 라이브러리


function App() {
  const [name, setName] = useState('')
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [expenseHistory, setExpenseHistory] = useState([])
  const [firstUnit, setFirstUnit] = useState('')
  const [secondUnit, setSecondUnit] = useState('')
  
  const [initExpenses1, setInitExpenses1] = useState('')
  const [initExpenses2, setInitExpenses2] = useState('')

  const [memo, setMemo] = useState('')
  const [expense1, setExpense1] = useState('')
  const [expense2, setExpense2] = useState('')

  const [restExpenses1, setRestExpenses1] = useState(0)
  const [restExpenses2, setRestExpenses2] = useState(0)

  const [expectRestExpenses1, setExpectRestExpenses1] = useState(0)
  const [expectRestExpenses2, setExpectRestExpenses2] = useState(0)
  let date;
  const [ratio, setRatio] = useState(0)

  const [isPlus, setIsPlus] = useState(false)

  function deleteHistory(){
    // expenseHistory 목록에서 삭제
    //expenseHistory.filter()
    // 남은 경비 다시 계산

  }

  function save(){
    localStorage.setItem('firstUnit', firstUnit)
    localStorage.setItem('secondUnit', secondUnit)
    localStorage.setItem('initExpenses1', initExpenses1)
    localStorage.setItem('initExpenses2', initExpenses2)
    localStorage.setItem('restExpenses1', restExpenses1)
    localStorage.setItem('restExpenses2', restExpenses2)
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

    // 남은 경비 확정과 반영
    setRestExpenses1(expectRestExpenses1)
    setRestExpenses2(expectRestExpenses2)

    // expenseHistory 배열에 추가
    expenseHistory.unshift({
      isPlus:isPlus,
      memo:memo,
      date:date,
      unit_1: expense1,
      unit_2: expense2,
    }) // 배열 시작부분에 항목 추가
    setExpenseHistory(expenseHistory)
    console.log("expenseHistory: ",expenseHistory)

    // 모든 값 초기화
    setMemo('')
    setExpense1('')
    setExpense2('')
    setExpectRestExpenses1(0)
    setExpectRestExpenses2(0)
    setIsPlus(false)
  }

  useEffect(() => {
    // Plus-Minus 변경하면
    // 추가-시용금액 계산 값 초기화
    setMemo('')
    setExpense1('')
    setExpense2('')
    setExpectRestExpenses1(0)
    setExpectRestExpenses2(0)
  }, [isPlus])
  

  function ratioCalculate(){
    let f_u = parseFloat(firstUnit)
    let s_u = parseFloat(secondUnit)
    
    if (f_u >= s_u){
      setRatio(f_u/s_u)
      console.log("ratio: "+ratio)

    } else {
      setRatio(s_u/f_u)
      console.log("ratio: "+ratio)
    }
  }

  function exchange1to2(first, second){
    let f, s
    f = parseFloat(first)
    s = parseFloat(second)
    let f_u = parseFloat(firstUnit)
    let s_u = parseFloat(secondUnit)
    console.log("f_u and s_u: ",f_u, s_u)
    if (f_u >= s_u){
      if (s === 0) {
        s = f / ratio
      }
    } else {
      if (s === 0) {
        s = f * ratio
      }
    }
    console.log("exchange result", f, s)
    return [f, s]
  }

  function exchange2to1(first, second){
    let f, s
    f = parseFloat(first)
    s = parseFloat(second)
    let f_u = parseFloat(firstUnit)
    let s_u = parseFloat(secondUnit)

    if (f_u >= s_u){
      if (f === 0) {
        f = s * ratio
      }
    } else {
      if (f === 0) {
        f = s / ratio
      }
    }
    console.log("exchange result", f, s)
    return [f, s]
  }
  
  // onBlur : 다른 Unit 계산
  function handleBlurInitExpenses(e){
    if (e.target.id === "initExpenses1"){
      let f, s
      [f, s] = exchange1to2(initExpenses1, initExpenses2)
      setInitExpenses1(f) // 초기 경비
      setInitExpenses2(s)
      setRestExpenses1(f) // 남은 경비
      setRestExpenses2(s)
    }
    else if(e.target.id === "initExpenses2") {
      let f, s
      [f, s] = exchange2to1(initExpenses1, initExpenses2)
      setInitExpenses1(f)
      setInitExpenses2(s)
    }
  }
  function handleBlurExpense(e){
    if (e.target.id === "expense1"){
      let f, s
      [f, s] = exchange1to2(expense1, expense2)
      setExpense1(f)
      setExpense2(s)
      if (isPlus === false){
        setExpectRestExpenses1(restExpenses1 - f)
        setExpectRestExpenses2(restExpenses2 - s)
      } else if (isPlus === true) {
        setExpectRestExpenses1(restExpenses1 + f)
        setExpectRestExpenses2(restExpenses2 + s)
      }
    }
    else if(e.target.id === "expense2") {
      let f, s
      [f, s] = exchange2to1(expense1, expense2)
      setExpense1(f)
      setExpense2(s)
      if (isPlus === false){
        setExpectRestExpenses1(restExpenses1 - f)
        setExpectRestExpenses2(restExpenses2 - s)
      } else if (isPlus === true) {
        setExpectRestExpenses1(restExpenses1 + f)
        setExpectRestExpenses2(restExpenses2 + s)
      }
    }
  }
  // onFocus : 다른 unit 초기화
  function handleFocusInitExpenses(e){
    console.log("focus id: ",e.target.id)
    if (e.target.id === "initExpenses1"){
      setInitExpenses2(0)
    }
    else if(e.target.id === "initExpenses2") {
      setInitExpenses1(0)
    }
  }
  function handleFocusExpense(e){
    console.log("focus id: ",e.target.id)
    if (e.target.id === "expense1"){
      setExpense2(0)
    }
    else if(e.target.id === "expense2") {
      setExpense1(0)
    }
  }


  return (
    <div className="App">
      {/* Info */}
      <div className={(isInfoOpen?"":"hidden")+" z-10 absolute w-full h-full bg-gray-900 opacity-20"}>

      </div>
      {/* 헤더 */}
      <header className="flex flex-row p-3 font-bold text-lg bg-teal-400 text-teal-900 rounded-b-xl shadow-md">
        여행경비 계산기
        <button onClick={()=>setIsInfoOpen(true)} className="ml-3">
          <img src="info.png"/>
        </button>
      </header>
      <div className="p-4">
        {/* 주의사항 문구 */}
        <p className="text-rose-500 text-xs mb-4 text-center">⭐ 환율은 이틀~하루전 환율값을 사용하며<br/>현재 환율과 일치하지않을 수있습니다. ⭐</p>
        {/* 이름입력받기 */}
        <p>즐거운 여행 되세요!</p>
        <div className="flex flex-row my-4">
          <div className="relative">
          <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="p-2 w-32 text-sm text-gray-900 border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="이름" />          </div>
          <p className="p-2">님</p>
        </div>
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
            <input value={firstUnit} onBlur={ratioCalculate} onChange={(e)=>setFirstUnit(e.target.value)} type="number" step="0.01" placeholder="단위 1" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div className="mb-6">
              <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
              <input value={secondUnit} onBlur={ratioCalculate} onChange={(e)=>setSecondUnit(e.target.value)} type="number" step="0.01" placeholder="단위 2" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <p className="text-gray-400">예: 1</p>
          <p className="text-gray-400">1200</p>
          {/* <div>
            <label htmlFor="error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"></label>
            <input type="number" step="0.01" id="error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input"/>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">웁스!</span> 숫자만 입력 가능합니다.</p>
          </div>
          <div>
            <label htmlFor="error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"></label>
            <input type="number" step="0.01" id="error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input"/>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">웁스!</span> 숫자만 입력가능합니다.</p>
          </div> */}
          <div>
            <label className="font-bold text-lg">시작 총 경비</label>
          </div>
          <div></div>
          <div className="mb-6">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input id="initExpenses1" value={initExpenses1} onFocus={handleFocusInitExpenses} onBlur={handleBlurInitExpenses} onChange={(e)=>setInitExpenses1(e.target.value)} type="number" step="0.01" placeholder="단위 1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div className="mb-6">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input id="initExpenses2" value={initExpenses2} onFocus={handleFocusInitExpenses} onBlur={handleBlurInitExpenses} onChange={(e)=>{setInitExpenses2(e.target.value)}} type="number" step="0.01" placeholder="단위 2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
        </div>
      </div>
        {/* 추가-사용 금액 계산 */}
        <div className="bg-gray-100 p-4">
          <p className="px-2 py-1 font-bold text-lg">추가-사용 금액 계산</p>
          <div className="flex flex-cols-2">
            <div className="flex flex-col mr-2">
              <button onClick={()=>setIsPlus(true)} className="p-1">
                <img src={isPlus?'plus.png':'plus_gray.png'} alt="plusBtnImg"/>
              </button>
              <button onClick={()=>setIsPlus(false)} className="p-1">
                <img src={isPlus?'minus_gray.png':'minus.png'} alt="minusBtnImg"/>
              </button>
            </div>
            <div>
              <input value={memo} onChange={(e)=>setMemo(e.target.value)} type="text" placeholder="메모" aria-label="memo" className="border-b border-gray-500 bg-transparent text-gray-700 mr-3 py-1 px-2 w-full focus:outline-none"/>
              <div className="flex flex-row">
                <input id="expense1" value={expense1} onFocus={handleFocusExpense} onBlur={handleBlurExpense} onChange={(e)=>setExpense1(e.target.value)} type="number" step="0.01" placeholder="단위 1" aria-label="unit1" className="border-b border-gray-500 bg-transparent text-gray-700 mr-2 py-1 px-2 w-36 focus:outline-none"/>
                <p className="pt-1">or</p>
                <input id="expense2" value={expense2} onFocus={handleFocusExpense} onBlur={handleBlurExpense} onChange={(e)=>setExpense2(e.target.value)} type="number" step="0.01" placeholder="단위 2" aria-label="unit2" className="border-b border-gray-500 bg-transparent text-gray-700 ml-2 py-1 px-2 w-36 focus:outline-none"/>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-7 mt-4">
            경비
            <NumericFormat value={expectRestExpenses1} allowLeadingZeros thousandSeparator="," className="col-span-3 bg-transparent" />
            <NumericFormat value={expectRestExpenses2} allowLeadingZeros thousandSeparator="," className="col-span-3 bg-transparent" />
            {/* <p>{expectRestExpenses1}</p><p>{expectRestExpenses2}</p> */}
          </div>
          <div className="flex">
            <button onClick={addExpense} className="ml-auto bg-white p-2 rounded-xl">추가하기</button>
          </div>
        </div>
        {/* 추가-사용 내역 목록 */}
        {expenseHistory.map((history, index)=>(
          <div className="border-b border-gray-100 p-2" key={index}>
            <div className="flex flex-row">
              <img src={history.isPlus?'plus2.png':'minus2.png'} alt="isPlus" className=" object-scale-down px-2"/>
              <p>{history.memo}</p>
              <p className="text-gray-300">{history.date}</p>
              <button onClick={deleteHistory} className="delete"></button>
            </div>
            <div className="grid grid-cols-2">
              <NumericFormat value={history.unit_1} allowLeadingZeros thousandSeparator="," className="text-center" />
              <NumericFormat value={history.unit_2} allowLeadingZeros thousandSeparator="," className="text-center" />

            </div>
          </div>
        ))}
        {/* 남은경비 */}
        <div className="static text-center">
          <div className="fixed -bottom-2 rounded-xl shadow-t w-screen bg-white p-2 py-4">
            <label>남은 경비</label>
            <div className="grid grid-cols-2 p-2 text-lg font-bold">
              <NumericFormat value={restExpenses1} allowLeadingZeros thousandSeparator="," className="text-center" />
              <NumericFormat value={restExpenses2} allowLeadingZeros thousandSeparator="," className="text-center"/>
              {/* <p>{restExpenses1}</p>
              <p>{restExpenses2}</p> */}
            </div>
            <button onClick={save} className="rounded-lg bg-cyan-500 text-white p-2 m-1 w-80 shadow-lg">저장하기</button>
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
