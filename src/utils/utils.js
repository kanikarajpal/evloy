export const calculate = (data) => {
  var sum = 0;
  let result = data.items;

  result.forEach((item) => {
    let views = item.statistics.viewCount;

    const givenDate = new Date(item.snippet.publishedAt);
    const today = new Date();
    const monthsDiff =
      (today.getFullYear() - givenDate.getFullYear()) * 12 +
      (today.getMonth() - givenDate.getMonth());
    if (monthsDiff !== 0) {
      let avgViews = views / monthsDiff;
      sum += avgViews;
    }
  });
 
  return sum;
};

export const helpingFunc = async (temp) => {
  const options = {
    method: "GET",
  };

  const link = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${temp}&key=${process.env.REACT_APP_API_KEY}`;
  const raw = await fetch(link, options);
  const data = await raw.json();
  return data
};

export const getData = async (searchState) => {
  var temp = "";

  const options = {
    method: "GET",
  };

  const link = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=viewCount&q=${searchState}&key=${process.env.REACT_APP_API_KEY}`;
  const raw = await fetch(link, options);
  const data = await raw.json();
  const res = data.items;
  

  res.forEach((item) => {
    if (item.id.videoId) {
      temp += item.id.videoId + ",";
    }
  });

  temp = temp.slice(0, -1);

  return temp
};
