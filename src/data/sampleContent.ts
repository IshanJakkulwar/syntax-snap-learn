export const sampleLessons = [
  {
    id: "1",
    title: "Python List Comprehensions",
    creator: "Syntax AI",
    language: "Python",
    topic: "Data Structures",
    level: "Intermediate" as const,
    duration: "2m 15s",
    caption: "Learn how to write more Pythonic code with list comprehensions. Transform loops into elegant one-liners!",
    codeSnippet: `# Traditional way
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension way
squares = [x**2 for x in range(10)]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]`,
    takeaways: [
      "List comprehensions are more readable and faster",
      "Use conditions to filter elements",
      "Can replace most for loops that build lists"
    ],
    likes: 342,
    isLiked: false,
    isSaved: false
  },
  {
    id: "2", 
    title: "JavaScript Array Methods",
    creator: "Syntax AI",
    language: "JavaScript", 
    topic: "Arrays",
    level: "Beginner" as const,
    duration: "1m 45s",
    caption: "Master the essential array methods: map, filter, reduce. These are the building blocks of functional programming in JS!",
    codeSnippet: `const numbers = [1, 2, 3, 4, 5];

// Map: transform each element
const doubled = numbers.map(n => n * 2);

// Filter: keep elements that match condition
const evens = numbers.filter(n => n % 2 === 0);

// Reduce: combine all elements
const sum = numbers.reduce((acc, n) => acc + n, 0);`,
    takeaways: [
      "map() transforms each element",
      "filter() selects elements by condition", 
      "reduce() combines all elements into one value"
    ],
    likes: 567,
    isLiked: true,
    isSaved: true
  },
  {
    id: "3",
    title: "C++ Pointers Basics", 
    creator: "Syntax AI",
    language: "C++",
    topic: "Memory Management",
    level: "Advanced" as const,
    duration: "3m 30s",
    caption: "Understanding pointers is crucial for C++. Learn how they work and why they're so powerful for memory management.",
    codeSnippet: `int value = 42;
int* ptr = &value;  // ptr stores address of value

cout << value;   // prints 42
cout << *ptr;    // prints 42 (dereference)
cout << ptr;     // prints memory address

// Pointer arithmetic
int arr[] = {1, 2, 3};
int* p = arr;
cout << *(p + 1); // prints 2`,
    takeaways: [
      "Pointers store memory addresses",
      "Use & to get address, * to dereference",
      "Pointer arithmetic allows array traversal"
    ],
    likes: 234,
    isLiked: false,
    isSaved: false
  },
  {
    id: "4",
    title: "React useEffect Hook",
    creator: "Syntax AI", 
    language: "React",
    topic: "Hooks",
    level: "Intermediate" as const,
    duration: "2m 45s",
    caption: "Master side effects in React with useEffect. Learn when and how to use this essential hook for modern React development.",
    codeSnippet: `import { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);

  // Effect runs after every render
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  });

  // Effect with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // Empty dependency array = run once

  return <div>Count: {count}</div>;
}`,
    takeaways: [
      "useEffect handles side effects",
      "Dependency array controls when effect runs", 
      "Return cleanup function to prevent memory leaks"
    ],
    likes: 892,
    isLiked: false,
    isSaved: true
  }
];

export const sampleQuizzes = [
  {
    id: "quiz-1",
    type: "mcq" as const,
    question: "What does this Python list comprehension do?\n[x**2 for x in range(5) if x % 2 == 0]",
    options: [
      "Squares all numbers from 0 to 4",
      "Squares only even numbers from 0 to 4", 
      "Squares odd numbers from 0 to 4",
      "Returns all even numbers from 0 to 4"
    ],
    correctAnswer: 1,
    explanation: "The list comprehension squares (x**2) only the even numbers (if x % 2 == 0) from the range 0 to 4, resulting in [0, 4, 16].",
    language: "Python",
    topic: "List Comprehensions"
  },
  {
    id: "quiz-2", 
    type: "mcq" as const,
    question: "Which JavaScript array method would you use to create a new array with only values greater than 10?",
    options: [
      "map()",
      "reduce()",
      "filter()",
      "forEach()"
    ],
    correctAnswer: 2,
    explanation: "filter() creates a new array with elements that pass the test function. In this case, you'd use arr.filter(x => x > 10).",
    language: "JavaScript", 
    topic: "Array Methods"
  }
];
