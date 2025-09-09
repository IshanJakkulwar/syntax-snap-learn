export const practiceExercises = [
  {
    id: "ex-1",
    title: "Two Sum Problem",
    description: "Given an array of integers and a target sum, return indices of two numbers that add up to the target.",
    language: "Python",
    difficulty: "Easy" as const,
    starterCode: `def two_sum(nums, target):
    """
    Find two numbers in the array that add up to target.
    Return their indices.
    
    Args:
        nums: List of integers
        target: Target sum
        
    Returns:
        List of two indices
    """
    # Your code here
    pass

# Test your solution
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(result)  # Should print [0, 1]`,
    solution: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
    tests: [
      {
        input: "nums=[2, 7, 11, 15], target=9",
        expected: "[0, 1]",
        description: "Basic case with solution at start"
      },
      {
        input: "nums=[3, 2, 4], target=6",
        expected: "[1, 2]",
        description: "Solution in middle of array"
      },
      {
        input: "nums=[3, 3], target=6", 
        expected: "[0, 1]",
        description: "Duplicate numbers"
      }
    ],
    hints: [
      "Try using a hash map to store numbers you've seen",
      "For each number, check if its complement (target - number) exists in the map",
      "Remember to store the index along with the number"
    ]
  },
  {
    id: "ex-2",
    title: "Reverse String",
    description: "Write a function to reverse a string in-place using an array of characters.",
    language: "JavaScript",
    difficulty: "Easy" as const,
    starterCode: `function reverseString(s) {
    /**
     * Reverses a string in-place
     * @param {string[]} s - Array of characters
     * @return {void} - Modifies s in-place
     */
    
    // Your code here
}

// Test your solution
let chars = ['h', 'e', 'l', 'l', 'o'];
reverseString(chars);
console.log(chars); // Should be ['o', 'l', 'l', 'e', 'h']`,
    solution: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Swap characters
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}`,
    tests: [
      {
        input: "['h','e','l','l','o']",
        expected: "['o','l','l','e','h']",
        description: "Basic string reversal"
      },
      {
        input: "['H','a','n','n','a','h']",
        expected: "['h','a','n','n','a','H']", 
        description: "Palindrome-like string"
      },
      {
        input: "['a']",
        expected: "['a']",
        description: "Single character"
      }
    ],
    hints: [
      "Use two pointers, one at the start and one at the end",
      "Swap the characters and move pointers toward center",
      "Continue until pointers meet in the middle"
    ]
  },
  {
    id: "ex-3",
    title: "Valid Parentheses",
    description: "Given a string containing just parentheses, determine if the input string is valid.",
    language: "Python",
    difficulty: "Medium" as const,
    starterCode: `def is_valid(s):
    """
    Check if parentheses string is valid.
    Valid means every opening bracket has a corresponding closing bracket.
    
    Args:
        s: String containing only '(', ')', '{', '}', '[', ']'
        
    Returns:
        bool: True if valid, False otherwise
    """
    # Your code here
    pass

# Test cases
print(is_valid("()"))        # True
print(is_valid("()[]{}"))    # True
print(is_valid("(]"))        # False`,
    solution: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return not stack`,
    tests: [
      {
        input: "'()'",
        expected: "True",
        description: "Simple valid parentheses"
      },
      {
        input: "'()[]{}'" ,
        expected: "True",
        description: "Multiple types of brackets"
      },
      {
        input: "'(]'",
        expected: "False", 
        description: "Mismatched brackets"
      },
      {
        input: "'([)]'",
        expected: "False",
        description: "Interleaved brackets"
      }
    ],
    hints: [
      "Use a stack data structure to keep track of opening brackets",
      "When you see a closing bracket, check if it matches the most recent opening bracket",
      "Create a mapping of closing brackets to their corresponding opening brackets"
    ]
  },
  {
    id: "ex-4",
    title: "Maximum Subarray",
    description: "Find the contiguous subarray with the largest sum (Kadane's algorithm).",
    language: "Python",
    difficulty: "Medium" as const,
    starterCode: `def max_subarray(nums):
    """
    Find the contiguous subarray with the largest sum.
    
    Args:
        nums: List of integers
        
    Returns:
        int: Maximum sum of contiguous subarray
    """
    # Your code here
    pass

# Test your solution
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
result = max_subarray(nums)
print(result)  # Should print 6 (subarray [4,-1,2,1])`,
    solution: `def max_subarray(nums):
    max_so_far = nums[0]
    max_ending_here = nums[0]
    
    for i in range(1, len(nums)):
        max_ending_here = max(nums[i], max_ending_here + nums[i])
        max_so_far = max(max_so_far, max_ending_here)
    
    return max_so_far`,
    tests: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        expected: "6",
        description: "Mixed positive and negative numbers"
      },
      {
        input: "[1]",
        expected: "1", 
        description: "Single positive number"
      },
      {
        input: "[5,4,-1,7,8]",
        expected: "23",
        description: "Mostly positive numbers"
      }
    ],
    hints: [
      "Think about whether to start a new subarray or extend the current one",
      "Keep track of the maximum sum seen so far",
      "At each position, decide: include current element in existing subarray or start fresh?"
    ]
  },
  {
    id: "ex-5",
    title: "Binary Tree Traversal",
    description: "Implement inorder traversal of a binary tree recursively.",
    language: "Python",
    difficulty: "Medium" as const,
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    """
    Perform inorder traversal of binary tree.
    Inorder: left -> root -> right
    
    Args:
        root: TreeNode - Root of the binary tree
        
    Returns:
        List[int]: Values in inorder sequence
    """
    # Your code here
    pass

# Test with sample tree:     1
#                              \\
#                               2
#                              /
#                             3
root = TreeNode(1)
root.right = TreeNode(2)
root.right.left = TreeNode(3)
result = inorder_traversal(root)
print(result)  # Should print [1, 3, 2]`,
    solution: `def inorder_traversal(root):
    result = []
    
    def inorder(node):
        if node:
            inorder(node.left)   # Visit left subtree
            result.append(node.val)  # Visit root
            inorder(node.right)  # Visit right subtree
    
    inorder(root)
    return result`,
    tests: [
      {
        input: "Tree: 1 -> null, 2 -> 3, null",
        expected: "[1, 3, 2]",
        description: "Right-skewed tree with left child"
      },
      {
        input: "Tree: empty",
        expected: "[]",
        description: "Empty tree"
      },
      {
        input: "Tree: single node with value 1",
        expected: "[1]",
        description: "Single node tree"
      }
    ],
    hints: [
      "Inorder traversal follows: left subtree, root, right subtree",
      "Use recursion to visit each subtree",
      "Build the result list as you visit each node"
    ]
  },
  {
    id: "ex-6",
    title: "Fibonacci Sequence",
    description: "Calculate the nth Fibonacci number efficiently using dynamic programming.",
    language: "JavaScript",
    difficulty: "Easy" as const,
    starterCode: `function fibonacci(n) {
    /**
     * Calculate the nth Fibonacci number
     * F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)
     * 
     * @param {number} n - Position in Fibonacci sequence
     * @return {number} - The nth Fibonacci number
     */
    
    // Your code here
}

// Test your solution
console.log(fibonacci(10)); // Should print 55
console.log(fibonacci(0));  // Should print 0
console.log(fibonacci(1));  // Should print 1`,
    solution: `function fibonacci(n) {
    if (n <= 1) return n;
    
    let prev = 0, curr = 1;
    
    for (let i = 2; i <= n; i++) {
        let next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}`,
    tests: [
      {
        input: "n=10",
        expected: "55",
        description: "10th Fibonacci number"
      },
      {
        input: "n=0",
        expected: "0",
        description: "Base case: F(0)"
      },
      {
        input: "n=1", 
        expected: "1",
        description: "Base case: F(1)"
      },
      {
        input: "n=5",
        expected: "5",
        description: "5th Fibonacci number"
      }
    ],
    hints: [
      "Handle base cases: F(0) = 0, F(1) = 1",
      "Use iteration instead of recursion for better performance", 
      "Keep track of only the last two numbers, not the entire sequence"
    ]
  }
];