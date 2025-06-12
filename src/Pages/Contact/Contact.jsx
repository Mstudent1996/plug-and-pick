import styles from './Contact.module.css' 
import ContactForm from "../../Components/ContactForm/ContactForm"; // Importer kontaktform
import { Accordion, AccordionItem } from "@szhsin/react-accordion"; // Importer accordion fra en react-pakke

export default function Contact() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Support</h1>
        <div className={styles.supportContainer}>
          <ContactForm /> {/* Kalder kontakformularen */}

          <div className={styles.faq}>
            <h2>Frequently asked questions</h2>
            <Accordion className={styles.accordion}> {/* Kalder accordion */}
              <AccordionItem header="When will I receive my order?">
                Delivery time depends on what you've ordered. Groceries are
                usually delivered the same day, while electronics and other
                items may take 2 to 5 business days. You'll receive a tracking
                email once your order is shipped.
              </AccordionItem>

              <AccordionItem header="Can I order both groceries and electronics together?">
                Yes. You can mix all product types in the same order. However,
                you may receive multiple packages, depending on where the items
                are shipped from.
              </AccordionItem>

              <AccordionItem header="How does the return policy work?">
                You have 30 days to return non-food items like clothing,
                electronics, and home goods. For hygiene reasons, food and
                personal care products cannot be returned, unless they were
                damaged upon delivery.
              </AccordionItem>

              <AccordionItem header="What should I do if something arrives damaged?">
                Please contact our customer service right away and include
                photos of the damaged item and packaging. We’ll arrange a
                replacement or a refund depending on your preference.
              </AccordionItem>

              <AccordionItem header="Are my payment details secure?">
                Yes. We use encryption and certified payment gateways to keep
                your data safe and secure.
              </AccordionItem>

              <AccordionItem header="Can I save my favorite products?">
                Yes. You can click the heart icon on any
                product to save it to your favorites.
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    );
}