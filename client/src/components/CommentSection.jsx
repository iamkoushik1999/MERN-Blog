// import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Textarea, Button, Alert } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Comment from './Comment';

// eslint-disable-next-line react/prop-types
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/v1/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser.userData._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data.comment, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/v1/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/v1/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...comment, content: editedContent } : c
      )
    );
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3 '>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as: </p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.userData.profilePicture}
            alt={currentUser.userData.username}
          />
          <Link
            to={`/dashboard?tab=profile`}
            className='text-xs to-cyan-600 hover:underline'>
            @{currentUser.userData.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'>
          <Textarea
            placeholder='Add a comment...'
            rows={'3'}
            maxLength={'200'}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} Characters remaining
            </p>
            <Button outline gradientDuoTone={'purpleToBlue'} type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color={'failure'} className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>

          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
