export function getColor() {
  const colors = ['#f2f9f1', '#ddeedf', '#b6cdbd', '#5c715e'];
  const randomNumber = Math.floor(Math.random() * colors.length);
  return colors[randomNumber];
}
