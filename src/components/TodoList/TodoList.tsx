import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, FormProps, Input, Segmented, Typography } from "antd";

type Todo = {
  id: number,
  title: string,
  completed: boolean
}

type FieldType = {
  title: string;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<string>('All');

  const addTodo: FormProps<FieldType>['onFinish'] = (values) => {
    setTodos([{
      id: todos.length + 1,
      title: values.title,
      completed: false,
    }, ...todos]);
  };

  const changeStatus = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const clearCompleted = () => {
    setTodos(todos.filter(el => el.completed === false))
  }

  return (
    <Flex vertical gap="24px" style={{ width: '600px', height: '500px' }}>
      <Form
        layout="inline"
        onFinish={addTodo}
      >
        <Form.Item
          name="title"
          style={{ width: '82%'}}
          rules={[{ 
            required: true,
            message: 'This field can`t be empty'
          }]}
        >
          <Input size="large" />
        </Form.Item>
        <Button
          htmlType="submit"
          size="large"
          type="primary"
          icon={<PlusOutlined />}
        >
          Add
        </Button>
      </Form>
      <Flex vertical gap="12px" style={{height: '400px', overflow: 'auto'}}>
        {todos.filter(todo => {
          if (activeTab === 'Active') return todo.completed === false;
          if (activeTab === 'Completed') return todo.completed === true;
          return true;
        }).map(todo => (
          <Flex key={todo.id} gap="8px">
            <Checkbox checked={todo.completed} onChange={() => changeStatus(todo.id)} />
            <Typography.Text
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.title}
            </Typography.Text>
          </Flex>
        ))}
      </Flex>
      {todos.length > 0 && (<Flex justify="space-between" align="center">
        <Flex>{todos.filter(el => el.completed === false).length} items left</Flex>
        <Flex>
          <Segmented 
            options={['All', 'Active', 'Completed']}
            value={activeTab}
            onChange={setActiveTab}
          />
        </Flex>
        <Flex>
          <Button
            danger
            onClick={clearCompleted}
          >
            Clear completed
          </Button>
        </Flex>
      </Flex>)}
    </Flex>
  );
};

export default TodoList;