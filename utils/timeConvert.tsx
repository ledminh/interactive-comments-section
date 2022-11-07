export default function timeConvert(t:number):string {
    const now = new Date();
    const elapseSeconds = Math.floor((Date.parse(now.toUTCString())  - t)*0.001);

    if(elapseSeconds < 60) {
        return `${elapseSeconds} second${elapseSeconds > 1? 's' : ''} ago.`;
    }
    else if(elapseSeconds < 3600) {
        const mins = Math.floor(elapseSeconds/60);
        return `${mins} minute${mins > 1? 's' : ''} ago.`;
    }
    else if(elapseSeconds < 86400) {
        const hours = Math.floor(elapseSeconds/3600);
        return `${hours} hour${hours > 1? 's' : ''} ago.`;;
    }
    else if(elapseSeconds < 86400*30) {
        const days = Math.floor(elapseSeconds/86400);
        return `${days} day${days > 1? 's' : ''} ago.`; 
    }
    else if(elapseSeconds < 86400*30*12) {
        const months = Math.floor(elapseSeconds/(86400*30));
        return `${months} month${months > 1? 's' : ''} ago.`;
    }
    else {
        const years = Math.floor(elapseSeconds/(86400*30*12)); 
        return  `${years} year${years > 1? 's' : ''} ago.`;
    }

}