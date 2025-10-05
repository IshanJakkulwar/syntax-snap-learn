export interface CourseLesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'notes';
  videoUrl?: string;
  notesContent?: string;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorBio: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  lessons: number;
  students: number;
  rating: number;
  thumbnail: string;
  skills: string[];
  curriculum: CourseLesson[];
}

export const coursesData: Record<string, Course> = {
  "1": {
    id: "1",
    title: "Python Fundamentals",
    description: "Master the basics of Python programming with hands-on exercises and real-world projects. This comprehensive course covers variables, data types, control structures, functions, and object-oriented programming concepts.",
    instructor: "Dr. Sarah Chen",
    instructorBio: "Senior Software Engineer at Google with 8+ years in Python development",
    level: "Beginner",
    estimatedTime: "45 min",
    lessons: 12,
    students: 15420,
    rating: 4.8,
    thumbnail: "🐍",
    skills: ["Variables & Data Types", "Control Flow", "Functions", "OOP Basics", "File Handling"],
    curriculum: [
      { 
        id: 1, 
        title: "Introduction to Python", 
        duration: "3 min", 
        type: 'video',
        videoUrl: "/videos/python-intro.mp4",
        completed: true 
      },
      { 
        id: 2, 
        title: "Python Installation Guide", 
        duration: "2 min", 
        type: 'notes',
        notesContent: `# Python Installation Guide

## Installing Python on Windows
1. Download Python from python.org
2. Run the installer
3. Check "Add Python to PATH"
4. Verify installation: \`python --version\`

## Installing Python on Mac
1. Use Homebrew: \`brew install python3\`
2. Or download from python.org
3. Verify: \`python3 --version\`

## Setting up VS Code
- Install Python extension
- Configure Python interpreter
- Create your first .py file`,
        completed: true 
      },
      { 
        id: 3, 
        title: "Variables and Data Types", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/python-variables.mp4",
        completed: false 
      },
      { 
        id: 4, 
        title: "Data Types Cheat Sheet", 
        duration: "3 min", 
        type: 'notes',
        notesContent: `# Python Data Types Reference

## Numeric Types
- **int**: Whole numbers (e.g., 42, -7)
- **float**: Decimal numbers (e.g., 3.14, -0.5)
- **complex**: Complex numbers (e.g., 3+4j)

## String Type
\`\`\`python
text = "Hello World"
multiline = """Multiple
lines"""
\`\`\`

## Boolean Type
- True
- False

## Collection Types
- **list**: [1, 2, 3]
- **tuple**: (1, 2, 3)
- **dict**: {"key": "value"}
- **set**: {1, 2, 3}`,
        completed: false 
      },
      { 
        id: 5, 
        title: "Working with Strings", 
        duration: "3 min", 
        type: 'video',
        videoUrl: "/videos/python-strings.mp4",
        completed: false 
      },
      { 
        id: 6, 
        title: "String Methods Reference", 
        duration: "2 min", 
        type: 'notes',
        notesContent: `# String Methods

## Common String Methods
\`\`\`python
text = "Hello World"

# Case conversion
text.upper()  # "HELLO WORLD"
text.lower()  # "hello world"
text.capitalize()  # "Hello world"

# Search and replace
text.find("World")  # 6
text.replace("World", "Python")  # "Hello Python"

# Trimming
text.strip()  # Remove whitespace
text.split()  # ["Hello", "World"]
\`\`\``,
        completed: false 
      },
      { 
        id: 7, 
        title: "Lists and Dictionaries", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/python-collections.mp4",
        completed: false 
      },
      { 
        id: 8, 
        title: "Control Flow - If Statements", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/python-if.mp4",
        completed: false 
      },
      { 
        id: 9, 
        title: "Loops in Python", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/python-loops.mp4",
        completed: false 
      },
      { 
        id: 10, 
        title: "Functions Basics", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/python-functions.mp4",
        completed: false 
      },
      { 
        id: 11, 
        title: "Classes and Objects", 
        duration: "6 min", 
        type: 'video',
        videoUrl: "/videos/python-oop.mp4",
        completed: false 
      },
      { 
        id: 12, 
        title: "Final Project - Build a Calculator", 
        duration: "6 min", 
        type: 'notes',
        notesContent: `# Final Project: Command-Line Calculator

## Project Overview
Build a Python calculator that can perform basic arithmetic operations.

## Requirements
1. Accept user input for two numbers
2. Support +, -, *, / operations
3. Handle division by zero
4. Loop until user quits

## Starter Code
\`\`\`python
def calculator():
    while True:
        print("\\nCalculator")
        print("1. Add")
        print("2. Subtract")
        print("3. Multiply")
        print("4. Divide")
        print("5. Quit")
        
        choice = input("Enter choice: ")
        
        if choice == '5':
            break
            
        # Your code here
\`\`\``,
        completed: false 
      }
    ]
  },
  "2": {
    id: "2",
    title: "JavaScript ES6+",
    description: "Dive deep into modern JavaScript features and best practices. Learn ES6+ syntax, async programming, and advanced concepts that every JavaScript developer should know.",
    instructor: "Alex Rodriguez",
    instructorBio: "Full-stack developer and JavaScript evangelist with 6+ years experience",
    level: "Intermediate",
    estimatedTime: "30 min",
    lessons: 8,
    students: 12890,
    rating: 4.7,
    thumbnail: "⚡",
    skills: ["ES6 Syntax", "Arrow Functions", "Destructuring", "Async/Await", "Modules"],
    curriculum: [
      { 
        id: 1, 
        title: "ES6 Overview & Setup", 
        duration: "3 min", 
        type: 'video',
        videoUrl: "/videos/js-es6-intro.mp4",
        completed: false 
      },
      { 
        id: 2, 
        title: "ES6 Features Cheat Sheet", 
        duration: "2 min", 
        type: 'notes',
        notesContent: `# ES6+ Features Overview

## Key Features
- Let and Const
- Arrow Functions
- Template Literals
- Destructuring
- Spread/Rest Operators
- Classes
- Modules
- Promises
- Async/Await

## Browser Support
Modern ES6+ features are supported in all modern browsers. Use Babel for older browser support.`,
        completed: false 
      },
      { 
        id: 3, 
        title: "Arrow Functions Deep Dive", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/js-arrow.mp4",
        completed: false 
      },
      { 
        id: 4, 
        title: "Destructuring Patterns", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/js-destructuring.mp4",
        completed: false 
      },
      { 
        id: 5, 
        title: "Template Literals & Strings", 
        duration: "3 min", 
        type: 'video',
        videoUrl: "/videos/js-templates.mp4",
        completed: false 
      },
      { 
        id: 6, 
        title: "Async JavaScript Guide", 
        duration: "3 min", 
        type: 'notes',
        notesContent: `# Async JavaScript

## Promises
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000);
});

promise.then(result => console.log(result));
\`\`\`

## Async/Await
\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
\`\`\``,
        completed: false 
      },
      { 
        id: 7, 
        title: "ES6 Modules", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/js-modules.mp4",
        completed: false 
      },
      { 
        id: 8, 
        title: "Advanced ES6 Patterns", 
        duration: "3 min", 
        type: 'video',
        videoUrl: "/videos/js-advanced.mp4",
        completed: false 
      }
    ]
  },
  "3": {
    id: "3",
    title: "React Hooks Deep Dive",
    description: "Master all React hooks with practical examples and advanced patterns. From useState to custom hooks, become a React hooks expert.",
    instructor: "Emma Thompson",
    instructorBio: "React core team contributor and frontend architect",
    level: "Advanced",
    estimatedTime: "60 min",
    lessons: 15,
    students: 8750,
    rating: 4.9,
    thumbnail: "⚛️",
    skills: ["useState", "useEffect", "useContext", "Custom Hooks", "Performance Optimization"],
    curriculum: [
      { 
        id: 1, 
        title: "Introduction to React Hooks", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/react-hooks-intro.mp4",
        completed: false 
      },
      { 
        id: 2, 
        title: "Hooks Rules & Best Practices", 
        duration: "2 min", 
        type: 'notes',
        notesContent: `# React Hooks Rules

## Rules of Hooks
1. Only call hooks at the top level
2. Only call hooks from React functions
3. Don't call hooks inside loops, conditions, or nested functions

## Best Practices
- Use ESLint plugin for hooks
- Name custom hooks with "use" prefix
- Keep hooks simple and focused
- Extract logic into custom hooks when reused`,
        completed: false 
      },
      { 
        id: 3, 
        title: "useState Mastery", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/react-usestate.mp4",
        completed: false 
      },
      { 
        id: 4, 
        title: "useState Patterns", 
        duration: "3 min", 
        type: 'notes',
        notesContent: `# useState Patterns

## Basic Usage
\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## Functional Updates
\`\`\`javascript
setCount(prev => prev + 1);
\`\`\`

## Object State
\`\`\`javascript
const [user, setUser] = useState({
  name: '',
  email: ''
});

setUser(prev => ({
  ...prev,
  name: 'John'
}));
\`\`\``,
        completed: false 
      },
      { 
        id: 5, 
        title: "useEffect Deep Dive", 
        duration: "6 min", 
        type: 'video',
        videoUrl: "/videos/react-useeffect.mp4",
        completed: false 
      },
      { 
        id: 6, 
        title: "useContext for State Management", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/react-usecontext.mp4",
        completed: false 
      },
      { 
        id: 7, 
        title: "useReducer for Complex State", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/react-usereducer.mp4",
        completed: false 
      },
      { 
        id: 8, 
        title: "Performance Hooks: useMemo", 
        duration: "3 min", 
        type: 'video',
        videoUrl: "/videos/react-usememo.mp4",
        completed: false 
      },
      { 
        id: 9, 
        title: "Performance Hooks: useCallback", 
        duration: "3 min", 
        type: 'video',
        videoUrl: "/videos/react-usecallback.mp4",
        completed: false 
      },
      { 
        id: 10, 
        title: "useRef for DOM and Values", 
        duration: "3 min", 
        type: 'video',
        videoUrl: "/videos/react-useref.mp4",
        completed: false 
      },
      { 
        id: 11, 
        title: "Creating Custom Hooks", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/react-custom-hooks.mp4",
        completed: false 
      },
      { 
        id: 12, 
        title: "Custom Hooks Library", 
        duration: "3 min", 
        type: 'notes',
        notesContent: `# Popular Custom Hooks

## useLocalStorage
\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
\`\`\`

## useFetch
\`\`\`javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
\`\`\``,
        completed: false 
      },
      { 
        id: 13, 
        title: "Advanced Hook Patterns", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/react-patterns.mp4",
        completed: false 
      },
      { 
        id: 14, 
        title: "Testing React Hooks", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/react-testing.mp4",
        completed: false 
      },
      { 
        id: 15, 
        title: "Hooks Best Practices Summary", 
        duration: "3 min", 
        type: 'notes',
        notesContent: `# React Hooks Best Practices

## Performance
- Use useMemo for expensive calculations
- Use useCallback for functions passed to children
- Avoid unnecessary re-renders

## Organization
- Extract related logic into custom hooks
- Keep components focused and simple
- Use meaningful hook names

## Common Pitfalls
- Don't forget dependency arrays in useEffect
- Don't mutate state directly
- Don't call hooks conditionally

## When to Use Which Hook
- **useState**: Simple state
- **useReducer**: Complex state logic
- **useContext**: Global state
- **useMemo**: Expensive computations
- **useCallback**: Stable function references`,
        completed: false 
      }
    ]
  },
  "4": {
    id: "4",
    title: "Data Structures & Algorithms",
    description: "Essential DSA concepts for technical interviews and competitive programming. Master arrays, linked lists, trees, graphs, and dynamic programming.",
    instructor: "Prof. David Kim",
    instructorBio: "Computer Science professor and competitive programming coach",
    level: "Intermediate",
    estimatedTime: "90 min",
    lessons: 20,
    students: 22100,
    rating: 4.6,
    thumbnail: "🔗",
    skills: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming"],
    curriculum: [
      { 
        id: 1, 
        title: "Big O Notation Explained", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/dsa-bigo.mp4",
        completed: false 
      },
      { 
        id: 2, 
        title: "Time Complexity Cheat Sheet", 
        duration: "2 min", 
        type: 'notes',
        notesContent: `# Time Complexity Reference

## Common Complexities
- O(1) - Constant
- O(log n) - Logarithmic
- O(n) - Linear
- O(n log n) - Linearithmic
- O(n²) - Quadratic
- O(2ⁿ) - Exponential

## Examples
- Array access: O(1)
- Binary search: O(log n)
- Linear search: O(n)
- Merge sort: O(n log n)
- Bubble sort: O(n²)`,
        completed: false 
      },
      { 
        id: 3, 
        title: "Arrays and Strings", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/dsa-arrays.mp4",
        completed: false 
      },
      { 
        id: 4, 
        title: "Two Pointers Technique", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/dsa-twopointers.mp4",
        completed: false 
      },
      { 
        id: 5, 
        title: "Sliding Window Pattern", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/dsa-slidingwindow.mp4",
        completed: false 
      },
      { 
        id: 6, 
        title: "Linked Lists Implementation", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/dsa-linkedlist.mp4",
        completed: false 
      },
      { 
        id: 7, 
        title: "Stacks and Queues", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/dsa-stackqueue.mp4",
        completed: false 
      },
      { 
        id: 8, 
        title: "Tree Data Structures", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/dsa-trees.mp4",
        completed: false 
      },
      { 
        id: 9, 
        title: "Binary Search Trees", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/dsa-bst.mp4",
        completed: false 
      },
      { 
        id: 10, 
        title: "Tree Traversal Methods", 
        duration: "4 min", 
        type: 'notes',
        notesContent: `# Tree Traversal

## Depth-First Search (DFS)
### Inorder (Left, Root, Right)
- Returns sorted order for BST
- Use case: Sorted traversal

### Preorder (Root, Left, Right)
- Use case: Copy tree, prefix expression

### Postorder (Left, Right, Root)
- Use case: Delete tree, postfix expression

## Breadth-First Search (BFS)
- Level by level traversal
- Use case: Shortest path, level order

## Implementation
\`\`\`python
# DFS Inorder
def inorder(root):
    if root:
        inorder(root.left)
        print(root.val)
        inorder(root.right)

# BFS
from collections import deque
def bfs(root):
    queue = deque([root])
    while queue:
        node = queue.popleft()
        print(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
\`\`\``,
        completed: false 
      },
      { 
        id: 11, 
        title: "Heaps and Priority Queues", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/dsa-heaps.mp4",
        completed: false 
      },
      { 
        id: 12, 
        title: "Introduction to Graphs", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/dsa-graphs.mp4",
        completed: false 
      },
      { 
        id: 13, 
        title: "BFS and DFS on Graphs", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/dsa-graph-traversal.mp4",
        completed: false 
      },
      { 
        id: 14, 
        title: "Dynamic Programming Basics", 
        duration: "6 min", 
        type: 'video',
        videoUrl: "/videos/dsa-dp-intro.mp4",
        completed: false 
      },
      { 
        id: 15, 
        title: "DP Pattern Recognition", 
        duration: "4 min", 
        type: 'notes',
        notesContent: `# Dynamic Programming Patterns

## When to Use DP
- Overlapping subproblems
- Optimal substructure
- Making choices at each step

## Common Patterns

### 1. Fibonacci / Climbing Stairs
\`\`\`python
dp[i] = dp[i-1] + dp[i-2]
\`\`\`

### 2. 0/1 Knapsack
- Include or exclude each item
- Maximize value within weight limit

### 3. Longest Common Subsequence
\`\`\`python
if s1[i] == s2[j]:
    dp[i][j] = dp[i-1][j-1] + 1
else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
\`\`\`

### 4. Coin Change
- Minimum coins needed
- Number of ways to make change`,
        completed: false 
      },
      { 
        id: 16, 
        title: "Recursion and Backtracking", 
        duration: "5 min", 
        type: 'video',
        videoUrl: "/videos/dsa-recursion.mp4",
        completed: false 
      },
      { 
        id: 17, 
        title: "Sorting Algorithms", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/dsa-sorting.mp4",
        completed: false 
      },
      { 
        id: 18, 
        title: "Binary Search Variations", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/dsa-binary-search.mp4",
        completed: false 
      },
      { 
        id: 19, 
        title: "Hash Tables Deep Dive", 
        duration: "4 min", 
        type: 'video',
        videoUrl: "/videos/dsa-hashtables.mp4",
        completed: false 
      },
      { 
        id: 20, 
        title: "Interview Problem-Solving Strategy", 
        duration: "5 min", 
        type: 'notes',
        notesContent: `# Interview Strategy Guide

## Step-by-Step Approach

### 1. Understand the Problem
- Clarify inputs/outputs
- Ask about edge cases
- Confirm constraints

### 2. Examples
- Work through 2-3 examples
- Include edge cases
- Verify your understanding

### 3. Approach
- Discuss brute force first
- Identify patterns
- Think of optimizations

### 4. Code
- Start with pseudocode
- Write clean, readable code
- Use meaningful variable names

### 5. Test
- Walk through your code
- Test with examples
- Check edge cases

### 6. Optimize
- Analyze time/space complexity
- Discuss trade-offs
- Suggest improvements

## Common Patterns to Remember
- Two Pointers
- Sliding Window
- Fast & Slow Pointers
- Merge Intervals
- Cyclic Sort
- In-place Reversal
- BFS/DFS
- Dynamic Programming`,
        completed: false 
      }
    ]
  }
};
