import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';
import { Card } from '../Card';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'number' },
    gap: { control: 'number' },
    rowGap: { control: 'number' },
    columnGap: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div style={{ textAlign: 'center' }}>
    <Card variant="filled" padding="sm">
      {children}
    </Card>
  </div>
);

export const Default: Story = {
  args: {
    columns: 3,
    gap: 16,
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
      </>
    ),
  },
};

export const Responsive: Story = {
  args: {
    columns: { mobile: 1, tablet: 2, desktop: 4 },
    gap: 16,
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
      </>
    ),
  },
};

export const CustomGaps: Story = {
  args: {
    columns: 2,
    rowGap: 32,
    columnGap: 16,
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
      </>
    ),
  },
};
