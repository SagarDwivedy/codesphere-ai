export const problems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'easy',
    category: 'array',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] == 9, return [0, 1]',
      },
    ],
    constraints: ['2 <= nums.length <= 10^4', 'Only one valid answer exists'],
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    tags: ['array', 'hash-map'],
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'easy',
    category: 'stack-queue',
    description:
      'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    constraints: ['1 <= s.length <= 10^4'],
    solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if ('({['.includes(char)) stack.push(char);
    else if (stack.pop() !== map[char]) return false;
  }
  return stack.length === 0;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    tags: ['stack', 'string'],
  },
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'easy',
    category: 'linked-list',
    description: 'Given the head of a singly linked list, reverse the list and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
    ],
    constraints: ['0 <= number of nodes <= 5000'],
    solution: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['linked-list', 'iteration'],
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'medium',
    category: 'dynamic-programming',
    description:
      'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'Subarray [4,-1,2,1] has the largest sum = 6',
      },
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    solution: `function maxSubArray(nums) {
  let maxSum = nums[0], currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['dynamic-programming', 'kadane'],
  },
  {
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'easy',
    category: 'searching',
    description:
      'Given an array of integers nums sorted in ascending order, and an integer target, write a function to search target in nums.',
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
      },
    ],
    constraints: ['1 <= nums.length <= 10^4', 'nums is sorted ascending'],
    solution: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    tags: ['binary-search', 'array'],
  },
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'easy',
    category: 'dynamic-programming',
    description:
      'You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1+1 or 2' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1' },
    ],
    constraints: ['1 <= n <= 45'],
    solution: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['dynamic-programming', 'fibonacci'],
  },
  {
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    difficulty: 'easy',
    category: 'linked-list',
    description: 'Merge two sorted linked lists and return the merged list sorted.',
    examples: [
      { input: 'l1 = [1,2,4], l2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
    ],
    constraints: ['0 <= number of nodes <= 50'],
    solution: `function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}`,
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    tags: ['linked-list', 'merge'],
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-sell-stock',
    difficulty: 'easy',
    category: 'array',
    description:
      'Given an array prices where prices[i] is the price on day i, return the maximum profit from one transaction.',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2, sell on day 5',
      },
    ],
    constraints: ['1 <= prices.length <= 10^5'],
    solution: `function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['array', 'greedy'],
  },
  {
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    difficulty: 'easy',
    category: 'tree',
    description: 'Given the root of a binary tree, invert the tree and return its root.',
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
    ],
    constraints: ['0 <= number of nodes <= 100'],
    solution: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    tags: ['tree', 'recursion'],
  },
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'medium',
    category: 'graph',
    description:
      'Given an m x n 2D binary grid which represents a map of "1"s (land) and "0"s (water), return the number of islands.',
    examples: [
      {
        input: 'grid = [["1","1","0"],["0","1","0"],["0","0","1"]]',
        output: '2',
      },
    ],
    constraints: ['1 <= m, n <= 300'],
    solution: `function numIslands(grid) {
  let count = 0;
  const dfs = (i, j) => {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === '0') return;
    grid[i][j] = '0';
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  };
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++)
      if (grid[i][j] === '1') { dfs(i, j); count++; }
  return count;
}`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    tags: ['graph', 'dfs', 'bfs'],
  },
  {
    title: 'Longest Common Subsequence',
    slug: 'longest-common-subsequence',
    difficulty: 'medium',
    category: 'dynamic-programming',
    description: 'Given two strings text1 and text2, return the length of their longest common subsequence.',
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3' },
    ],
    constraints: ['1 <= text1.length, text2.length <= 1000'],
    solution: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = text1[i-1] === text2[j-1] ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j], dp[i][j-1]);
  return dp[m][n];
}`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    tags: ['dynamic-programming', 'string'],
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'easy',
    category: 'string',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
    solution: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (const c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['string', 'hash-map'],
  },
  {
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    difficulty: 'medium',
    category: 'array',
    description:
      'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements except nums[i].',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
    ],
    constraints: ['2 <= nums.length <= 10^5', 'No division allowed'],
    solution: `function productExceptSelf(nums) {
  const n = nums.length, result = new Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) { result[i] = left; left *= nums[i]; }
  let right = 1;
  for (let i = n-1; i >= 0; i--) { result[i] *= right; right *= nums[i]; }
  return result;
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    tags: ['array', 'prefix-product'],
  },
  {
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    difficulty: 'medium',
    category: 'array',
    description: 'Given an array of intervals, merge all overlapping intervals.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
    ],
    constraints: ['1 <= intervals.length <= 10^4'],
    solution: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (const [start, end] of intervals.slice(1)) {
    const last = result[result.length - 1];
    if (start <= last[1]) last[1] = Math.max(last[1], end);
    else result.push([start, end]);
  }
  return result;
}`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    tags: ['array', 'sorting'],
  },
  {
    title: 'Word Search',
    slug: 'word-search',
    difficulty: 'medium',
    category: 'graph',
    description: 'Given an m x n grid of characters and a string word, return true if word exists in the grid.',
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: 'true',
      },
    ],
    constraints: ['1 <= m, n <= 6'],
    solution: `function exist(board, word) {
  const dfs = (i, j, k) => {
    if (k === word.length) return true;
    if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || board[i][j] !== word[k]) return false;
    const temp = board[i][j]; board[i][j] = '#';
    const found = dfs(i+1,j,k+1)||dfs(i-1,j,k+1)||dfs(i,j+1,k+1)||dfs(i,j-1,k+1);
    board[i][j] = temp;
    return found;
  };
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board[0].length; j++)
      if (dfs(i, j, 0)) return true;
  return false;
}`,
    timeComplexity: 'O(m × n × 4^L)',
    spaceComplexity: 'O(L)',
    tags: ['graph', 'backtracking', 'dfs'],
  },
  {
    title: 'Longest Palindromic Substring',
    slug: 'longest-palindromic-substring',
    difficulty: 'medium',
    category: 'string',
    description: 'Given a string s, return the longest palindromic substring in s.',
    examples: [
      { input: 's = "babad"', output: '"bab"' },
    ],
    constraints: ['1 <= s.length <= 1000'],
    solution: `function longestPalindrome(s) {
  let start = 0, maxLen = 1;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
  };
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i+1); }
  return s.substring(start, start + maxLen);
}`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    tags: ['string', 'expand-around-center'],
  },
  {
    title: 'Course Schedule',
    slug: 'course-schedule',
    difficulty: 'medium',
    category: 'graph',
    description:
      'There are numCourses to take. Given prerequisites pairs, determine if you can finish all courses.',
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false' },
    ],
    constraints: ['1 <= numCourses <= 2000'],
    solution: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({length: numCourses}, () => []);
  const visited = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) graph[b].push(a);
  const dfs = (node) => {
    if (visited[node] === 1) return false;
    if (visited[node] === 2) return true;
    visited[node] = 1;
    for (const nei of graph[node]) if (!dfs(nei)) return false;
    visited[node] = 2;
    return true;
  };
  for (let i = 0; i < numCourses; i++) if (!dfs(i)) return false;
  return true;
}`,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    tags: ['graph', 'topological-sort', 'cycle-detection'],
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-rotated-sorted-array',
    difficulty: 'medium',
    category: 'searching',
    description: 'Given a sorted rotated array of unique elements, find the minimum element.',
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1' },
    ],
    constraints: ['1 <= nums.length <= 5000'],
    solution: `function findMin(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    tags: ['binary-search', 'array'],
  },
  {
    title: 'Serialize and Deserialize Binary Tree',
    slug: 'serialize-deserialize-binary-tree',
    difficulty: 'hard',
    category: 'tree',
    description: 'Design an algorithm to serialize and deserialize a binary tree.',
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]' },
    ],
    constraints: ['0 <= number of nodes <= 10^4'],
    solution: `function serialize(root) {
  if (!root) return 'null';
  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}
function deserialize(data) {
  const vals = data.split(',');
  const build = () => {
    const val = vals.shift();
    if (val === 'null') return null;
    const node = new TreeNode(parseInt(val));
    node.left = build(); node.right = build();
    return node;
  };
  return build();
}`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    tags: ['tree', 'serialization', 'dfs'],
  },
];