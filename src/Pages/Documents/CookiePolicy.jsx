import styles from "./Documents.module.css";

export default function cookiePolicy() {
  return (
    <div className={styles.container}>
      <h1>Cookie Policy</h1>
      <b>What are cookies?</b>
      <p>
        Cookies are small text files stored on your device when you visit our
        site. They help improve your experience and ensure the site functions
        properly.
      </p>

      <b>How do we use cookies?</b>
      <p>
        We use cookies for the following purposes:
        <ul>
          <li>To remember your preferences and settings</li>
          <li>To analyze user behavior and site traffic</li>
          <li>
            To display relevent products and offers using data from our API
          </li>
          <li>To improve perfomance and personalize your experience</li>
        </ul>
      </p>

      <b>Third-party cookies</b>
      <p>
        We also use cookies from trusted partners like Google Analytics for
        statistical analysis. How can you manage cookies? You can change or
        delete your cookies anytime through your browser settings. Please note
        that disabling cookies may affect the site's functionality.
      </p>
    </div>
  );
}
