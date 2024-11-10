declare interface TodoForm {
  title: string
  description: string
  category: string
}

declare interface Todo extends TodoForm {
  id: string
  title: string
  description: string
  category: string
  complete: boolean
}

declare type TodoList = Todo[]