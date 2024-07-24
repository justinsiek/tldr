import React, { useState } from 'react';

function Index() {
  const [query, setQuery] = useState('');
  const [summary, setSummary] = useState('');

  const retrieveSummary = () => {
    fetch(`http://localhost:8080/api/retrieve?query=${query}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSummary(data);
      });
  };

  return (
    <div className='flex flex-col items-center h-screen w-screen bg-blue-50'>
      <h1 className='text-4xl font-bold text-gray-400 text-4xl my-4'>tl;dr</h1>
      <input
        className= {` w-3/4 my-4 border-none text-none focus:border-none 
                    focus:outline-none focus:ring-0 bg-blue-50 w-1/2 text-gray-400 text-2xl`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            retrieveSummary();
          }
        }}
        placeholder="Search here..."
      />
      <div className='text-gray-500 text-2xl w-3/4'>
        tldr: {summary}
      </div>
      
    </div>
  );
}

export default Index;