import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTagColor = (tag: string) => {
    const predefinedColors = {
        work: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        personal: 'bg-green-100 text-green-800 hover:bg-green-200',
        shopping: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
        health: 'bg-red-100 text-red-800 hover:bg-red-200',
        other: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    }

    if (predefinedColors[tag as keyof typeof predefinedColors]) {
        return predefinedColors[tag as keyof typeof predefinedColors]
    }

    // Generate consistent colors for custom tags based on their name
    const colors = [
        'bg-orange-100 text-orange-800 hover:bg-orange-200',
        'bg-pink-100 text-pink-800 hover:bg-pink-200',
        'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
        'bg-teal-100 text-teal-800 hover:bg-teal-200',
        'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
        'bg-lime-100 text-lime-800 hover:bg-lime-200',
        'bg-rose-100 text-rose-800 hover:bg-rose-200',
    ]

    const hash = tag.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
    }, 0)

    return colors[Math.abs(hash) % colors.length]
}