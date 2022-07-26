import classes from './comment-list.module.css';

function CommentList({ comments }) {
  console.log(comments);
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((cmp) => {
        return (<li  key={cmp._id}>
          <p>{cmp.text}</p>
          <div>
            By <address>{cmp.name}</address>
          </div>
        </li>)
      })}
    </ul>
  );
}

export default CommentList;
