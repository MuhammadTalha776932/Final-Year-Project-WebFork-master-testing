/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./styles/style.css";

import axios from "axios";
import { GetTokenSilently } from "../../LocalStorage/util";
import Preloading from "./../Preloading";

const Dashboard = () => {
  const [dashboard, setDashboard] = React.useState({});
  const toggleMenu = () => {
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    toggle.onclick = () => {
      navigation?.classNameList?.toggle("active");
      main?.classNameList?.toggle("active");
    };
  };
  React.useEffect(() => {
    let isRender = true;
    if (isRender) {
      const fetchDataFromDashboardDatabase = async () => {
        let token = GetTokenSilently("token");
        await axios
          .get("/dashboard", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            let { data } = response;
            console.info(data);
            setDashboard(data);
          })
          .catch((error) =>
            console.error(["dashboard get method caused error", error]),
          );
      };
      fetchDataFromDashboardDatabase();
      toggleMenu();
    }
    return () => {
      isRender = true;
    };
  }, []);
  return (
    <>
      {dashboard ? (
        <div className="container-fluid">
          <div className="navigation">
            <ul>
              <li>
                <a href="#">
                  <span className="icon">
                    <img
                      src="./assets/imgs/logo.png"
                      className="webfork-logo"
                      alt=""
                    />
                  </span>
                  <span className="title">WebFork</span>
                </a>
              </li>

              <li>
                <a href="#">
                  <span className="icon">
                    <ion-icon name="home-outline"></ion-icon>
                  </span>
                  <span className="title">Dashboard</span>
                </a>
              </li>

              <li>
                <a href="#">
                  <span className="icon">
                    <ion-icon name="log-out-outline"></ion-icon>
                  </span>
                  <span
                    className="title"
                    onClick={() => {
                      dashboard?.admin?._doc?.userType.split("|")[0] === "Admin"
                        ? window?.location?.replace("/")
                        : window?.location?.reload();
                    }}
                  >
                    {dashboard?.admin?._doc?.userType.split("|")[0] === "Admin"
                      ? "Sign out"
                      : "login"}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* <!-- ========================= Main ==================== --> */}
          <div className="main">
            <div className="topbar">
              <div className="toggle">
                <ion-icon name="menu-outline"></ion-icon>
              </div>

              <div className="search">
                <label>
                  <input type="text" placeholder="Search here" />
                  <ion-icon name="search-outline"></ion-icon>
                </label>
              </div>

              <div className="user">
                {/* <img src="assets/imgs/customer01.jpg" alt="" /> */}
                <img src={dashboard?.admin?._doc?.picture} alt="" />
              </div>
            </div>

            {/* <!-- ======================= Cards ================== --> */}
            <div className="cardBox">
              <div className="card">
                <div>
                  <div className="numbers">{dashboard?.totalDownload}</div>
                  <div className="cardName">Total Downloads</div>
                </div>

                <div className="iconBx">
                  <ion-icon name="download-outline"></ion-icon>
                </div>
              </div>

              <div className="card">
                <div>
                  <div className="numbers">{dashboard?.totalSales}</div>
                  <div className="cardName">Sales</div>
                </div>

                <div className="iconBx">
                  <ion-icon name="cart-outline"></ion-icon>
                </div>
              </div>

              {/* <!-- <div className="card">
            <div>
              <div className="numbers">284</div>
              <div className="cardName">Comments</div>
            </div>

            <div className="iconBx">
              <ion-icon name="chatbubbles-outline"></ion-icon>
            </div>
          </div> --> */}

              <div className="card">
                <div>
                  <div className="numbers">PKR {dashboard?.totalEarning}</div>
                  <div className="cardName">Earning</div>
                </div>

                <div className="iconBx">
                  <ion-icon name="cash-outline"></ion-icon>
                </div>
              </div>
            </div>

            {/* <!-- ================ Order Details List ================= --> */}
            <div className="details">
              <div className="recentOrders">
                <div className="cardHeader">
                  <h2>Recent Orders</h2>
                  <a href="#" className="btn">
                    View All
                  </a>
                </div>

                <table>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Categories</td>
                      <td>Price</td>
                      <td>Quatity</td>
                    </tr>
                  </thead>

                  <tbody>
                    {dashboard?.data
                      ?.filter(
                        (items) =>
                          items?.DownloadDetails?.price > 0 &&
                          items?.DownloadDetails?.price <= 750,
                      )
                      .map((DD, i) => (
                        <tr key={i}>
                          <td>{DD?.DownloadDetails?.name}</td>
                          <td>{DD?.DownloadDetails?.category}</td>
                          <td>{DD?.DownloadDetails?.price}</td>
                          <td>
                            <span className=".status .delivered">
                              {DD?.DownloadDetails?.qty}
                            </span>
                          </td>
                        </tr>
                      ))}
                    {/* // console.log(DD.DownloadDetails), */}
                  </tbody>
                </table>
              </div>

              {/* <!-- ================= New Customers ================ -->
              <div className="recentCustomers">
                <div className="cardHeader">
                  <h2>Recent Customers</h2>
                </div>

                <table>
                  <tr>
                    <td width="60px">
                      <div className="imgBx">
                        <img src="assets/imgs/customer02.jpg" alt="" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        Hassan <br />
                        <span>Italy</span>
                      </h4>
                    </td>
                  </tr>

                  <tr>
                    <td width="60px">
                      <div className="imgBx">
                        <img src="assets/imgs/customer01.jpg" alt="" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        Fasih <br />
                        <span>Pakistan</span>
                      </h4>
                    </td>
                  </tr>

                  <tr>
                    <td width="60px">
                      <div className="imgBx">
                        <img src="assets/imgs/customer02.jpg" alt="" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        Talha <br />
                        <span>Italy</span>
                      </h4>
                    </td>
                  </tr>

                  <tr>
                    <td width="60px">
                      <div className="imgBx">
                        <img src="assets/imgs/customer01.jpg" alt="" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        Farhan <br />
                        <span>Pakistan</span>
                      </h4>
                    </td>
                  </tr>

                  <tr>
                    <td width="60px">
                      <div className="imgBx">
                        <img src="assets/imgs/customer02.jpg" alt="" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        David <br />
                        <span>Italy</span>
                      </h4>
                    </td>
                  </tr>

                  <tr>
                    <td width="60px">
                      <div className="imgBx">
                        <img src="assets/imgs/customer01.jpg" alt="" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        Hammad <br />
                        <span>Pakistan</span>
                      </h4>
                    </td>
                  </tr>

                  <tr>
                    <td width="60px">
                      <div className="imgBx">
                        <img src="assets/imgs/customer01.jpg" alt="" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        David <br />
                        <span>Italy</span>
                      </h4>
                    </td>
                  </tr>

                  <tr>
                    <td width="60px">
                      <div className="imgBx">
                        <img src="assets/imgs/customer02.jpg" alt="" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        Amit <br />
                        <span>Pakistan</span>
                      </h4>
                    </td>
                  </tr>
                </table>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <Preloading />
      )}
    </>
  );
};

export default Dashboard;
