import React from "react";
import "./sideNavbar.css";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ContentCutIcon from "@mui/icons-material/ContentCut";

const SideNavbar = ({ sideNavbar, isMobile }) => {
  return (
    <div className={isMobile
      ? "homeSideNavbarHide" 
      : sideNavbar
        ? "home-sideNavbar" 
        : "homeSideNavbarHide"}>
      <div className="home_sideNavbarTop">
        <div className={`home_sideNavbarTopOption`}>
          <HomeIcon />
          <div className="home_sideNavbarTopOptionTitle">Home</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <VideocamIcon />
          <div className="home_sideNavbarTopOptionTitle">Shorts</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <SubscriptionsIcon />
          <div className="home_sideNavbarTopOptionTitle">Subscription</div>
        </div>
      </div>

      <div className="home_sideNavbarMiddle">
        <div className={`home_sideNavbarTopOption`}>
          <div className="home_sideNavbarTopOptionTitle">You</div>
          <ChevronRightIcon />
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <RecentActorsIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <HistoryIcon />
          <div className="home_sideNavbarTopOptionTitle">History</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <PlaylistAddIcon />
          <div className="home_sideNavbarTopOptionTitle">Playlist</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <SmartDisplayOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Videos</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <WatchLaterOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle">Watch Later</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <ThumbUpAltOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle">Liked Videos</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <ContentCutIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Clips</div>
        </div>
      </div>

      <div className="home_sideNavbarMiddle">
        <div className="home_sideNavbarTopOption">
          <div className="home_sideNavbarTopOptionTitleHeader">
            Subscription
          </div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_ImgLogo"
            src="data:image/png;base64,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"
            alt=""
            srcset=""
          />
          <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_ImgLogo"
            src="data:image/jpeg;base64,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"
            alt=""
            srcset=""
          />
          <div className="home_sideNavbarTopOptionTitle">The LallanTop</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            className="home_sideNavbar_ImgLogo"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA1VBMVEUAAAD///86Ojr8/PzuAAA9PT1AQECmpqYEBARpaWk3NzdUVFT4+Pj19fVYWFhGRkbY2Ni1tbWtra0lJSUVFRUyMjLo6OjS0tLCwsLt7e2Li4uenp4vLy9cXFyXl5dJSUnOzs6Dg4N3d3cfHx9ubm57e3vVAADrAAAhISHfAAC8vLwYGBhjY2OZmZkQEBD0//+7m5tCAABFDAYzAAD/9PL76u7fX2f4AADqrab5zsnkbmfjg4n23dL/5uXlgHr///rdNTrmvbDYHCndHyDvuLcjAACos7iOPadrAAAMsklEQVR4nN2dZ2PjNhKGCUGFliWLkiyqWc1ZReu6ueQSX+5ycXLt//+kA1gHjQQpsL754nhlEo8GZQDMABYqVthZzfaPd/0Xi9d8sju/TY/rgguArMKePHKnm91cABM1vNmu1riwchRDOF5tDrYGXKyX1+1yVEhZzBOOjpuHTHCxbreO8eKYJnRnu5x0VmDzx9XYbJFMEdJ25A4mefEYvU7HwRNNyJgNxzMzeL5uVqbKZYDQ+66XNwbxfG3cq4vm6WpCAjge5O1akrUzYsjrbeieSGHsbGODhrwnzgfXt8ZrCDF5vfPFNBqn/bVd63U2dHKPDRm0uY7xGkLXfPci1/4abyc/4fpcEh/VoALCfYl8RPPc/WpOwtV7uYBEt67XtZVD6JbRwXAig8cm19CRlZB+jdvy+XzNjzm81ew2dHtVARIznrP3qpkJt8G7KtLLsVDCEVrfVsYWapNxYpXNhqsqzReql23SkYnwVDVcoExjYwbC9aEGBvR1KoRwWYcaGuqg741rE87qBEjKot0YdQm9aW7VWJFoSXQbowYhdWNeq2aSSHO+oWXDUb9qGqk2xgjXOrsPVegL0phupBJi5N5XTaLUK073b9Jt6No16mJY2dZdugOXQkgsWDVGsg6pXmqaDWsOSKb+VxK6da2gse5SbJREiNG6vp1MrJsrbDia17aTiWVbj/kJ6znQi0oc+pMI6+iqyTXLR1iX+a6OElZv1ISzqkudSerJlJJwWXWZs+mr0n9TEa7rNB3U0S4r4aRZgKSw+yy1FDeqlwmlWPKX23DVLAsGkq9OiYTYa4TNk02ccE1CjKpfus8n6cqNzIbbRtZRKtmoKGmHtZ8SqrXQI6xsf9CAJEOGSFjZDq8RifVUIGxwHaX96UQYFAXCCoIQDMoWJ1I84arqMl4tftznCcuPkzEtfk2DI3yrunwG5LBNkSVspLvGSnDeWMIyg/EKks3vLDKEjR4pYi1UhLhBi2vJmqps6FRdMlOaqwjbYkLWiICwNSa0rHs5YVlR22XoWUbYko7UV08kbObymlrxwltkw3HVZTKrnVhLB1WXybBcgbCY5KzqtOEJl41dX1OJb4c3rSN8Zglb1s9Q3bKEzdoO1dOaITxUXZwCtIWErfJnQi0gYbNXgVVyAKHJRPO6yLbeYsJWVtLQ/bba2pNSuRFhs1fyVQpW+CnhqOqyFKVdSHisuiSFCQeEm6oLUpiOAWHbJk6x9j5hCzYrVJr4hM3fMlRr7BG2txl6jpvVznlFqC0lHLVtch/LpnH8VludUl9zSjituhSFakwI29zR0DHfQnfc77SaJfMh84dEZVHyy2eEUEiffO8Mh51Or9fv9TpDlb8z7HV8DTv0I4uHh4dFrGGgDv0PqqcS+Iz/pwv6yIeH+cOc6LskiE4//MvFQsA9IQsLf8HFMrjPsp1TcMDhM/lfVLCUO3+21YFllcBY4r6oGGq7fkwinJZAqOzwbZBMgiVhlXNkHYVfHvjHkznIkq8nJROq+8NbkAos213ClriCIRBSjSdsmy6bcKzqUkBBpL6La4knWk2kr8CHKgmxavcPJh9KD+c6WmITkxMizHSrZdsQIXl/CiJm5YsxK0uMy1cQsrEa5RM+i6WnyZVxlJ68qQ6sjjYhUwsiws+yCKX5nsCEion83hIzffvwsWwgo9SGtK+KP4d7h8OEOAtkuCdOQ38yORwOd3sXPsiZk3+I1BnOQYDPqQP+qT85g7+TZNOdQOEUUYeyXwMbYhhwi+HKcUj4+Yn+59mQ/OB/Sv4imMgqbFaCyGV+aI+/SSwZ9sFh4KoRU+auQBtavRX89uNzx8M3k8Hoh7/8+NNf41FJ8SaIyNc3kOvCU0D3Q4CAz1SdMirL/4GEdrQN5yk2YvTd/vzLU7f78fS3+EtRCHzf/PeaQMgEi/IhP+DwNmXImmzTiSNkcmy/MoSfGP36/cfl0n26XP7+mURoM4/h20YS4QN4O9cCtqB6KVO1FimE78w7QEt0aC/6iX/+vkt1uXw8/SOoqKpXAWPwQ3MSIZNewA77kQlxQk7vV8nveML4HThuiZQQf0O/fFDAj+6le/n+N4Q/EwifVQVNIQQgmJnqwUw19WqaLPmAr6V0sUNwbr1a+u2fT5eub8Tux8fvBRHC/gSs7d6D3OaEJV+Zr8oT2rBwIYDjmfTX7pPPR/WH/0WoXgUGvWyEsI8C7W0GWqHotmQipEaMHzaICL+N0J+RBUlT/NcnLoLQpoclRYr6zK9hxcJShy5RzHjoC7R2/B4Skmf/eXnqRvrjsyAbSod9GOicdI5Vmg2DX72AV8zil4J2SMz4O0rsS0GR+NCPFBsCLwuH7udDVK1oiRJWozQJYaXH3wWEcV/qET79lkwIGjM/C0izIR1pMPvHwNVS+ImBZCfsyAjnwHWbhYTReEgMeckyHvIeViphXIcCrxYeD5WcqyWrwTJCUMf8QWlJfwx9GmrBZJ+GWTESIiNSCckn4q94G74eEKs11CWMkzT847/CV3zz/NLuv/8j/gmndVxI/ntNJ2SyCucgxhmnrdnLfAEpYdyMSF0cnyJCMsj/8NOP/8Wpc4tz/FBhjqBBeAKFetaY+Ebil/Sp4Bw//u1X5gC/6Odwfog/k2vpmW/IGQmZFGaYsZ2Wbncj8UzlNmSaAmjn2F/FAF7+bre7u/V152u3YbIeha81ndC2XiXvRhoBayfJ/EluQ9XBGtlXosRC6dgQdi6ANTXRZ2+JEV+QEI6XqnPRshKK6wpahB3Zs9JztWaSlRpIyMw9FCdqZSSUzAO0CNmswkC71M3AlSWOl5CQ9QhkFSUbofykST3CF/GAHY3DrJaWuMkNCeGVd0KGbQ5C+UGMWoQ2s2LkSyOMZJ2y98QvpcsOY8pCKJ/n6NmQ7+uw1lFIyHKFT6kJyScX4tlv+oSObPjNQHjiCDUC8hbIEkdoSMj6V/6axtZhG4TeHvB6uVcWSJeQO7lkqhF08EoIBdf0vTP099s7w6HiCQu6bt/r+Lvv3j4+3bTn9unjvft+T7amF2se7/MnHyf6Avf7+zonXOwJIf+tpYVZiL/Si8UwELCR4xFTQtjOXItQDiFsc/AlXWy12hxA67l6VrDu0lKRWamFW5ptQeVlXFhtTevy5XqEDTuLNZOQR9jalBk/aYZSNvUgyHQNAsL2NkQnIGzRsS2sbBQQKhdxm67HiFCMbWuHVhFhW13TMV1a9QhbeKIClX/zhT87b88ZWFAzQNjOrJI1IGxlNQ2uZ7F0FoCaqSlD2MbeFDOELRz0wwBpnzB1r7iBchjCFh6NEUVURqvVigX3xmomELaqr7HBLk6841DXSw7z6YR4QmXaTUMVpz/ENkwOD2uYQOQG2BeTJkY1VI6UsC3Oqc1macC9zfaM+ksFYVuMyOb5MvvT+5YcD+koCVuy+r1DSsKWjIluAmErHJszSiJs5nVkrMaJhC3YpeEv7uIJGz9PHKIUQjLsN7ie2nSwx8mEGDe5s7GtMw8oEqJj1cW8SuJ1pJKYuybvREkCYCWEoyZcxi3XF8lFnbK4yWNTO5t72UWk0sjQpk6jpDc7y2Nfm3kFovwCcjlhI8f9vhRFSohx5szaOmgt6WaUNvQOaGhSd2Orr1dXEGLu0KS6ix5PnvFebjRuzk2I1BSqpKwEwiZFStnijEKHsEl7Ne+qzMFkwgZF9DkJFInZLk255ErVjaYSYuXRRPXSVNWNptuwGXcKSG9U1yZswOa3mJWYiZCO/PWWLCMyAyFNu683Yipgai0llHc19t/SqqgOIa5z0FtKJ6NJiOu5NkXrVfIwoUvoqYZb/AnzpTyEdbxN6D3JVctOiI5VH0zOiJRkmOBs5yJEbr3SFNXzwdyEaHRXo4WNN6TTyWQk9I6cqgmiXh+TmbA2mzZ9xara1YRE4zpsEcsXfs0Q4hrM+++z1NDMhFSO7AC0ckSHqy8Z6mdOwmodHOkBOaYJMXKquvLyUdzhLYKQisZOle7iDOWHOBVDiMblTzcGiDkTr2hC0uOUN/enteWs64aaI0RolXysjkm9uunFMU5Ia8y0nNibW815kmFCX1N63FmxXc5tvg7GFCFCzwknTRvQjaM/iyiIkEyO6cK46bHDf9zpivZnkJDMjgsJT1nMcvefUAYIaSXCz6ZnHY/L8NlXytwNMe7WXIvcTUfpL9SU0TtwnDfZbTeZ8WY0zdyA9XyZvuXHnV21IWc/row0PqAC7jHCx32+ycducNXQrlBBNzWNncFNFoenc576A4OxyhmpyLuoxsfZ6TbtBM7h637qmK6ZUMXftoXd42qwP7/eThbzdzKQ2+/3885hd3N6m62W8eUc5o0X6P94O69mOZ2wsAAAAABJRU5ErkJggg=="
            alt=""
            srcset=""
          />
          <div className="home_sideNavbarTopOptionTitle">NDTV India</div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
