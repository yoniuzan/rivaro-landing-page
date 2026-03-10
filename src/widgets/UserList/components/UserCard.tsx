/**
 * UserCard Component
 * Displays individual user information in a card
 */

import React from 'react';
import { Card, Typography, Flex, Badge } from '@components/base';
import type { User } from '../types';
import { formatUserRole, getUserInitials, formatDate } from '../UserList.helper';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
  onSelect?: (userId: string) => void;
  isSelected?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onSelect, isSelected = false }) => {
  const getRoleBadgeVariant = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'user':
        return 'info';
      case 'guest':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  return (
    <Card
      variant={isSelected ? 'filled' : 'elevated'}
      padding="md"
      className={styles.card}
      onClick={() => onSelect?.(user.id)}
    >
      <Flex direction="row" align="center" gap={16}>
        <div className={styles.avatar}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className={styles['avatar-image']} />
          ) : (
            getUserInitials(user.name)
          )}
        </div>

        <Flex direction="column" gap={4} style={{ flex: 1 }}>
          <Typography variant="body1" weight="semibold">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text-secondary">
            {user.email}
          </Typography>
          <Flex direction="row" align="center" gap={8}>
            <Badge variant={getRoleBadgeVariant(user.role)}>
              {formatUserRole(user.role)}
            </Badge>
            <Typography variant="caption" color="text-secondary">
              {formatDate(user.createdAt)}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
