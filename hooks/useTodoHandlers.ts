// hooks/useTodoHandlers.ts
import { useState } from 'react'
import type { Todo } from '@/interfaces/Todo'

export function useTodoHandlers() {
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: '1',
            text: 'เขียน TC หน้า test หรือยัง',
            completed: false,
            tags: ['Test Cases'],
        },
        {
            id: '2',
            text: 'Add tag Success/ Failed CheckEndPoint',
            completed: false,
            tags: ['Test Cases'],
        },
        {
            id: '3',
            text: 'Add [Document] หลัง tag เสมอ',
            completed: false,
            tags: ['Test Cases'],
        },
        {
            id: '4',
            text: 'Add log count',
            completed: false,
            tags: ['Test Cases'],
        },
        {
            id: '5',
            text: '1 Test file 1 Json file',
            completed: false,
            tags: ['Test Cases'],
        },
        {
            id: '6',
            text: 'แก้ไฟล์ที่เกี่ยวข้องด้วยที่ใช้ f เดียวกัน',
            completed: false,
            tags: ['Test Cases'],
        },
        {
            id: '7',
            text: 'ลดตัวแปร อันไหนลดได้ลด',
            completed: false,
            tags: ['Code'],
        },
        {
            id: '8',
            text: 'เจอ run keyword ให้เปลี่ยนเป็น IF Else',
            completed: false,
            tags: ['Code'],
        },
        {
            id: '9',
            text: 'เปลี่ยน should not be empty เป็น should be string แทน',
            completed: false,
            tags: ['Code'],
        },
        {
            id: '10',
            text: 'Index ใส่เป็น [0] ได้เลย',
            completed: false,
            tags: ['Code'],
        },
        {
            id: '11',
            text: 'ปั้น requestUID จาก body ด้วย ถ้าต้องทำ body เอง',
            completed: false,
            tags: ['Code'],
        },
        {
            id: '12',
            text: 'อย่าลืม git pull origin MVP18.1 ก่อน merge',
            completed: false,
            tags: ['Code'],
        },
        {
            id: '13',
            text: 'Function เว้นบรรทัด 1',
            completed: false,
            tags: ['Format'],
        },
        {
            id: '14',
            text: 'ระยะห่างระหว่าง argument  เคาะ 4 ระหว่าง คำสั่งแะตัวแปร',
            completed: false,
            tags: ['Format'],
        },
        {
            id: '15',
            text: 'ชื่อ Json ที่ import เป็นตัวใหญ่เสมอ',
            completed: false,
            tags: ['Format'],
        },
        {
            id: '16',
            text: 'ชื่อ keyword ห้ามเว้นวรรค',
            completed: false,
            tags: ['Format'],
        },
        {
            id: '17',
            text: 'Argument function อันไหนไม่ใช้ ลบ',
            completed: false,
            tags: ['Format'],
        },
        {
            id: '18',
            text: 'Keyword ทุกอักษรแรของคำตัวใหญ่เสมอ',
            completed: false,
            tags: ['Format'],
        },
        {
            id: '19',
            text: 'อย่าเอาไฟล์ไม่เกี่ยวข้องขึ้น',
            completed: false,
            tags: ['Comment In Request Merge'],
        },
        {
            id: '20',
            text: 'ดู change ด้วยกด request merge',
            completed: false,
            tags: ['Comment In Request Merge'],
        },
        {
            id: '21',
            text: 'เปลี่ยน branch ตอน merge ด้วย',
            completed: false,
            tags: ['Comment In Request Merge'],
        },
        {
            id: '22',
            text: 'อย่าลืมส่ง Test result กับ excel path ที่แก้ไปใน comment ด้วย',
            completed: false,
            tags: ['Comment In Request Merge'],
        },
    ])
    const [newTodo, setNewTodo] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>(['other'])
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editText, setEditText] = useState('')
    const [editTags, setEditTags] = useState<string[]>([])
    const [customTags, setCustomTags] = useState<string[]>([])
    const [newTagName, setNewTagName] = useState('')
    const [showAddTag, setShowAddTag] = useState(false)
    const [filterTags, setFilterTags] = useState<string[]>([])

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            const todo: Todo = {
                id: Date.now().toString(),
                text: newTodo,
                completed: false,
                tags: selectedTags.length > 0 ? selectedTags : ['other'],
            }
            setTodos([...todos, todo])
            setNewTodo('')
            setSelectedTags(['other'])
        }
    }

    const toggleTodo = (id: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const startEdit = (id: string, text: string, tags: string[]) => {
        setEditingId(id)
        setEditText(text)
        setEditTags([...tags])
    }

    const saveEdit = () => {
        if (editText.trim() !== '') {
            setTodos(
                todos.map((todo) =>
                    todo.id === editingId
                        ? {
                              ...todo,
                              text: editText,
                              tags: editTags.length > 0 ? editTags : ['other'],
                          }
                        : todo
                )
            )
        }
        setEditingId(null)
        setEditText('')
        setEditTags([])
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditText('')
        setEditTags([])
    }

    const addCustomTag = () => {
        if (
            newTagName.trim() !== '' &&
            !customTags.includes(newTagName.toLowerCase()) &&
            !['work', 'personal', 'shopping', 'health', 'other'].includes(
                newTagName.toLowerCase()
            )
        ) {
            setCustomTags([...customTags, newTagName.toLowerCase()])
            setNewTagName('')
            setShowAddTag(false)
        }
    }

    const deleteCustomTag = (tagToDelete: string) => {
        setCustomTags(customTags.filter((tag) => tag !== tagToDelete))
        setTodos(
            todos.map((todo) => ({
                ...todo,
                tags: todo.tags.filter((tag) => tag !== tagToDelete),
            }))
        )
        setSelectedTags(selectedTags.filter((tag) => tag !== tagToDelete))
        setFilterTags(filterTags.filter((tag) => tag !== tagToDelete))
        setEditTags(editTags.filter((tag) => tag !== tagToDelete))
    }

    const getAllTags = () => [
        'Test Cases',
        'Code',
        'Format',
        'Comment In Request Merge',
        ...customTags,
    ]

    const toggleTagSelection = (tag: string, isSelected: boolean) => {
        setSelectedTags((prev) =>
            isSelected ? [...prev, tag] : prev.filter((t) => t !== tag)
        )
    }

    const toggleEditTagSelection = (tag: string, isSelected: boolean) => {
        setEditTags((prev) =>
            isSelected ? [...prev, tag] : prev.filter((t) => t !== tag)
        )
    }

    const toggleFilterTag = (tag: string, isSelected: boolean) => {
        setFilterTags((prev) =>
            isSelected ? [...prev, tag] : prev.filter((t) => t !== tag)
        )
    }

    const filteredTodos =
        filterTags.length === 0
            ? todos
            : todos.filter((todo) =>
                  filterTags.some((tag) => todo.tags.includes(tag))
              )

    const completedCount = todos.filter((todo) => todo.completed).length
    const totalCount = todos.length

    return {
        todos,
        newTodo,
        selectedTags,
        editingId,
        editText,
        editTags,
        customTags,
        newTagName,
        showAddTag,
        filterTags,
        filteredTodos,
        completedCount,
        totalCount,

        setTodos,
        setNewTodo,
        setSelectedTags,
        setNewTagName,
        setShowAddTag,
        setFilterTags,
        setEditText,

        addTodo,
        toggleTodo,
        deleteTodo,
        startEdit,
        saveEdit,
        cancelEdit,
        addCustomTag,
        deleteCustomTag,
        getAllTags,
        toggleTagSelection,
        toggleEditTagSelection,
        toggleFilterTag,
    }
}
