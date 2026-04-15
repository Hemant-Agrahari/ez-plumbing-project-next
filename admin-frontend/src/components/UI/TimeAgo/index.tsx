// components/UI/TimeAgo.tsx
import { formatDistanceToNow } from 'date-fns';
import { FC } from 'react';

interface TimeAgoProps {
  timestamp: string;
}

const TimeAgo: FC<TimeAgoProps> = ({ timestamp }) => {
    let timeAgo = '';
    try {
      const date = new Date(timestamp);
      if (!isNaN(date.getTime())) {
        timeAgo = formatDistanceToNow(date, { addSuffix: true });
      } else {
        timeAgo = 'Invalid date';
      }
    } catch (error) {
      timeAgo = 'Error parsing date';
    }
  
    return <span>{timeAgo}</span>;
  };
  
export default TimeAgo;
