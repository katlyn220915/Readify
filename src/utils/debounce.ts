function debounce(callback: (e: any) => void, time: any) {
  let timeId: NodeJS.Timeout | null = null;

  return function (e: any) {
    if (timeId !== null) {
      clearTimeout(timeId);
    }

    timeId = setTimeout(() => {
      callback(e);
      // 重置定時器
      timeId = null;
    }, time);
  };
}

export default debounce;
