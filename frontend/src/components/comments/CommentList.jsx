import { useState } from "react";
import "./comment-list.css";
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";

const CommentList = () => {

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
        <h4 className="comment-list-count">2 Comments</h4>
        {[1, 2].map((comment) => (
            <div key={comment} className="comment-item">
            <div className="comment-item-info">
                <div className="comment-item-username">
                    Sarah Gad
                </div>
                <div className="comment-item-time">
                    10 hours ago
                </div>
            </div>
            <p className="comment-item-text">
                Wow, I'll try this recipe for sure!
            </p>
            <div className="comment-item-icon-wrapper">
                <i
                onClick={() => setUpdateComment(true)}
                className="bi bi-pencil-square"
                ></i>
                <i onClick={deleteCommentHandler} className="bi bi-trash-fill"></i>
            </div>
            </div>
        ))}
        { updateComment && <UpdateCommentModal setUpdateComment={setUpdateComment} />}
        </div>
    );
};

export default CommentList;
