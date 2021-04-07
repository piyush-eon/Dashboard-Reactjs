import "./MagazinePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import TransitionsModal from "../../components/Modal/Modal";
import CreateMagazineModal from "../../components/CreateMagazineModal/CreateMagazineModal";

const MagazinePage = () => {
  const [magazines, setMagazines] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const fetchMagazines = async () => {
    const { data } = await axios.get("/api/magazine");

    console.log(data);
    setMagazines(data);
  };

  const handleDelete = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/magazine/admin/${id}`, config);
    alert(data.message);
    fetchMagazines();
  };

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userDetail")));
    fetchMagazines();
  }, []);

  return (
    <div className="magazines">
      <CreateMagazineModal fetchMagazines={fetchMagazines}>
        <Button variant="contained" color="secondary">
          Create Magazine
        </Button>
      </CreateMagazineModal>
      <div className="allmagazines">
        {magazines.map((mag) => (
          <TransitionsModal
            mags={mag.pics}
            handleDelete={handleDelete}
            id={mag._id}
            key={mag._id}
          >
            <img
              src={mag.pics[0]}
              width="180px"
              alt={mag._id}
              style={{ boxShadow: "5px 5px black" }}
            />
          </TransitionsModal>
        ))}
      </div>
    </div>
  );
};

export default MagazinePage;
