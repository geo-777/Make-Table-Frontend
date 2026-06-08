import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./FAQ.module.css";
import { FAQS } from "../../data/landingData";
import { m } from "framer-motion";
const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <span className={styles.label}>FAQ</span>

          <h2>
            Questions,
            <br />
            answered.
          </h2>
        </m.div>

        <div className={styles.faqList}>
          {FAQS.map((faq, index) => (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              key={faq.q}
              className={styles.item}
            >
              <button className={styles.question} onClick={() => toggle(index)}>
                <span>{faq.q}</span>

                <Plus
                  size={16}
                  className={`${styles.icon} ${
                    open === index ? styles.open : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className={styles.answer}>
                  <p>{faq.a}</p>
                </div>
              )}
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
