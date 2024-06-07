import { useEffect, useState } from "react";
import "./App.css";
import { CChart } from "@coreui/react-chartjs";
import Dropdown from "react-dropdown";

function App() {
  const options = ["5 Years", "10 Years", "15 Years", "20 Years", "25 Years"];
  const [homevalue, setHomeValue] = useState(1000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(2);
  const [tenure, setTenure] = useState(10);

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const newDownPayment = Math.floor(homevalue * 0.2);
    setDownPayment(newDownPayment);
    setLoanAmount(homevalue - newDownPayment);
  },[homevalue]);


  useEffect(() => {
    const interestPerMonth = interestRate/100/12;
    const totalLoanMonths = tenure*12;
    const EMI = (loanAmount * interestPerMonth * (1+interestPerMonth) ** totalLoanMonths)
 / ((1+interestPerMonth) ** totalLoanMonths - 1);

 setMonthlyPayment(EMI);
  }, [loanAmount, interestRate, tenure])

  return (
    <>
    {/* <h1 style={{padding:"2rem 0 1rem 5rem", boxShadow:"1px 1px 2px white"}}>React Bank</h1> */}
      <div style={{display:"flex", justifyContent:"space-evenly", maxHeight:"90dvh", margin:"2rem"}}>
        <div style={{ minWidth: "45dvw" }}>
          <div className="ind">
            <p>Home value</p>
            <p>{homevalue}</p>
            <input
              onChange={(e) => setHomeValue(parseInt(e.currentTarget.value))}
              type="range"
              min="1000"
              max="10000"
              value={homevalue}
            />
          </div>
          <div className="ind">
            <p>Down Payment</p>
            <p>{homevalue - loanAmount}</p>
            <input
              onChange={(e) => {
                setDownPayment(parseInt(e.currentTarget.value));
                setLoanAmount(homevalue - parseInt(e.currentTarget.value));
              }}
              type="range"
              min="0"
              max={homevalue}
              value={downPayment}
            />
          </div>
          <div className="ind">
            <p>Loan Amount</p>
            <p>{homevalue - downPayment}</p>
            <input
              onChange={(e) => {
                setLoanAmount(parseInt(e.currentTarget.value));
                setDownPayment(homevalue - parseInt(e.currentTarget.value));
              
              }}
              type="range"
              min="0"
              max={homevalue}
              value={loanAmount}
            />
          </div>
          <div className="ind">
            <p>interest Rate</p>
            <p>{interestRate}</p>
            <input
              onChange={(e) => setInterestRate(parseInt(e.currentTarget.value))}
              type="range"
              min="2"
              max="18"
            />
          </div>
          <div className="ind" style={{margin:"1rem 0 0rem 0"}}>
          {/* <select value={tenure} onChange={(e) => setTenure(parseInt(e.currentTarget.value))}>
        <option value="5 years">5</option>
        <option value="10 years">10</option>
        <option value="15 years">15</option>
        <option value="20 years">20</option>
        <option value="25 years">25</option>
      </select> */}
<p>Select tenure</p>
      <Dropdown
              options={options}
              onChange={(value) => { setTenure(parseInt(value.value)); }}
              value={tenure.toString()}
            />
          </div>


        </div>

        <div style={{ minWidth: "40dvw"}}>
          <h3 style={{textAlign:"center"}}>Monthly Payment: ${monthlyPayment}</h3>
        <CChart
          type="pie"
          data={{
            labels: ["Principle", "Interest"],
            datasets: [
              {
                backgroundColor: ["#41B883", "#E46651"],
                data: [homevalue, monthlyPayment * tenure * 12 - loanAmount],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "grey",
                },
              },
            },
          }}
        />
      </div>
      </div>
    </>
  );
}

export default App;
