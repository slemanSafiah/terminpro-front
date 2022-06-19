let times = [];
for (let i = 10; i < 24; i++) {
  for (let j = 0; j < 60; j += 15) {
    times.push(`${i}:${j === 0 ? "00" : j}`);
  }
}

export default times;
