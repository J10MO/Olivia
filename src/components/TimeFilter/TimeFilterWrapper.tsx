// src/components/TimeFilter/TimeFilterWrapper.tsx
import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import houer from '../../assets/hour.png';

export interface TimeData {
  type: "preset" | "custom";
  period?: string; // for preset times like "today", "last_week"
  startDateTime?: string; // for custom times in ISO format
  endDateTime?: string; // for custom times in ISO format
  startDate?: string; // for custom times date part
  endDate?: string; // for custom times date part
  startTime?: string; // for custom times time part
  endTime?: string; // for custom times time part
}

interface TimeFilterWrapperProps {
  children: (timeData: TimeData) => React.ReactNode;
  defaultPeriod?: string;
}

// Time period options
const timePeriods = [
  { label: "Today", value: "today" },
  { label: "Last Week", value: "last_week" },
  { label: "Last Month", value: "last_month" },
  { label: "Last Year", value: "last_year" },
  { label: "All Time", value: "all_time" },
  { label: "Custom", value: "custom" }
];

export default function TimeFilterWrapper({ children, defaultPeriod = "today" }: TimeFilterWrapperProps) {
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [showCustomTimePicker, setShowCustomTimePicker] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(defaultPeriod);
  const [customTimeRange, setCustomTimeRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    startTime: "00:00",
    endTime: "23:59"
  });

  const handleTimePeriodSelect = (period: string) => {
    if (period === "custom") {
      setShowCustomTimePicker(true);
      setShowTimeOptions(false);
    } else {
      setSelectedTimePeriod(period);
      setShowTimeOptions(false);
    }
  };

  const handleCustomTimeApply = () => {
    setSelectedTimePeriod("custom");
    setShowCustomTimePicker(false);
  };

  const getSelectedTimePeriodLabel = () => {
    if (selectedTimePeriod === "custom") {
      return `${customTimeRange.startDate} - ${customTimeRange.endDate}`;
    }
    const selectedPeriod = timePeriods.find(period => period.value === selectedTimePeriod);
    return selectedPeriod ? selectedPeriod.label : "Today";
  };

  const getCurrentTimeData = (): TimeData => {
    if (selectedTimePeriod === "custom") {
      return {
        type: "custom",
        startDateTime: `${customTimeRange.startDate}T${customTimeRange.startTime}:00`,
        endDateTime: `${customTimeRange.endDate}T${customTimeRange.endTime}:59`,
        ...customTimeRange
      };
    }
    return {
      type: "preset",
      period: selectedTimePeriod
    };
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.time-dropdown-container') && !target.closest('.custom-time-modal')) {
        setShowTimeOptions(false);
        setShowCustomTimePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Custom Time Picker Modal */}
      {showCustomTimePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="custom-time-modal bg-[#1F1F1F] border border-gray-700 rounded-lg p-6 w-96 max-w-md">
            <h3 className="text-white text-lg font-semibold mb-4">Select Custom Time Range</h3>
            
            <div className="space-y-4">
              {/* Start Date and Time */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">From</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={customTimeRange.startDate}
                    onChange={(e) => setCustomTimeRange({...customTimeRange, startDate: e.target.value})}
                    className="flex-1 bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="time"
                    value={customTimeRange.startTime}
                    onChange={(e) => setCustomTimeRange({...customTimeRange, startTime: e.target.value})}
                    className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* End Date and Time */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">To</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={customTimeRange.endDate}
                    onChange={(e) => setCustomTimeRange({...customTimeRange, endDate: e.target.value})}
                    className="flex-1 bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="time"
                    value={customTimeRange.endTime}
                    onChange={(e) => setCustomTimeRange({...customTimeRange, endTime: e.target.value})}
                    className="bg-[#2A2A2A] border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    setCustomTimeRange({
                      startDate: today,
                      endDate: today,
                      startTime: "00:00",
                      endTime: "23:59"
                    });
                  }}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white text-xs py-2 px-3 rounded transition"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split('T')[0];
                    setCustomTimeRange({
                      startDate: yesterdayStr,
                      endDate: yesterdayStr,
                      startTime: "00:00",
                      endTime: "23:59"
                    });
                  }}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white text-xs py-2 px-3 rounded transition"
                >
                  Yesterday
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const lastWeek = new Date(today);
                    lastWeek.setDate(lastWeek.getDate() - 7);
                    setCustomTimeRange({
                      startDate: lastWeek.toISOString().split('T')[0],
                      endDate: today.toISOString().split('T')[0],
                      startTime: "00:00",
                      endTime: "23:59"
                    });
                  }}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white text-xs py-2 px-3 rounded transition"
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const lastMonth = new Date(today);
                    lastMonth.setDate(lastMonth.getDate() - 30);
                    setCustomTimeRange({
                      startDate: lastMonth.toISOString().split('T')[0],
                      endDate: today.toISOString().split('T')[0],
                      startTime: "00:00",
                      endTime: "23:59"
                    });
                  }}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white text-xs py-2 px-3 rounded transition"
                >
                  Last 30 Days
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-600">
              <button
                onClick={() => setShowCustomTimePicker(false)}
                className="flex-1 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white py-2 px-4 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomTimeApply}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Filter Header */}
      <div className="bg-[#1f1f1f] border-none mb-0 absolute right-0 mt-3 mr-3 z-10">
        <div className="flex justify-end items-end">
          {/* <div>
            <h2 className="text-xl font-semibold text-white">Time Filter</h2>
            <p className="text-gray-400 text-sm">Select time range for data filtering</p>
          </div> */}
          
          <div className="relative time-dropdown-container ">
            <button 
              onClick={() => {
                setShowTimeOptions(!showTimeOptions);
              }}
              className="group flex items-center gap-2 h-9 px-4 rounded-md bg-[#2A2A2A] text-white text-sm hover:bg-[#3A3A3A] transition"
            >
              {getSelectedTimePeriodLabel()}
              <img
                src={houer}
                className="h-4 w-4"
                style={{ filter: "invert(1) brightness(2)" }}
                alt="hour"
              />
              <ArrowUpRight
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  showTimeOptions ? "rotate-90" : "rotate-45"
                }`}
              />
            </button>

            {showTimeOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1F1F1F] border border-gray-700 rounded-md shadow-lg z-10">
                {timePeriods.map((period) => (
                  <button
                    key={period.value}
                    onClick={() => handleTimePeriodSelect(period.value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#2A2A2A] transition ${
                      selectedTimePeriod === period.value 
                        ? "text-amber-100 bg-[#2A2A2A]" 
                        : "text-white"
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render children with timeData */}
      {children(getCurrentTimeData())}
    </div>
  );
}