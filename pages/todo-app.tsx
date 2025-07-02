'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Trash2,
    Edit2,
    Save,
    X,
    GripVertical,
    Filter,
} from 'lucide-react'
import { motion, Reorder } from 'framer-motion'
import { useTodoHandlers } from '@/hooks/useTodoHandlers'
import { TagSelector } from '@/components/TagSelector'
import { getTagColor } from '@/lib/utils'

export default function Component() {
    const {

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
    } = useTodoHandlers()
    
    const [filterSelectorOpen, setFilterSelectorOpen] = useState(false)
    const [tagSelectorOpen, setTagSelectorOpen] = useState(false)


    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="text-2xl font-bold ">
                            <span className="text-purple-950"> SCB </span>
                            <span className=" text-yellow-600">
                                {' '}
                                API CHECK List
                            </span>
                        </span>
                        <Badge variant="outline" className="text-sm ">
                            {completedCount}/{totalCount} completed
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Add new todo */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-3">
                            <Input
                                placeholder="Add a new todo..."
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && addTodo()
                                }
                                className="flex-1"
                            />
                            <div className="flex flex-col sm:flex-row gap-3">
                                <TagSelector
                                    selectedTags={selectedTags}
                                    onToggle={toggleTagSelection}
                                    open={tagSelectorOpen}
                                    onOpenChange={setTagSelectorOpen}
                                    placeholder="Select tags..."
                                    getAllTags={getAllTags}
                                />
                                <Button
                                    onClick={addTodo}
                                    className="w-full sm:w-auto"
                                >
                                    Add Todo
                                </Button>
                            </div>
                        </div>

                        {/* Selected tags display */}
                        {selectedTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Selected:
                                </span>
                                {selectedTags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className={`${getTagColor(
                                            tag
                                        )} text-xs cursor-pointer`}
                                        onClick={() =>
                                            toggleTagSelection(tag, false)
                                        }
                                    >
                                        {tag.charAt(0).toUpperCase() +
                                            tag.slice(1)}
                                        <X className="ml-1 h-2 w-2" />
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Custom tag management */}
                        <div className="flex flex-col sm:flex-row gap-3 items-start">
                            <div className="flex flex-wrap gap-2 flex-1">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Categories:
                                </span>
                                {[
                                    'Test Cases',
                                    'Code',
                                    'Format',
                                    'Comment In Request Merge',
                                    ...customTags,
                                ].map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className={`${getTagColor(
                                            tag
                                        )} text-xs`}
                                    >
                                        {tag.charAt(0).toUpperCase() +
                                            tag.slice(1)}
                                    </Badge>
                                ))}
                                {customTags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className={`${getTagColor(
                                            tag
                                        )} text-xs group relative`}
                                    >
                                        {tag.charAt(0).toUpperCase() +
                                            tag.slice(1)}
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => deleteCustomTag(tag)}
                                            className="h-4 w-4 p-0 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-2 w-2" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>

                            {showAddTag ? (
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="New category name..."
                                        value={newTagName}
                                        onChange={(e) =>
                                            setNewTagName(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter')
                                                addCustomTag()
                                            if (e.key === 'Escape') {
                                                setShowAddTag(false)
                                                setNewTagName('')
                                            }
                                        }}
                                        className="w-40"
                                        autoFocus
                                    />
                                    <Button size="sm" onClick={addCustomTag}>
                                        <Save className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                            setShowAddTag(false)
                                            setNewTagName('')
                                        }}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setShowAddTag(true)}
                                >
                                    + Add Category
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">
                                Filter by tags:
                            </span>
                            <TagSelector
                                selectedTags={filterTags}
                                onToggle={toggleFilterTag}
                                open={filterSelectorOpen}
                                onOpenChange={setFilterSelectorOpen}
                                placeholder="Select filter tags..."
                                getAllTags={getAllTags}
                            />
                            {filterTags.length > 0 && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setFilterTags([])}
                                    className="text-xs"
                                >
                                    Clear filters
                                </Button>
                            )}
                        </div>

                        {/* Active filters display */}
                        {filterTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Active filters:
                                </span>
                                {filterTags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="default"
                                        className={`${getTagColor(
                                            tag
                                        )} text-xs cursor-pointer`}
                                        onClick={() =>
                                            toggleFilterTag(tag, false)
                                        }
                                    >
                                        <Filter className="mr-1 h-2 w-2" />
                                        {tag.charAt(0).toUpperCase() +
                                            tag.slice(1)}
                                        <X className="ml-1 h-2 w-2" />
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Todo list with drag and drop */}
                    <div className="space-y-2">
                        {filteredTodos.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                {filterTags.length > 0
                                    ? 'No todos match the selected filters.'
                                    : 'No todos found. Add one above!'}
                            </div>
                        ) : (
                            <Reorder.Group
                                axis="y"
                                values={filteredTodos}
                                onReorder={(newOrder) => {
                                    if (filterTags.length === 0) {
                                        setTodos(newOrder)
                                    }
                                }}
                                className="space-y-2"
                            >
                                {filteredTodos.map((todo) => (
                                    <Reorder.Item
                                        key={todo.id}
                                        value={todo}
                                        className="relative"
                                        whileDrag={{ scale: 1.02 }}
                                        dragListener={filterTags.length === 0}
                                    >
                                        <motion.div
                                            layout
                                            className={`flex items-center gap-3 p-4 rounded-lg border bg-card transition-all duration-200 ${
                                                todo.completed
                                                    ? 'opacity-60'
                                                    : ''
                                            } ${
                                                filterTags.length === 0
                                                    ? 'cursor-move'
                                                    : ''
                                            } hover:shadow-md`}
                                        >
                                            {filterTags.length === 0 && (
                                                <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                            )}

                                            <Checkbox
                                                checked={todo.completed}
                                                onCheckedChange={() =>
                                                    toggleTodo(todo.id)
                                                }
                                                className="flex-shrink-0"
                                            />

                                            <div className="flex-1 min-w-0 space-y-2">
                                                {editingId === todo.id ? (
                                                    <div className="space-y-2">
                                                        <Input
                                                            value={editText}
                                                            onChange={(e) =>
                                                                setEditText(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            onKeyDown={(e) => {
                                                                if (
                                                                    e.key ===
                                                                    'Enter'
                                                                )
                                                                    saveEdit()
                                                                if (
                                                                    e.key ===
                                                                    'Escape'
                                                                )
                                                                    cancelEdit()
                                                            }}
                                                            className="text-sm"
                                                            autoFocus
                                                        />
                                                        <TagSelector
                                                            selectedTags={
                                                                editTags
                                                            }
                                                            onToggle={
                                                                toggleEditTagSelection
                                                            }
                                                            open={false}
                                                            onOpenChange={() => {}}
                                                            placeholder="Edit tags..."
                                                            getAllTags={
                                                                getAllTags
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span
                                                            className={`text-sm ${
                                                                todo.completed
                                                                    ? 'line-through text-muted-foreground'
                                                                    : ''
                                                            }`}
                                                        >
                                                            {todo.text}
                                                        </span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {todo.tags.map(
                                                                (tag) => (
                                                                    <Badge
                                                                        key={
                                                                            tag
                                                                        }
                                                                        variant="secondary"
                                                                        className={`${getTagColor(
                                                                            tag
                                                                        )} text-xs`}
                                                                    >
                                                                        {tag
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase() +
                                                                            tag.slice(
                                                                                1
                                                                            )}
                                                                    </Badge>
                                                                )
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                {editingId === todo.id ? (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={saveEdit}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Save className="h-3 w-3" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={cancelEdit}
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() =>
                                                                startEdit(
                                                                    todo.id,
                                                                    todo.text,
                                                                    todo.tags
                                                                )
                                                            }
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Edit2 className="h-3 w-3" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() =>
                                                                deleteTodo(
                                                                    todo.id
                                                                )
                                                            }
                                                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    </Reorder.Item>
                                ))}
                            </Reorder.Group>
                        )}
                    </div>

                    {filterTags.length > 0 && (
                        <div className="text-xs text-muted-foreground text-center">
                            Drag and drop is only available when no filters are
                            active
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
