export const ShortCount = (rawLikeCount: number) => {
    return Math.abs(rawLikeCount) > 999
        ? Math.sign(rawLikeCount) * parseFloat((Math.abs(rawLikeCount) / 1000).toFixed(1)) + 'k'
        : Math.sign(rawLikeCount) * Math.abs(rawLikeCount);
};

export const ShorttenText = (text: string, maxLength: number) => {
    if (text === null) {
        return '';
    }
    return `${text?.slice(0, maxLength)}${text?.length > maxLength ? '...' : ''}`;
};

export const DateBetween = (_start) => {
    // const end = moment(currentDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    function setTimeDifference(start, end) {
        const distanceInSeconds = Math.abs((end - start) / 1000);
        const secondsInMinute = 60;
        const secondsInHour = secondsInMinute * 60;
        const secondsInDay = secondsInHour * 24;
        const secondsInWeek = secondsInDay * 7;

        if (distanceInSeconds < secondsInMinute) {
            return `${Math.floor(distanceInSeconds)}s`;
        } else if (distanceInSeconds < secondsInHour) {
            return `${Math.floor(distanceInSeconds / secondsInMinute)}m`;
        } else if (distanceInSeconds < secondsInDay) {
            return `${Math.floor(distanceInSeconds / secondsInHour)}h`;
        } else if (distanceInSeconds < secondsInWeek) {
            return `${Math.floor(distanceInSeconds / secondsInDay)}d`;
        } else {
            return `${Math.floor(distanceInSeconds / secondsInWeek)}w`;
        }
    }

    // Example usage
    const start = new Date(_start);
    const end = new Date();
    return setTimeDifference(start, end);
};
