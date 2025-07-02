// components/TagSelector.tsx
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from '@/components/ui/command'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus } from 'lucide-react'
import { getTagColor } from '@/lib/utils' // or wherever this function is defined

type TagSelectorProps = {
    selectedTags: string[]
    onToggle: (tag: string, isSelected: boolean) => void
    open: boolean
    onOpenChange: (open: boolean) => void
    placeholder?: string
    getAllTags: () => string[]
}

export const TagSelector = ({
    selectedTags,
    onToggle,
    open,
    onOpenChange,
    placeholder = 'Select tags...',
    getAllTags,
}: TagSelectorProps) => (
    <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                className="justify-between min-w-[200px] bg-transparent"
            >
                {selectedTags.length > 0 ? (
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {selectedTags.slice(0, 1).map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                            >
                                {tag}
                            </Badge>
                        ))}
                        {selectedTags.length > 1 && (
                            <Badge variant="secondary" className="text-xs">
                                +{selectedTags.length - 1}
                            </Badge>
                        )}
                    </div>
                ) : (
                    placeholder
                )}
                <Plus className="ml-2 h-4 w-4" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
            <Command>
                <CommandInput placeholder="Search tags..." />
                <CommandList>
                    <CommandEmpty>No tags found.</CommandEmpty>
                    <CommandGroup>
                        {getAllTags().map((tag) => (
                            <CommandItem
                                key={tag}
                                onSelect={() => {
                                    const isSelected =
                                        selectedTags.includes(tag)
                                    onToggle(tag, !isSelected)
                                }}
                            >
                                <Checkbox
                                    checked={selectedTags.includes(tag)}
                                    className="mr-2"
                                />
                                <Badge
                                    variant="secondary"
                                    className={`${getTagColor(
                                        tag
                                    )} text-xs mr-2`}
                                >
                                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                </Badge>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
)
