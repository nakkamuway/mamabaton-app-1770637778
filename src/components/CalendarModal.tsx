import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [weekOffset, setWeekOffset] = useState(0);

  if (!isOpen) return null;

  // 現在の日付から1週間分の日付を生成（週オフセット考慮）
  const today = new Date();
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + (weekOffset * 7));
    return {
      date: date.getDate(),
      day: ['月', '火', '水', '木', '金', '土', '日'][date.getDay()],
      month: date.getMonth() + 1
    };
  });

  const timeSlots: TimeSlot[] = Array.from({ length: 27 }, (_, i) => {
    const hour = Math.floor(i / 2) + 7;
    const minute = i % 2 === 0 ? '00' : '30';
    return {
      time: `${hour.toString().padStart(2, '0')}:${minute}`,
      available: Math.random() > 0.7
    };
  });

  const handleNextWeek = () => {
    setWeekOffset(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{weekDates[0].month}月</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleNextWeek}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="mb-6 border rounded-lg overflow-hidden">
          <div className="grid grid-cols-[80px_1fr] border-b">
            <div className="text-center py-2 border-r bg-gray-50">
              <div className="text-sm text-gray-600">時間</div>
            </div>
            <div className="grid grid-cols-7">
              {weekDates.map((date, i) => (
                <div 
                  key={i} 
                  className={`text-center py-2 ${i !== 6 ? 'border-r' : ''} ${
                    date.day === '土' ? 'text-blue-600' : 
                    date.day === '日' ? 'text-red-600' : ''
                  }`}
                >
                  <div className="text-sm">{date.day}</div>
                  <div className="text-lg font-medium">{date.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="border rounded-lg overflow-hidden">
          {timeSlots.map((slot, slotIndex) => (
            <div 
              key={slot.time} 
              className={`grid grid-cols-[80px_1fr] ${
                slotIndex !== timeSlots.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="text-sm text-gray-600 p-2 border-r bg-gray-50">
                {slot.time}
              </div>
              <div className="grid grid-cols-7">
                {Array.from({ length: 7 }).map((_, i) => {
                  const isAvailable = Math.random() > 0.7;
                  return (
                    <div 
                      key={i} 
                      className={`flex items-center justify-center p-2 ${
                        i !== 6 ? 'border-r' : ''
                      }`}
                    >
                      <span className={`text-sm ${
                        isAvailable ? 'text-primary-600' : 'text-gray-400'
                      }`}>
                        {isAvailable ? '○' : '×'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-sm text-gray-500">
          <p>※ スタンダードプランを依頼した場合に、この先生が対応できる時間を表示しています。</p>
          <p className="mt-1">※ この先生は、別途3,000円（税込）の指名料がかかります。</p>
        </div>

        {/* Action Button */}
        <button
          onClick={onSelect}
          className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition mt-6"
        >
          この先生を指名
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;