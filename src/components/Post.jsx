const Post = ({ post, isOwner }) => {
  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
  const date = new Date(post.date + TIME_ZONE).toISOString().split('T')[0];

  return (
    <li>
      <h4>{post.post}</h4>
      <p>{date}</p>
      {isOwner && (
        <>
          <button>삭제</button>
          <button>수정</button>
        </>
      )}
    </li>
  );
};

export default Post;
