'use client';

// Fixed: Import React to resolve namespace errors
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

// ============================================
// 골프공 굴러가는 프로그레스 인디케이터
// ============================================

interface GolfProgressProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function GolfProgress({ currentStep, totalSteps, labels }: GolfProgressProps) {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      {/* 트랙 */}
      <div className="relative h-12 flex items-center">
        {/* 배경 라인 (잔디 느낌) */}
        <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-green-200 via-green-300 to-green-200 rounded-full" />

        {/* 진행된 라인 */}
        <motion.div
          className="absolute left-0 h-2 bg-gradient-to-r from-tee-accent-primary to-emerald-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />

        {/* 홀 표시 */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const position = (index / (totalSteps - 1)) * 100;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === totalSteps - 1;

          return (
            <div
              key={index}
              className="absolute -translate-x-1/2"
              style={{ left: `${position}%` }}
            >
              {isLast ? (
                // 마지막: 깃발이 있는 홀
                <motion.div
                  className="relative"
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gray-800 border-4 border-gray-600 shadow-inner" />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-0.5 h-6 bg-gray-600" />
                    <motion.div
                      className="absolute -top-1 left-0.5 w-4 h-3 bg-red-500 rounded-sm origin-left"
                      animate={{ rotateY: [0, 15, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                </motion.div>
              ) : (
                // 일반 홀
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-colors ${
                    isCompleted
                      ? 'bg-tee-accent-primary border-tee-accent-primary'
                      : 'bg-white border-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}

        {/* 굴러가는 골프공 */}
        <motion.div
          className="absolute -translate-x-1/2 z-10"
          initial={{ left: 0 }}
          animate={{
            left: `${progress}%`,
            rotate: progress * 3.6, // 360도 회전
          }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 15,
          }}
        >
          <div className="relative">
            {/* 골프공 */}
            <div className="w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center overflow-hidden">
              {/* 딤플 패턴 */}
              <div className="absolute inset-0.5 rounded-full">
                <div className="absolute top-1 left-2 w-1 h-1 rounded-full bg-gray-200" />
                <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-gray-200" />
                <div className="absolute bottom-2 left-3 w-1 h-1 rounded-full bg-gray-200" />
                <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-gray-200" />
                <div className="absolute top-3 left-1 w-1 h-1 rounded-full bg-gray-200" />
              </div>
            </div>
            {/* 그림자 */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/10 rounded-full blur-sm" />
          </div>
        </motion.div>
      </div>

      {/* 라벨 */}
      {labels && (
        <div className="flex justify-between mt-2 px-2">
          {labels.map((label, index) => (
            <span
              key={index}
              className={`text-xs font-medium transition-colors ${
                index <= currentStep ? 'text-tee-ink-strong' : 'text-tee-ink-muted'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// 골프공 로딩 스피너
// ============================================

interface GolfSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function GolfSpinner({ message = '로딩 중...', size = 'md' }: GolfSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* 골프공이 굴러가는 애니메이션 */}
      <div className="relative w-24 h-12 flex items-end">
        {/* 잔디 */}
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full" />

        {/* 굴러가는 공 */}
        <motion.div
          className={`${sizeClasses[size]} relative`}
          animate={{
            x: [0, 40, 0],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-full h-full rounded-full bg-white shadow-lg border border-gray-200">
            <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-gray-200" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-200" />
            <div className="absolute bottom-2 left-3 w-1.5 h-1.5 rounded-full bg-gray-200" />
          </div>
        </motion.div>
      </div>

      {message && (
        <motion.p
          className="text-sm text-tee-ink-light"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

// ============================================
// 홀인원 완료 애니메이션
// ============================================

interface HoleInOneProps {
  show: boolean;
  onComplete?: () => void;
}

export function HoleInOne({ show, onComplete }: HoleInOneProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShowConfetti(true);
        onComplete?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <div className="relative flex flex-col items-center">
          {/* 홀 */}
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-800 border-4 border-gray-600 shadow-inner flex items-center justify-center">
              {/* 공이 들어가는 애니메이션 */}
              <motion.div
                initial={{ y: -60, scale: 1 }}
                animate={{ y: 0, scale: 0.5 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <div className="w-6 h-6 rounded-full bg-white shadow-lg border border-gray-200" />
              </motion.div>
            </div>

            {/* 깃발 */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <div className="w-1 h-12 bg-gray-600" />
              <motion.div
                className="absolute top-0 left-1 w-6 h-4 bg-red-500 rounded-sm origin-left"
                animate={{ rotateY: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </div>

          {/* 콘페티 */}
          {showConfetti && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][i % 5],
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ x: 0, y: 0, scale: 0 }}
                  animate={{
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                    scale: [0, 1, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.02,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* 텍스트 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-tee-ink-strong mb-1">
              홀인원! 🎉
            </h2>
            <p className="text-tee-ink-light">프로필이 완성되었습니다</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// 버튼 호버 효과 (공 튕김)
// ============================================

interface BouncyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function BouncyButton({ children, onClick, disabled, className }: BouncyButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={className}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}

// ============================================
// 스텝 전환 애니메이션 래퍼
// ============================================

interface StepTransitionProps {
  step: number;
  children: React.ReactNode;
}

export function StepTransition({ step, children }: StepTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
