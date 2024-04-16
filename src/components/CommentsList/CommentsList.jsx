import React from "react";
import styles from "./CommentsList.module.css";
import { Comment } from "../Comment/Comment";


const CommentsList = ({ comments }) => {
  return (
    <div className={styles.commentListWrapper}>
      <div className={styles.commentList}>

      {comments.length === 0 ? (
        <div className={styles.noComments}>No Comments to show</div>
      ) : (
        <>
          {comments.map((comment, index) => {
            return (
              <>
                <Comment key={comment?._id} comment={comment}/>
              </>
            );
          })}
        </>
      )}
      </div>
    </div>
  );
};


export default React.memo(CommentsList)

// {comments.map((comment,index)=>{

//   return(
//       <>
//       <div>
//           {comment}
//       </div>
//       </>
//   )
// })}
