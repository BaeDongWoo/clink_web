import React, { useEffect, useState } from 'react';
import CommunityHeader from '../components/community/CommunityHeader';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PostTagInput from '../components/community/PostTagInput';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import queryString from 'query-string';
import { getAuthHeader, callRefresh } from '../components/common/JwtAuth';

export default function EditPost() {
  const [inputPost, setInputPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const updatePostAPILink = 'http://localhost:80/community/post/update';
  const query = queryString.parse(location.search);
  const post_board_no = Number(query.board_no);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputPost({
      ...inputPost,
      communityPostVO: {
        ...inputPost.communityPostVO,
        [name]: value,
      },
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setError(null);
        setInputPost(null);
        setLoading(true);

        const headersWithAuth = getAuthHeader(); // JWT를 포함한 헤더 가져오기

        const response = await axios.get(
          'http://localhost/community/post' + location.search,
          {
            headers: headersWithAuth, // JWT 포함한 헤더 추가
          }
        );

        setInputPost(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchPost();
  }, [location]);

  const updatePost = () => {
    const arr = [];
    for (let i = 0; i < inputPost.tagList.length; i++) {
      arr.push(inputPost.tagList[i].tagname);
    }
    let params = {
      board_title: inputPost.communityPostVO.board_title,
      board_content: inputPost.communityPostVO.board_content,
      category_no: inputPost.communityPostVO.category_no,
      hashtag_content: arr.join(),
      update_id: inputPost.communityPostVO.update_id,
      board_no: post_board_no,
    };
    axios.post(updatePostAPILink, params).catch(function (e) {
      console.log(e);
    });
    window.location.href =
      'http://localhost:3000/community/post' + location.search;
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!inputPost) return null;
  return (
    <div className="WritingPost">
      <CommunityHeader></CommunityHeader>
      <Form action={updatePostAPILink} method="post">
        <Form.Group className="" controlId="formPost">
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            className="board_title"
            defaultValue={inputPost.communityPostVO.board_title}
            onChange={onChange}
            name="board_title"
          />
          <br />
          <Form.Control
            className="board_content"
            as="textarea"
            rows={13}
            placeholder="내용을 입력하세요"
            defaultValue={inputPost.communityPostVO.board_content}
            onChange={onChange}
            name="board_content"
          />
          <Form.Control type="hidden" name="board_no" value={post_board_no} />
        </Form.Group>
        <PostTagInput
          inputPost={inputPost}
          setInputPost={setInputPost}
        ></PostTagInput>
        <Button type="button" style={{ width: '80%' }} onClick={updatePost}>
          수정 완료
        </Button>
      </Form>
      <br />
      <br />
      <br />
    </div>
  );
}
