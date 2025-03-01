
import { useState, useEffect } from 'react';
import Terminal from '@/components/Terminal';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading for smoother entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(100,255,218,0.05),rgba(0,0,0,0))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(100,255,218,0.05),rgba(0,0,0,0))]"></div>
      </div>
      
      <div 
        className={`w-full max-w-4xl h-[80vh] transition-all duration-1000 ease-out ${
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{ 
          boxShadow: '0 0 80px rgba(100, 255, 218, 0.1), 0 0 32px rgba(0, 0, 0, 0.5)'
        }}
      >
        <Terminal />
      </div>
    </div>
  );
};

export default Index;
