import React from 'react';
import Comment from './Comment';

export default function CommentList({ comments }) {
  if (!comments.comments) {
    return null;
  }
  const commentList = comments.comments.map((comment, index) => {
    return <Comment key={index} comment={comment} />;
  });
  return <ul className="comments-list">{commentList}</ul>;
}
