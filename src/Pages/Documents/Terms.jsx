import styles from './Documents.module.css'

export default function terms () {
    return (
      <div className={styles.container}>
        <h1>Store Policy</h1>
        <b>Product Information</b>
        <p>
          We strive to ensure that all product information, including
          descriptions, prices, images, and specifications, is accurate and
          up-to-date. Products are listed with their brand, category, and key
          features to help you make informed decisions. Please note that colors
          and packaging may vary slightly from what is shown online.
        </p>

        <b>Pricing and Availability</b>
        <p>
          All prices are listed in USD and include applicable taxes unless
          stated otherwise. We reserve the right to change prices or
          availability at any time without prior notice. Products displayed on
          our website are subject to availability and may be discontinued
          without notice.
        </p>

        <b>Shipping & Delivery</b>
        <p>
          Orders are processed within 1–3 business days. Estimated delivery
          times vary based on location and shipping method selected at checkout.
          You will receive a tracking number once your order has been shipped.
          Please ensure that your shipping address is correct to avoid delays.
        </p>

        <b>Returns & Refunds</b>
        <p>
          If you are not satisfied with your purchase, you may return unused and
          unopened products within 14 days of delivery. To initiate a return,
          please contact our customer service team with your order number and
          reason for return. Refunds will be processed back to your original
          payment method within 5–7 business days upon receipt of the returned
          item.
          <p>
            <i>
              Note: Digital goods, perishable items, and personalized products
              are non-refundable.
            </i>
          </p>
        </p>

        <b>Damaged or Incorrect Items</b>
        <p>
          If you receive a damaged or incorrect item, please notify us within 48
          hours of delivery. Include photos of the item and packaging for faster
          resolution. We will replace the item or issue a refund where
          applicable.
        </p>

        <b>Payment Security</b>
        <p>
          We use secure payment gateways and encryption protocols to ensure your
          personal and payment information is protected. We do not store your
          credit card information on our servers.
        </p>
        
        <b>Contact Us</b>
        <p>
          For any questions or concerns regarding your order, feel free to reach
          out via our Contact Page or email support@example.com. Our team is
          available Monday to Friday, 9 AM – 5 PM (GMT).
        </p>
      </div>
    );
}