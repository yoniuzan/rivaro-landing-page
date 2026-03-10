/**
 * UserList Widget
 * Main widget component for displaying and managing users
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Grid, LoadingSpinner, Flex } from '@components/base';
import { useUserList } from './hooks';
import { UserCard, UserFilters } from './components';
import type { User } from './types';
import styles from './UserList.module.css';

export const UserList: React.FC = () => {
  const { t } = useTranslation();
  const {
    users,
    total,
    isLoading,
    error,
    filters,
    sortBy,
    sortOrder,
    selectedUserId,
    actions,
  } = useUserList();

  if (isLoading) {
    return <LoadingSpinner size="lg" centered />;
  }

  if (error) {
    return (
      <Flex direction="column" align="center" justify="center" gap={16}>
        <Typography variant="h4" color="error">
          {t('common.error')}
        </Typography>
        <Typography variant="body1" color="text-secondary">
          {t('errors.generic')}
        </Typography>
      </Flex>
    );
  }

  return (
    <div className={styles.container}>
      <Flex direction="column" gap={24}>
        <Flex direction="row" justify="between" align="center">
          <Typography variant="h3">User List</Typography>
          <Typography variant="body2" color="text-secondary">
            {total} users
          </Typography>
        </Flex>

        <UserFilters
          searchValue={filters.search}
          roleValue={filters.role}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSearchChange={actions.setSearch}
          onRoleChange={actions.setRole}
          onSortByChange={(value) => actions.setSortBy(value as 'name' | 'email' | 'createdAt')}
          onSortOrderChange={actions.setSortOrder}
          onReset={actions.resetFilters}
        />

        {users.length === 0 ? (
          <Flex direction="column" align="center" justify="center" gap={16}>
            <Typography variant="body1" color="text-secondary">
              {t('common.noResults')}
            </Typography>
          </Flex>
        ) : (
          <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap={16}>
            {users.map((user: User) => (
              <UserCard
                key={user.id}
                user={user}
                onSelect={actions.selectUser}
                isSelected={user.id === selectedUserId}
              />
            ))}
          </Grid>
        )}
      </Flex>
    </div>
  );
};

