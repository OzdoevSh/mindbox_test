import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList'; 

describe('<TodoList />', () => {
  it('should add a new todo item when submitting the form', async () => {
    render(<TodoList />);
    
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    
    await userEvent.type(inputElement, 'New task');
    await userEvent.click(buttonElement);
    
    expect(await screen.findByText('New task')).toBeInTheDocument();
    expect(screen.getByText(/1 item left/i)).toBeInTheDocument();
  });
  
  it('should toggle completion status of a todo item', async () => {
    render(<TodoList />);
    
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    
    await userEvent.type(inputElement, 'Task to complete');
    await userEvent.click(buttonElement);
    
    const checkboxElement = screen.getByRole('checkbox');
    await userEvent.click(checkboxElement);
    
    expect(checkboxElement).toBeChecked();
    expect(screen.getByText(/Task to complete/i)).toHaveStyle({ 'text-decoration': 'line-through' }); // Проверяем зачеркнутый текст задачи
  });
  
  it('should filter tasks by active tab', async () => {
    render(<TodoList />);
    
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    
    await userEvent.type(inputElement, 'First Task');
    await userEvent.click(buttonElement);
    
    await userEvent.type(inputElement, 'Second Task');
    await userEvent.click(buttonElement);
    
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    await userEvent.click(firstCheckbox);
    
    const segmentedControl = screen.getByRole('tablist');
    await userEvent.selectOptions(segmentedControl, ['Active']);
    
    expect(screen.queryByText('First Task')).not.toBeInTheDocument();
    expect(screen.getByText('Second Task')).toBeInTheDocument();
  });
  
  it('should clear completed tasks', async () => {
    render(<TodoList />);
    
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /Clear completed/i });
    
    await userEvent.type(inputElement, 'First Task');
    await userEvent.click(buttonElement);
    
    await userEvent.type(inputElement, 'Second Task');
    await userEvent.click(buttonElement);
    
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    await userEvent.click(firstCheckbox);
    
    const clearButton = screen.getByRole('button', { name: /Clear completed/i });
    await userEvent.click(clearButton);
    
    expect(screen.queryByText('First Task')).not.toBeInTheDocument();
    expect(screen.getByText('Second Task')).toBeInTheDocument();
  });
});
