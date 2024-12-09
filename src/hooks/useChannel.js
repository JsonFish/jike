import { useState, useEffect } from "react";
import { getChannelRequest } from "@/apis/article";

function useChannel() {
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    getChannelRequest().then((res) => {
      setChannelList(res.data.channels);
    });
  }, []);
  return channelList;
}
export default useChannel;
