import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { getWelcomeMessage, getBookRecommendation } from '../services/geminiService';
import { ArnJungMascot } from './ArnJungMascot';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [greeting, setGreeting] = useState<string>('กำลังตื่นเต้นที่จะได้เจอคุณ...');
  const [bookRec, setBookRec] = useState<{title: string, reason: string} | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    // Fetch personalized content
    const fetchContent = async () => {
      // Parallel fetch for speed
      const [msg, book] = await Promise.all([
        getWelcomeMessage(user.username),
        getBookRecommendation()
      ]);

      if (isMounted) {
        setGreeting(msg);
        setBookRec(book);
      }
    };

    fetchContent();

    return () => { isMounted = false; };
  }, [user.username]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden relative">
        
        {/* Decorative Top Bar */}
        <div className="h-4 w-full bg-gradient-to-r from-pink-300 via-rose-300 to-orange-200"></div>

        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Mascot */}
            <div className="shrink-0 animate-bounce-slow">
              <ArnJungMascot emotion="happy" className="w-40 h-40" />
            </div>

            {/* Greeting */}
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">
                ยินดีต้อนรับคุณ {user.username}!
              </h1>
              <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100">
                <p className="text-gray-700 leading-relaxed italic">
                  "{greeting}"
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-8">
             <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center md:justify-start gap-2">
               <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
               วันนี้อ่านจังขอแนะนำ...
             </h2>
             
             {bookRec ? (
               <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                 <h3 className="text-lg font-bold text-gray-900 mb-2">
                   📖 {bookRec.title}
                 </h3>
                 <p className="text-gray-600">
                   {bookRec.reason}
                 </p>
               </div>
             ) : (
               <div className="h-32 bg-gray-50 rounded-2xl animate-pulse flex items-center justify-center text-gray-400 text-sm">
                 กำลังค้นหาหนังสือเล่มโปรด...
               </div>
             )}
          </div>

          <div className="mt-10 flex justify-center">
            <button 
              onClick={onLogout}
              className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all text-sm font-medium"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
