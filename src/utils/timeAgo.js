export function timeAgo(publishedAt) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(publishedAt).getTime()) / 1000
  );

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " year" + (interval > 1 ? "s" : "") + " ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " month" + (interval > 1 ? "s" : "") + " ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " day" + (interval > 1 ? "s" : "") + " ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " min" + (interval > 1 ? "s" : "") + " ago";
  }
  return Math.floor(seconds) + " sec" + (seconds > 1 ? "s" : "") + " ago";
}
