import React , { useEffect , useState} from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';

const Incompletedtasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
    useEffect(() => {
      const fetch = async () => {
          const response = await axios.put("http://localhost:1000/api/v2/updateincompletetask", {
            headers,
          });
          setData(response.data.data);
      };
  
      fetch();
    });
  return (
    <div>
      <Cards home={"false"} Data={Data}/>
    </div>
  )
}

export default Incompletedtasks