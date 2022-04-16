import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [benefitName, setBenefitName] = useState("");
  const [benefits, setBenefits] = useState([]);

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(benefitName);

    axios.post("http://localhost/siremar_backend/add_benefit.php", {
      benefit: benefitName
    }).then(res => {
      console.log(res);
      if(res.data.message === 'success') {
        alert('Success');
      } else {
        alert('Failed');
      }
    })

  }


  const getBenefits = () => {
    axios.get("http://localhost:8000/benefits")
    .then(res => {
      console.log(res.data);
      setBenefits(res.data);
    })
  }

  useEffect(() => {
    getBenefits();
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light container">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
        </div>
      </nav>
      <div className="container">
        <form onSubmit={handelSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" className="form-label">Add benefit</label>
            <input value={benefitName} onChange={e => setBenefitName(e.target.value)} name='benefit_name' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <br></br>
        {
          benefits.map(function(benefit, idx) {
            return (
              <div key={idx}>
                  <h1>{benefit.name}</h1>
                  <hr></hr>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
