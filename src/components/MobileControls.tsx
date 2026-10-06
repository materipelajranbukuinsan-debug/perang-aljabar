import React, { useRef, useState, useEffect } from 'react';
import { Crosshair, Sparkles } from 'lucide-react';

interface MobileControlsProps {
  onMove: (dx: number, dy: number) => void;
  onShoot: () => void;
  onAim: (angle: number) => void;
  nearDiamondType: 'blue' | 'red' | null;
  onInteractDiamond: () => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onMove,
  onShoot,
  onAim,
  nearDiamondType,
  onInteractDiamond
}) => {
  const joystickRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isTouching, setIsTouching] = useState(false);
  const activeTouchId = useRef<number | null>(null);

  const radius = 45; // Max knob distance from center

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTouching) return;
    const touch = e.changedTouches[0];
    activeTouchId.current = touch.identifier;
    setIsTouching(true);
    updateJoystick(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      if (touch.identifier === activeTouchId.current) {
        updateJoystick(touch.clientX, touch.clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === activeTouchId.current) {
        setIsTouching(false);
        setKnobPos({ x: 0, y: 0 });
        activeTouchId.current = null;
        onMove(0, 0);
        break;
      }
    }
  };

  const updateJoystick = (clientX: number, clientY: number) => {
    if (!joystickRef.current) return;
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);
    const angle = Math.atan2(deltaY, deltaX);

    const clampedDist = Math.min(radius, distance);
    const knobX = Math.cos(angle) * clampedDist;
    const knobY = Math.sin(angle) * clampedDist;

    setKnobPos({ x: knobX, y: knobY });

    // Normalized speed values (-1 to 1)
    const normX = clampedDist > 5 ? knobX / radius : 0;
    const normY = clampedDist > 5 ? knobY / radius : 0;

    onMove(normX, normY);
    if (clampedDist > 10) {
      onAim(angle);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-35 flex items-end justify-between p-4 sm:p-6 select-none md:hidden">
      {/* Left: Virtual Joystick */}
      <div
        ref={joystickRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="pointer-events-auto relative w-28 h-28 rounded-full bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700/60 shadow-xl flex items-center justify-center touch-none mb-14"
      >
        <div className="absolute w-12 h-12 rounded-full border border-slate-600/40 pointer-events-none" />
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-600 to-cyan-400 border border-white/60 shadow-lg shadow-cyan-500/30 transition-transform ${
            isTouching ? 'scale-110' : 'scale-100'
          }`}
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`
          }}
        />
      </div>

      {/* Right: Combat Buttons */}
      <div className="pointer-events-auto flex flex-col items-end gap-3 mb-14">
        {/* Interact Diamond Button (if near) */}
        {nearDiamondType && (
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onInteractDiamond();
            }}
            onClick={onInteractDiamond}
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-xs font-bold border-2 shadow-xl animate-pulse cursor-pointer ${
              nearDiamondType === 'blue'
                ? 'bg-cyan-500 text-slate-950 border-white shadow-cyan-500/50'
                : 'bg-rose-500 text-white border-white shadow-rose-500/50'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[9px] uppercase font-black">Soal</span>
          </button>
        )}

        {/* Shoot Button */}
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            onShoot();
          }}
          onClick={onShoot}
          className="w-18 h-18 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 border-2 border-white/80 shadow-2xl shadow-rose-600/50 flex flex-col items-center justify-center text-white active:scale-90 transition-transform cursor-pointer"
        >
          <Crosshair className="w-7 h-7" />
          <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">TEMBAK</span>
        </button>
      </div>
    </div>
  );
};
