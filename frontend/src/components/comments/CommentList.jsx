import { useState } from "react";
import "./comment-list.css";
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments}) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const [updateComment, setUpdateComment] = useState(false);
    const [commentForUpdate, setCommentForUpdate] = useState(null);

    const updateCommentHandler = (comment) => {
      setCommentForUpdate(comment);
      setUpdateComment(true);
    }

    //Delete Comment Handler
    const deleteCommentHandler = (commentId) => {
        swal({
            title: "Delete this comment?",
            text: "Once deleted, you won't be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(deleteComment(commentId));
            }
        });
    };

    return (
    <div className="comment-list">
        <h4 className="comment-list-count">{comments?.length} Comments</h4>
        {comments?.map((comment) => (
        <div key={comment._id} className="comment-item">
            <div className="comment-item-info">
                <div className="comment-item-username">
                    {comment.username}
                </div>
                <div className="comment-item-time">
                    <Moment fromNow ago>
                    {comment.createdAt}
                    </Moment>{" "}
                    ago
                </div>
            </div>
            <p className="comment-item-text">
                {comment.text}
            </p>
            {
                user?._id === comment.user && (
                <div className="comment-item-icon-wrapper">
                <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square"
                ></i>
                <i onClick={() => deleteCommentHandler(comment?._id)} className="bi bi-trash-fill"></i>
            </div>
                )
            }
            </div>
        ))}
        { updateComment && <UpdateCommentModal commentForUpdate={commentForUpdate} setUpdateComment={setUpdateComment} />}
        </div>
    );
};

export default CommentList;
