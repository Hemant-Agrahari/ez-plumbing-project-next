export const getTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInMs = now.getTime() - date.getTime();
  const diffInMins = Math.floor(diffInMs / 1000 / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }

  if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }

  return `${diffInMins} minute${diffInMins !== 1 ? 's' : ''} ago`;
};
