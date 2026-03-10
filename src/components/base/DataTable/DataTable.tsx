import React from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from '@hooks/useWindowSize';
import { isMobile } from '@utils/responsive';
import { LoadingSpinner } from '../LoadingSpinner';
import { Card } from '../Card';
import { Typography } from '../Typography';
import styles from './DataTable.module.css';

export interface DataTableColumn<T> {
  id: string;
  label: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  pagination?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  sortable?: boolean;
  onRowClick?: (row: T, index: number) => void;
  className?: string;
}

type Order = 'asc' | 'desc';

/**
 * DataTable Component
 * HTML-based table with sorting and pagination
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage,
  pagination = false,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  sortable = false,
  onRowClick,
  className = '',
}: DataTableProps<T>) {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  
  const { width } = useWindowSize();
  const isMobileView = isMobile(width);
  
  const finalEmptyMessage = emptyMessage || t('components.table.noData');

  const handleRequestSort = (property: string) => {
    if (!sortable) return;

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = React.useMemo(() => {
    if (!sortable || !orderBy) return data;

    return [...data].sort((a, b) => {
      const aVal = a[orderBy] as string | number;
      const bVal = b[orderBy] as string | number;

      if (aVal === bVal) return 0;

      const comparison = aVal > bVal ? 1 : -1;
      return order === 'asc' ? comparison : -comparison;
    });
  }, [data, order, orderBy, sortable]);

  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;

    const startIndex = page * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, pagination, page, rowsPerPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  if (loading) {
    return (
      <div className={styles['state-container']}>
        <LoadingSpinner />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles['state-container']}>
        {finalEmptyMessage}
      </div>
    );
  }

  if (isMobileView) {
    return (
      <div className={className}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {paginatedData.map((row, rowIndex) => (
            <Card
              key={`mobile-row-${rowIndex}`}
              onClick={() => onRowClick?.(row, rowIndex)}
              className={onRowClick ? styles['tr--clickable'] : ''}
              variant="outlined"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {columns.map((column) => (
                  <div key={column.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text-secondary">
                      {column.label}
                    </Typography>
                    <div>
                      {column.render ? column.render(row, rowIndex) : (row[column.id] as React.ReactNode)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        {pagination && (
          <div className={styles.pagination}>
             {/* Pagination controls reuse */}
             {/* ... simplified for mobile or same as desktop ... */}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className={[
                  styles.th,
                  sortable && column.sortable !== false ? styles['th--sortable'] : '',
                ].join(' ')}
                style={{ width: column.width, textAlign: column.align || 'left' }}
                onClick={() => column.sortable !== false && handleRequestSort(column.id)}
              >
                {column.label}
                {orderBy === column.id && (
                  <span className={styles['sort-icon']}>
                    {order === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={[
                styles.tr,
                onRowClick ? styles['tr--clickable'] : '',
              ].join(' ')}
              onClick={() => onRowClick?.(row, rowIndex)}
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className={styles.td}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {column.render
                    ? column.render(row, rowIndex)
                    : (row[column.id] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className={styles.pagination}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{t('components.table.rowsPerPage')}:</span>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className={styles['pagination-select']}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <span>
            {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, sortedData.length)} / {sortedData.length}
          </span>

          <div className={styles['pagination-actions']}>
            <button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              className={styles['pagination-btn']}
            >
              {'<'}
            </button>
            <button
              onClick={() => handleChangePage(page + 1)}
              disabled={page >= totalPages - 1}
              className={styles['pagination-btn']}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
