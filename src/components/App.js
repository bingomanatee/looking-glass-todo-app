import React, {Component} from 'react'
import Header from './Header'
import MainSection from './MainSection'

import todoState from './todo.state';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {...todoState.value};
  }

  componentWillUnmount() {
    this.mounted = false;
    this._sub.unsubscribe();
  }

  componentDidMount() {
    this.mounted = true;
    this._sub = todoState.subscribe((s) => {
      if (this.mounted) {
        this.setState(s.value)
      }
    }, (e) => {
      console.log('state error: ', e);
    })
  }

  render() {
    return (
      <div>
        <Header addTodo={todoState.do.addTodo}/>
        <MainSection todos={this.state.todos} actions={todoState.do}/>
      </div>
    )
  }
}

export default App
