import '../../styles/community/CommunityCategoryTab.scss';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default function CommunityCategory({
  setFilter,
  categoryNo,
  setHashtag,
}) {
  //카테고리별 카테고리탭
  // const navigate = useNavigate();
  const onclick = () => {
    console.log(typeof categoryNo);
    setFilter(1);
    setHashtag('');
  };
  return (
    <div className="CommunityCategoryContainer">
<<<<<<< HEAD
      <NavLink to="/community/posts?category_no=0&filter=0" onClick={onclick}>
        {categoryNo === 0 ? <p className="selec">베스트</p> : <p>베스트</p>}
=======
      <NavLink to="/community/posts?category_no=3&&filter=0" onClick={onclick}>
        {categoryNo === 3 ? <p className="selec">베스트</p> : <p>베스트</p>}
>>>>>>> parent of e881745 (Add reply view)
      </NavLink>
      <NavLink to="/community/posts?category_no=1&filter=0" onClick={onclick}>
        {categoryNo === 1 ? <p className="selec">자유</p> : <p>자유</p>}
      </NavLink>
      <NavLink to="/community/posts?category_no=2&filter=0" onClick={onclick}>
        {categoryNo === 2 ? <p className="selec">정보</p> : <p>정보</p>}
      </NavLink>
<<<<<<< HEAD
      <NavLink to="/community/posts?category_no=3&filter=0" onClick={onclick}>
        {categoryNo === 3 ? <p className="selec">공지사항</p> : <p>공지사항</p>}
=======
      <NavLink to="/community/posts?category_no=0&&filter=0" onClick={onclick}>
        {categoryNo === 0 ? <p className="selec">공지사항</p> : <p>공지사항</p>}
>>>>>>> parent of e881745 (Add reply view)
      </NavLink>
    </div>
  );
}
