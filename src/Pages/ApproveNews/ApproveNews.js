import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import { backendUrl } from "../../config/config";
// import "./AllNews.css";

const ApproveNews = () => {
  const [news, setNews] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const fetchNews = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/news/admin/approve/`);
      // console.log(data);
      setNews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${backendUrl}/news/admin/approve/${id}`,
      config
    );

    alert(data.message);
    // console.log(data);

    fetchNews();
  };

  const approveNews = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    console.log(config);
    const { data } = await axios.post(
      `${backendUrl}/news/admin/approve/${id}`,
      config
    );

    alert(data.message);
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
      {userInfo ? (
        news?.map((singleNews) => (
          <NewsCard
            key={singleNews._id}
            singleNews={singleNews}
            deleteNews={deleteNews}
            approveNews={approveNews}
            approve={true}
          />
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ApproveNews;
