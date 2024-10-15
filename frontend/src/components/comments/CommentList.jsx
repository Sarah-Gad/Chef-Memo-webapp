import { useState } from "react";
import "./comment-list.css";
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

const CommentList = ({ comments}) => {
    const { user } = useSelector(state => state.auth)
    const [updateComment, setUpdateComment] = useState(false);

    //Delete Comment Handler
    const deleteCommentHandler = () => {
        swal({
            title: "Delete this comment?",
            text: "Once deleted, you won't be able to recover this comment!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal("Your comment has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your comment stays!");
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
                onClick={() => setUpdateComment(true)}
                className="bi bi-pencil-square"
                ></i>
                <i onClick={deleteCommentHandler} className="bi bi-trash-fill"></i>
            </div>
                )
            }
            </div>
        ))}
        { updateComment && <UpdateCommentModal setUpdateComment={setUpdateComment} />}
        </div>
    );
};

export default CommentList;
