import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@test';
import userEvent from '@testing-library/user-event';
import { MultiSelect } from '../MultiSelect';
import type { MultiSelectOption } from '../MultiSelect';

const mockOptions: MultiSelectOption[] = [
  { value: 'admin', label: 'Administrator' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
  { value: 'moderator', label: 'Moderator' },
];

describe('MultiSelect', () => {
  it('renders with placeholder', () => {
    render(<MultiSelect options={mockOptions} placeholder="בחר תפקידים" />);
    expect(screen.getByText('בחר תפקידים')).toBeInTheDocument();
  });

  it('uses default placeholder from i18n when not provided', () => {
    render(<MultiSelect options={mockOptions} />);
    expect(screen.getByText('בחר')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} />);
    
    const trigger = screen.getByRole('button', { expanded: false });
    await user.click(trigger);
    
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    // Use role option to avoid ambiguity if text appears elsewhere
    expect(screen.getByRole('option', { name: 'Administrator' })).toBeInTheDocument();
  });

  it('selects multiple options', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<MultiSelect options={mockOptions} onChange={handleChange} />);
    
    const trigger = screen.getByRole('button', { expanded: false });
    await user.click(trigger);
    
    // Select first option
    const adminOption = screen.getByRole('option', { name: 'Administrator' });
    await user.click(adminOption);
    
    expect(handleChange).toHaveBeenCalledWith(['admin']);
    
    // Select second option
    const userOption = screen.getByRole('option', { name: 'User' });
    await user.click(userOption);
    
    expect(handleChange).toHaveBeenCalledWith(['admin', 'user']);
  });

  it('deselects option when clicked again', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<MultiSelect options={mockOptions} value={['admin']} onChange={handleChange} />);
    
    const trigger = screen.getByRole('button', { expanded: false });
    await user.click(trigger);
    
    // Specifically target the option in the dropdown, not the tag
    const adminOption = screen.getByRole('option', { name: 'Administrator' });
    await user.click(adminOption);
    
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('displays selected values as tags', () => {
    render(<MultiSelect options={mockOptions} value={['admin', 'user']} />);
    
    // Here we check for text content generally, or we could look for specific tag structure
    // Since we fixed the HTML structure, simple text match is fine, or getAllByText if needed.
    // But since these are displayed as tags, they are visible.
    expect(screen.getByText('Administrator')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('removes tag when X is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<MultiSelect options={mockOptions} value={['admin', 'user']} onChange={handleChange} />);
    
    const removeButtons = screen.getAllByLabelText(/הסר/);
    await user.click(removeButtons[0]);
    
    expect(handleChange).toHaveBeenCalledWith(['user']);
  });

  it('shows "Select All" option', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} showSelectAll />);
    
    const trigger = screen.getByRole('button', { expanded: false });
    await user.click(trigger);
    
    expect(screen.getByText('בחר הכל')).toBeInTheDocument();
  });

  it('selects all options when "Select All" is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<MultiSelect options={mockOptions} onChange={handleChange} showSelectAll />);
    
    const trigger = screen.getByRole('button', { expanded: false });
    await user.click(trigger);
    
    const selectAllButton = screen.getByText('בחר הכל');
    await user.click(selectAllButton);
    
    expect(handleChange).toHaveBeenCalledWith(['admin', 'user', 'guest', 'moderator']);
  });

  it('filters options when searching', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} searchable />);
    
    const trigger = screen.getByRole('button', { expanded: false });
    await user.click(trigger);
    
    const searchInput = screen.getByPlaceholderText('חיפוש...');
    await user.type(searchInput, 'admin');
    
    expect(screen.getByRole('option', { name: 'Administrator' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'User' })).not.toBeInTheDocument();
  });

  it('hides "Select All" when searching', async () => {
    const user = userEvent.setup();
    render(<MultiSelect options={mockOptions} showSelectAll searchable />);
    
    const trigger = screen.getByRole('button', { expanded: false });
    await user.click(trigger);
    
    expect(screen.getByText('בחר הכל')).toBeInTheDocument();
    
    const searchInput = screen.getByPlaceholderText('חיפוש...');
    await user.type(searchInput, 'admin');
    
    expect(screen.queryByText('בחר הכל')).not.toBeInTheDocument();
  });

  it('clears all selections when clear button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<MultiSelect options={mockOptions} value={['admin', 'user']} onChange={handleChange} />);
    
    const clearButton = screen.getByLabelText('נקה הכל');
    await user.click(clearButton);
    
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('shows tag count when exceeding maxTags', () => {
    render(
      <MultiSelect
        options={mockOptions}
        value={['admin', 'user', 'guest', 'moderator']}
        maxTags={2}
      />
    );
    
    expect(screen.getByText('Administrator')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('respects disabled state', () => {
    render(<MultiSelect options={mockOptions} disabled />);
    
    const trigger = screen.getByRole('button', { expanded: false });
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
    expect(trigger).toHaveAttribute('tabindex', '-1');
  });

  it('shows error state', () => {
    render(<MultiSelect options={mockOptions} error helperText="שגיאה" />);
    
    expect(screen.getByText('שגיאה')).toBeInTheDocument();
  });
});
