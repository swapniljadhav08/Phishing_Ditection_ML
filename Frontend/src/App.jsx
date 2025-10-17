import { useState } from 'react'
import Particles from './components/Particles';
import Login from './menu/login';
import Header from './menu/Header';



function App() {


  return (
   <>
    <div style={{ width: '100%', height: '300px', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%',height:'200px', zIndex: 0 }}>
    <Particles
      particleColors={['#35f531', '#23dc42']}
      particleCount={300}
      particleSpread={10}
      speed={0.2}
      particleBaseSize={200}
      moveParticlesOnHover={false}
      alphaParticles={false}
      disableRotation={false}
    />
  </div> 
  <div style={{ position: 'relative', zIndex: 1 }}>

  {/* <Login /> */}
  
  
  </div>
  </div>
    </>
  );
}

export default App;


