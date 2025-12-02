import React, { useState } from 'react';
import { AuthStatus } from '../types';
import { ArnJungMascot } from './ArnJungMascot';

interface LoginFormProps {
  onLogin: (username: string) => void;
  status: AuthStatus;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, status }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      
      {/* Card Container */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all hover:scale-[1.01]">
        
        {/* Header / Brand Area */}
        <div className="bg-rose-50 p-8 text-center relative overflow-hidden">
            {/* Background pattern circles */}
            <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-rose-100 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute bottom-[-10px] right-[-10px] w-32 h-32 bg-orange-100 rounded-full opacity-50 blur-xl"></div>

            <div className="relative z-10 flex flex-col items-center">
                <ArnJungMascot 
                  emotion={isFocus ? 'excited' : 'happy'} 
                  className={`w-28 h-28 mb-4 transition-transform duration-500 ${isFocus ? 'scale-110 -rotate-3' : ''}`} 
                />
                <h2 className="text-2xl font-bold text-gray-800">ยินดีต้อนรับค่ะ!</h2>
                <p className="text-gray-500 text-sm mt-1">เข้าสู่ระบบเพื่อเริ่มการอ่าน</p>
            </div>
        </div>

        {/* Form Area */}
        <div className="p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username Input */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 ml-1">ชื่อผู้ใช้งาน</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-rose-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all duration-200 sm:text-sm"
                  placeholder="กรอกชื่อของคุณ"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-1">รหัสผ่าน</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-rose-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all duration-200 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-rose-500 focus:ring-rose-400 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-gray-500">จำฉันไว้ในระบบ</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-rose-500 hover:text-rose-400 hover:underline">
                  ลืมรหัสผ่าน?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === AuthStatus.AUTHENTICATING}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === AuthStatus.AUTHENTICATING ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังเข้าสู่ระบบ...
                </span>
              ) : 'เข้าสู่ระบบ'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-400">หรือ</span>
            </div>
          </div>

          {/* Social Login Placeholders */}
          <div className="mt-6 grid grid-cols-2 gap-3">
             <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
               <span className="sr-only">Sign in with Google</span>
               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
             </button>
             <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <span className="sr-only">Sign in with Facebook</span>
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
             </button>
          </div>
          
          <p className="mt-8 text-center text-xs text-gray-400">
             © 2024 Arn-Jung Book Center. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
