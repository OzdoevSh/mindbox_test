import React from 'react';
import TodoList from './components/TodoList/TodoList';
import { Flex, Typography } from 'antd';

function App() {
  return (
    <Flex vertical align='center'>
      <Typography.Title level={3}>Todo List</Typography.Title>
      <Flex align='center' justify='center'>
        <TodoList />
      </Flex>
    </Flex>

  );
}

export default App;
