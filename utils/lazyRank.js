exports.calculateRank = (score) => {
  if (score >= 5000) return 'SSS';
  if (score >= 3000) return 'SS';
  if (score >= 1500) return 'S';
  if (score >= 800) return 'A';
  if (score >= 300) return 'B';
  return 'C';
};