export function getRandomNumbers() {
  const numbers = [];
  for (let a = 0; a < 10; a++) {
    for (let b = 0; b < 10; b++) {
      numbers.push(a);
    }
  }

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
}
