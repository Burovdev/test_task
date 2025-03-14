export const timeLeftToDate = (time: string) => {
    const now = new Date();
    const targetDate = new Date(time);
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
        return "Date is in the past";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} left`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} left`;
    } else {
        return `${minutes} minute${minutes > 1 ? "s" : ""} left`;
    }
};
