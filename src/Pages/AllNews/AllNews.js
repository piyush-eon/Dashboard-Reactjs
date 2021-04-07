import axios from "axios";
import { useEffect, useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import { backendUrl } from "../../config/config";
import "./AllNews.css";

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const fetchNews = async () => {
    const { data } = await axios.get(`${backendUrl}/news`);
    // console.log(data);
    setNews(data);
  };

  const deleteNews = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`${backendUrl}/news/${id}`, config);

    console.log(data);

    fetchNews();
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userDetail")));

    fetchNews();

    return () => {
      setNews([]);
    };
  }, []);

  return (
    <div className="newsContainer">
      {news?.map((singleNews) => (
        <NewsCard
          key={singleNews._id}
          singleNews={singleNews}
          deleteNews={deleteNews}
        />
      ))}
    </div>
  );
};

export default AllNews;
