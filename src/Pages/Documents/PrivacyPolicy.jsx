import styles from './Documents.module.css'

export default function privacy () {
    return (
      <div className={styles.container}>
        <h1>Privacy Policy</h1>
        <p>Effective Date: 13-06-2025</p>
        <b>Introduction</b>
        <p>
          At Plug & Pick, we respect your privacy and are committed to
          protecting your personal information. This privacy policy outlines how
          we collect, use, and protect your data when you visit our website and
          purchase our products.
        </p>

        <b>Data Collection</b>
        <p>
          We may collect the following types of personal data:
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Shipping and billing address</li>
            <li>Phone number</li>
            <li>
              Payment details (processed securely through a third-party
              provider)
            </li>
            <li>IP address and browsing behavior</li>
          </ul>
          Product data (such as images, descriptions, and pricing) displayed on
          our site is retrieved from a third-party product API to enhance your
          shopping experience.
        </p>

        <b>Purpose of Data Use</b>
        <p>
          Your data is used to:
          <ul>
            <li>Process and fullfill your orders</li>
            <li>Communicate order updates and support</li>
            <li>Improve your shopping experience</li>
            <li>Comply with legal obligations</li>
          </ul>
          We never sell your personal data to third parties.
        </p>

        <b>Cookies</b>
        <p>
          Our website uses cookies to track site usage and improve user
          experience. You can disable cookies in your browser settings.
        </p>

        <b>Data Protection</b>
        <p>
          We use appropriate technical and organizational measures to protect
          your personal data from unauthorized access, misuse, or disclosure.
        </p>

        <b>Third-Party Services</b>
        <p>
          Some of our services (e.g. payment processing, product information)
          may involve trusted third-party providers. These partners only receive
          the data necessary to deliver their services and are bound by strict
          confidentiality agreements.
        </p>
        
        <b>Your Rights</b>
        <p>You have the right to: 
            <ul>
                <li>Access your personal data</li>
                <li>Correct or delete your data</li>
                <li>Withdraw consent</li>
                <li>File a complaint with a data protection authority</li>
            </ul>
            To exercise your rights, contact us at [support@example.com]
        </p>
      </div>
    );
}