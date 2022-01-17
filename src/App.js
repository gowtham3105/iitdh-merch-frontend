import React, {useState} from "react";
import FadeIn from 'react-fade-in';
import {Fade} from 'react-reveal';

import {
  BrowserRouter as Router,
 Routes,
  Route,
} from "react-router-dom";
import ConsumerDashboard from "./Components/ConsumerDashboard/ConsumerDashboard";
import MarkOrder from "./Components/MarkOrder/MarkOrder";
import './App.css';

const App = () => {

    const [loadingCompleted, setLoadingCompleted] = useState(false);

  return (
    <div className="App">
      <div className='parent-div'>
        <Router>
          <Fade delay={500} duration={1000} onReveal={() =>{setLoadingCompleted(true)}}>
            <Routes>
                <Route path="/" element={<ConsumerDashboard loadingCompleted={loadingCompleted} />} />
                <Route path="/markOrder/" element={<MarkOrder loadingCompleted={loadingCompleted} />} >
                    <Route path="/markOrder/:id" element={<MarkOrder loadingCompleted={loadingCompleted} />} />
                </Route>

                {/*</Route>*/}

            </Routes>
          </Fade>
        </Router>
      </div>

    </div>
  );
}

export default App;
