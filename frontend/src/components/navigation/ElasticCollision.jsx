import React, { useEffect, useRef, useState } from 'react';
import { PauseCircle, PlayCircle, RotateCcw, SaveIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

class Ball {
  constructor(x, y, mass, velocity, color) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.velocity = velocity;
    this.color = color;
  }

  draw(ctx, canvasWidth) {
    const radius = Math.sqrt(this.mass) * (canvasWidth / 40);
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    const vectorScale = canvasWidth / 16;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.velocity * vectorScale, this.y);
    ctx.strokeStyle = this.velocity > 0 ? '#4CAF50' : '#f44336';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    const arrowSize = 10;
    const angle = this.velocity > 0 ? 0 : Math.PI;
    ctx.beginPath();
    ctx.moveTo(this.x + this.velocity * vectorScale, this.y);
    ctx.lineTo(
      this.x + this.velocity * vectorScale - arrowSize * Math.cos(angle - Math.PI/6),
      this.y - arrowSize * Math.sin(angle - Math.PI/6)
    );
    ctx.lineTo(
      this.x + this.velocity * vectorScale - arrowSize * Math.cos(angle + Math.PI/6),
      this.y - arrowSize * Math.sin(angle + Math.PI/6)
    );
    ctx.closePath();
    ctx.fillStyle = this.velocity > 0 ? '#4CAF50' : '#f44336';
    ctx.fill();
  }

  update(canvasWidth) {
    const radius = Math.sqrt(this.mass) * (canvasWidth / 40);
    this.x += this.velocity * (canvasWidth / 800);
    
    if (this.x - radius <= 0) {
      this.x = radius;
      this.velocity *= -1;
    } else if (this.x + radius >= canvasWidth) {
      this.x = canvasWidth - radius;
      this.velocity *= -1;
    }
    
    return radius;
  }
}

const ElasticCollision = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [measurements, setMeasurements] = useState({
    momentum1: 0,
    momentum2: 0,
    energy: 0
  });
  const [params, setParams] = useState({
    mass1: 0.5,
    velocity1: 1.0,
    mass2: 1.5,
    velocity2: -0.5
  });
  
  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);

  const drawBackground = (ctx, width, height) => {
    ctx.fillStyle = '#e8f4f8';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    
    for(let x = 0; x < width; x += width/20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for(let y = 0; y < height; y += height/10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const checkCollision = (b1, b2, radius1, radius2) => {
    const dx = b2.x - b1.x;
    const distance = Math.abs(dx);
    
    if (distance <= radius1 + radius2) {
      // Elastic collision formulas
      const v1 = ((b1.mass - b2.mass) * b1.velocity + 2 * b2.mass * b2.velocity) / (b1.mass + b2.mass);
      const v2 = ((b2.mass - b1.mass) * b2.velocity + 2 * b1.mass * b1.velocity) / (b1.mass + b2.mass);
      
      b1.velocity = v1;
      b2.velocity = v2;
      
      // Separate balls to prevent sticking
      const overlap = radius1 + radius2 - distance;
      const shift = overlap / 2;
      
      if (dx > 0) {
        b1.x -= shift;
        b2.x += shift;
      } else {
        b1.x += shift;
        b2.x -= shift;
      }
    }
  };

  const updateMeasurements = () => {
    const momentum1 = ball1Ref.current.mass * ball1Ref.current.velocity;
    const momentum2 = ball2Ref.current.mass * ball2Ref.current.velocity;
    const energy = 
      0.5 * ball1Ref.current.mass * ball1Ref.current.velocity * ball1Ref.current.velocity + 
      0.5 * ball2Ref.current.mass * ball2Ref.current.velocity * ball2Ref.current.velocity;
    
    setMeasurements({
      momentum1: momentum1.toFixed(2),
      momentum2: momentum2.toFixed(2),
      energy: energy.toFixed(2)
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx, canvas.width, canvas.height);
    
    const radius1 = ball1Ref.current.update(canvas.width);
    const radius2 = ball2Ref.current.update(canvas.width);
    
    checkCollision(ball1Ref.current, ball2Ref.current, radius1, radius2);
    
    ball1Ref.current.draw(ctx, canvas.width);
    ball2Ref.current.draw(ctx, canvas.width);
    
    updateMeasurements();
    
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const handleParamChange = (e, param) => {
    const value = parseFloat(e.target.value);
    setParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const resetSimulation = () => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const canvas = canvasRef.current;
    ball1Ref.current = new Ball(
      canvas.width * 0.25,
      canvas.height/2,
      params.mass1,
      params.velocity1,
      '#87CEEB'
    );
    
    ball2Ref.current = new Ball(
      canvas.width * 0.75,
      canvas.height/2,
      params.mass2,
      params.velocity2,
      '#FF69B4'
    );
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx, canvas.width, canvas.height);
    ball1Ref.current.draw(ctx, canvas.width);
    ball2Ref.current.draw(ctx, canvas.width);
    updateMeasurements();
  };

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientWidth * 0.5;
      resetSimulation();
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    resetSimulation();
  }, [params]);

  const { user } = useAuth();
  const [saveStatus, setSaveStatus] = useState('');

  const saveConfiguration = async () => {
    if (!user) {
      setSaveStatus('Please login to save configuration');
      return;
    }
    try {
      const response = await fetch('/api/save-configuration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          simulation_type: 'elastic', // or 'inelastic' for InelasticCollision
          configuration: params,
        }),
      });
  
      if (response.ok) {
        setSaveStatus('Configuration saved successfully!');
      } else {
        setSaveStatus('Failed to save configuration');
      }
    } catch (error) {
      setSaveStatus('Error saving configuration');
    }
  };

  useEffect(() => {
    const loadConfiguration = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`/api/get-configuration/${user.id}/`);
        const data = await response.json();
        
        if (response.ok && data.configuration) {
          setParams(data.configuration);
        }
      } catch (error) {
        console.error('Error loading configuration:', error);
      }
    };
  
    loadConfiguration();
  }, [user]);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-sky-100 p-4">
        <h2 className="text-2xl font-bold text-[#4A2B2B] text-center">
          Elastic Collision Simulation
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-sky-50 p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ball 1 Mass (kg)
                </label>
                <input
                  type="number"
                  value={params.mass1}
                  min="0.1"
                  step="0.1"
                  onChange={(e) => handleParamChange(e, 'mass1')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ball 1 Velocity (m/s)
                </label>
                <input
                  type="number"
                  value={params.velocity1}
                  step="0.1"
                  onChange={(e) => handleParamChange(e, 'velocity1')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ball 2 Mass (kg)
                </label>
                <input
                  type="number"
                  value={params.mass2}
                  min="0.1"
                  step="0.1"
                  onChange={(e) => handleParamChange(e, 'mass2')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ball 2 Velocity (m/s)
                </label>
                <input
                  type="number"
                  value={params.velocity2}
                  step="0.1"
                  onChange={(e) => handleParamChange(e, 'velocity2')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={toggleSimulation}
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              {isRunning ? (
                <>
                  <PauseCircle className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 px-4 py-2 border border-sky-500 text-sky-500 rounded-lg hover:bg-sky-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            {user && (
              <button
                onClick={saveConfiguration}
                className="flex items-center gap-2 px-4 py-2 border border-sky-500 text-sky-500 rounded-lg hover:bg-sky-50 transition-colors"
              >
                <SaveIcon className="w-4 h-4" />
                Save Config
              </button>
            )}
          </div>
          {/* Add status message */}
          {saveStatus && (
            <div className={`text-center mt-2 ${
              saveStatus.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}>
              {saveStatus}
            </div>
          )}

          <div className="border border-sky-200 rounded-lg p-4 bg-sky-50">
            <canvas
              ref={canvasRef}
              className="w-full rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
              <h3 className="font-semibold mb-2 text-[#4A2B2B]">Ball 1 Momentum</h3>
              <p className="text-sky-800">{measurements.momentum1} kg⋅m/s</p>
            </div>
            <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
              <h3 className="font-semibold mb-2 text-[#4A2B2B]">Ball 2 Momentum</h3>
              <p className="text-sky-800">{measurements.momentum2} kg⋅m/s</p>
            </div>
            <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
              <h3 className="font-semibold mb-2 text-[#4A2B2B]">Total Energy</h3>
              <p className="text-sky-800">{measurements.energy} J</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElasticCollision;