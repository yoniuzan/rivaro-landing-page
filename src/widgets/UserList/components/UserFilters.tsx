/**
 * UserFilters Component
 * Filter controls for the user list
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Select, Button, Flex } from '@components/base';
import { USER_ROLES, SORT_OPTIONS } from '../UserList.constant';
import type { SelectOption } from '@components/base';

interface UserFiltersProps {
  searchValue: string;
  roleValue: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
  onReset: () => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  searchValue,
  roleValue,
  sortBy,
  sortOrder,
  onSearchChange,
  onRoleChange,
  onSortByChange,
  onSortOrderChange,
  onReset,
}) => {
  const { t } = useTranslation();

  const roleOptions: SelectOption[] = [
    { value: '', label: t('common.select') },
    { value: USER_ROLES.ADMIN, label: 'Administrator' },
    { value: USER_ROLES.USER, label: 'User' },
    { value: USER_ROLES.GUEST, label: 'Guest' },
  ];

  const sortOptions: SelectOption[] = SORT_OPTIONS.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  return (
    <Flex
      direction={{ mobile: 'column', tablet: 'row' }}
      gap={16}
      align="end"
      wrap="wrap"
    >
      <div style={{ flex: 1, minWidth: '200px', width: '100%' }}>
        <Input
          type="search"
          placeholder={t('common.search')}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          fullWidth
        />
      </div>

      <div style={{ flex: 1, minWidth: '150px', width: '100%' }}>
        <Select
          options={roleOptions}
          value={roleValue}
          onChange={onRoleChange}
          placeholder="סינון לפי תפקיד"
          searchable
          fullWidth
        />
      </div>

      <div style={{ flex: 1, minWidth: '150px', width: '100%' }}>
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={onSortByChange}
          placeholder="מיון לפי"
          searchable
          fullWidth
        />
      </div>

      <Flex direction="row" gap={8} style={{ width: '100%' }}>
        <Button
          variant="secondary"
          size="md"
          onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          fullWidth
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>

        <Button variant="secondary" size="md" onClick={onReset} fullWidth>
          {t('common.reset')}
        </Button>
      </Flex>
    </Flex>
  );
};

