

const getToken = () => {
  //debugger
  const storage  = localStorage.getItem("Auth") ;
  let config = {};
  if (storage && storage !== "") {
    const data = JSON.parse(storage);
    config = {
      headers: { Authorization: `Bearer ${data?.token}` },
    };
  }
  return config;
};

export { getToken };
