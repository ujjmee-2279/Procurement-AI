import React from 'react';
import { useNumbarCard } from '../contexts/NumberCardContext';

const NumberCard = () => {
    const numberCardData = useNumbarCard();

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
            {numberCardData?.map((data, i) => (
                <div
                    key={i}
                    className='h-[220px] shadow-lg rounded-lg flex flex-col justify-between items-center p-6 bg-gradient-to-b from-gray-800 via-black to-gray-900 text-white transition-transform transform hover:scale-105 hover:shadow-2xl'
                >
                    <h4 className='text-xl font-semibold mb-2'>{data.name}</h4>
                    <div className='flex items-center space-x-4'>
                        <data.icon size={32} className='text-white' />
                        <p className='text-3xl font-bold'>{data.count}</p>
                    </div>
                    <div className='flex items-center justify-between w-full mt-4 px-4'>
                        <p className='text-gray-400'>Trend(Since Last Week)</p>
                        <data.trendicon size={24} className='text-green-400' />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NumberCard;
