import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import ModalBasic from './ModalBasic';
import { getAuthHeader, callRefresh } from '../common/JwtAuth';

const ChallengeTableCard = ({
  datetime,
  description,
  category,
  amount,
  update,
}) => {
  //모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  //카드내용 노출 여부 state
  const [cardContent, setCardContent] = useState(true);

  //Update 호출
  function updateCard() {
    setModalOpen(true);
    setCardContent(false);
  }

  //D -> DD
  function convertDigitLength(digit) {
    return digit < 10 ? '0' + digit : digit;
  }

  // 날짜 'MM.DD'
  let date = new Date(datetime);
  let strDate = moment(date).format('MM.DD');

  // 시간 'HH:MM:DD'
  let time =
    convertDigitLength(date.getHours()) +
    ':' +
    convertDigitLength(date.getMinutes()) +
    ':' +
    convertDigitLength(date.getSeconds());

  //Delete 호출
  function deleteCard() {
    //삭제 전 확인
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const address =
        'http://localhost:80/challenge/pay-delete?userNo=00000' +
        '&datetime=' +
        moment(date).format('YYYY-MM-DD ') +
        time +
        '&content=' +
        description;
      axios
        .get(address, {
          headers: getAuthHeader(),
        })
        .then((response) => {
          if (response.data) {
            alert('정상적으로 삭제되었습니다.');
            window.location.reload();
          } else alert('잠시 후 다시 시도해주세요');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  let strAmount =
    amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';

  return (
    <div className="ChallengeTableCard">
      {modalOpen && (
        <ModalBasic
          setModalOpen={setModalOpen}
          setCardContent={setCardContent}
          strDate={strDate}
          description={description}
          amount={amount}
          time={time}
          date={date}
          category={category}
        />
      )}
      {cardContent && (
        <div className="Card">
          <div className="CardTop">
            <div id="CardLeft">{strDate}</div>
            <div id="CardMiddle">{description}</div>
            <div id="CardRight">{strAmount}</div>
          </div>
          <div className="CardBottom">
            <div id="CardLeft">{time}</div>
            <div id="CardMiddle">{category}</div>
            <div id="CardRight">
              {update && (
                <div id="CardUpdate" onClick={updateCard}>
                  [수정]
                </div>
              )}
              {update && (
                <div id="CardDelete" onClick={deleteCard}>
                  [삭제]
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeTableCard;
