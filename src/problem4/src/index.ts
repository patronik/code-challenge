function isSafeNumber(n: number): boolean {
  return n <= Number.MAX_SAFE_INTEGER;
}

// Time complexity is O(n) (linear) as we have only single for loop
function sum_to_n_a(n: number): number {
  if (n <= 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
    if (!isSafeNumber(sum)) {
      throw new Error('Sum exceeds max safe number.');
    }
  }
  return sum;
}

// Time complexity is O(n) (linear) as we have only single while loop
function sum_to_n_b(n: number): number {
  if (n <= 0) {
    return 0;
  }
  let sum = 0;
  while (n > 0) {
    sum += n;
    if (!isSafeNumber(sum)) {
      throw new Error('Sum exceeds max safe number.');
    }
    n--;
  }
  return sum;
}

// Time Complexity O(n) linear recursive calls
function sum_to_n_c(n: number): number {
  if (n <= 0) {
    return 0;
  }
  const sum = n + sum_to_n_c(n - 1);
  if (!isSafeNumber(sum)) {
    throw new Error('Sum exceeds max safe number.');
  }
  return sum;
}