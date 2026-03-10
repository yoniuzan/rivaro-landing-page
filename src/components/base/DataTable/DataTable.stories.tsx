import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from './DataTable';
import { Badge } from '../Badge';

const meta: Meta<typeof DataTable> = {
  title: 'Base/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    sortable: { control: 'boolean' },
    pagination: { control: 'boolean' },
    emptyMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'role', label: 'Role', sortable: true },
  { id: 'status', label: 'Status', render: (row: Record<string, unknown>) => <Badge variant={row.status === 'Active' ? 'success' : 'secondary'}>{row.status as string}</Badge> },
];

const data = [
  { name: 'John Doe', role: 'Admin', status: 'Active' },
  { name: 'Jane Smith', role: 'User', status: 'Inactive' },
  { name: 'Bob Johnson', role: 'Editor', status: 'Active' },
  { name: 'Alice Williams', role: 'User', status: 'Active' },
  { name: 'Charlie Brown', role: 'Admin', status: 'Inactive' },
];

export const Default: Story = {
  args: {
    columns,
    data,
  },
};

export const Sortable: Story = {
  args: {
    columns,
    data,
    sortable: true,
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data,
    pagination: true,
    defaultPageSize: 2,
    pageSizeOptions: [2, 5, 10],
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
  },
};
