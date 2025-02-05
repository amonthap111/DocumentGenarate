
import { Link } from 'react-router-dom'; // เพิ่ม React Router สำหรับการนำทาง
import './App.css'

// เพิ่มรูปภาพไอคอนสำหรับตกแต่ง
import leaseIcon from '../IMG/designer-girl-concept-illustration_114360-4455.jpg';
import saleIcon from '../IMG/designer-girl-concept-illustration_114360-4455.jpg';

function App() {
 

  return (
    <>
  
    <div className="conteiner">
      <div className="conteiner-header">
        <img src="" alt="" />
        <p>AGENT-J</p>
      </div>
      <div className="conteiner-banner">
        <img src="https://english.artandthecity.com/wp-content/uploads/2022/11/Illustratie-Creativiteit-1024x1024.png" alt="" />
      </div>
      <div className="contract-container">
        {/* สัญญาเช่า */}
        <Link to="/Doc" className="contract-box">
          <img src={leaseIcon} alt="Lease Icon" className="contract-icon" />
          <h3>สัญญาเช่า</h3>
        </Link>

        {/* สัญญาขาย */}
        <Link to="/DocumentEnglih" className="contract-box">
          <img src={saleIcon} alt="Sale Icon" className="contract-icon" />
          <h3>สัญญาเช่า(ภาษาอังกฤษ)</h3>
        </Link>
        <Link to="/sale" className="contract-box">
          <img src={saleIcon} alt="Sale Icon" className="contract-icon" />
          <h3>สัญญาขาย</h3>
        </Link>
      </div>
      </div>
    </>
  )
}

export default App
