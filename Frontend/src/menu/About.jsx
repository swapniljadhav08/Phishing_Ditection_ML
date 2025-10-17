import { useState } from 'react'
import Particles from '../components/Particles';

function About() {


  return (
   <>
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
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
  <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
   <h1>About</h1>
  </div>
</div>
    </>
  );
}

export default About;
