import styles from "./Loading.module.scss"

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spin}>
        <div className={styles.spinItem}></div>
        <div className={styles.spinItem}></div>
        <div className={styles.spinItem}></div>
      </div>
    </div>
  )
}

export default Loading