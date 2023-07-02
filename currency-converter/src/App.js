import money from './img/money.png'
import './App.css';
import CurrencyComponents from './components/CurrencyComponents';
import {useEffect, useState} from "react"


function App() {

  const [currencyChoice,setCurrencyChoice] = useState([])
  const [fcurrency,setCurrencyf] = useState("USD")
  const [tcurrency,setCurrencyt] = useState("THB")

  const [amount,setAmount] = useState(1)
  const [exChangeRate,setExChangeRate] =useState(0)

  const [checkFromCurrency,setCheckFromCurrency] = useState(true)
  let fromAmount,toAmount
  if(checkFromCurrency){
    fromAmount=amount
    toAmount = (amount*exChangeRate).toFixed(2)
  }else{
    toAmount=amount
    fromAmount = (amount/exChangeRate).toFixed(2)
  }


  useEffect(()=>{ 
    const url =`https://api.exchangerate-api.com/v4/latest/${fcurrency}`
      fetch(url)
      .then(res=>res.json())
      .then(data=>{setCurrencyChoice([...Object.keys(data.rates)])
                  setExChangeRate(data.rates[tcurrency])
  })
  },[fcurrency,tcurrency])

  const amountFromCurrency =(e)=>{
      setAmount(e.target.value)
      setCheckFromCurrency(true)
  }
  const amountToCurrency =(e)=>{
      setAmount(e.target.value)
      setCheckFromCurrency(false)
  }
  return (
    <div>
    <img src ={money} alt="Logo"className="money-img"/>
    <h1>แอพแปลงสกุลเงิน (API)</h1>
    <div className="container">
      <CurrencyComponents 
      currencyChoice={currencyChoice} 
      selectCurrency={fcurrency}
      changeCurrency={(e)=>setCurrencyf(e.target.value)}
      amount={fromAmount}
      onChangeAmount ={amountFromCurrency}/>
      <div className="equal"> = </div>
      <CurrencyComponents 
      currencyChoice={currencyChoice} 
      selectCurrency={tcurrency}
      changeCurrency={(e)=>setCurrencyt(e.target.value)}
      amount = {toAmount}
      onChangeAmount = {amountToCurrency}/>
    </div>
     </div>
  );
}

export default App;
