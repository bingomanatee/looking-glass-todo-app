import {ValueStream} from '@wonderlandlabs/looking-glass-engine';
import uuid from 'uuid/v4';

console.log('uuid:', uuid);

class Todo {
  constructor(text, id, completed) {
    this.id = id || uuid()
    this.text = text;
    this.completed = completed;
  }

  clone() {
    return new Todo(this.text, this.id, this.completed)
  }
}

export default new ValueStream('todos')
.property('todos', [new Todo('React With LGE')], 'array')
.method('addTodo', (s, text) => {
  s.do.setTodos([...s.my.todos, new Todo(text) ])
})
  .method('deleteTodo', (s, id) => {
    s.do.setTodos(s.my.todos.filter(todo => todo.id !== id));
  })
  .method('completeTodo', (s, id) => {
    console.log('completing todo ', id );
    s.do.setTodos(s.my.todos.map((todo) => {
      if (todo.id === id) {
        let newTodo = todo.clone();
        newTodo.completed = !newTodo.completed;
        return newTodo;
      }
      return todo;
    }));
  })
  .method('completeAll', (s) => {
    s.do.completeForAll(true);
  })
  .method('clearCompleted', (s) => {
    s.do.completeForAll(false);
  })
  .method('completeForAll', (s, complete) => {
    s.do.setTodos(s.my.todos.map((todo) => {
      if (todo.completed !== complete) {
        let newTodo = todo.clone();
        newTodo.completed = complete;
        return newTodo;
      }
      return todo;
    }));
  })
  .method('editTodo', (s, id, text) => {
    s.do.setTodos(s.my.todos.map((todo) => {
      if (todo.id === id) {
        let newTodo = todo.clone();
        newTodo.text = text;
        return newTodo;
      }
      return todo;
    }));
  });
