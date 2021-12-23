import React, {useEffect,useState} from "react";
import FadeIn from 'react-fade-in';
import {
  BrowserRouter as Router,
 Routes,
  Route,
  Link
} from "react-router-dom";
import ConsumerDashboard from "./Components/ConsumerDashboard/ConsumerDashboard";
import './App.css';

const App = () => {

    const [loadingCompleted, setLoadingCompleted] = useState(false);

  return (
    <div className="App">
      <div className='parent-div'>
        <Router>
          <FadeIn delay={500} transitionDuration={1000} onComplete={() =>{setLoadingCompleted(true)}}>
            <Routes>
              <Route path="/" element={<ConsumerDashboard loadingCompleted={loadingCompleted} />} />
            </Routes>
          </FadeIn>
        </Router>
      </div>

    </div>
  );
}

export default App;
