import '../styles/main/MainFrame.scss';
import CalendarGraph from '../components/main/CalendarGraph.js';
import MainBackgroundImage from '../images/main_background.svg';
import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header.js';
import MainHello from '../components/main/MainHello.js';
import MainQuote from '../components/main/MainQuote.js';
import MainSavingTotal from '../components/main/MainSavingTotal.js';
import MainReport from '../components/main/MainReport.js';
import axios from 'axios';
import NoChallenge from '../components/register/NoChallenge/NoChallengeForm';
import { getAuthHeader, callRefresh } from '../components/common/JwtAuth';

let userId = sessionStorage.getItem('user_id');
if (userId == null) userId = 'chatgpt';

const MainFrame = (props) => {
  const [badge, setBadge] = useState([]);
  const [quote, setQuote] = useState([]);
  const [streakData, setStreakData] = useState();
  const [reportData, setReportData] = useState();
  const [checkChallenge, setCheckChallenge] = useState(
    sessionStorage.getItem('challengeCheck')
  );
  const [continuesDate, setContinuesDate] = useState(1);

  //연속일수 구하는 함수
  function getContinuesDate(dayData) {
    let cDate = 1;
    let continueity = true;
    let idx = 0;
    while (continueity) {
      //하루차이나면 +1
      if (
        (new Date(dayData[idx].day).getTime() -
          new Date(dayData[idx + 1].day).getTime()) /
          (1000 * 60 * 60 * 24) ===
        1
      ) {
        cDate = cDate + 1;
        idx = idx + 1;
      } else {
        //아니면 종료
        continueity = false;
      }
    }
    setContinuesDate(cDate);
  }

  useEffect(() => {
    console.log(sessionStorage.getItem('challengeCheck'));
    const getUserData = async () => {
      try {
        const headersWithAuth = getAuthHeader();

        const response = await axios.get(
          'http://localhost:80/main/info?userNo=' +
            sessionStorage.getItem('user_no'),
          {
            headers: headersWithAuth,
          }
        );

        if (response.data !== '') {
          console.log(response);
          setBadge(response.data.badge);
          setQuote(response.data.quote);
          setStreakData(response.data.streakData);
          setReportData(response.data.report);
          getContinuesDate(response.data.streakData.streakData);
          setCheckChallenge(true);
        } else {
          setCheckChallenge(false);
          console.log('없졍');
        }
      } catch (error) {
        console.log('메인에러');
      }
    };
    getUserData();
  }, []);

  // useEffect(() => {
  //   console.log(sessionStorage.getItem('challengeCheck'));
  //   const getUserData = async () => {
  //     await axios
  //       .get(
  //         'http://localhost:80/main/info?userNo=' +
  //           sessionStorage.getItem('user_no')
  //       )
  //       .then((Response) => {
  //         if (Response.data !== '') {
  //           console.log(Response);
  //           setBadge(Response.data.badge);
  //           setQuote(Response.data.quote);
  //           setStreakData(Response.data.streakData);
  //           setReportData(Response.data.report);
  //           getContinuesDate(Response.data.streakData.streakData);
  //           setCheckChallenge(true);
  //         } else {
  //           setCheckChallenge(false);
  //           console.log('없졍');
  //         }
  //       })
  //       .catch((error) => {
  //         console.log('메인에러');
  //       });
  //   };
  //   getUserData();
  // }, []);

  return (
    <>
      <div className="backgroundCircle"></div>
      {checkChallenge >= 1 ? (
        <div
          className="main-div"
          style={{
            backgroundImage: 'url(' + MainBackgroundImage + ')',
            paddingBottom: '20%',
          }}
        >
          <Header />
          <MainHello badge={badge} />
          <MainQuote quote={quote} />
          {reportData && (
            <MainSavingTotal
              saving={reportData.yesterday_saving}
              totalSave={reportData.total_saving}
            />
          )}
          {streakData && (
            <CalendarGraph data={streakData} continuesDate={continuesDate} />
          )}
          {reportData && <MainReport data={reportData} />}
        </div>
      ) : (
        <>
          <NoChallenge />
        </>
      )}
    </>
  );
};

export default MainFrame;
