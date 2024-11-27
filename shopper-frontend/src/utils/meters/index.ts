export function convertDistance(value: number): string {

  if (value < 1000) {
    return `${value} m`;
  } else {
    const kilometers = (value / 1000).toFixed(2);
    return `${kilometers} km`;
  }


}