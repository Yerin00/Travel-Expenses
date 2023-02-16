import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  const expenseHistory = [
    {
      isPlus:false,
      memo:"기념품 쇼핑",
      unit_1: 25,
      unit_2: null
    }
  ]

  const [firstUnit, setFirstUnit] = useState(0)
  const [secondUnit, setSecondUnit] = useState(0)

  const [initExpenses, setInitExpenses] = useState(0)

  return (
    <div className="App">
      <header className="p-2 font-bold text-lg">여행경비 계산기</header>
      <div className="p-4">

        <p className="text-red-400">환율은 이틀~하루전 환율값을 사용하며 현재 환율과 일치하지않을 수있습니다.</p>
        {/* 화폐단위선택 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>화폐단위 선택</option>
              <option value="US">직접입력</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>화폐단위 선택</option>
              <option value="US">직접입력</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          <div class="mb-6">
            <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div class="mb-6">
              <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
              <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <p className="text-gray-400">예: 1</p>
          <p className="text-gray-400">1200</p>
          <div>
            <label for="error" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"></label>
            <input type="text" id="error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input"/>
            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">웁스!</span> 숫자만 입력 가능합니다.</p>
          </div>
          <div>
            <label for="error" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"></label>
            <input type="text" id="error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input"/>
            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">웁스!</span> 숫자만 입력가능합니다.</p>
          </div>
          <div>
            <label>시작 총 경비</label>
          </div>
          <div></div>
          <div class="mb-6">
            <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div class="mb-6">
            <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
            <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
        </div>
        {/* 추가-사용 금액 계산 */}
        <label>추가-사용 금액 계산</label>
        <div className="bg-gray-100">

        </div>
        {/* 추가-사용 내역 목록 */}
        {expenseHistory.map(()=>(
          <div className="border-b border-gray-100">

          </div>
        ))}
        {/* 남은경비 */}
        <div>

        </div>
      </div>
      {/* footer */}
      <footer className="bg-gray-100 p-10">
        @choi yerin
        <a href='https://github.com/Yerin00' target='_blank'>Github</a>
      </footer>
    </div>
  );
}

export default App;
