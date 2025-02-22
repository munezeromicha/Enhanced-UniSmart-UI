import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortColumn?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: keyof T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  onSort,
  sortColumn,
  sortDirection,
  loading = false,
  emptyMessage = 'No data available',
}: TableProps<T>) => {
  const handleSort = (key: string) => {
    if (!onSort) return;
    
    const newDirection = 
      sortColumn === key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(key as keyof T);
  };

  const getSortIcon = (key: string) => {
    if (sortColumn !== key) return <ChevronsUpDown size={16} />;
    return sortDirection === 'asc' ? 
      <ChevronUp size={16} /> : 
      <ChevronDown size={16} />;
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4" />
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-gray-100 rounded mb-2" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.sortable ? (
                  <button
                    className="flex items-center space-x-1 hover:text-gray-700"
                    onClick={() => handleSort(column.key as string)}
                  >
                    <span>{column.header}</span>
                    {onSort && column.sortable && (
                      <span className="ml-2">
                        {getSortIcon(column.key as string)}
                      </span>
                    )}
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((record, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.render
                      ? column.render(record[column.key as keyof T], record)
                      : record[column.key as keyof T]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;