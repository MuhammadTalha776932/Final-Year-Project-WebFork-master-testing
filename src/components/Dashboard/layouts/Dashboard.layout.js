import React from "react";
import Dashboard from "../Dashboard";
import axios from "axios";
import { GetTokenSilently, SetTokenSilently } from "../../../LocalStorage/util";
import { useAuth0 } from "@auth0/auth0-react";
const DashboardLayout = () => {
  const {  getAccessTokenSilently } =
    useAuth0();

  React.useEffect(() => {
    let isRender = true;
    if (isRender) {
      const fetchAdminData = async () => {
        try {
          const tokens = await getAccessTokenSilently();
          SetTokenSilently(tokens);
          let token = GetTokenSilently("token");
          await axios
            .get("/admin", {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              const { data } = response;
              console.log(data);
            })
            .catch((e) => {
              console.info(["admin get method error", e]);
            });
        } catch (error) {
          console.error(["Function FetchAdmin try catch error", error]);
        }
      };
      fetchAdminData();
    }
    return () => {
      isRender = false;
    };
  }, [getAccessTokenSilently]);
  return (
    <>
      <Dashboard />
    </>
  );
};

export default DashboardLayout;
