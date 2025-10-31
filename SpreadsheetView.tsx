import React, { useState, useEffect } from 'react';

interface Cell {
  value: string;
  formula?: string;
}

export const SpreadsheetView: React.FC = () => {
  const rows = 20;
  const cols = 10;
  const [cells, setCells] = useState<Record<string, Cell>>({});
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const getCellId = (row: number, col: number) => `${String.fromCharCode(65 + col)}${row + 1}`;
  
  const getColumnLabel = (col: number) => String.fromCharCode(65 + col);

  const handleCellClick = (cellId: string) => {
    setSelectedCell(cellId);
    setEditValue(cells[cellId]?.value || '');
  };

  const handleCellChange = (value: string) => {
    if (!selectedCell) return;
    setCells(prev => ({
      ...prev,
      [selectedCell]: { value, formula: value.startsWith('=') ? value : undefined }
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    if (e.key === 'Enter') {
      handleCellChange(editValue);
      if (row < rows - 1) {
        setSelectedCell(getCellId(row + 1, col));
        setEditValue(cells[getCellId(row + 1, col)]?.value || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleCellChange(editValue);
      if (col < cols - 1) {
        setSelectedCell(getCellId(row, col + 1));
        setEditValue(cells[getCellId(row, col + 1)]?.value || '');
      }
    }
  };

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Spreadsheet</h1>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={() => handleCellChange(editValue)}
            placeholder={selectedCell || 'Select a cell'}
            className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800"
          />
          <button
            onClick={() => setCells({})}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-auto">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 w-12 p-2"></th>
              {Array.from({ length: cols }).map((_, col) => (
                <th key={col} className="border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 p-2 min-w-[100px]">
                  {getColumnLabel(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, row) => (
              <tr key={row}>
                <td className="border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-center p-2 font-semibold">
                  {row + 1}
                </td>
                {Array.from({ length: cols }).map((_, col) => {
                  const cellId = getCellId(row, col);
                  const isSelected = selectedCell === cellId;
                  return (
                    <td
                      key={col}
                      className={`border dark:border-gray-600 p-0 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => handleCellClick(cellId)}
                    >
                      <input
                        type="text"
                        value={isSelected ? editValue : cells[cellId]?.value || ''}
                        onChange={e => isSelected && setEditValue(e.target.value)}
                        onKeyDown={e => handleKeyDown(e, row, col)}
                        className="w-full h-full px-2 py-1 bg-transparent focus:outline-none"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
