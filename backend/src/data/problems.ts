export const problems = [
  // ─────────────────────────────────────────
  // ARRAYS (25)
  // ─────────────────────────────────────────
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "easy",
    category: "array",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9" }],
    constraints: ["2 <= nums.length <= 10^4", "Only one valid answer exists"],
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["array", "hash-map"],
  },
  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-sell-stock",
    difficulty: "easy",
    category: "array",
    description: "Given an array prices where prices[i] is the price of a stock on day i, return the maximum profit from one transaction. If no profit is possible, return 0.",
    examples: [{ input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2, sell on day 5" }],
    constraints: ["1 <= prices.length <= 10^5"],
    solution: `function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "greedy"],
  },
  {
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    difficulty: "easy",
    category: "array",
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    examples: [{ input: "nums = [1,2,3,1]", output: "true" }],
    constraints: ["1 <= nums.length <= 10^5"],
    solution: `function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["array", "hash-set"],
  },
  {
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    difficulty: "medium",
    category: "array",
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements except nums[i]. You must solve it without division in O(n).",
    examples: [{ input: "nums = [1,2,3,4]", output: "[24,12,8,6]" }],
    constraints: ["2 <= nums.length <= 10^5", "No division allowed"],
    solution: `function productExceptSelf(nums) {
  const n = nums.length, result = new Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) { result[i] = left; left *= nums[i]; }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) { result[i] *= right; right *= nums[i]; }
  return result;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "prefix-product"],
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "medium",
    category: "array",
    description: "Given an integer array nums, find the subarray with the largest sum and return its sum.",
    examples: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] has the largest sum" }],
    constraints: ["1 <= nums.length <= 10^5"],
    solution: `function maxSubArray(nums) {
  let maxSum = nums[0], currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "dynamic-programming", "kadane"],
  },
  {
    title: "Maximum Product Subarray",
    slug: "maximum-product-subarray",
    difficulty: "medium",
    category: "array",
    description: "Given an integer array nums, find a subarray that has the largest product, and return the product.",
    examples: [{ input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product" }],
    constraints: ["1 <= nums.length <= 2 * 10^4"],
    solution: `function maxProduct(nums) {
  let maxP = nums[0], minP = nums[0], result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const temp = maxP;
    maxP = Math.max(nums[i], maxP * nums[i], minP * nums[i]);
    minP = Math.min(nums[i], temp * nums[i], minP * nums[i]);
    result = Math.max(result, maxP);
  }
  return result;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "dynamic-programming"],
  },
  {
    title: "Find Minimum in Rotated Sorted Array",
    slug: "find-minimum-rotated-sorted-array",
    difficulty: "medium",
    category: "array",
    description: "Given a sorted rotated array of unique elements, find the minimum element.",
    examples: [{ input: "nums = [3,4,5,1,2]", output: "1" }],
    constraints: ["1 <= nums.length <= 5000", "All integers are unique"],
    solution: `function findMin(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}`,
    timeComplexity: "O(log n)", spaceComplexity: "O(1)", tags: ["array", "binary-search"],
  },
  {
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    difficulty: "medium",
    category: "array",
    description: "Given a rotated sorted array and a target, return the index of target if found, otherwise return -1.",
    examples: [{ input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" }],
    constraints: ["1 <= nums.length <= 5000", "All values are unique"],
    solution: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}`,
    timeComplexity: "O(log n)", spaceComplexity: "O(1)", tags: ["array", "binary-search"],
  },
  {
    title: "3Sum",
    slug: "3sum",
    difficulty: "medium",
    category: "array",
    description: "Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
    examples: [{ input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }],
    constraints: ["3 <= nums.length <= 3000"],
    solution: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}`,
    timeComplexity: "O(n^2)", spaceComplexity: "O(n)", tags: ["array", "two-pointers"],
  },
  {
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "medium",
    category: "array",
    description: "Given n non-negative integers where each represents a point (i, height[i]), find two lines that together with the x-axis form a container with the most water.",
    examples: [{ input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }],
    constraints: ["n == height.length", "2 <= n <= 10^5"],
    solution: `function maxArea(height) {
  let left = 0, right = height.length - 1, maxWater = 0;
  while (left < right) {
    maxWater = Math.max(maxWater, Math.min(height[left], height[right]) * (right - left));
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxWater;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "two-pointers"],
  },
  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "medium",
    category: "array",
    description: "Given an array of intervals, merge all overlapping intervals and return an array of non-overlapping intervals.",
    examples: [{ input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }],
    constraints: ["1 <= intervals.length <= 10^4"],
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
    timeComplexity: "O(n log n)", spaceComplexity: "O(n)", tags: ["array", "sorting"],
  },
  {
    title: "Insert Interval",
    slug: "insert-interval",
    difficulty: "medium",
    category: "array",
    description: "Given a sorted list of non-overlapping intervals and a new interval, insert the new interval merging if necessary.",
    examples: [{ input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" }],
    constraints: ["0 <= intervals.length <= 10^4"],
    solution: `function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  while (i < intervals.length && intervals[i][1] < newInterval[0]) result.push(intervals[i++]);
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);
  while (i < intervals.length) result.push(intervals[i++]);
  return result;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["array", "intervals"],
  },
  {
    title: "Rotate Array",
    slug: "rotate-array",
    difficulty: "medium",
    category: "array",
    description: "Given an integer array nums, rotate the array to the right by k steps.",
    examples: [{ input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]" }],
    constraints: ["1 <= nums.length <= 10^5"],
    solution: `function rotate(nums, k) {
  k = k % nums.length;
  const reverse = (l, r) => {
    while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
  };
  reverse(0, nums.length - 1);
  reverse(0, k - 1);
  reverse(k, nums.length - 1);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "two-pointers"],
  },
  {
    title: "Move Zeroes",
    slug: "move-zeroes",
    difficulty: "easy",
    category: "array",
    description: "Given an integer array nums, move all 0s to the end while maintaining the relative order of non-zero elements.",
    examples: [{ input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" }],
    constraints: ["1 <= nums.length <= 10^4"],
    solution: `function moveZeroes(nums) {
  let pos = 0;
  for (const num of nums) if (num !== 0) nums[pos++] = num;
  while (pos < nums.length) nums[pos++] = 0;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "two-pointers"],
  },
  {
    title: "Find All Duplicates in an Array",
    slug: "find-all-duplicates-in-array",
    difficulty: "medium",
    category: "array",
    description: "Given an integer array nums of length n where all integers are in range [1, n], return all integers that appear twice.",
    examples: [{ input: "nums = [4,3,2,7,8,2,3,1]", output: "[2,3]" }],
    constraints: ["n == nums.length", "1 <= nums[i] <= n"],
    solution: `function findDuplicates(nums) {
  const result = [];
  for (const num of nums) {
    const idx = Math.abs(num) - 1;
    if (nums[idx] < 0) result.push(Math.abs(num));
    else nums[idx] = -nums[idx];
  }
  return result;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "cyclic-sort"],
  },
  {
    title: "Subarray Sum Equals K",
    slug: "subarray-sum-equals-k",
    difficulty: "medium",
    category: "array",
    description: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals k.",
    examples: [{ input: "nums = [1,1,1], k = 2", output: "2" }],
    constraints: ["1 <= nums.length <= 2 * 10^4"],
    solution: `function subarraySum(nums, k) {
  const map = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const num of nums) {
    sum += num;
    count += (map.get(sum - k) || 0);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["array", "prefix-sum", "hash-map"],
  },
  {
    title: "Longest Consecutive Sequence",
    slug: "longest-consecutive-sequence",
    difficulty: "medium",
    category: "array",
    description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence in O(n) time.",
    examples: [{ input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "[1,2,3,4]" }],
    constraints: ["0 <= nums.length <= 10^5"],
    solution: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxLen = 0;
  for (const num of set) {
    if (!set.has(num - 1)) {
      let curr = num, len = 1;
      while (set.has(curr + 1)) { curr++; len++; }
      maxLen = Math.max(maxLen, len);
    }
  }
  return maxLen;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["array", "hash-set"],
  },
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "hard",
    category: "array",
    description: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
    examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
    constraints: ["n == height.length", "0 <= height[i] <= 3 * 10^4"],
    solution: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      height[left] >= leftMax ? (leftMax = height[left]) : (water += leftMax - height[left]);
      left++;
    } else {
      height[right] >= rightMax ? (rightMax = height[right]) : (water += rightMax - height[right]);
      right--;
    }
  }
  return water;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "two-pointers"],
  },
  {
    title: "Jump Game",
    slug: "jump-game",
    difficulty: "medium",
    category: "array",
    description: "Given an array nums where nums[i] is the max jump length from position i, return true if you can reach the last index.",
    examples: [{ input: "nums = [2,3,1,1,4]", output: "true" }],
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    solution: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "greedy"],
  },
  {
    title: "Jump Game II",
    slug: "jump-game-ii",
    difficulty: "medium",
    category: "array",
    description: "Given an array nums, return the minimum number of jumps to reach the last index.",
    examples: [{ input: "nums = [2,3,1,1,4]", output: "2" }],
    constraints: ["1 <= nums.length <= 10^4"],
    solution: `function jump(nums) {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) { jumps++; curEnd = farthest; }
  }
  return jumps;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "greedy"],
  },
  {
    title: "Sort Colors",
    slug: "sort-colors",
    difficulty: "medium",
    category: "array",
    description: "Given an array with values 0, 1, and 2 representing red, white, and blue, sort them in-place so that objects of the same color are adjacent in the order 0, 1, 2.",
    examples: [{ input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]" }],
    constraints: ["n == nums.length", "0 <= nums[i] <= 2"],
    solution: `function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) { [nums[low], nums[mid]] = [nums[mid], nums[low]]; low++; mid++; }
    else if (nums[mid] === 1) mid++;
    else { [nums[mid], nums[high]] = [nums[high], nums[mid]]; high--; }
  }
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "dutch-national-flag"],
  },
  {
    title: "Next Permutation",
    slug: "next-permutation",
    difficulty: "medium",
    category: "array",
    description: "Given an array of integers nums, rearrange it into the next lexicographically greater permutation. If no such arrangement is possible, rearrange it to the lowest possible order.",
    examples: [{ input: "nums = [1,2,3]", output: "[1,3,2]" }],
    constraints: ["1 <= nums.length <= 100"],
    solution: `function nextPermutation(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let left = i + 1, right = nums.length - 1;
  while (left < right) { [nums[left], nums[right]] = [nums[right], nums[left]]; left++; right--; }
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["array", "two-pointers"],
  },
  {
    title: "Set Matrix Zeroes",
    slug: "set-matrix-zeroes",
    difficulty: "medium",
    category: "array",
    description: "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0 in-place.",
    examples: [{ input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" }],
    constraints: ["m == matrix.length", "n == matrix[0].length"],
    solution: `function setZeroes(matrix) {
  const rows = new Set(), cols = new Set();
  for (let i = 0; i < matrix.length; i++)
    for (let j = 0; j < matrix[0].length; j++)
      if (matrix[i][j] === 0) { rows.add(i); cols.add(j); }
  for (let i = 0; i < matrix.length; i++)
    for (let j = 0; j < matrix[0].length; j++)
      if (rows.has(i) || cols.has(j)) matrix[i][j] = 0;
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(m+n)", tags: ["array", "matrix"],
  },
  {
    title: "Spiral Matrix",
    slug: "spiral-matrix",
    difficulty: "medium",
    category: "array",
    description: "Given an m x n matrix, return all elements of the matrix in spiral order.",
    examples: [{ input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" }],
    constraints: ["m == matrix.length", "n == matrix[i].length"],
    solution: `function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;
    if (top <= bottom) { for (let i = right; i >= left; i--) result.push(matrix[bottom][i]); bottom--; }
    if (left <= right) { for (let i = bottom; i >= top; i--) result.push(matrix[i][left]); left++; }
  }
  return result;
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(1)", tags: ["array", "matrix"],
  },
  {
    title: "Rotate Image",
    slug: "rotate-image",
    difficulty: "medium",
    category: "array",
    description: "Given an n x n 2D matrix representing an image, rotate the image by 90 degrees clockwise in-place.",
    examples: [{ input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" }],
    constraints: ["n == matrix.length == matrix[i].length"],
    solution: `function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
  for (let i = 0; i < n; i++) matrix[i].reverse();
}`,
    timeComplexity: "O(n^2)", spaceComplexity: "O(1)", tags: ["array", "matrix"],
  },

  // ─────────────────────────────────────────
  // STRINGS (20)
  // ─────────────────────────────────────────
  {
    title: "Valid Anagram",
    slug: "valid-anagram",
    difficulty: "easy",
    category: "string",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    examples: [{ input: "s = \"anagram\", t = \"nagaram\"", output: "true" }],
    constraints: ["1 <= s.length, t.length <= 5 * 10^4"],
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
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["string", "hash-map"],
  },
  {
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "easy",
    category: "string",
    description: "A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.",
    examples: [{ input: "s = \"A man, a plan, a canal: Panama\"", output: "true" }],
    constraints: ["1 <= s.length <= 2 * 10^5"],
    solution: `function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++; right--;
  }
  return true;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["string", "two-pointers"],
  },
  {
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "medium",
    category: "string",
    description: "Given a string s, return the longest palindromic substring in s.",
    examples: [{ input: "s = \"babad\"", output: "\"bab\"" }],
    constraints: ["1 <= s.length <= 1000"],
    solution: `function longestPalindrome(s) {
  let start = 0, maxLen = 1;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
  };
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i + 1); }
  return s.substring(start, start + maxLen);
}`,
    timeComplexity: "O(n^2)", spaceComplexity: "O(1)", tags: ["string", "expand-around-center"],
  },
  {
    title: "Palindromic Substrings",
    slug: "palindromic-substrings",
    difficulty: "medium",
    category: "string",
    description: "Given a string s, return the number of palindromic substrings in it.",
    examples: [{ input: "s = \"abc\"", output: "3" }, { input: "s = \"aaa\"", output: "6" }],
    constraints: ["1 <= s.length <= 1000"],
    solution: `function countSubstrings(s) {
  let count = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { count++; l--; r++; }
  };
  for (let i = 0; i < s.length; i++) { expand(i, i); expand(i, i + 1); }
  return count;
}`,
    timeComplexity: "O(n^2)", spaceComplexity: "O(1)", tags: ["string", "expand-around-center"],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating",
    difficulty: "medium",
    category: "string",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [{ input: "s = \"abcabcbb\"", output: "3", explanation: "\"abc\" has length 3" }],
    constraints: ["0 <= s.length <= 5 * 10^4"],
    solution: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) left = map.get(s[right]) + 1;
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(min(m,n))", tags: ["string", "sliding-window", "hash-map"],
  },
  {
    title: "Minimum Window Substring",
    slug: "minimum-window-substring",
    difficulty: "hard",
    category: "string",
    description: "Given strings s and t, return the minimum window substring of s such that every character in t is included. If no such window exists, return empty string.",
    examples: [{ input: "s = \"ADOBECODEBANC\", t = \"ABC\"", output: "\"BANC\"" }],
    constraints: ["1 <= s.length, t.length <= 10^5"],
    solution: `function minWindow(s, t) {
  const need = new Map(), window = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let left = 0, valid = 0, start = 0, minLen = Infinity;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) valid++;
    while (valid === need.size) {
      if (right - left + 1 < minLen) { minLen = right - left + 1; start = left; }
      const d = s[left++];
      if (need.has(d) && window.get(d) === need.get(d)) valid--;
      window.set(d, window.get(d) - 1);
    }
  }
  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}`,
    timeComplexity: "O(s+t)", spaceComplexity: "O(s+t)", tags: ["string", "sliding-window", "hash-map"],
  },
  {
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: "medium",
    category: "string",
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    examples: [{ input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" }],
    constraints: ["1 <= strs.length <= 10^4"],
    solution: `function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return [...map.values()];
}`,
    timeComplexity: "O(n * k log k)", spaceComplexity: "O(n*k)", tags: ["string", "hash-map", "sorting"],
  },
  {
    title: "Encode and Decode Strings",
    slug: "encode-decode-strings",
    difficulty: "medium",
    category: "string",
    description: "Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and is decoded back to the original list of strings.",
    examples: [{ input: "[\"Hello\",\"World\"]", output: "\"Hello\",\"World\"" }],
    constraints: ["1 <= strs.length <= 200"],
    solution: `function encode(strs) {
  return strs.map(s => s.length + '#' + s).join('');
}
function decode(s) {
  const result = [];
  let i = 0;
  while (i < s.length) {
    let j = i;
    while (s[j] !== '#') j++;
    const len = parseInt(s.substring(i, j));
    result.push(s.substring(j + 1, j + 1 + len));
    i = j + 1 + len;
  }
  return result;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["string", "design"],
  },
  {
    title: "Longest Common Prefix",
    slug: "longest-common-prefix",
    difficulty: "easy",
    category: "string",
    description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
    examples: [{ input: "strs = [\"flower\",\"flow\",\"flight\"]", output: "\"fl\"" }],
    constraints: ["1 <= strs.length <= 200"],
    solution: `function longestCommonPrefix(strs) {
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++)
    while (!strs[i].startsWith(prefix)) prefix = prefix.slice(0, -1);
  return prefix;
}`,
    timeComplexity: "O(S)", spaceComplexity: "O(1)", tags: ["string"],
  },
  {
    title: "String to Integer (atoi)",
    slug: "string-to-integer-atoi",
    difficulty: "medium",
    category: "string",
    description: "Implement the atoi function which converts a string to an integer, handling leading whitespace, optional sign, and overflow.",
    examples: [{ input: "s = \"42\"", output: "42" }, { input: "s = \"   -42\"", output: "-42" }],
    constraints: ["0 <= s.length <= 200"],
    solution: `function myAtoi(s) {
  s = s.trimStart();
  let sign = 1, i = 0, result = 0;
  if (s[i] === '-' || s[i] === '+') sign = s[i++] === '-' ? -1 : 1;
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    result = result * 10 + parseInt(s[i++]);
    if (result * sign > 2147483647) return 2147483647;
    if (result * sign < -2147483648) return -2147483648;
  }
  return result * sign;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["string"],
  },
  {
    title: "Reverse Words in a String",
    slug: "reverse-words-in-a-string",
    difficulty: "medium",
    category: "string",
    description: "Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters.",
    examples: [{ input: "s = \"the sky is blue\"", output: "\"blue is sky the\"" }],
    constraints: ["1 <= s.length <= 10^4"],
    solution: `function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["string", "two-pointers"],
  },
  {
    title: "Implement strStr()",
    slug: "implement-strstr",
    difficulty: "easy",
    category: "string",
    description: "Given two strings haystack and needle, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
    examples: [{ input: "haystack = \"sadbutsad\", needle = \"sad\"", output: "0" }],
    constraints: ["1 <= haystack.length, needle.length <= 10^4"],
    solution: `function strStr(haystack, needle) {
  return haystack.indexOf(needle);
}`,
    timeComplexity: "O(n*m)", spaceComplexity: "O(1)", tags: ["string", "sliding-window"],
  },
  {
    title: "Count and Say",
    slug: "count-and-say",
    difficulty: "medium",
    category: "string",
    description: "The count-and-say sequence is a sequence of digit strings defined by a recursive formula. Given a positive integer n, return the n-th term of the count-and-say sequence.",
    examples: [{ input: "n = 4", output: "\"1211\"" }],
    constraints: ["1 <= n <= 30"],
    solution: `function countAndSay(n) {
  let s = '1';
  for (let i = 1; i < n; i++) {
    let next = '', j = 0;
    while (j < s.length) {
      let k = j;
      while (k < s.length && s[k] === s[j]) k++;
      next += (k - j) + s[j];
      j = k;
    }
    s = next;
  }
  return s;
}`,
    timeComplexity: "O(n * 2^n)", spaceComplexity: "O(2^n)", tags: ["string"],
  },
  {
    title: "Zigzag Conversion",
    slug: "zigzag-conversion",
    difficulty: "medium",
    category: "string",
    description: "The string \"PAYPALISHIRING\" is written in a zigzag pattern on a given number of rows. Given the string s and the number of rows numRows, return the string read line by line.",
    examples: [{ input: "s = \"PAYPALISHIRING\", numRows = 3", output: "\"PAHNAPLSIIGYIR\"" }],
    constraints: ["1 <= s.length <= 1000"],
    solution: `function convert(s, numRows) {
  if (numRows === 1) return s;
  const rows = Array.from({length: numRows}, () => '');
  let row = 0, going = -1;
  for (const c of s) {
    rows[row] += c;
    if (row === 0 || row === numRows - 1) going = -going;
    row += going;
  }
  return rows.join('');
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["string"],
  },
  {
    title: "Multiply Strings",
    slug: "multiply-strings",
    difficulty: "medium",
    category: "string",
    description: "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.",
    examples: [{ input: "num1 = \"2\", num2 = \"3\"", output: "\"6\"" }],
    constraints: ["1 <= num1.length, num2.length <= 200", "Neither input is 0 except for the number 0 itself"],
    solution: `function multiply(num1, num2) {
  const m = num1.length, n = num2.length, pos = new Array(m + n).fill(0);
  for (let i = m - 1; i >= 0; i--)
    for (let j = n - 1; j >= 0; j--) {
      const mul = (num1[i] - '0') * (num2[j] - '0');
      const p1 = i + j, p2 = i + j + 1, sum = mul + pos[p2];
      pos[p2] = sum % 10;
      pos[p1] += Math.floor(sum / 10);
    }
  return pos.join('').replace(/^0+/, '') || '0';
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(m+n)", tags: ["string", "math"],
  },
  {
    title: "Letter Combinations of a Phone Number",
    slug: "letter-combinations-phone-number",
    difficulty: "medium",
    category: "string",
    description: "Given a string containing digits from 2-9, return all possible letter combinations that the number could represent.",
    examples: [{ input: "digits = \"23\"", output: "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]" }],
    constraints: ["0 <= digits.length <= 4"],
    solution: `function letterCombinations(digits) {
  if (!digits) return [];
  const map = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'};
  const result = [];
  const bt = (i, curr) => {
    if (i === digits.length) { result.push(curr); return; }
    for (const c of map[digits[i]]) bt(i + 1, curr + c);
  };
  bt(0, '');
  return result;
}`,
    timeComplexity: "O(4^n * n)", spaceComplexity: "O(4^n * n)", tags: ["string", "backtracking"],
  },
  {
    title: "Longest Common Subsequence",
    slug: "longest-common-subsequence",
    difficulty: "medium",
    category: "string",
    description: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
    examples: [{ input: "text1 = \"abcde\", text2 = \"ace\"", output: "3" }],
    constraints: ["1 <= text1.length, text2.length <= 1000"],
    solution: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = text1[i-1] === text2[j-1] ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j], dp[i][j-1]);
  return dp[m][n];
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", tags: ["string", "dynamic-programming"],
  },
  {
    title: "Edit Distance",
    slug: "edit-distance",
    difficulty: "hard",
    category: "string",
    description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2 (insert, delete, replace).",
    examples: [{ input: "word1 = \"horse\", word2 = \"ros\"", output: "3" }],
    constraints: ["0 <= word1.length, word2.length <= 500"],
    solution: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({length: m+1}, (_, i) => Array.from({length: n+1}, (_, j) => i || j));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = word1[i-1] === word2[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", tags: ["string", "dynamic-programming"],
  },
  {
    title: "Regular Expression Matching",
    slug: "regular-expression-matching",
    difficulty: "hard",
    category: "string",
    description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'. '.' matches any single character. '*' matches zero or more of the preceding element.",
    examples: [{ input: "s = \"aa\", p = \"a*\"", output: "true" }],
    constraints: ["1 <= s.length <= 20", "1 <= p.length <= 30"],
    solution: `function isMatch(s, p) {
  const m = s.length, n = p.length;
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(false));
  dp[0][0] = true;
  for (let j = 1; j <= n; j++) if (p[j-1] === '*') dp[0][j] = dp[0][j-2];
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      if (p[j-1] === '*')
        dp[i][j] = dp[i][j-2] || ((p[j-2] === '.' || p[j-2] === s[i-1]) && dp[i-1][j]);
      else dp[i][j] = (p[j-1] === '.' || p[j-1] === s[i-1]) && dp[i-1][j-1];
    }
  return dp[m][n];
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", tags: ["string", "dynamic-programming"],
  },
  {
    title: "Word Break",
    slug: "word-break",
    difficulty: "medium",
    category: "string",
    description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    examples: [{ input: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]", output: "true" }],
    constraints: ["1 <= s.length <= 300"],
    solution: `function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++)
    for (let j = 0; j < i; j++)
      if (dp[j] && set.has(s.substring(j, i))) { dp[i] = true; break; }
  return dp[s.length];
}`,
    timeComplexity: "O(n^2)", spaceComplexity: "O(n)", tags: ["string", "dynamic-programming"],
  },

  // ─────────────────────────────────────────
  // LINKED LIST (15)
  // ─────────────────────────────────────────
  {
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "easy",
    category: "linked-list",
    description: "Given the head of a singly linked list, reverse the list and return the reversed list.",
    examples: [{ input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" }],
    constraints: ["0 <= number of nodes <= 5000"],
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
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["linked-list"],
  },
  {
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "easy",
    category: "linked-list",
    description: "Merge two sorted linked lists and return it as a sorted list.",
    examples: [{ input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" }],
    constraints: ["0 <= number of nodes <= 50"],
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
    timeComplexity: "O(n+m)", spaceComplexity: "O(1)", tags: ["linked-list"],
  },
  {
    title: "Linked List Cycle",
    slug: "linked-list-cycle",
    difficulty: "easy",
    category: "linked-list",
    description: "Given head of a linked list, determine if the linked list has a cycle in it.",
    examples: [{ input: "head = [3,2,0,-4], pos = 1", output: "true" }],
    constraints: ["0 <= number of nodes <= 10^4"],
    solution: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["linked-list", "floyd-cycle"],
  },
  {
    title: "Find The Duplicate Number",
    slug: "find-duplicate-number",
    difficulty: "medium",
    category: "linked-list",
    description: "Given an array nums containing n+1 integers where each integer is in range [1,n], find the one repeated number without modifying the array and using O(1) space.",
    examples: [{ input: "nums = [1,3,4,2,2]", output: "2" }],
    constraints: ["1 <= n <= 10^5"],
    solution: `function findDuplicate(nums) {
  let slow = nums[0], fast = nums[0];
  do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow !== fast);
  slow = nums[0];
  while (slow !== fast) { slow = nums[slow]; fast = nums[fast]; }
  return slow;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["linked-list", "floyd-cycle"],
  },
  {
    title: "Remove Nth Node From End of List",
    slug: "remove-nth-node-from-end",
    difficulty: "medium",
    category: "linked-list",
    description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    examples: [{ input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" }],
    constraints: ["1 <= n <= number of nodes"],
    solution: `function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy, slow = dummy;
  for (let i = 0; i <= n; i++) fast = fast.next;
  while (fast) { fast = fast.next; slow = slow.next; }
  slow.next = slow.next.next;
  return dummy.next;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["linked-list", "two-pointers"],
  },
  {
    title: "Reorder List",
    slug: "reorder-list",
    difficulty: "medium",
    category: "linked-list",
    description: "Given the head of a singly linked list L: L0 -> L1 -> ... -> Ln, reorder it to: L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...",
    examples: [{ input: "head = [1,2,3,4]", output: "[1,4,2,3]" }],
    constraints: ["1 <= number of nodes <= 5 * 10^4"],
    solution: `function reorderList(head) {
  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }
  let prev = null, curr = slow.next;
  slow.next = null;
  while (curr) { let next = curr.next; curr.next = prev; prev = curr; curr = next; }
  let first = head, second = prev;
  while (second) {
    let tmp1 = first.next, tmp2 = second.next;
    first.next = second; second.next = tmp1;
    first = tmp1; second = tmp2;
  }
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["linked-list", "two-pointers"],
  },
  {
    title: "LRU Cache",
    slug: "lru-cache",
    difficulty: "medium",
    category: "linked-list",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put operations.",
    examples: [{ input: "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)", output: "[null,null,null,1,null,-1]" }],
    constraints: ["1 <= capacity <= 3000"],
    solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value);
  }
}`,
    timeComplexity: "O(1)", spaceComplexity: "O(capacity)", tags: ["linked-list", "hash-map", "design"],
  },
  {
    title: "Merge K Sorted Lists",
    slug: "merge-k-sorted-lists",
    difficulty: "hard",
    category: "linked-list",
    description: "Given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    examples: [{ input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }],
    constraints: ["k == lists.length", "0 <= k <= 10^4"],
    solution: `function mergeKLists(lists) {
  const merge = (l1, l2) => {
    const dummy = new ListNode(0);
    let curr = dummy;
    while (l1 && l2) {
      if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
      else { curr.next = l2; l2 = l2.next; }
      curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
  };
  if (!lists.length) return null;
  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2)
      merged.push(merge(lists[i], lists[i+1] || null));
    lists = merged;
  }
  return lists[0];
}`,
    timeComplexity: "O(n log k)", spaceComplexity: "O(1)", tags: ["linked-list", "divide-and-conquer"],
  },
  {
    title: "Copy List with Random Pointer",
    slug: "copy-list-with-random-pointer",
    difficulty: "medium",
    category: "linked-list",
    description: "A linked list where each node has a random pointer that could point to any node in the list or null. Return a deep copy of the list.",
    examples: [{ input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]" }],
    constraints: ["0 <= n <= 1000"],
    solution: `function copyRandomList(head) {
  const map = new Map();
  let curr = head;
  while (curr) { map.set(curr, new Node(curr.val)); curr = curr.next; }
  curr = head;
  while (curr) {
    map.get(curr).next = map.get(curr.next) || null;
    map.get(curr).random = map.get(curr.random) || null;
    curr = curr.next;
  }
  return map.get(head);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["linked-list", "hash-map"],
  },
  {
    title: "Intersection of Two Linked Lists",
    slug: "intersection-two-linked-lists",
    difficulty: "easy",
    category: "linked-list",
    description: "Given the heads of two singly linked-lists, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.",
    examples: [{ input: "intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]", output: "Reference of node with value 8" }],
    constraints: ["The number of nodes in listA is m", "The number of nodes in listB is n"],
    solution: `function getIntersectionNode(headA, headB) {
  let a = headA, b = headB;
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  return a;
}`,
    timeComplexity: "O(m+n)", spaceComplexity: "O(1)", tags: ["linked-list", "two-pointers"],
  },
  {
    title: "Palindrome Linked List",
    slug: "palindrome-linked-list",
    difficulty: "easy",
    category: "linked-list",
    description: "Given the head of a singly linked list, return true if it is a palindrome or false otherwise.",
    examples: [{ input: "head = [1,2,2,1]", output: "true" }],
    constraints: ["1 <= number of nodes <= 10^5"],
    solution: `function isPalindrome(head) {
  const vals = [];
  let curr = head;
  while (curr) { vals.push(curr.val); curr = curr.next; }
  let left = 0, right = vals.length - 1;
  while (left < right) { if (vals[left++] !== vals[right--]) return false; }
  return true;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["linked-list", "two-pointers"],
  },
  {
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    difficulty: "medium",
    category: "linked-list",
    description: "Given two non-empty linked lists representing two non-negative integers stored in reverse order, add the two numbers and return the sum as a linked list.",
    examples: [{ input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807" }],
    constraints: ["1 <= number of nodes <= 100"],
    solution: `function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
    l1 = l1?.next; l2 = l2?.next;
  }
  return dummy.next;
}`,
    timeComplexity: "O(max(m,n))", spaceComplexity: "O(max(m,n))", tags: ["linked-list", "math"],
  },
  {
    title: "Sort List",
    slug: "sort-list",
    difficulty: "medium",
    category: "linked-list",
    description: "Given the head of a linked list, return the list after sorting it in ascending order.",
    examples: [{ input: "head = [4,2,1,3]", output: "[1,2,3,4]" }],
    constraints: ["0 <= number of nodes <= 5 * 10^4"],
    solution: `function sortList(head) {
  if (!head || !head.next) return head;
  let slow = head, fast = head.next;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  const mid = slow.next; slow.next = null;
  const merge = (l1, l2) => {
    const dummy = new ListNode(0); let curr = dummy;
    while (l1 && l2) {
      if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
      else { curr.next = l2; l2 = l2.next; }
      curr = curr.next;
    }
    curr.next = l1 || l2;
    return dummy.next;
  };
  return merge(sortList(head), sortList(mid));
}`,
    timeComplexity: "O(n log n)", spaceComplexity: "O(log n)", tags: ["linked-list", "merge-sort"],
  },
  {
    title: "Rotate List",
    slug: "rotate-list",
    difficulty: "medium",
    category: "linked-list",
    description: "Given the head of a linked list, rotate the list to the right by k places.",
    examples: [{ input: "head = [1,2,3,4,5], k = 2", output: "[4,5,1,2,3]" }],
    constraints: ["0 <= k <= 2 * 10^9"],
    solution: `function rotateRight(head, k) {
  if (!head) return head;
  let len = 1, tail = head;
  while (tail.next) { tail = tail.next; len++; }
  k = k % len;
  if (k === 0) return head;
  tail.next = head;
  let curr = head;
  for (let i = 0; i < len - k - 1; i++) curr = curr.next;
  const newHead = curr.next;
  curr.next = null;
  return newHead;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["linked-list", "two-pointers"],
  },
  {
    title: "Flatten a Multilevel Doubly Linked List",
    slug: "flatten-multilevel-doubly-linked-list",
    difficulty: "medium",
    category: "linked-list",
    description: "Given the head of the first level of a multilevel doubly linked list, flatten the list so that all the nodes appear in a single-level doubly linked list.",
    examples: [{ input: "head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]", output: "[1,2,3,7,8,11,12,9,10,4,5,6]" }],
    constraints: ["The number of nodes is in range [0, 1000]"],
    solution: `function flatten(head) {
  let curr = head;
  while (curr) {
    if (curr.child) {
      const child = curr.child;
      const next = curr.next;
      curr.next = child; child.prev = curr; curr.child = null;
      let tail = child;
      while (tail.next) tail = tail.next;
      tail.next = next; if (next) next.prev = tail;
    }
    curr = curr.next;
  }
  return head;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["linked-list"],
  },

  // ─────────────────────────────────────────
  // TREES (20)
  // ─────────────────────────────────────────
  {
    title: "Invert Binary Tree",
    slug: "invert-binary-tree",
    difficulty: "easy",
    category: "tree",
    description: "Given the root of a binary tree, invert the tree, and return its root.",
    examples: [{ input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }],
    constraints: ["0 <= number of nodes <= 100"],
    solution: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "recursion"],
  },
  {
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-binary-tree",
    difficulty: "easy",
    category: "tree",
    description: "Given the root of a binary tree, return its maximum depth.",
    examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "3" }],
    constraints: ["0 <= number of nodes <= 10^4"],
    solution: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "recursion", "dfs"],
  },
  {
    title: "Same Tree",
    slug: "same-tree",
    difficulty: "easy",
    category: "tree",
    description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not.",
    examples: [{ input: "p = [1,2,3], q = [1,2,3]", output: "true" }],
    constraints: ["0 <= number of nodes <= 100"],
    solution: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "recursion"],
  },
  {
    title: "Subtree of Another Tree",
    slug: "subtree-of-another-tree",
    difficulty: "easy",
    category: "tree",
    description: "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values as subRoot.",
    examples: [{ input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" }],
    constraints: ["1 <= number of nodes in root <= 2000"],
    solution: `function isSubtree(root, subRoot) {
  if (!root) return false;
  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(h)", tags: ["tree", "recursion"],
  },
  {
    title: "Lowest Common Ancestor of BST",
    slug: "lowest-common-ancestor-bst",
    difficulty: "medium",
    category: "tree",
    description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    examples: [{ input: "root = [6,2,8,0,4,7,9], p = 2, q = 8", output: "6" }],
    constraints: ["2 <= number of nodes <= 10^5"],
    solution: `function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) root = root.left;
    else if (p.val > root.val && q.val > root.val) root = root.right;
    else return root;
  }
}`,
    timeComplexity: "O(h)", spaceComplexity: "O(1)", tags: ["tree", "bst"],
  },
  {
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    difficulty: "medium",
    category: "tree",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" }],
    constraints: ["0 <= number of nodes <= 2000"],
    solution: `function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const level = [], size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["tree", "bfs"],
  },
  {
    title: "Binary Tree Right Side View",
    slug: "binary-tree-right-side-view",
    difficulty: "medium",
    category: "tree",
    description: "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
    examples: [{ input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]" }],
    constraints: ["0 <= number of nodes <= 100"],
    solution: `function rightSideView(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["tree", "bfs"],
  },
  {
    title: "Count Good Nodes in Binary Tree",
    slug: "count-good-nodes-binary-tree",
    difficulty: "medium",
    category: "tree",
    description: "Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.",
    examples: [{ input: "root = [3,1,4,3,null,1,5]", output: "4" }],
    constraints: ["1 <= number of nodes <= 10^5"],
    solution: `function goodNodes(root) {
  const dfs = (node, maxVal) => {
    if (!node) return 0;
    const good = node.val >= maxVal ? 1 : 0;
    const newMax = Math.max(maxVal, node.val);
    return good + dfs(node.left, newMax) + dfs(node.right, newMax);
  };
  return dfs(root, -Infinity);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "dfs"],
  },
  {
    title: "Validate Binary Search Tree",
    slug: "validate-binary-search-tree",
    difficulty: "medium",
    category: "tree",
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    examples: [{ input: "root = [2,1,3]", output: "true" }],
    constraints: ["1 <= number of nodes <= 10^4"],
    solution: `function isValidBST(root) {
  const validate = (node, min, max) => {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  };
  return validate(root, -Infinity, Infinity);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "bst", "dfs"],
  },
  {
    title: "Kth Smallest Element in BST",
    slug: "kth-smallest-element-bst",
    difficulty: "medium",
    category: "tree",
    description: "Given the root of a binary search tree, and an integer k, return the kth smallest value of all the values of the nodes in the tree.",
    examples: [{ input: "root = [3,1,4,null,2], k = 1", output: "1" }],
    constraints: ["1 <= k <= number of nodes <= 10^4"],
    solution: `function kthSmallest(root, k) {
  let count = 0, result = 0;
  const inorder = (node) => {
    if (!node) return;
    inorder(node.left);
    if (++count === k) { result = node.val; return; }
    inorder(node.right);
  };
  inorder(root);
  return result;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "bst", "dfs"],
  },
  {
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    slug: "construct-binary-tree-preorder-inorder",
    difficulty: "medium",
    category: "tree",
    description: "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
    examples: [{ input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]" }],
    constraints: ["1 <= preorder.length <= 3000"],
    solution: `function buildTree(preorder, inorder) {
  if (!preorder.length) return null;
  const root = new TreeNode(preorder[0]);
  const mid = inorder.indexOf(preorder[0]);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
}`,
    timeComplexity: "O(n^2)", spaceComplexity: "O(n)", tags: ["tree", "recursion"],
  },
  {
    title: "Binary Tree Maximum Path Sum",
    slug: "binary-tree-maximum-path-sum",
    difficulty: "hard",
    category: "tree",
    description: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. Given the root of a binary tree, return the maximum path sum.",
    examples: [{ input: "root = [-10,9,20,null,null,15,7]", output: "42" }],
    constraints: ["1 <= number of nodes <= 3 * 10^4"],
    solution: `function maxPathSum(root) {
  let maxSum = -Infinity;
  const dfs = (node) => {
    if (!node) return 0;
    const left = Math.max(dfs(node.left), 0);
    const right = Math.max(dfs(node.right), 0);
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
  };
  dfs(root);
  return maxSum;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "dfs"],
  },
  {
    title: "Serialize and Deserialize Binary Tree",
    slug: "serialize-deserialize-binary-tree",
    difficulty: "hard",
    category: "tree",
    description: "Design an algorithm to serialize and deserialize a binary tree.",
    examples: [{ input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" }],
    constraints: ["0 <= number of nodes <= 10^4"],
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
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["tree", "dfs"],
  },
  {
    title: "Diameter of Binary Tree",
    slug: "diameter-binary-tree",
    difficulty: "easy",
    category: "tree",
    description: "Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes.",
    examples: [{ input: "root = [1,2,3,4,5]", output: "3" }],
    constraints: ["1 <= number of nodes <= 10^4"],
    solution: `function diameterOfBinaryTree(root) {
  let maxDiameter = 0;
  const dfs = (node) => {
    if (!node) return 0;
    const left = dfs(node.left), right = dfs(node.right);
    maxDiameter = Math.max(maxDiameter, left + right);
    return 1 + Math.max(left, right);
  };
  dfs(root);
  return maxDiameter;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "dfs"],
  },
  {
    title: "Balanced Binary Tree",
    slug: "balanced-binary-tree",
    difficulty: "easy",
    category: "tree",
    description: "Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.",
    examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "true" }],
    constraints: ["0 <= number of nodes <= 5000"],
    solution: `function isBalanced(root) {
  const height = (node) => {
    if (!node) return 0;
    const left = height(node.left), right = height(node.right);
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  };
  return height(root) !== -1;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "dfs"],
  },
  {
    title: "Path Sum",
    slug: "path-sum",
    difficulty: "easy",
    category: "tree",
    description: "Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.",
    examples: [{ input: "root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22", output: "true" }],
    constraints: ["0 <= number of nodes <= 5000"],
    solution: `function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "dfs"],
  },
  {
    title: "Flatten Binary Tree to Linked List",
    slug: "flatten-binary-tree-linked-list",
    difficulty: "medium",
    category: "tree",
    description: "Given the root of a binary tree, flatten the tree into a linked list in-place in the order of preorder traversal.",
    examples: [{ input: "root = [1,2,5,3,4,null,6]", output: "[1,null,2,null,3,null,4,null,5,null,6]" }],
    constraints: ["0 <= number of nodes <= 2000"],
    solution: `function flatten(root) {
  let curr = root;
  while (curr) {
    if (curr.left) {
      let rightmost = curr.left;
      while (rightmost.right) rightmost = rightmost.right;
      rightmost.right = curr.right;
      curr.right = curr.left;
      curr.left = null;
    }
    curr = curr.right;
  }
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["tree", "dfs"],
  },
  {
    title: "Populating Next Right Pointers",
    slug: "populating-next-right-pointers",
    difficulty: "medium",
    category: "tree",
    description: "Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.",
    examples: [{ input: "root = [1,2,3,4,5,6,7]", output: "[1,#,2,3,#,4,5,6,7,#]" }],
    constraints: ["0 <= number of nodes <= 2^12 - 1"],
    solution: `function connect(root) {
  if (!root) return root;
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i < size - 1) node.next = queue[0];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return root;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["tree", "bfs"],
  },
  {
    title: "Symmetric Tree",
    slug: "symmetric-tree",
    difficulty: "easy",
    category: "tree",
    description: "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
    examples: [{ input: "root = [1,2,2,3,4,4,3]", output: "true" }],
    constraints: ["1 <= number of nodes <= 1000"],
    solution: `function isSymmetric(root) {
  const mirror = (left, right) => {
    if (!left && !right) return true;
    if (!left || !right || left.val !== right.val) return false;
    return mirror(left.left, right.right) && mirror(left.right, right.left);
  };
  return mirror(root.left, root.right);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(h)", tags: ["tree", "recursion"],
  },
  {
    title: "Convert Sorted Array to BST",
    slug: "convert-sorted-array-to-bst",
    difficulty: "easy",
    category: "tree",
    description: "Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.",
    examples: [{ input: "nums = [-10,-3,0,5,9]", output: "[0,-3,9,-10,null,5]" }],
    constraints: ["1 <= nums.length <= 10^4"],
    solution: `function sortedArrayToBST(nums) {
  if (!nums.length) return null;
  const mid = Math.floor(nums.length / 2);
  const root = new TreeNode(nums[mid]);
  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));
  return root;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(log n)", tags: ["tree", "bst", "divide-and-conquer"],
  },

  // ─────────────────────────────────────────
  // GRAPHS (15)
  // ─────────────────────────────────────────
  {
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "medium",
    category: "graph",
    description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    examples: [{ input: "grid = [[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]", output: "2" }],
    constraints: ["1 <= m, n <= 300"],
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
    timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", tags: ["graph", "dfs", "bfs"],
  },
  {
    title: "Clone Graph",
    slug: "clone-graph",
    difficulty: "medium",
    category: "graph",
    description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    examples: [{ input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]" }],
    constraints: ["0 <= number of nodes <= 100"],
    solution: `function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();
  const dfs = (n) => {
    if (map.has(n)) return map.get(n);
    const clone = new Node(n.val);
    map.set(n, clone);
    for (const neighbor of n.neighbors) clone.neighbors.push(dfs(neighbor));
    return clone;
  };
  return dfs(node);
}`,
    timeComplexity: "O(V+E)", spaceComplexity: "O(V)", tags: ["graph", "dfs", "hash-map"],
  },
  {
    title: "Pacific Atlantic Water Flow",
    slug: "pacific-atlantic-water-flow",
    difficulty: "medium",
    category: "graph",
    description: "Given an m x n matrix of heights, return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.",
    examples: [{ input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" }],
    constraints: ["m == heights.length", "n == heights[r].length"],
    solution: `function pacificAtlantic(heights) {
  const m = heights.length, n = heights[0].length;
  const bfs = (starts) => {
    const visited = new Set(starts.map(([r,c]) => r*n+c));
    const queue = [...starts];
    while (queue.length) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]]) {
        const nr = r+dr, nc = c+dc;
        if (nr>=0 && nr<m && nc>=0 && nc<n && !visited.has(nr*n+nc) && heights[nr][nc] >= heights[r][c]) {
          visited.add(nr*n+nc); queue.push([nr,nc]);
        }
      }
    }
    return visited;
  };
  const pacific = bfs([...Array(m).keys()].map(r => [r,0]).concat([...Array(n).keys()].map(c => [0,c])));
  const atlantic = bfs([...Array(m).keys()].map(r => [r,n-1]).concat([...Array(n).keys()].map(c => [m-1,c])));
  return [...pacific].filter(k => atlantic.has(k)).map(k => [Math.floor(k/n), k%n]);
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", tags: ["graph", "bfs", "dfs"],
  },
  {
    title: "Course Schedule",
    slug: "course-schedule",
    difficulty: "medium",
    category: "graph",
    description: "Given numCourses and prerequisites, determine if you can finish all courses (detect cycle in directed graph).",
    examples: [{ input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" }],
    constraints: ["1 <= numCourses <= 2000"],
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
    timeComplexity: "O(V+E)", spaceComplexity: "O(V+E)", tags: ["graph", "topological-sort"],
  },
  {
    title: "Course Schedule II",
    slug: "course-schedule-ii",
    difficulty: "medium",
    category: "graph",
    description: "Return the ordering of courses you should take to finish all courses. If it is impossible to finish all courses, return an empty array.",
    examples: [{ input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", output: "[0,2,1,3]" }],
    constraints: ["1 <= numCourses <= 2000"],
    solution: `function findOrder(numCourses, prerequisites) {
  const graph = Array.from({length: numCourses}, () => []);
  const visited = new Array(numCourses).fill(0);
  const order = [];
  for (const [a, b] of prerequisites) graph[b].push(a);
  const dfs = (node) => {
    if (visited[node] === 1) return false;
    if (visited[node] === 2) return true;
    visited[node] = 1;
    for (const nei of graph[node]) if (!dfs(nei)) return false;
    visited[node] = 2;
    order.push(node);
    return true;
  };
  for (let i = 0; i < numCourses; i++) if (!dfs(i)) return [];
  return order.reverse();
}`,
    timeComplexity: "O(V+E)", spaceComplexity: "O(V+E)", tags: ["graph", "topological-sort"],
  },
  {
    title: "Graph Valid Tree",
    slug: "graph-valid-tree",
    difficulty: "medium",
    category: "graph",
    description: "Given n nodes labeled from 0 to n-1 and a list of undirected edges, write a function to check whether these edges make up a valid tree.",
    examples: [{ input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", output: "true" }],
    constraints: ["1 <= n <= 2000"],
    solution: `function validTree(n, edges) {
  if (edges.length !== n - 1) return false;
  const parent = Array.from({length: n}, (_, i) => i);
  const find = (x) => parent[x] === x ? x : (parent[x] = find(parent[x]));
  for (const [a, b] of edges) {
    const pa = find(a), pb = find(b);
    if (pa === pb) return false;
    parent[pa] = pb;
  }
  return true;
}`,
    timeComplexity: "O(E*alpha(n))", spaceComplexity: "O(n)", tags: ["graph", "union-find"],
  },
  {
    title: "Number of Connected Components",
    slug: "number-connected-components",
    difficulty: "medium",
    category: "graph",
    description: "Given n nodes labeled 0 to n-1 and a list of undirected edges, return the number of connected components in the graph.",
    examples: [{ input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2" }],
    constraints: ["1 <= n <= 2000"],
    solution: `function countComponents(n, edges) {
  const parent = Array.from({length: n}, (_, i) => i);
  const find = (x) => parent[x] === x ? x : (parent[x] = find(parent[x]));
  let components = n;
  for (const [a, b] of edges) {
    const pa = find(a), pb = find(b);
    if (pa !== pb) { parent[pa] = pb; components--; }
  }
  return components;
}`,
    timeComplexity: "O(E*alpha(n))", spaceComplexity: "O(n)", tags: ["graph", "union-find"],
  },
  {
    title: "Alien Dictionary",
    slug: "alien-dictionary",
    difficulty: "hard",
    category: "graph",
    description: "Given a sorted dictionary of an alien language, find the order of characters in the alien language.",
    examples: [{ input: "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]", output: "\"wertf\"" }],
    constraints: ["1 <= words.length <= 100"],
    solution: `function alienOrder(words) {
  const graph = new Map();
  for (const w of words) for (const c of w) if (!graph.has(c)) graph.set(c, new Set());
  for (let i = 0; i < words.length - 1; i++) {
    const [w1, w2] = [words[i], words[i+1]];
    const minLen = Math.min(w1.length, w2.length);
    if (w1.length > w2.length && w1.startsWith(w2)) return "";
    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) { graph.get(w1[j]).add(w2[j]); break; }
    }
  }
  const visited = new Map(), result = [];
  const dfs = (c) => {
    if (visited.has(c)) return visited.get(c);
    visited.set(c, false);
    for (const nei of graph.get(c)) if (!dfs(nei)) return false;
    visited.set(c, true); result.push(c);
    return true;
  };
  for (const c of graph.keys()) if (!dfs(c)) return "";
  return result.reverse().join('');
}`,
    timeComplexity: "O(C)", spaceComplexity: "O(1)", tags: ["graph", "topological-sort"],
  },
  {
    title: "Word Search",
    slug: "word-search",
    difficulty: "medium",
    category: "graph",
    description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid.",
    examples: [{ input: "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"", output: "true" }],
    constraints: ["1 <= m, n <= 6"],
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
    timeComplexity: "O(m*n*4^L)", spaceComplexity: "O(L)", tags: ["graph", "backtracking", "dfs"],
  },
  {
    title: "Walls and Gates",
    slug: "walls-and-gates",
    difficulty: "medium",
    category: "graph",
    description: "Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, leave it filled with INF.",
    examples: [{ input: "rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]", output: "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]" }],
    constraints: ["m == rooms.length", "n == rooms[i].length"],
    solution: `function wallsAndGates(rooms) {
  const INF = 2147483647;
  const queue = [];
  for (let i = 0; i < rooms.length; i++)
    for (let j = 0; j < rooms[0].length; j++)
      if (rooms[i][j] === 0) queue.push([i, j]);
  while (queue.length) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]]) {
      const nr = r+dr, nc = c+dc;
      if (nr>=0 && nr<rooms.length && nc>=0 && nc<rooms[0].length && rooms[nr][nc] === INF) {
        rooms[nr][nc] = rooms[r][c] + 1; queue.push([nr, nc]);
      }
    }
  }
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", tags: ["graph", "bfs"],
  },
  {
    title: "Rotting Oranges",
    slug: "rotting-oranges",
    difficulty: "medium",
    category: "graph",
    description: "Given a grid where 0 = empty, 1 = fresh orange, 2 = rotten orange. Every minute, fresh oranges adjacent to rotten ones become rotten. Return the minimum minutes until no fresh orange remains, or -1 if impossible.",
    examples: [{ input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4" }],
    constraints: ["m == grid.length", "n == grid[i].length"],
    solution: `function orangesRotting(grid) {
  const queue = [], m = grid.length, n = grid[0].length;
  let fresh = 0;
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) queue.push([i, j, 0]);
      if (grid[i][j] === 1) fresh++;
    }
  let minutes = 0;
  while (queue.length) {
    const [r, c, t] = queue.shift();
    for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]]) {
      const nr = r+dr, nc = c+dc;
      if (nr>=0 && nr<m && nc>=0 && nc<n && grid[nr][nc] === 1) {
        grid[nr][nc] = 2; fresh--; minutes = t + 1; queue.push([nr, nc, t+1]);
      }
    }
  }
  return fresh === 0 ? minutes : -1;
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", tags: ["graph", "bfs"],
  },
  {
    title: "Surrounded Regions",
    slug: "surrounded-regions",
    difficulty: "medium",
    category: "graph",
    description: "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'. A region is captured by flipping all 'O's into 'X's in that surrounded region.",
    examples: [{ input: "board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]", output: "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]" }],
    constraints: ["m == board.length", "n == board[i].length"],
    solution: `function solve(board) {
  const m = board.length, n = board[0].length;
  const dfs = (i, j) => {
    if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] !== 'O') return;
    board[i][j] = 'S';
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  };
  for (let i = 0; i < m; i++) { dfs(i, 0); dfs(i, n-1); }
  for (let j = 0; j < n; j++) { dfs(0, j); dfs(m-1, j); }
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      board[i][j] = board[i][j] === 'S' ? 'O' : 'X';
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", tags: ["graph", "dfs"],
  },
  {
    title: "Network Delay Time",
    slug: "network-delay-time",
    difficulty: "medium",
    category: "graph",
    description: "Given a network of n nodes and directed edges with travel times, find the minimum time for all nodes to receive a signal sent from node k. Return -1 if impossible.",
    examples: [{ input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", output: "2" }],
    constraints: ["1 <= k <= n <= 100"],
    solution: `function networkDelayTime(times, n, k) {
  const graph = new Map();
  for (const [u, v, w] of times) {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u).push([v, w]);
  }
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const minHeap = [[0, k]];
  while (minHeap.length) {
    minHeap.sort((a, b) => a[0] - b[0]);
    const [d, u] = minHeap.shift();
    if (d > dist[u]) continue;
    for (const [v, w] of (graph.get(u) || [])) {
      if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; minHeap.push([dist[v], v]); }
    }
  }
  const maxDist = Math.max(...dist.slice(1));
  return maxDist === Infinity ? -1 : maxDist;
}`,
    timeComplexity: "O(E log V)", spaceComplexity: "O(V+E)", tags: ["graph", "dijkstra"],
  },
  {
    title: "Cheapest Flights Within K Stops",
    slug: "cheapest-flights-within-k-stops",
    difficulty: "medium",
    category: "graph",
    description: "Given n cities, flights between them with prices, source src, destination dst, and max k stops, find the cheapest price from src to dst with at most k stops.",
    examples: [{ input: "n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1", output: "700" }],
    constraints: ["1 <= n <= 100"],
    solution: `function findCheapestPrice(n, flights, src, dst, k) {
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;
  for (let i = 0; i <= k; i++) {
    const temp = [...prices];
    for (const [u, v, w] of flights)
      if (prices[u] !== Infinity && prices[u] + w < temp[v])
        temp[v] = prices[u] + w;
    prices = temp;
  }
  return prices[dst] === Infinity ? -1 : prices[dst];
}`,
    timeComplexity: "O(k*E)", spaceComplexity: "O(n)", tags: ["graph", "bellman-ford"],
  },
  {
    title: "Max Area of Island",
    slug: "max-area-of-island",
    difficulty: "medium",
    category: "graph",
    description: "Given a binary matrix grid, return the maximum area of an island in grid. An island is a group of 1s connected 4-directionally.",
    examples: [{ input: "grid = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[0,1,1,1,0]]", output: "4" }],
    constraints: ["m == grid.length", "n == grid[i].length"],
    solution: `function maxAreaOfIsland(grid) {
  let maxArea = 0;
  const dfs = (i, j) => {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === 0) return 0;
    grid[i][j] = 0;
    return 1 + dfs(i+1,j) + dfs(i-1,j) + dfs(i,j+1) + dfs(i,j-1);
  };
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++)
      maxArea = Math.max(maxArea, dfs(i, j));
  return maxArea;
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", tags: ["graph", "dfs"],
  },

  // ─────────────────────────────────────────
  // DYNAMIC PROGRAMMING (25)
  // ─────────────────────────────────────────
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "easy",
    category: "dynamic-programming",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [{ input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" }],
    constraints: ["1 <= n <= 45"],
    solution: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) { [a, b] = [b, a + b]; }
  return b;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["dynamic-programming", "fibonacci"],
  },
  {
    title: "House Robber",
    slug: "house-robber",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given an array representing the amount of money in each house, return the maximum amount you can rob without alerting police (no two adjacent houses).",
    examples: [{ input: "nums = [2,7,9,3,1]", output: "12" }],
    constraints: ["1 <= nums.length <= 100"],
    solution: `function rob(nums) {
  let prev = 0, curr = 0;
  for (const num of nums) { [prev, curr] = [curr, Math.max(curr, prev + num)]; }
  return curr;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["dynamic-programming"],
  },
  {
    title: "House Robber II",
    slug: "house-robber-ii",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Houses are arranged in a circle. No two adjacent houses can be robbed. Return the maximum amount you can rob.",
    examples: [{ input: "nums = [2,3,2]", output: "3" }],
    constraints: ["1 <= nums.length <= 100"],
    solution: `function rob(nums) {
  if (nums.length === 1) return nums[0];
  const robRange = (start, end) => {
    let prev = 0, curr = 0;
    for (let i = start; i <= end; i++) { [prev, curr] = [curr, Math.max(curr, prev + nums[i])]; }
    return curr;
  };
  return Math.max(robRange(0, nums.length - 2), robRange(1, nums.length - 1));
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["dynamic-programming"],
  },
  {
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given an array of coins and an amount, return the fewest number of coins needed to make up that amount. If not possible, return -1.",
    examples: [{ input: "coins = [1,5,11], amount = 11", output: "3" }],
    constraints: ["1 <= coins.length <= 12"],
    solution: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++)
    for (const coin of coins)
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    timeComplexity: "O(amount * coins)", spaceComplexity: "O(amount)", tags: ["dynamic-programming"],
  },
  {
    title: "Coin Change 2",
    slug: "coin-change-2",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given an array of coins and an amount, return the number of combinations that make up that amount.",
    examples: [{ input: "amount = 5, coins = [1,2,5]", output: "4" }],
    constraints: ["1 <= coins.length <= 300"],
    solution: `function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const coin of coins)
    for (let i = coin; i <= amount; i++)
      dp[i] += dp[i - coin];
  return dp[amount];
}`,
    timeComplexity: "O(amount * coins)", spaceComplexity: "O(amount)", tags: ["dynamic-programming", "knapsack"],
  },
  {
    title: "Unique Paths",
    slug: "unique-paths",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "A robot is located at the top-left corner of an m x n grid. The robot can only move either down or right. How many possible unique paths are there?",
    examples: [{ input: "m = 3, n = 7", output: "28" }],
    constraints: ["1 <= m, n <= 100"],
    solution: `function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++)
      dp[j] += dp[j - 1];
  return dp[n - 1];
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(n)", tags: ["dynamic-programming"],
  },
  {
    title: "Unique Paths II",
    slug: "unique-paths-ii",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "A robot moves in an m x n grid with obstacles. Return the number of unique paths from top-left to bottom-right.",
    examples: [{ input: "obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]", output: "2" }],
    constraints: ["1 <= m, n <= 100"],
    solution: `function uniquePathsWithObstacles(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = new Array(n).fill(0);
  dp[0] = 1;
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 1) dp[0] = 0;
    for (let j = 1; j < n; j++)
      dp[j] = grid[i][j] === 1 ? 0 : dp[j] + dp[j-1];
  }
  return dp[n-1];
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(n)", tags: ["dynamic-programming"],
  },
  {
    title: "Longest Increasing Subsequence",
    slug: "longest-increasing-subsequence",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    examples: [{ input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "[2,3,7,101]" }],
    constraints: ["1 <= nums.length <= 2500"],
    solution: `function lengthOfLIS(nums) {
  const tails = [];
  for (const num of nums) {
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = (left + right) >> 1;
      tails[mid] < num ? left = mid + 1 : right = mid;
    }
    tails[left] = num;
  }
  return tails.length;
}`,
    timeComplexity: "O(n log n)", spaceComplexity: "O(n)", tags: ["dynamic-programming", "binary-search"],
  },
  {
    title: "Decode Ways",
    slug: "decode-ways",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given a string s containing digits, return the number of ways to decode it (A='1', B='2', ..., Z='26').",
    examples: [{ input: "s = \"226\"", output: "3", explanation: "BZ, VF, BBF" }],
    constraints: ["1 <= s.length <= 100"],
    solution: `function numDecodings(s) {
  if (s[0] === '0') return 0;
  let prev = 1, curr = 1;
  for (let i = 1; i < s.length; i++) {
    let next = s[i] === '0' ? 0 : curr;
    const twoDigit = parseInt(s.substring(i - 1, i + 1));
    if (twoDigit >= 10 && twoDigit <= 26) next += prev;
    [prev, curr] = [curr, next];
  }
  return curr;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["dynamic-programming"],
  },
  {
    title: "0/1 Knapsack",
    slug: "zero-one-knapsack",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given weights and values of n items and a knapsack capacity, find the maximum value you can put in the knapsack. Each item can only be used once.",
    examples: [{ input: "weights = [1,3,4,5], values = [1,4,5,7], capacity = 7", output: "9" }],
    constraints: ["1 <= n <= 1000", "1 <= capacity <= 1000"],
    solution: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < n; i++)
    for (let w = capacity; w >= weights[i]; w--)
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
  return dp[capacity];
}`,
    timeComplexity: "O(n*capacity)", spaceComplexity: "O(capacity)", tags: ["dynamic-programming", "knapsack"],
  },
  {
    title: "Partition Equal Subset Sum",
    slug: "partition-equal-subset-sum",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.",
    examples: [{ input: "nums = [1,5,11,5]", output: "true", explanation: "[1,5,5] and [11]" }],
    constraints: ["1 <= nums.length <= 200"],
    solution: `function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums)
    for (let j = target; j >= num; j--)
      dp[j] = dp[j] || dp[j - num];
  return dp[target];
}`,
    timeComplexity: "O(n*sum)", spaceComplexity: "O(sum)", tags: ["dynamic-programming", "knapsack"],
  },
  {
    title: "Target Sum",
    slug: "target-sum",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given an array of integers nums and an integer target, build an expression by adding + or - before each number. Return the number of ways to reach target.",
    examples: [{ input: "nums = [1,1,1,1,1], target = 3", output: "5" }],
    constraints: ["1 <= nums.length <= 20"],
    solution: `function findTargetSumWays(nums, target) {
  const map = new Map([[0, 1]]);
  for (const num of nums) {
    const next = new Map();
    for (const [sum, count] of map) {
      next.set(sum + num, (next.get(sum + num) || 0) + count);
      next.set(sum - num, (next.get(sum - num) || 0) + count);
    }
    map.clear(); for (const [k, v] of next) map.set(k, v);
  }
  return map.get(target) || 0;
}`,
    timeComplexity: "O(n*sum)", spaceComplexity: "O(sum)", tags: ["dynamic-programming", "dfs"],
  },
  {
    title: "Interleaving String",
    slug: "interleaving-string",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given strings s1, s2, and s3, determine if s3 is formed by an interleaving of s1 and s2.",
    examples: [{ input: "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"", output: "true" }],
    constraints: ["0 <= s1.length, s2.length <= 100"],
    solution: `function isInterleave(s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) return false;
  const dp = new Array(s2.length + 1).fill(false);
  for (let j = 0; j <= s2.length; j++) dp[j] = s2.substring(0, j) === s3.substring(0, j);
  for (let i = 1; i <= s1.length; i++) {
    dp[0] = dp[0] && s1[i-1] === s3[i-1];
    for (let j = 1; j <= s2.length; j++)
      dp[j] = (dp[j] && s1[i-1] === s3[i+j-1]) || (dp[j-1] && s2[j-1] === s3[i+j-1]);
  }
  return dp[s2.length];
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(n)", tags: ["dynamic-programming"],
  },
  {
    title: "Burst Balloons",
    slug: "burst-balloons",
    difficulty: "hard",
    category: "dynamic-programming",
    description: "Given n balloons with numbers, burst all balloons to maximize coins. Bursting balloon i earns nums[left]*nums[i]*nums[right] coins.",
    examples: [{ input: "nums = [3,1,5,8]", output: "167" }],
    constraints: ["n == nums.length", "1 <= n <= 300"],
    solution: `function maxCoins(nums) {
  nums = [1, ...nums, 1];
  const n = nums.length;
  const dp = Array.from({length: n}, () => new Array(n).fill(0));
  for (let len = 2; len < n; len++)
    for (let left = 0; left < n - len; left++) {
      const right = left + len;
      for (let k = left + 1; k < right; k++)
        dp[left][right] = Math.max(dp[left][right], dp[left][k] + nums[left]*nums[k]*nums[right] + dp[k][right]);
    }
  return dp[0][n-1];
}`,
    timeComplexity: "O(n^3)", spaceComplexity: "O(n^2)", tags: ["dynamic-programming"],
  },
  {
    title: "Distinct Subsequences",
    slug: "distinct-subsequences",
    difficulty: "hard",
    category: "dynamic-programming",
    description: "Given two strings s and t, return the number of distinct subsequences of s which equals t.",
    examples: [{ input: "s = \"rabbbit\", t = \"rabbit\"", output: "3" }],
    constraints: ["1 <= s.length, t.length <= 1000"],
    solution: `function numDistinct(s, t) {
  const m = s.length, n = t.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < m; i++)
    for (let j = n - 1; j >= 0; j--)
      if (s[i] === t[j]) dp[j+1] += dp[j];
  return dp[n];
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(n)", tags: ["dynamic-programming"],
  },
  {
    title: "Palindrome Partitioning II",
    slug: "palindrome-partitioning-ii",
    difficulty: "hard",
    category: "dynamic-programming",
    description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return the minimum cuts needed.",
    examples: [{ input: "s = \"aab\"", output: "1", explanation: "[\"aa\",\"b\"]" }],
    constraints: ["1 <= s.length <= 2000"],
    solution: `function minCut(s) {
  const n = s.length;
  const isPalin = Array.from({length: n}, () => new Array(n).fill(false));
  for (let i = n-1; i >= 0; i--)
    for (let j = i; j < n; j++)
      isPalin[i][j] = s[i] === s[j] && (j-i <= 2 || isPalin[i+1][j-1]);
  const dp = new Array(n).fill(Infinity);
  for (let i = 0; i < n; i++) {
    if (isPalin[0][i]) { dp[i] = 0; continue; }
    for (let j = 1; j <= i; j++)
      if (isPalin[j][i]) dp[i] = Math.min(dp[i], dp[j-1] + 1);
  }
  return dp[n-1];
}`,
    timeComplexity: "O(n^2)", spaceComplexity: "O(n^2)", tags: ["dynamic-programming"],
  },
  {
    title: "Maximum Profit with Cooldown",
    slug: "best-time-buy-sell-stock-cooldown",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given stock prices, find the maximum profit. After selling, you must wait one day before buying again.",
    examples: [{ input: "prices = [1,2,3,0,2]", output: "3" }],
    constraints: ["1 <= prices.length <= 5000"],
    solution: `function maxProfit(prices) {
  let hold = -Infinity, sold = 0, rest = 0;
  for (const price of prices) {
    const prevSold = sold;
    sold = hold + price;
    hold = Math.max(hold, rest - price);
    rest = Math.max(rest, prevSold);
  }
  return Math.max(sold, rest);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["dynamic-programming"],
  },
  {
    title: "Best Time to Buy and Sell Stock with Transaction Fee",
    slug: "buy-sell-stock-transaction-fee",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given stock prices and a transaction fee, find the maximum profit. You may complete as many transactions as you like but pay the fee for each transaction.",
    examples: [{ input: "prices = [1,3,2,8,4,9], fee = 2", output: "8" }],
    constraints: ["1 <= prices.length <= 5 * 10^4"],
    solution: `function maxProfit(prices, fee) {
  let cash = 0, hold = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    cash = Math.max(cash, hold + prices[i] - fee);
    hold = Math.max(hold, cash - prices[i]);
  }
  return cash;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["dynamic-programming", "greedy"],
  },
  {
    title: "Longest Palindromic Subsequence",
    slug: "longest-palindromic-subsequence",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given a string s, find the longest palindromic subsequence's length in s.",
    examples: [{ input: "s = \"bbbab\"", output: "4", explanation: "\"bbbb\"" }],
    constraints: ["1 <= s.length <= 1000"],
    solution: `function longestPalindromeSubseq(s) {
  const n = s.length;
  const dp = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1 : 0));
  for (let len = 2; len <= n; len++)
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = s[i] === s[j] ? dp[i+1][j-1] + 2 : Math.max(dp[i+1][j], dp[i][j-1]);
    }
  return dp[0][n-1];
}`,
    timeComplexity: "O(n^2)", spaceComplexity: "O(n^2)", tags: ["dynamic-programming"],
  },
  {
    title: "Number of Longest Increasing Subsequences",
    slug: "number-of-lis",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given an integer array nums, return the number of longest increasing subsequences.",
    examples: [{ input: "nums = [1,3,5,4,7]", output: "2", explanation: "[1,3,4,7] and [1,3,5,7]" }],
    constraints: ["1 <= nums.length <= 2000"],
    solution: `function findNumberOfLIS(nums) {
  const n = nums.length;
  const len = new Array(n).fill(1), cnt = new Array(n).fill(1);
  for (let i = 1; i < n; i++)
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (len[j] + 1 > len[i]) { len[i] = len[j] + 1; cnt[i] = cnt[j]; }
        else if (len[j] + 1 === len[i]) cnt[i] += cnt[j];
      }
    }
  const maxLen = Math.max(...len);
  return len.reduce((acc, l, i) => l === maxLen ? acc + cnt[i] : acc, 0);
}`,
    timeComplexity: "O(n^2)", spaceComplexity: "O(n)", tags: ["dynamic-programming"],
  },
  {
    title: "Minimum Cost for Tickets",
    slug: "minimum-cost-for-tickets",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given travel days in a year and ticket costs for 1-day, 7-day, 30-day passes, find the minimum cost to travel every day in the given list.",
    examples: [{ input: "days = [1,4,6,7,8,20], costs = [2,7,15]", output: "11" }],
    constraints: ["1 <= days.length <= 365"],
    solution: `function mincostTickets(days, costs) {
  const set = new Set(days), dp = new Array(366).fill(0);
  for (let i = 1; i <= 365; i++) {
    if (!set.has(i)) { dp[i] = dp[i-1]; continue; }
    dp[i] = Math.min(
      dp[i-1] + costs[0],
      dp[Math.max(0, i-7)] + costs[1],
      dp[Math.max(0, i-30)] + costs[2]
    );
  }
  return dp[365];
}`,
    timeComplexity: "O(365)", spaceComplexity: "O(365)", tags: ["dynamic-programming"],
  },
  {
    title: "Maximal Square",
    slug: "maximal-square",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "Given a binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.",
    examples: [{ input: "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]", output: "4" }],
    constraints: ["m == matrix.length", "n == matrix[i].length"],
    solution: `function maximalSquare(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const dp = new Array(n + 1).fill(0);
  let maxSide = 0, prev = 0;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      if (matrix[i-1][j-1] === '1') {
        dp[j] = Math.min(dp[j], dp[j-1], prev) + 1;
        maxSide = Math.max(maxSide, dp[j]);
      } else dp[j] = 0;
      prev = temp;
    }
  }
  return maxSide * maxSide;
}`,
    timeComplexity: "O(m*n)", spaceComplexity: "O(n)", tags: ["dynamic-programming", "matrix"],
  },
  {
    title: "Paint House",
    slug: "paint-house",
    difficulty: "medium",
    category: "dynamic-programming",
    description: "There are n houses in a row, each painted with one of three colors: red, blue, green. The cost to paint each house with a color is given. Paint all houses such that no two adjacent houses have the same color. Return the minimum cost.",
    examples: [{ input: "costs = [[17,2,17],[16,16,5],[14,3,19]]", output: "10" }],
    constraints: ["costs.length == n", "costs[i].length == 3"],
    solution: `function minCost(costs) {
  let [r, b, g] = costs[0];
  for (let i = 1; i < costs.length; i++) {
    const [nr, nb, ng] = costs[i];
    [r, b, g] = [nr + Math.min(b,g), nb + Math.min(r,g), ng + Math.min(r,b)];
  }
  return Math.min(r, b, g);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["dynamic-programming"],
  },

  // ─────────────────────────────────────────
  // STACK & QUEUE (10)
  // ─────────────────────────────────────────
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "easy",
    category: "stack-queue",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [{ input: "s = \"()[]{}\"", output: "true" }],
    constraints: ["1 <= s.length <= 10^4"],
    solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if ('({['.includes(char)) stack.push(char);
    else if (stack.pop() !== map[char]) return false;
  }
  return stack.length === 0;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["stack", "string"],
  },
  {
    title: "Min Stack",
    slug: "min-stack",
    difficulty: "medium",
    category: "stack-queue",
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    examples: [{ input: "MinStack(), push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()", output: "[-3,0,-2]" }],
    constraints: ["-2^31 <= val <= 2^31 - 1"],
    solution: `class MinStack {
  constructor() { this.stack = []; this.minStack = []; }
  push(val) {
    this.stack.push(val);
    this.minStack.push(Math.min(val, this.minStack.length ? this.minStack[this.minStack.length-1] : Infinity));
  }
  pop() { this.stack.pop(); this.minStack.pop(); }
  top() { return this.stack[this.stack.length - 1]; }
  getMin() { return this.minStack[this.minStack.length - 1]; }
}`,
    timeComplexity: "O(1)", spaceComplexity: "O(n)", tags: ["stack", "design"],
  },
  {
    title: "Evaluate Reverse Polish Notation",
    slug: "evaluate-reverse-polish-notation",
    difficulty: "medium",
    category: "stack-queue",
    description: "Given an array of tokens representing an arithmetic expression in RPN, evaluate the expression and return the result.",
    examples: [{ input: "tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]", output: "9" }],
    constraints: ["1 <= tokens.length <= 10^4"],
    solution: `function evalRPN(tokens) {
  const stack = [];
  for (const token of tokens) {
    if (['+','-','*','/'].includes(token)) {
      const [b, a] = [stack.pop(), stack.pop()];
      if (token === '+') stack.push(a + b);
      else if (token === '-') stack.push(a - b);
      else if (token === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else stack.push(parseInt(token));
  }
  return stack[0];
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["stack", "math"],
  },
  {
    title: "Generate Parentheses",
    slug: "generate-parentheses",
    difficulty: "medium",
    category: "stack-queue",
    description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    examples: [{ input: "n = 3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]" }],
    constraints: ["1 <= n <= 8"],
    solution: `function generateParenthesis(n) {
  const result = [];
  const bt = (curr, open, close) => {
    if (curr.length === 2 * n) { result.push(curr); return; }
    if (open < n) bt(curr + '(', open + 1, close);
    if (close < open) bt(curr + ')', open, close + 1);
  };
  bt('', 0, 0);
  return result;
}`,
    timeComplexity: "O(4^n/sqrt(n))", spaceComplexity: "O(n)", tags: ["stack", "backtracking"],
  },
  {
    title: "Daily Temperatures",
    slug: "daily-temperatures",
    difficulty: "medium",
    category: "stack-queue",
    description: "Given an array of integers temperatures, return an array answer such that answer[i] is the number of days until a warmer temperature. If no future day exists, keep answer[i] = 0.",
    examples: [{ input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" }],
    constraints: ["1 <= temperatures.length <= 10^5"],
    solution: `function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = i - idx;
    }
    stack.push(i);
  }
  return result;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["stack", "monotonic-stack"],
  },
  {
    title: "Car Fleet",
    slug: "car-fleet",
    difficulty: "medium",
    category: "stack-queue",
    description: "Given target, position, and speed arrays for n cars, return the number of car fleets that arrive at the target.",
    examples: [{ input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]", output: "3" }],
    constraints: ["n == position.length == speed.length"],
    solution: `function carFleet(target, position, speed) {
  const cars = position.map((p, i) => [(target - p) / speed[i], p]).sort((a, b) => b[1] - a[1]);
  const stack = [];
  for (const [time] of cars) {
    if (!stack.length || time > stack[stack.length - 1]) stack.push(time);
  }
  return stack.length;
}`,
    timeComplexity: "O(n log n)", spaceComplexity: "O(n)", tags: ["stack", "sorting"],
  },
  {
    title: "Largest Rectangle in Histogram",
    slug: "largest-rectangle-histogram",
    difficulty: "hard",
    category: "stack-queue",
    description: "Given an array of integers heights representing a histogram, return the area of the largest rectangle in the histogram.",
    examples: [{ input: "heights = [2,1,5,6,2,3]", output: "10" }],
    constraints: ["1 <= heights.length <= 10^5"],
    solution: `function largestRectangleArea(heights) {
  const stack = [], n = heights.length;
  let maxArea = 0;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    while (stack.length && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["stack", "monotonic-stack"],
  },
  {
    title: "Sliding Window Maximum",
    slug: "sliding-window-maximum",
    difficulty: "hard",
    category: "stack-queue",
    description: "Given an array nums and an integer k, return an array of the maximum values in each sliding window of size k.",
    examples: [{ input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" }],
    constraints: ["1 <= k <= nums.length <= 10^5"],
    solution: `function maxSlidingWindow(nums, k) {
  const deque = [], result = [];
  for (let i = 0; i < nums.length; i++) {
    if (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(k)", tags: ["stack", "deque", "sliding-window"],
  },
  {
    title: "Implement Queue using Stacks",
    slug: "implement-queue-using-stacks",
    difficulty: "easy",
    category: "stack-queue",
    description: "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support push, peek, pop, and empty.",
    examples: [{ input: "MyQueue(), push(1), push(2), peek(), pop(), empty()", output: "[null,null,null,1,1,false]" }],
    constraints: ["1 <= x <= 9"],
    solution: `class MyQueue {
  constructor() { this.s1 = []; this.s2 = []; }
  push(x) { this.s1.push(x); }
  pop() {
    if (!this.s2.length) while (this.s1.length) this.s2.push(this.s1.pop());
    return this.s2.pop();
  }
  peek() {
    if (!this.s2.length) while (this.s1.length) this.s2.push(this.s1.pop());
    return this.s2[this.s2.length - 1];
  }
  empty() { return !this.s1.length && !this.s2.length; }
}`,
    timeComplexity: "O(1) amortized", spaceComplexity: "O(n)", tags: ["stack", "queue", "design"],
  },
  {
    title: "Next Greater Element I",
    slug: "next-greater-element-i",
    difficulty: "easy",
    category: "stack-queue",
    description: "Given two arrays nums1 and nums2 where nums1 is a subset of nums2, for each element in nums1 find its next greater element in nums2.",
    examples: [{ input: "nums1 = [4,1,2], nums2 = [1,3,4,2]", output: "[-1,3,-1]" }],
    constraints: ["1 <= nums1.length <= nums2.length <= 1000"],
    solution: `function nextGreaterElement(nums1, nums2) {
  const map = new Map(), stack = [];
  for (const num of nums2) {
    while (stack.length && stack[stack.length-1] < num) map.set(stack.pop(), num);
    stack.push(num);
  }
  return nums1.map(n => map.get(n) ?? -1);
}`,
    timeComplexity: "O(m+n)", spaceComplexity: "O(n)", tags: ["stack", "monotonic-stack", "hash-map"],
  },

  // ─────────────────────────────────────────
  // SEARCHING & SORTING (10)
  // ─────────────────────────────────────────
  {
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "easy",
    category: "searching",
    description: "Given an array of integers nums sorted in ascending order, and an integer target, write a function to search target in nums.",
    examples: [{ input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" }],
    constraints: ["1 <= nums.length <= 10^4", "nums is sorted ascending"],
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
    timeComplexity: "O(log n)", spaceComplexity: "O(1)", tags: ["binary-search", "array"],
  },
  {
    title: "Search a 2D Matrix",
    slug: "search-2d-matrix",
    difficulty: "medium",
    category: "searching",
    description: "Given an m x n integer matrix where each row is sorted and the first integer of each row is greater than the last of the previous row, determine if target exists.",
    examples: [{ input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" }],
    constraints: ["m == matrix.length", "n == matrix[i].length"],
    solution: `function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let left = 0, right = m * n - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    else if (val < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}`,
    timeComplexity: "O(log(m*n))", spaceComplexity: "O(1)", tags: ["binary-search", "matrix"],
  },
  {
    title: "Koko Eating Bananas",
    slug: "koko-eating-bananas",
    difficulty: "medium",
    category: "searching",
    description: "Koko can eat k bananas per hour. Given piles of bananas and h hours, return the minimum integer k such that she can eat all bananas within h hours.",
    examples: [{ input: "piles = [3,6,7,11], h = 8", output: "4" }],
    constraints: ["1 <= piles.length <= 10^4"],
    solution: `function minEatingSpeed(piles, h) {
  let left = 1, right = Math.max(...piles);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const hours = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0);
    if (hours <= h) right = mid;
    else left = mid + 1;
  }
  return left;
}`,
    timeComplexity: "O(n log m)", spaceComplexity: "O(1)", tags: ["binary-search"],
  },
  {
    title: "Median of Two Sorted Arrays",
    slug: "median-two-sorted-arrays",
    difficulty: "hard",
    category: "searching",
    description: "Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).",
    examples: [{ input: "nums1 = [1,3], nums2 = [2]", output: "2.0" }],
    constraints: ["nums1.length + nums2.length >= 1"],
    solution: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) [nums1, nums2] = [nums2, nums1];
  const m = nums1.length, n = nums2.length;
  let left = 0, right = m;
  while (left <= right) {
    const i = Math.floor((left + right) / 2), j = Math.floor((m + n + 1) / 2) - i;
    const maxLeft1 = i === 0 ? -Infinity : nums1[i-1];
    const minRight1 = i === m ? Infinity : nums1[i];
    const maxLeft2 = j === 0 ? -Infinity : nums2[j-1];
    const minRight2 = j === n ? Infinity : nums2[j];
    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if ((m + n) % 2 === 0) return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
      return Math.max(maxLeft1, maxLeft2);
    } else if (maxLeft1 > minRight2) right = i - 1;
    else left = i + 1;
  }
}`,
    timeComplexity: "O(log(min(m,n)))", spaceComplexity: "O(1)", tags: ["binary-search", "divide-and-conquer"],
  },
  {
    title: "Time Based Key-Value Store",
    slug: "time-based-key-value-store",
    difficulty: "medium",
    category: "searching",
    description: "Design a time-based key-value data structure that stores multiple values for the same key at different timestamps and retrieves the value at a given timestamp.",
    examples: [{ input: "set(\"foo\",\"bar\",1), get(\"foo\",1), get(\"foo\",3), set(\"foo\",\"bar2\",4), get(\"foo\",4), get(\"foo\",5)", output: "[null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]" }],
    constraints: ["1 <= key.length, value.length <= 100"],
    solution: `class TimeMap {
  constructor() { this.map = new Map(); }
  set(key, value, timestamp) {
    if (!this.map.has(key)) this.map.set(key, []);
    this.map.get(key).push([timestamp, value]);
  }
  get(key, timestamp) {
    const arr = this.map.get(key) || [];
    let left = 0, right = arr.length - 1, result = '';
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid][0] <= timestamp) { result = arr[mid][1]; left = mid + 1; }
      else right = mid - 1;
    }
    return result;
  }
}`,
    timeComplexity: "O(log n)", spaceComplexity: "O(n)", tags: ["binary-search", "design", "hash-map"],
  },
  {
    title: "Merge Sort",
    slug: "merge-sort",
    difficulty: "medium",
    category: "sorting",
    description: "Implement merge sort algorithm to sort an array of integers in ascending order.",
    examples: [{ input: "nums = [5,2,3,1]", output: "[1,2,3,5]" }],
    constraints: ["1 <= nums.length <= 5 * 10^4"],
    solution: `function mergeSort(nums) {
  if (nums.length <= 1) return nums;
  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length)
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
    timeComplexity: "O(n log n)", spaceComplexity: "O(n)", tags: ["sorting", "divide-and-conquer"],
  },
  {
    title: "Quick Sort",
    slug: "quick-sort",
    difficulty: "medium",
    category: "sorting",
    description: "Implement quick sort algorithm to sort an array of integers in ascending order.",
    examples: [{ input: "nums = [3,6,8,10,1,2,1]", output: "[1,1,2,3,6,8,10]" }],
    constraints: ["1 <= nums.length <= 5 * 10^4"],
    solution: `function quickSort(nums, left = 0, right = nums.length - 1) {
  if (left >= right) return;
  const pivot = nums[right];
  let i = left;
  for (let j = left; j < right; j++)
    if (nums[j] <= pivot) { [nums[i], nums[j]] = [nums[j], nums[i]]; i++; }
  [nums[i], nums[right]] = [nums[right], nums[i]];
  quickSort(nums, left, i - 1);
  quickSort(nums, i + 1, right);
}`,
    timeComplexity: "O(n log n) avg", spaceComplexity: "O(log n)", tags: ["sorting", "divide-and-conquer"],
  },
  {
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements",
    difficulty: "medium",
    category: "sorting",
    description: "Given an integer array nums and an integer k, return the k most frequent elements.",
    examples: [{ input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" }],
    constraints: ["1 <= nums.length <= 10^5"],
    solution: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  const buckets = Array.from({length: nums.length + 1}, () => []);
  for (const [num, count] of freq) buckets[count].push(num);
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--)
    result.push(...buckets[i]);
  return result.slice(0, k);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(n)", tags: ["sorting", "bucket-sort", "hash-map"],
  },
  {
    title: "Kth Largest Element in Array",
    slug: "kth-largest-element-array",
    difficulty: "medium",
    category: "sorting",
    description: "Given an integer array nums and an integer k, return the kth largest element in the array.",
    examples: [{ input: "nums = [3,2,1,5,6,4], k = 2", output: "5" }],
    constraints: ["1 <= k <= nums.length <= 10^5"],
    solution: `function findKthLargest(nums, k) {
  const quickSelect = (left, right) => {
    const pivot = nums[right]; let i = left;
    for (let j = left; j < right; j++)
      if (nums[j] <= pivot) { [nums[i], nums[j]] = [nums[j], nums[i]]; i++; }
    [nums[i], nums[right]] = [nums[right], nums[i]];
    const pos = nums.length - i;
    if (pos === k) return nums[i];
    if (pos < k) return quickSelect(left, i - 1);
    return quickSelect(i + 1, right);
  };
  return quickSelect(0, nums.length - 1);
}`,
    timeComplexity: "O(n) avg", spaceComplexity: "O(1)", tags: ["sorting", "quick-select"],
  },
  {
    title: "Find K Closest Elements",
    slug: "find-k-closest-elements",
    difficulty: "medium",
    category: "searching",
    description: "Given a sorted integer array arr, two integers k and x, return the k closest integers to x in sorted order.",
    examples: [{ input: "arr = [1,2,3,4,5], k = 4, x = 3", output: "[1,2,3,4]" }],
    constraints: ["1 <= k <= arr.length <= 10^4"],
    solution: `function findClosestElements(arr, k, x) {
  let left = 0, right = arr.length - k;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (x - arr[mid] > arr[mid + k] - x) left = mid + 1;
    else right = mid;
  }
  return arr.slice(left, left + k);
}`,
    timeComplexity: "O(log(n-k))", spaceComplexity: "O(1)", tags: ["binary-search", "sliding-window"],
  },

  // ─────────────────────────────────────────
  // RECURSION & BACKTRACKING (10)
  // ─────────────────────────────────────────
  {
    title: "Subsets",
    slug: "subsets",
    difficulty: "medium",
    category: "recursion",
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set).",
    examples: [{ input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" }],
    constraints: ["1 <= nums.length <= 10"],
    solution: `function subsets(nums) {
  const result = [];
  const bt = (start, curr) => {
    result.push([...curr]);
    for (let i = start; i < nums.length; i++) {
      curr.push(nums[i]);
      bt(i + 1, curr);
      curr.pop();
    }
  };
  bt(0, []);
  return result;
}`,
    timeComplexity: "O(n * 2^n)", spaceComplexity: "O(n * 2^n)", tags: ["recursion", "backtracking"],
  },
  {
    title: "Subsets II",
    slug: "subsets-ii",
    difficulty: "medium",
    category: "recursion",
    description: "Given an integer array nums that may contain duplicates, return all possible subsets. The solution set must not contain duplicate subsets.",
    examples: [{ input: "nums = [1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" }],
    constraints: ["1 <= nums.length <= 10"],
    solution: `function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  const bt = (start, curr) => {
    result.push([...curr]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i-1]) continue;
      curr.push(nums[i]); bt(i + 1, curr); curr.pop();
    }
  };
  bt(0, []);
  return result;
}`,
    timeComplexity: "O(n * 2^n)", spaceComplexity: "O(n * 2^n)", tags: ["recursion", "backtracking"],
  },
  {
    title: "Permutations",
    slug: "permutations",
    difficulty: "medium",
    category: "recursion",
    description: "Given an array nums of distinct integers, return all possible permutations.",
    examples: [{ input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" }],
    constraints: ["1 <= nums.length <= 6"],
    solution: `function permute(nums) {
  const result = [];
  const bt = (curr, used) => {
    if (curr.length === nums.length) { result.push([...curr]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; curr.push(nums[i]); bt(curr, used);
      used[i] = false; curr.pop();
    }
  };
  bt([], new Array(nums.length).fill(false));
  return result;
}`,
    timeComplexity: "O(n * n!)", spaceComplexity: "O(n * n!)", tags: ["recursion", "backtracking"],
  },
  {
    title: "Combination Sum",
    slug: "combination-sum",
    difficulty: "medium",
    category: "recursion",
    description: "Given an array of distinct integers candidates and a target, return all unique combinations that sum to target. The same number may be chosen unlimited times.",
    examples: [{ input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]" }],
    constraints: ["1 <= candidates.length <= 30"],
    solution: `function combinationSum(candidates, target) {
  const result = [];
  const bt = (start, curr, remaining) => {
    if (remaining === 0) { result.push([...curr]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) continue;
      curr.push(candidates[i]); bt(i, curr, remaining - candidates[i]); curr.pop();
    }
  };
  bt(0, [], target);
  return result;
}`,
    timeComplexity: "O(n^(t/m))", spaceComplexity: "O(t/m)", tags: ["recursion", "backtracking"],
  },
  {
    title: "Combination Sum II",
    slug: "combination-sum-ii",
    difficulty: "medium",
    category: "recursion",
    description: "Given candidates and target, return all unique combinations that sum to target. Each number may only be used once.",
    examples: [{ input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]" }],
    constraints: ["1 <= candidates.length <= 100"],
    solution: `function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];
  const bt = (start, curr, remaining) => {
    if (remaining === 0) { result.push([...curr]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i-1]) continue;
      if (candidates[i] > remaining) break;
      curr.push(candidates[i]); bt(i + 1, curr, remaining - candidates[i]); curr.pop();
    }
  };
  bt(0, [], target);
  return result;
}`,
    timeComplexity: "O(2^n)", spaceComplexity: "O(n)", tags: ["recursion", "backtracking"],
  },
  {
    title: "N-Queens",
    slug: "n-queens",
    difficulty: "hard",
    category: "recursion",
    description: "Place n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.",
    examples: [{ input: "n = 4", output: "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]]" }],
    constraints: ["1 <= n <= 9"],
    solution: `function solveNQueens(n) {
  const result = [], board = Array.from({length: n}, () => '.'.repeat(n).split(''));
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  const bt = (row) => {
    if (row === n) { result.push(board.map(r => r.join(''))); return; }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row-col) || diag2.has(row+col)) continue;
      cols.add(col); diag1.add(row-col); diag2.add(row+col);
      board[row][col] = 'Q'; bt(row + 1); board[row][col] = '.';
      cols.delete(col); diag1.delete(row-col); diag2.delete(row+col);
    }
  };
  bt(0);
  return result;
}`,
    timeComplexity: "O(n!)", spaceComplexity: "O(n^2)", tags: ["recursion", "backtracking"],
  },
  {
    title: "Sudoku Solver",
    slug: "sudoku-solver",
    difficulty: "hard",
    category: "recursion",
    description: "Write a program to solve a Sudoku puzzle by filling the empty cells. Empty cells are indicated by '.'.",
    examples: [{ input: "board = [[\"5\",\"3\",\".\",...]...]", output: "Solved board" }],
    constraints: ["board.length == 9", "board[i].length == 9"],
    solution: `function solveSudoku(board) {
  const isValid = (r, c, val) => {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === val || board[i][c] === val) return false;
      const br = 3*Math.floor(r/3)+Math.floor(i/3), bc = 3*Math.floor(c/3)+i%3;
      if (board[br][bc] === val) return false;
    }
    return true;
  };
  const solve = () => {
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== '.') continue;
        for (let v = 1; v <= 9; v++) {
          const val = String(v);
          if (isValid(r, c, val)) {
            board[r][c] = val;
            if (solve()) return true;
            board[r][c] = '.';
          }
        }
        return false;
      }
    return true;
  };
  solve();
}`,
    timeComplexity: "O(9^m)", spaceComplexity: "O(1)", tags: ["recursion", "backtracking"],
  },
  {
    title: "Palindrome Partitioning",
    slug: "palindrome-partitioning",
    difficulty: "medium",
    category: "recursion",
    description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
    examples: [{ input: "s = \"aab\"", output: "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]" }],
    constraints: ["1 <= s.length <= 16"],
    solution: `function partition(s) {
  const result = [];
  const isPalin = (str) => str === str.split('').reverse().join('');
  const bt = (start, curr) => {
    if (start === s.length) { result.push([...curr]); return; }
    for (let end = start + 1; end <= s.length; end++) {
      const sub = s.substring(start, end);
      if (isPalin(sub)) { curr.push(sub); bt(end, curr); curr.pop(); }
    }
  };
  bt(0, []);
  return result;
}`,
    timeComplexity: "O(n * 2^n)", spaceComplexity: "O(n * 2^n)", tags: ["recursion", "backtracking"],
  },
  {
    title: "Word Search II",
    slug: "word-search-ii",
    difficulty: "hard",
    category: "recursion",
    description: "Given an m x n board of characters and a list of strings words, return all words on the board.",
    examples: [{ input: "board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]", output: "[\"eat\",\"oath\"]" }],
    constraints: ["m == board.length", "n == board[i].length"],
    solution: `function findWords(board, words) {
  const trie = {}, result = new Set();
  for (const word of words) {
    let node = trie;
    for (const c of word) { if (!node[c]) node[c] = {}; node = node[c]; }
    node['#'] = word;
  }
  const dfs = (node, i, j) => {
    const c = board[i][j];
    if (!node[c]) return;
    const next = node[c];
    if (next['#']) result.add(next['#']);
    board[i][j] = '#';
    for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]]) {
      const nr = i+dr, nc = j+dc;
      if (nr>=0 && nr<board.length && nc>=0 && nc<board[0].length && board[nr][nc] !== '#')
        dfs(next, nr, nc);
    }
    board[i][j] = c;
  };
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board[0].length; j++)
      dfs(trie, i, j);
  return [...result];
}`,
    timeComplexity: "O(M*N*4^L)", spaceComplexity: "O(W*L)", tags: ["recursion", "backtracking", "trie"],
  },
  {
    title: "Letter Combinations of a Phone Number",
    slug: "letter-combinations-backtracking",
    difficulty: "medium",
    category: "recursion",
    description: "Given digits from 2-9, return all possible letter combinations using backtracking approach with full explanation.",
    examples: [{ input: "digits = \"23\"", output: "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]" }],
    constraints: ["0 <= digits.length <= 4"],
    solution: `function letterCombinations(digits) {
  if (!digits.length) return [];
  const map = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'};
  const result = [];
  const bt = (index, current) => {
    if (index === digits.length) { result.push(current); return; }
    for (const letter of map[digits[index]]) bt(index + 1, current + letter);
  };
  bt(0, '');
  return result;
}`,
    timeComplexity: "O(4^n * n)", spaceComplexity: "O(n)", tags: ["recursion", "backtracking"],
  },
  {
    title: "Find Median from Data Stream",
    slug: "find-median-from-data-stream",
    difficulty: "hard",
    category: "sorting",
    description: "Design a data structure that supports adding integers from a data stream and finding the median of current elements.",
    examples: [{ input: "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()", output: "[1.5, 2.0]" }],
    constraints: ["-10^5 <= num <= 10^5"],
    solution: `class MedianFinder {
  constructor() { this.small = []; this.large = []; }
  addNum(num) {
    this.small.push(-num); this.small.sort((a,b) => a-b);
    this.large.push(-this.small.shift()); this.large.sort((a,b) => a-b);
    if (this.large.length > this.small.length) this.small.push(-this.large.shift());
  }
  findMedian() {
    if (this.small.length > this.large.length) return -this.small[0];
    return (-this.small[0] + this.large[0]) / 2;
  }
}`,
    timeComplexity: "O(n log n)", spaceComplexity: "O(n)", tags: ["sorting", "heap", "design"],
  },
  {
    title: "Task Scheduler",
    slug: "task-scheduler",
    difficulty: "medium",
    category: "sorting",
    description: "Given a list of CPU tasks and a cooldown n, return the minimum number of intervals the CPU will take to finish all tasks.",
    examples: [{ input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2", output: "8" }],
    constraints: ["1 <= tasks.length <= 10^4"],
    solution: `function leastInterval(tasks, n) {
  const freq = new Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
  freq.sort((a, b) => b - a);
  const maxFreq = freq[0];
  const maxCount = freq.filter(f => f === maxFreq).length;
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}`,
    timeComplexity: "O(n)", spaceComplexity: "O(1)", tags: ["sorting", "greedy"],
  },
];