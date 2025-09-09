export const expandedLessons = [
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
    isSaved: false,
    comments: 28,
    shares: 15,
    tags: ["python", "basics", "data-structures"]
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
    isSaved: true,
    comments: 45,
    shares: 32,
    tags: ["javascript", "arrays", "functional"]
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
    isSaved: false,
    comments: 18,
    shares: 8,
    tags: ["cpp", "pointers", "memory"]
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
    isSaved: true,
    comments: 67,
    shares: 45,
    tags: ["react", "hooks", "effects"]
  },
  {
    id: "5",
    title: "Python Functions & Arguments",
    creator: "Syntax AI",
    language: "Python",
    topic: "Functions",
    level: "Beginner" as const,
    duration: "2m 10s",
    caption: "Understand Python's flexible function arguments: *args, **kwargs, and default parameters.",
    codeSnippet: `def greet(name, greeting="Hello", excited=False):
    message = f"{greeting}, {name}"
    return message + "!" if excited else message

# Using *args for variable arguments
def sum_all(*numbers):
    return sum(numbers)

# Using **kwargs for keyword arguments
def create_user(**kwargs):
    return {"id": 1, **kwargs}

print(greet("Alice"))  # Hello, Alice
print(sum_all(1, 2, 3, 4))  # 10
print(create_user(name="Bob", age=30))`,
    takeaways: [
      "Default parameters provide fallback values",
      "*args collects positional arguments",
      "**kwargs collects keyword arguments"
    ],
    likes: 445,
    isLiked: false,
    isSaved: false,
    comments: 31,
    shares: 22,
    tags: ["python", "functions", "arguments"]
  },
  {
    id: "6",
    title: "CSS Flexbox Layout",
    creator: "Syntax AI",
    language: "CSS",
    topic: "Layout",
    level: "Intermediate" as const,
    duration: "3m 20s",
    caption: "Master CSS Flexbox for responsive layouts. Learn the key properties that will solve most layout challenges.",
    codeSnippet: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  flex: 1;  /* grow to fill space */
  min-width: 200px;
}

/* Centering made easy */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`,
    takeaways: [
      "justify-content controls horizontal alignment",
      "align-items controls vertical alignment",
      "flex: 1 makes items grow equally"
    ],
    likes: 623,
    isLiked: true,
    isSaved: false,
    comments: 42,
    shares: 28,
    tags: ["css", "flexbox", "layout"]
  },
  {
    id: "7",
    title: "Git Branching Strategy",
    creator: "Syntax AI",
    language: "Git",
    topic: "Version Control",
    level: "Intermediate" as const,
    duration: "2m 55s",
    caption: "Learn the essential Git branching workflow for team collaboration and feature development.",
    codeSnippet: `# Create and switch to feature branch
git checkout -b feature/user-auth

# Work on your feature, commit changes
git add .
git commit -m "Add user authentication"

# Switch back to main and merge
git checkout main
git pull origin main
git merge feature/user-auth

# Delete feature branch
git branch -d feature/user-auth

# Push changes
git push origin main`,
    takeaways: [
      "Feature branches isolate development work",
      "Always pull latest changes before merging",
      "Delete merged branches to keep repo clean"
    ],
    likes: 389,
    isLiked: false,
    isSaved: true,
    comments: 25,
    shares: 19,
    tags: ["git", "branching", "collaboration"]
  },
  {
    id: "8",
    title: "SQL Joins Explained",
    creator: "Syntax AI",
    language: "SQL",
    topic: "Database",
    level: "Intermediate" as const,
    duration: "3m 15s",
    caption: "Understand the different types of SQL joins and when to use each one for querying relational data.",
    codeSnippet: `-- INNER JOIN: Only matching records
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: All users + their orders (if any)
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN: All orders + user info
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;`,
    takeaways: [
      "INNER JOIN returns only matching records",
      "LEFT JOIN keeps all records from left table",
      "Choose join type based on data requirements"
    ],
    likes: 512,
    isLiked: false,
    isSaved: false,
    comments: 38,
    shares: 24,
    tags: ["sql", "joins", "database"]
  },
  {
    id: "9",
    title: "Machine Learning Basics",
    creator: "Syntax AI",
    language: "Python",
    topic: "Machine Learning",
    level: "Beginner" as const,
    duration: "4m 10s",
    caption: "Introduction to machine learning concepts: supervised vs unsupervised learning with practical examples.",
    codeSnippet: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np

# Sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
print(f"Prediction: {predictions}")`,
    takeaways: [
      "Split data into training and testing sets",
      "Linear regression finds best-fit line",
      "Always validate model on unseen data"
    ],
    likes: 734,
    isLiked: true,
    isSaved: true,
    comments: 56,
    shares: 41,
    tags: ["python", "ml", "sklearn"]
  },
  {
    id: "10",
    title: "REST API Design Principles",
    creator: "Syntax AI",
    language: "HTTP",
    topic: "API Design",
    level: "Intermediate" as const,
    duration: "3m 40s",
    caption: "Learn the key principles of RESTful API design for building scalable and maintainable web services.",
    codeSnippet: `// RESTful endpoints structure
GET    /api/users          // Get all users
GET    /api/users/123      // Get specific user
POST   /api/users          // Create new user
PUT    /api/users/123      // Update entire user
PATCH  /api/users/123      // Partial update
DELETE /api/users/123      // Delete user

// HTTP status codes
200 OK               // Success
201 Created          // Resource created
400 Bad Request      // Client error
404 Not Found        // Resource not found
500 Internal Error   // Server error`,
    takeaways: [
      "Use HTTP verbs to indicate action type",
      "Structure URLs as hierarchical resources",
      "Return appropriate HTTP status codes"
    ],
    likes: 467,
    isLiked: false,
    isSaved: false,
    comments: 33,
    shares: 27,
    tags: ["api", "rest", "http"]
  },
  {
    id: "11",
    title: "JavaScript Async/Await",
    creator: "Syntax AI",
    language: "JavaScript",
    topic: "Asynchronous",
    level: "Intermediate" as const,
    duration: "2m 30s",
    caption: "Master async/await for cleaner asynchronous JavaScript code. Say goodbye to callback hell!",
    codeSnippet: `// Promise-based approach
function fetchUserData(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error(error));
}

// Async/await approach
async function fetchUserData(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Using the async function
const user = await fetchUserData(123);`,
    takeaways: [
      "async/await makes asynchronous code readable",
      "Always use try/catch for error handling",
      "await can only be used inside async functions"
    ],
    likes: 689,
    isLiked: true,
    isSaved: false,
    comments: 44,
    shares: 35,
    tags: ["javascript", "async", "promises"]
  },
  {
    id: "12",
    title: "CSS Grid Layout",
    creator: "Syntax AI",
    language: "CSS",
    topic: "Layout",
    level: "Advanced" as const,
    duration: "4m 20s",
    caption: "Build complex layouts with CSS Grid. Perfect for responsive design and precise positioning.",
    codeSnippet: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-gap: 1rem;
  min-height: 100vh;
}

.header {
  grid-column: 1 / -1;
}

.sidebar {
  grid-row: 2;
}

.main {
  grid-column: 2 / 4;
}

.footer {
  grid-column: 1 / -1;
}

/* Responsive */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}`,
    takeaways: [
      "Grid creates 2D layouts (rows and columns)",
      "Use grid-template-* to define structure",
      "Grid items can span multiple cells"
    ],
    likes: 523,
    isLiked: false,
    isSaved: true,
    comments: 39,
    shares: 26,
    tags: ["css", "grid", "responsive"]
  },
  {
    id: "13",
    title: "Python Decorators",
    creator: "Syntax AI",
    language: "Python",
    topic: "Advanced",
    level: "Advanced" as const,
    duration: "3m 50s",
    caption: "Understand Python decorators to add functionality to functions without modifying their code.",
    codeSnippet: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper

def cache(func):
    cache_dict = {}
    @wraps(func)
    def wrapper(*args):
        if args in cache_dict:
            return cache_dict[args]
        result = func(*args)
        cache_dict[args] = result
        return result
    return wrapper

@timer
@cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
    takeaways: [
      "Decorators modify function behavior",
      "Use @wraps to preserve function metadata",
      "Stack decorators for multiple behaviors"
    ],
    likes: 445,
    isLiked: false,
    isSaved: false,
    comments: 32,
    shares: 18,
    tags: ["python", "decorators", "advanced"]
  },
  {
    id: "14",
    title: "Docker Basics",
    creator: "Syntax AI",
    language: "Docker",
    topic: "DevOps",
    level: "Beginner" as const,
    duration: "3m 25s",
    caption: "Learn Docker fundamentals: containers, images, and basic commands for consistent development environments.",
    codeSnippet: `# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# Build and run commands
docker build -t my-app .
docker run -p 3000:3000 my-app

# List containers and images
docker ps
docker images

# Stop and remove
docker stop container_id
docker rm container_id`,
    takeaways: [
      "Containers package apps with dependencies",
      "Dockerfile defines container configuration",
      "Port mapping connects container to host"
    ],
    likes: 567,
    isLiked: true,
    isSaved: true,
    comments: 41,
    shares: 29,
    tags: ["docker", "devops", "containers"]
  },
  {
    id: "15",
    title: "JavaScript Closures",
    creator: "Syntax AI",
    language: "JavaScript",
    topic: "Concepts",
    level: "Intermediate" as const,
    duration: "2m 45s",
    caption: "Master JavaScript closures to understand scope, privacy, and powerful programming patterns.",
    codeSnippet: `// Basic closure
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y; // Inner function accesses outer scope
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8

// Counter with private state
function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // count is private!
console.log(counter.getCount()); // 1`,
    takeaways: [
      "Closures remember outer function variables",
      "Enable data privacy and encapsulation",
      "Common pattern for modules and factories"
    ],
    likes: 623,
    isLiked: false,
    isSaved: false,
    comments: 48,
    shares: 31,
    tags: ["javascript", "closures", "scope"]
  },
  {
    id: "16",
    title: "MongoDB Aggregation",
    creator: "Syntax AI",
    language: "MongoDB",
    topic: "Database",
    level: "Advanced" as const,
    duration: "4m 15s",
    caption: "Learn MongoDB's powerful aggregation pipeline for complex data processing and analysis.",
    codeSnippet: `// Sample data processing pipeline
db.orders.aggregate([
  // Stage 1: Match recent orders
  {
    $match: {
      date: { $gte: new Date("2024-01-01") }
    }
  },
  
  // Stage 2: Group by customer
  {
    $group: {
      _id: "$customerId",
      totalAmount: { $sum: "$amount" },
      orderCount: { $sum: 1 },
      avgOrder: { $avg: "$amount" }
    }
  },
  
  // Stage 3: Sort by total amount
  {
    $sort: { totalAmount: -1 }
  },
  
  // Stage 4: Limit to top 10
  {
    $limit: 10
  }
]);`,
    takeaways: [
      "Aggregation pipeline processes data in stages",
      "$match filters documents early for performance",
      "Use $group for calculations and summaries"
    ],
    likes: 389,
    isLiked: false,
    isSaved: true,
    comments: 27,
    shares: 15,
    tags: ["mongodb", "aggregation", "database"]
  },
  {
    id: "17",
    title: "React State Management",
    creator: "Syntax AI",
    language: "React",
    topic: "State",
    level: "Intermediate" as const,
    duration: "3m 30s",
    caption: "Compare different React state management approaches: useState, useReducer, and Context API.",
    codeSnippet: `// useState for simple state
const [count, setCount] = useState(0);

// useReducer for complex state
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'setStep':
      return { ...state, step: action.step };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);

// Context for global state
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Components />
    </ThemeContext.Provider>
  );
}`,
    takeaways: [
      "useState for simple local state",
      "useReducer for complex state logic",
      "Context API for global state sharing"
    ],
    likes: 701,
    isLiked: true,
    isSaved: false,
    comments: 52,
    shares: 38,
    tags: ["react", "state", "hooks"]
  },
  {
    id: "18",
    title: "Algorithm: Binary Search",
    creator: "Syntax AI",
    language: "Python",
    topic: "Algorithms",
    level: "Intermediate" as const,
    duration: "2m 55s",
    caption: "Implement binary search for efficient searching in sorted arrays. O(log n) time complexity!",
    codeSnippet: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Not found

# Example usage
numbers = [1, 3, 5, 7, 9, 11, 13, 15]
index = binary_search(numbers, 7)
print(f"Found at index: {index}")  # Found at index: 3

# Time complexity: O(log n)
# Space complexity: O(1)`,
    takeaways: [
      "Binary search works on sorted arrays only",
      "Eliminates half the search space each iteration",
      "Much faster than linear search for large datasets"
    ],
    likes: 456,
    isLiked: false,
    isSaved: true,
    comments: 34,
    shares: 21,
    tags: ["python", "algorithms", "search"]
  },
  {
    id: "19",
    title: "Node.js Express Server",
    creator: "Syntax AI",
    language: "Node.js",
    topic: "Backend",
    level: "Beginner" as const,
    duration: "3m 10s",
    caption: "Build your first Express.js server with routing, middleware, and error handling.",
    codeSnippet: `const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, name: 'John Doe' });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: 1, name, email });
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    takeaways: [
      "Express simplifies Node.js server creation",
      "Middleware functions run before route handlers",
      "Use appropriate HTTP status codes"
    ],
    likes: 534,
    isLiked: true,
    isSaved: false,
    comments: 37,
    shares: 25,
    tags: ["nodejs", "express", "backend"]
  },
  {
    id: "20",
    title: "CSS Animation Fundamentals",
    creator: "Syntax AI",
    language: "CSS",
    topic: "Animation",
    level: "Intermediate" as const,
    duration: "3m 45s",
    caption: "Create smooth CSS animations with keyframes, transitions, and transforms for engaging user interfaces.",
    codeSnippet: `/* Transition for hover effects */
.button {
  background: #3b82f6;
  transform: scale(1);
  transition: all 0.3s ease;
}

.button:hover {
  background: #2563eb;
  transform: scale(1.05);
}

/* Keyframe animation */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.6s ease-out;
}

/* Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}`,
    takeaways: [
      "Transitions animate property changes",
      "Keyframes define complex animation sequences",
      "Use transform for smooth, performant animations"
    ],
    likes: 612,
    isLiked: false,
    isSaved: true,
    comments: 43,
    shares: 29,
    tags: ["css", "animation", "ui"]
  }
];

export const expandedQuizzes = [
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
  },
  {
    id: "quiz-3",
    type: "mcq" as const,
    question: "In C++, what does the & operator do when used with a variable?",
    options: [
      "Dereferences a pointer",
      "Gets the memory address of a variable",
      "Performs bitwise AND operation", 
      "Creates a reference variable"
    ],
    correctAnswer: 1,
    explanation: "The & operator gets the memory address of a variable. For example, &value returns the address where 'value' is stored in memory.",
    language: "C++",
    topic: "Pointers"
  },
  {
    id: "quiz-4",
    type: "mcq" as const,
    question: "What happens if you don't include a dependency array in useEffect?",
    options: [
      "The effect runs only once",
      "The effect runs after every render",
      "The effect never runs",
      "React throws an error"
    ],
    correctAnswer: 1,
    explanation: "Without a dependency array, useEffect runs after every render. This can cause performance issues if the effect is expensive.",
    language: "React",
    topic: "Hooks"
  },
  {
    id: "quiz-5",
    type: "mcq" as const,
    question: "What's the difference between *args and **kwargs in Python?",
    options: [
      "*args is for strings, **kwargs is for numbers",
      "*args captures positional arguments, **kwargs captures keyword arguments",
      "They are exactly the same",
      "*args is deprecated, use **kwargs instead"
    ],
    correctAnswer: 1,
    explanation: "*args collects extra positional arguments into a tuple, while **kwargs collects extra keyword arguments into a dictionary.",
    language: "Python",
    topic: "Functions"
  },
  {
    id: "quiz-6",
    type: "mcq" as const,
    question: "In CSS Flexbox, what does 'justify-content: space-between' do?",
    options: [
      "Centers items vertically",
      "Distributes items with equal space between them",
      "Aligns items to the start of the container",
      "Makes items the same height"
    ],
    correctAnswer: 1,
    explanation: "justify-content: space-between distributes flex items evenly, with the first item at the start and the last item at the end.",
    language: "CSS",
    topic: "Flexbox"
  },
  {
    id: "quiz-7",
    type: "mcq" as const,
    question: "Which Git command creates a new branch and switches to it?",
    options: [
      "git branch new-feature",
      "git checkout new-feature", 
      "git checkout -b new-feature",
      "git switch new-feature"
    ],
    correctAnswer: 2,
    explanation: "git checkout -b new-feature creates a new branch called 'new-feature' and immediately switches to it. The -b flag means 'create branch'.",
    language: "Git",
    topic: "Branching"
  },
  {
    id: "quiz-8",
    type: "mcq" as const,
    question: "What type of JOIN returns all records from the left table, even if there's no match in the right table?",
    options: [
      "INNER JOIN",
      "RIGHT JOIN",
      "LEFT JOIN",
      "FULL JOIN"
    ],
    correctAnswer: 2,
    explanation: "LEFT JOIN returns all records from the left table and matched records from the right table. Unmatched records from the right table show as NULL.",
    language: "SQL",
    topic: "Joins"
  },
  {
    id: "quiz-9",
    type: "mcq" as const,
    question: "In machine learning, what is the purpose of splitting data into training and testing sets?",
    options: [
      "To make the algorithm run faster",
      "To evaluate model performance on unseen data",
      "To reduce memory usage",
      "To balance the dataset"
    ],
    correctAnswer: 1,
    explanation: "Splitting data allows us to train the model on one set and evaluate its performance on unseen data, helping detect overfitting.",
    language: "Python",
    topic: "Machine Learning"
  },
  {
    id: "quiz-10",
    type: "mcq" as const,
    question: "Which HTTP status code indicates that a resource was successfully created?",
    options: [
      "200 OK",
      "201 Created",
      "202 Accepted",
      "204 No Content"
    ],
    correctAnswer: 1,
    explanation: "201 Created indicates that a request was successful and a new resource was created as a result, typically used with POST requests.",
    language: "HTTP",
    topic: "Status Codes"
  }
];
