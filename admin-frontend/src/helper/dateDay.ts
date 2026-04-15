// utils.ts

export const getCurrentDayAndTime = (): { day: string; time: string } => {
    const now = new Date();
  
    // Days of the week
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const currentDay = days[now.getDay()];
  
    // Time formatting
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const currentTime = `${hours}:${minutes} ${ampm}`;
  
    return { day: currentDay, time: currentTime };
  };
  