import styles from "./Post.module.css";

export default function Post({ post }) {
  return (
    <div className={styles.post}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
